-- Seed the corrected invitation and refresh only its access links if the record already exists.
insert into public.cms_entries (id, type, data, updated_at)
values (
  'world-climate-simulation-your-turn-to-negotiate-2026',
  'event',
  jsonb_build_object(
    'title', 'World Climate Simulation — Your Turn to Negotiate',
    'slug', 'world-climate-simulation-your-turn-to-negotiate-2026',
    'startDate', '2026-09-02',
    'displayDate', 'September 2, 2026',
    'date', 'September 2, 2026',
    'time', '09:00',
    'description', 'Take part in an interactive roleplaying exercise developed by Climate Interactive and MIT Sloan using the En-ROADS climate simulator. Participants will represent world leaders, government officials, industry leaders, and advocates as they negotiate a climate deal and experience what it takes to address one of the defining challenges of our time.',
    'location', 'NACETEM Headquarters, Obafemi Awolowo University, Ile-Ife',
    'host', 'Dr. Olushola Odusanya, NACETEM DG/CEO',
    'facilitator', 'Prof. Stefano Armenia',
    'format', 'In person + online viewing',
    'partners', jsonb_build_array('Climate Interactive', 'MIT Management Sustainability Initiative', 'System Dynamics Society Nigeria', 'System Dynamics Italian Chapter', 'IUL'),
    'flyerUrl', '/uploads/events/flyers/2026/world-climate-simulation/world-climate-simulation-flyer.jpg',
    'sourceFileUrl', '/uploads/events/flyers/2026/world-climate-simulation/world-climate-simulation-source.docx',
    'actionUrl', 'https://forms.gle/mVQwRSBJohwQtdCT6',
    'actionLabel', 'Register for the Simulation',
    'onlineViewingUrl', 'https://us06web.zoom.us/j/83116776165?pwd=oZotVmmx5xGufq5ghWZrNuQpqUGPEb.1',
    'onlineMeetingId', '831 1677 6165',
    'onlinePasscode', '327757',
    'status', 'published',
    'featured', true,
    'publishedAt', '2026-09-01'
  ),
  now()
)
on conflict (id) do update
set data = public.cms_entries.data || jsonb_build_object(
  'actionUrl', 'https://forms.gle/mVQwRSBJohwQtdCT6',
  'actionLabel', 'Register for the Simulation',
  'onlineViewingUrl', 'https://us06web.zoom.us/j/83116776165?pwd=oZotVmmx5xGufq5ghWZrNuQpqUGPEb.1',
  'onlineMeetingId', '831 1677 6165',
  'onlinePasscode', '327757',
  'format', 'In person + online viewing'
),
updated_at = now();
