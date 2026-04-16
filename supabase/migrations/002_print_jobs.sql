-- Print jobs + storage bucket notes for Supabase

create extension if not exists "pgcrypto";

create table if not exists public.print_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  generation_id uuid references public.generations (id) on delete set null,

  stl_path text not null,
  stl_public_url text,

  process text not null,
  material text not null,
  layer_height text not null,
  infill text not null,
  walls text not null,
  supports text not null,
  lead_time text not null,
  quantity int not null default 1,
  notes text,

  volume_mm3 double precision not null,
  triangles int not null,
  size_x_mm double precision not null,
  size_y_mm double precision not null,
  size_z_mm double precision not null,

  price_usd numeric not null,
  status text not null default 'quoted',

  created_at timestamptz not null default now()
);

create index if not exists print_jobs_user_id_idx on public.print_jobs (user_id);
create index if not exists print_jobs_created_at_idx on public.print_jobs (created_at desc);

alter table public.print_jobs enable row level security;

drop policy if exists "print_jobs_select_own" on public.print_jobs;
create policy "print_jobs_select_own"
on public.print_jobs
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "print_jobs_insert_own" on public.print_jobs;
create policy "print_jobs_insert_own"
on public.print_jobs
for insert
to authenticated
with check (user_id = auth.uid());

-- Storage bucket (create in Supabase UI if SQL bucket creation isn't available):
-- Name: print-uploads
-- Public: true (matches app usage via getPublicUrl), or private + signed URLs
