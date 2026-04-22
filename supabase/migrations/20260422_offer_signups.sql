create table if not exists public.offer_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  offer_tier text not null,
  name text,
  email text not null,
  notes text,
  source_url text,
  user_agent text
);

alter table public.offer_signups enable row level security;

-- Anon insert with validation
drop policy if exists "anon can insert signups" on public.offer_signups;

create policy "anon can insert valid signups" on public.offer_signups
  for insert to anon
  with check (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    and offer_tier in (
      'marrow','cipher','vellum','tine','cistern','fettle','loom',
      'grift','ash','pith','bridle','slew','quill','hush',
      'enterprise-inquiry','college-inquiry','individual-inquiry'
    )
    and char_length(coalesce(notes, '')) <= 2000
    and char_length(coalesce(name, '')) <= 200
    and char_length(email) <= 320
  );

-- Rate-limit: same email+tier can only submit once per hour (replay protection)
create unique index if not exists offer_signups_email_tier_hour_idx
  on public.offer_signups (email, offer_tier, date_trunc('hour', created_at));
