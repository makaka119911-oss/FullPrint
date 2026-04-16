-- Initial schema for FullPrint AI.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  username text unique,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  prompt text not null,
  image_url text,
  model_url text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists generations_user_id_idx on public.generations (user_id);
create index if not exists generations_created_at_idx on public.generations (created_at desc);

create table if not exists public.marketplace_models (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  generation_id uuid references public.generations (id) on delete set null,
  title text not null,
  description text,
  price numeric not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists marketplace_models_user_id_idx on public.marketplace_models (user_id);
create index if not exists marketplace_models_is_published_idx on public.marketplace_models (is_published);
create index if not exists marketplace_models_created_at_idx on public.marketplace_models (created_at desc);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references auth.users (id) on delete cascade,
  model_id uuid not null references public.marketplace_models (id) on delete restrict,
  transaction_id text,
  amount numeric not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists purchases_buyer_id_idx on public.purchases (buyer_id);
create index if not exists purchases_model_id_idx on public.purchases (model_id);

-- RLS
alter table public.profiles enable row level security;
alter table public.generations enable row level security;
alter table public.marketplace_models enable row level security;
alter table public.purchases enable row level security;

-- Profiles: only owner can read/write.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- Generations: only owner can read/write.
drop policy if exists "generations_select_own" on public.generations;
create policy "generations_select_own"
on public.generations
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "generations_insert_own" on public.generations;
create policy "generations_insert_own"
on public.generations
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "generations_update_own" on public.generations;
create policy "generations_update_own"
on public.generations
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "generations_delete_own" on public.generations;
create policy "generations_delete_own"
on public.generations
for delete
to authenticated
using (user_id = auth.uid());

-- Marketplace models: anyone can read published; owners can read draft & write own.
drop policy if exists "marketplace_models_select_published_or_own" on public.marketplace_models;
create policy "marketplace_models_select_published_or_own"
on public.marketplace_models
for select
to anon, authenticated
using (is_published = true or user_id = auth.uid());

drop policy if exists "marketplace_models_insert_own" on public.marketplace_models;
create policy "marketplace_models_insert_own"
on public.marketplace_models
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "marketplace_models_update_own" on public.marketplace_models;
create policy "marketplace_models_update_own"
on public.marketplace_models
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "marketplace_models_delete_own" on public.marketplace_models;
create policy "marketplace_models_delete_own"
on public.marketplace_models
for delete
to authenticated
using (user_id = auth.uid());

-- Purchases: buyer can see and create own purchase rows.
drop policy if exists "purchases_select_own" on public.purchases;
create policy "purchases_select_own"
on public.purchases
for select
to authenticated
using (buyer_id = auth.uid());

drop policy if exists "purchases_insert_own" on public.purchases;
create policy "purchases_insert_own"
on public.purchases
for insert
to authenticated
with check (buyer_id = auth.uid());

