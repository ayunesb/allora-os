create table strategy_versions (
  id uuid primary key default gen_random_uuid(),
  strategy_id uuid references strategies(id) on delete cascade,
  version int not null,
  changes jsonb,
  created_at timestamptz default now()
);
