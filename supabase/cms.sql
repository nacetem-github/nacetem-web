-- Run once in the Supabase SQL editor, then create an admin in Authentication > Users.
create table if not exists public.cms_entries (
  id text primary key,
  type text not null check (type in ('news', 'event', 'gallery', 'seminar', 'publication')),
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists cms_entries_type_idx on public.cms_entries (type);
alter table public.cms_entries enable row level security;
create policy "Public reads published CMS entries" on public.cms_entries for select using (coalesce(data->>'status', 'draft') = 'published' or auth.role() = 'authenticated');
create policy "Admins create CMS entries" on public.cms_entries for insert to authenticated with check (true);
create policy "Admins update CMS entries" on public.cms_entries for update to authenticated using (true) with check (true);
create policy "Admins delete CMS entries" on public.cms_entries for delete to authenticated using (true);
insert into storage.buckets (id, name, public) values ('content-media', 'content-media', true) on conflict (id) do update set public = true;
create policy "Public reads CMS media" on storage.objects for select using (bucket_id = 'content-media');
create policy "Admins upload CMS media" on storage.objects for insert to authenticated with check (bucket_id = 'content-media');
create policy "Admins update CMS media" on storage.objects for update to authenticated using (bucket_id = 'content-media');
create policy "Admins delete CMS media" on storage.objects for delete to authenticated using (bucket_id = 'content-media');
