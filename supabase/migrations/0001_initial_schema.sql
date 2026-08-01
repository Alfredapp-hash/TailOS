create extension if not exists "pgcrypto";

create type public.app_role as enum ('owner', 'manager', 'groomer', 'receptionist');
create type public.appointment_status as enum ('requested', 'confirmed', 'checked_in', 'in_service', 'completed', 'cancelled', 'no_show');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  timezone text not null default 'America/Los_Angeles',
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  full_name text not null,
  role public.app_role not null default 'groomer',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text,
  phone text,
  marketing_consent boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

create table public.pets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  name text not null,
  species text not null default 'dog',
  breed text,
  birth_date date,
  weight_lbs numeric(6,2),
  temperament text,
  medical_alerts text,
  grooming_notes text,
  preferred_groomer_id uuid references public.profiles(id),
  normal_visit_interval_days integer,
  last_visit_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  duration_minutes integer not null check (duration_minutes > 0),
  base_price_cents integer not null check (base_price_cents >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  customer_id uuid not null references public.customers(id),
  pet_id uuid not null references public.pets(id),
  service_id uuid not null references public.services(id),
  groomer_id uuid references public.profiles(id),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.appointment_status not null default 'requested',
  quoted_price_cents integer check (quoted_price_cents >= 0),
  final_price_cents integer check (final_price_cents >= 0),
  internal_notes text,
  created_at timestamptz not null default now(),
  constraint valid_appointment_time check (ends_at > starts_at)
);

create table public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  sku text,
  name text not null,
  category text not null,
  quantity_on_hand numeric(10,2) not null default 0,
  reorder_point numeric(10,2) not null default 0,
  unit_cost_cents integer check (unit_cost_cents >= 0),
  retail_price_cents integer check (retail_price_cents >= 0),
  vendor_name text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index customers_org_idx on public.customers(organization_id);
create index pets_customer_idx on public.pets(customer_id);
create index appointments_org_starts_idx on public.appointments(organization_id, starts_at);
create index appointments_pet_idx on public.appointments(pet_id);
create index inventory_org_idx on public.inventory_items(organization_id);

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.pets enable row level security;
alter table public.services enable row level security;
alter table public.appointments enable row level security;
alter table public.inventory_items enable row level security;

create or replace function public.current_organization_id()
returns uuid language sql stable security definer set search_path = public
as $$ select organization_id from public.profiles where id = auth.uid() $$;

create policy "members read their organization" on public.organizations
for select using (id = public.current_organization_id());

create policy "members read profiles" on public.profiles
for select using (organization_id = public.current_organization_id());

create policy "members manage customers" on public.customers
for all using (organization_id = public.current_organization_id())
with check (organization_id = public.current_organization_id());

create policy "members manage pets" on public.pets
for all using (organization_id = public.current_organization_id())
with check (organization_id = public.current_organization_id());

create policy "members manage services" on public.services
for all using (organization_id = public.current_organization_id())
with check (organization_id = public.current_organization_id());

create policy "members manage appointments" on public.appointments
for all using (organization_id = public.current_organization_id())
with check (organization_id = public.current_organization_id());

create policy "members manage inventory" on public.inventory_items
for all using (organization_id = public.current_organization_id())
with check (organization_id = public.current_organization_id());
