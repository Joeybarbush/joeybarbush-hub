// VOX live demo backend — Supabase Edge Function
//
// Browser → this function → Anthropic Claude Haiku 4.5 → reply
// Keeps the API key server-side. Persona system prompts are baked in
// (browser sends only the persona id) so visitors can't reshape VOX.
//
// Deploy:
//   supabase functions deploy vox-chat --no-verify-jwt --project-ref mdbzenhhljwmkdcmtawd
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-... --project-ref mdbzenhhljwmkdcmtawd
//
// (Alternatively, paste this file into the Supabase dashboard:
//   Edge Functions → New function → name "vox-chat" → uncheck JWT verification.)

// deno-lint-ignore-file no-explicit-any
const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
const MODEL = 'claude-haiku-4-5-20251001';
const ALLOWED_ORIGINS = [
  'https://joeybarbush.github.io',
  'https://hipjoy.com',
  'https://www.hipjoy.com',
  'http://localhost:8000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
];

// Per-IP rate limit (in-memory; resets on cold start). Cheap protection
// against someone using the demo as a free Claude proxy.
const RATE_LIMIT = { perMinute: 12, perDay: 80 };
const ipMinute = new Map<string, { count: number; resetAt: number }>();
const ipDay = new Map<string, { count: number; resetAt: number }>();

const PERSONAS: Record<string, { name: string; system: string }> = {
  pro_shop: {
    name: 'St. Andrews Pro Shop',
    system: `You are VOX, the SMS receptionist for St. Andrews Pro Shop, a public golf course pro shop in Batavia, IL.
A caller just missed the staff and got a text-back. Your job: qualify the lead — get their name, what they need, and timing.

RULES:
- Plain SMS. Max 2 short sentences. No emojis unless the caller uses them first.
- If asked, say "I'm VOX, an AI helper for St. Andrews. Joey will see everything and follow up."
- Never quote prices or commit to tee times — say staff will confirm.
- Tee sheet: weekday openings before 9am and after 3pm. Weekends fill 2 weeks ahead.
- Pro shop sells gloves, balls, hats, basic apparel. No club fitting on-site.
- Range is open dawn to dusk. Bucket is $8.
- Once you have name + need + timing, confirm and say staff will lock it in.
- Sound like a friendly Midwest front-desk person.`,
  },
  landscaping: {
    name: 'Schollmeyer Landscaping',
    system: `You are VOX, the SMS receptionist for Schollmeyer Landscaping, a small landscaping crew in the Fox Valley, IL.
A caller just missed Jeff (the owner) and got a text-back. Qualify: name, address, what work, and timeframe.

RULES:
- Plain SMS. Max 2 short sentences. No emojis.
- If asked, say "I'm VOX, an AI helper for Jeff at Schollmeyer. He'll see everything and follow up."
- Never quote prices — say Jeff gives free estimates in person.
- Services: mowing, mulch, fall cleanup, landscape design, sod, tree trimming. No snow removal.
- Service area: Batavia, Geneva, St. Charles, Aurora, Naperville.
- Estimates booked 1-2 weeks out for non-urgent work.
- Once you have name + service + address + timing, confirm Jeff will follow up to schedule.
- Sound like a warm, working-class Midwest receptionist.`,
  },
  barbershop: {
    name: 'The Cut Above',
    system: `You are VOX, the SMS receptionist for The Cut Above, a barbershop in downtown Batavia, IL.
A caller just missed the barber and got a text-back. Qualify: name, what cut, and when.

RULES:
- Plain SMS. Max 2 short sentences. No emojis unless the caller uses them first.
- If asked, say "I'm VOX, an AI helper for The Cut Above. The barbers see everything and follow up."
- Cuts: men's $30, fade $35, beard line-up $15, full beard trim $20, hot towel shave $40, kids $20.
- Hours: Tu-Fri 10-7, Sat 9-5, closed Sun-Mon.
- Walk-ins welcome but Saturday usually books out by Wednesday.
- Once you have name + service + timing, confirm and say staff will lock it in.
- Sound like a confident, easygoing barber-shop counter person.`,
  },
};

