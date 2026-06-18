create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'subscribed',
  source text not null default 'website',
  subscribed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

create policy "Allow public newsletter signups"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (
    email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    and status = 'subscribed'
  );

create or replace function public.set_newsletter_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists newsletter_subscribers_updated_at on public.newsletter_subscribers;

create trigger newsletter_subscribers_updated_at
  before update on public.newsletter_subscribers
  for each row
  execute function public.set_newsletter_updated_at();
