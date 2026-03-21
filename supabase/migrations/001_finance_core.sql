create type transaction_type as enum ('income', 'expense');
create type transaction_source as enum ('manual', 'recurrence_generated');
create type transaction_status as enum ('active', 'deleted');
create type recurrence_frequency as enum ('monthly');
create type recurrence_fallback as enum ('last_day_of_month');

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  kind text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists recurrence_rules (
  id uuid primary key default gen_random_uuid(),
  frequency recurrence_frequency not null default 'monthly',
  day_of_month int not null check (day_of_month >= 1 and day_of_month <= 31),
  fallback_policy recurrence_fallback not null default 'last_day_of_month',
  starts_on date not null,
  ends_on date,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type transaction_type not null,
  category_id uuid not null references categories(id),
  amount_brl numeric(14,2) not null check (amount_brl > 0),
  transaction_date date not null,
  recurrence_rule_id uuid references recurrence_rules(id),
  source transaction_source not null default 'manual',
  status transaction_status not null default 'active',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_transactions_date on transactions (transaction_date desc);
create index if not exists idx_transactions_filters on transactions (type, category_id, transaction_date);
create index if not exists idx_recurrence_active_day on recurrence_rules (is_active, day_of_month);