function corsHeaders(origin: string | null) {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function checkRateLimit(ip: string): { ok: boolean; reason?: string } {
  const now = Date.now();

  const m = ipMinute.get(ip);
  if (!m || now > m.resetAt) {
    ipMinute.set(ip, { count: 1, resetAt: now + 60_000 });
  } else if (m.count >= RATE_LIMIT.perMinute) {
    return { ok: false, reason: 'rate_minute' };
  } else {
    m.count++;
  }

  const d = ipDay.get(ip);
  if (!d || now > d.resetAt) {
    ipDay.set(ip, { count: 1, resetAt: now + 86_400_000 });
  } else if (d.count >= RATE_LIMIT.perDay) {
    return { ok: false, reason: 'rate_day' };
  } else {
    d.count++;
  }

  return { ok: true };
}

function pickPersona(body: any): { id: string; system: string; name: string } {
  // Accept either a persona id (preferred) or a system override only if we
  // recognize the persona — otherwise force the default.
  const id = typeof body?.persona === 'string' && PERSONAS[body.persona] ? body.persona : 'pro_shop';
  return { id, ...PERSONAS[id] };
}

function buildMessages(body: any): { role: 'user' | 'assistant'; content: string }[] {
  // Accept either { messages: [{role, content}] } (preferred) or
  // { history: [{direction, body}] } (legacy from existing UI).
  const out: { role: 'user' | 'assistant'; content: string }[] = [];

  if (Array.isArray(body?.messages)) {
    for (const m of body.messages) {
      if (m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim()) {
        out.push({ role: m.role, content: m.content.slice(0, 1000) });
      }
    }
  } else if (Array.isArray(body?.history)) {
    for (const m of body.history) {
      if (!m || typeof m.body !== 'string') continue;
      const role = m.direction === 'inbound' ? 'user' : 'assistant';
      out.push({ role, content: m.body.slice(0, 1000) });
    }
    if (typeof body?.message === 'string' && body.message.trim()) {
      out.push({ role: 'user', content: body.message.slice(0, 1000) });
    }
  }

  // Anthropic requires the first message be user; trim leading assistant turns.
  while (out.length && out[0].role !== 'user') out.shift();

  // Cap conversation length so a long demo can't run up cost.
  if (out.length > 20) out.splice(0, out.length - 20);
  return out;
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get('origin');
  const cors = corsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...cors, 'content-type': 'application/json' },
    });
  }

  if (!ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured', detail: 'ANTHROPIC_API_KEY missing' }), {
      status: 500,
      headers: { ...cors, 'content-type': 'application/json' },
    });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    return new Response(JSON.stringify({ error: 'rate_limited', reason: limit.reason }), {
      status: 429,
      headers: { ...cors, 'content-type': 'application/json' },
    });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'bad_json' }), {
      status: 400,
      headers: { ...cors, 'content-type': 'application/json' },
    });
  }

  const persona = pickPersona(body);
  const messages = buildMessages(body);
  if (!messages.length) {
    return new Response(JSON.stringify({ error: 'empty_messages' }), {
      status: 400,
      headers: { ...cors, 'content-type': 'application/json' },
    });
  }

  try {
    const ant = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 200,
        temperature: 0.4,
        system: [
          { type: 'text', text: persona.system, cache_control: { type: 'ephemeral' } },
        ],
        messages,
      }),
    });

    if (!ant.ok) {
      const detail = await ant.text();
      console.error('anthropic error', ant.status, detail);
      return new Response(JSON.stringify({ error: 'upstream_error', status: ant.status }), {
        status: 502,
        headers: { ...cors, 'content-type': 'application/json' },
      });
    }

    const data = await ant.json();
    const reply = (data.content || [])
      .filter((b: any) => b.type === 'text')
      .map((b: any) => b.text)
      .join(' ')
      .trim() || 'Got it — staff will follow up shortly.';

    return new Response(JSON.stringify({
      reply,
      persona: persona.id,
      business: persona.name,
      model: MODEL,
    }), {
      status: 200,
      headers: { ...cors, 'content-type': 'application/json' },
    });
  } catch (err) {
    console.error('vox-chat error', err);
    return new Response(JSON.stringify({ error: 'internal_error' }), {
      status: 500,
      headers: { ...cors, 'content-type': 'application/json' },
    });
  }
});
