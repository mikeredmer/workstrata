-- WorkStrata Profiles Table
-- Run this in Supabase Dashboard > SQL Editor

-- Create profiles table for storing user onboarding data
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,

  -- Role mapping (Step 1)
  job_title text,
  industry text,
  company_size text,
  responsibilities text[],

  -- Task inventory (Step 2)
  tasks_time_consuming text[],
  tasks_repetitive text[],
  tasks_judgment text[],

  -- Skills assessment (Step 3)
  skill_assessment jsonb,
  ai_readiness_score integer,

  -- Personalization (Step 4)
  learning_preference text,
  email_time text,
  focus_area text,

  -- Trial tracking
  trial_started_at timestamptz,
  trial_ends_at timestamptz,
  onboarding_completed_at timestamptz,

  -- Progress tracking
  current_streak integer default 0,
  last_activity_at timestamptz,
  completed_experiments text[],

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can read own profile" on public.profiles
  for select using (auth.uid() = id);

-- Users can insert their own profile
create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Create a trigger to auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists and recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();
