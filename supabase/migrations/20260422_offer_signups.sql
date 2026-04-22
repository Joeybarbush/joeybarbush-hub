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

create policy "anon can insert" on public.offer_signups
  for insert to anon
  with check (true);
