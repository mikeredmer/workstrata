-- WorkStrata Signups Table
-- Run this in Supabase Dashboard > SQL Editor

create table if not exists public.signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text,
  salary numeric,
  workflows text,
  tools text,
  potential_savings numeric,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.signups enable row level security;

-- Allow anonymous inserts (needed for signup from capture flow)
create policy "Allow anonymous inserts" on public.signups
  for insert with check (true);

-- Allow anonymous updates on conflict (for upsert)
create policy "Allow anonymous updates" on public.signups
  for update using (true);

-- Allow service role full access
create policy "Service role has full access" on public.signups
  for all using (auth.role() = 'service_role');
