# Upload Folder Guide

Public files that should be available on the website belong in `public/uploads`.

Vite serves anything inside `public` from the site root. For example:

`public/uploads/capacity-building/brochures/capacity-building-brochure.pdf`

is available in the browser at:

`/uploads/capacity-building/brochures/capacity-building-brochure.pdf`

## Capacity Building

Upload brochures and application materials here:

`public/uploads/capacity-building/brochures/`

Current brochure URL used by the page:

`/uploads/capacity-building/brochures/capacity-building-brochure.pdf`

## Research Seminar Series

Use one folder per seminar year:

`public/uploads/research/seminar-series/2026/`

Inside each year folder:

- `presentations/` for PDF, PowerPoint, and handout files
- `registration-forms/` for PDF or document registration forms
- `videos/` for small video files only
- `images/` for seminar photos, flyers, and thumbnails

Example URLs:

`/uploads/research/seminar-series/2026/presentations/example-seminar.pdf`

`/uploads/research/seminar-series/2026/registration-forms/example-registration-form.pdf`

`/uploads/research/seminar-series/2026/videos/example-seminar.mp4`

For large videos, use YouTube or another video host and paste the external link into the page data instead of uploading the video file here.

## Publications

Publication uploads are split by type:

- Newsletters: `public/uploads/publications/newsletters/<year>/`
- Policy briefs: `public/uploads/publications/policy-briefs/`
- Technical reports: `public/uploads/publications/technical-reports/`

Current newsletter PDF used by the publications page:

`public/uploads/publications/newsletters/2026/nacetem-newsletter-2026.pdf`

Browser URL:

`/uploads/publications/newsletters/2026/nacetem-newsletter-2026.pdf`

After adding another newsletter edition, add it to the `newsletters` array in `src/pages/Publications.tsx` so it appears as a selectable edition.

## Events

Upload event flyers, forms, and media here:

`public/uploads/events/`

Use:

- `images/`
- `registration-forms/`
- `videos/`

## News

Upload news article images here:

`public/uploads/news/images/`
