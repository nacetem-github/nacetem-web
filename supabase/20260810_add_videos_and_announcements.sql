-- Forward-only CMS expansion for managed videos and scheduled announcements.
alter table public.cms_entries drop constraint if exists cms_entries_type_check;
alter table public.cms_entries
  add constraint cms_entries_type_check
  check (type in ('news', 'event', 'gallery', 'seminar', 'publication', 'video', 'announcement'));

create index if not exists cms_entries_published_type_idx
  on public.cms_entries (type)
  where coalesce(data->>'status', 'draft') = 'published';
