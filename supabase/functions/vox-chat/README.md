# vox-chat — Supabase Edge Function

Live demo backend for `/vox.html`. Browser → this function → Claude Haiku 4.5 → reply.
Keeps the Anthropic API key server-side. Personas are baked in (visitors can't reshape VOX).

## Deploy

```bash
# 1. Set the API key as a secret (one time)
supabase secrets set ANTHROPIC_API_KEY=sk-ant-... --project-ref mdbzenhhljwmkdcmtawd

# 2. Deploy the function (no JWT required — public demo)
supabase functions deploy vox-chat --no-verify-jwt --project-ref mdbzenhhljwmkdcmtawd
```

No CLI? Paste `index.ts` into the Supabase dashboard:
**Edge Functions → New function → name `vox-chat` → uncheck "Enforce JWT verification" → paste → Deploy**, then add `ANTHROPIC_API_KEY` under **Project Settings → Edge Functions → Secrets**.

## Endpoint

```
POST https://mdbzenhhljwmkdcmtawd.supabase.co/functions/v1/vox-chat
Content-Type: application/json

{
  "persona": "pro_shop" | "landscaping" | "barbershop",
  "messages": [
    { "role": "user", "content": "Got any 2pm tee times today?" },
    { "role": "assistant", "content": "Hey, I'm VOX..." }
  ]
}

→ { "reply": "...", "persona": "pro_shop", "business": "St. Andrews Pro Shop", "model": "claude-haiku-4-5-20251001" }
```

## Limits

- 12 messages/IP/min, 80/IP/day (in-memory, resets on cold start)
- 20-turn conversation cap
- 200 output tokens

## Until this is deployed

`vox.html` falls back to a local pattern matcher so the demo still works — but it's templated, not Claude.
Deploy this function to flip it to real AI.
