export type ContentStatus = 'draft' | 'published';

export interface ManagedFields {
  id: string;
  status: ContentStatus;
  featured: boolean;
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsItem extends ManagedFields {
  title: string;
  slug: string;
  category: string;
  author?: string;
  summary: string;
  content: string[];
  image: string;
  imageAlt: string;
  sourceFileUrl?: string;
}

export interface GalleryItem extends ManagedFields {
  title: string;
  imageUrl: string;
  /** Backwards-compatible display alias. */
  url: string;
  imageAlt: string;
  album: string;
  images?: Array<{
    src: string;
    alt: string;
  }>;
  eventDate?: string;
  location?: string;
}

export interface EventItem extends ManagedFields {
  title: string;
  slug: string;
  startDate: string;
  endDate?: string;
  displayDate: string;
  /** Backwards-compatible display alias. */
  date: string;
  time?: string;
  description: string;
  location: string;
  format?: string;
  flyerUrl?: string;
  fee?: string;
  contactPhones?: string[];
  contactEmail?: string;
  actionUrl?: string;
  actionLabel?: string;
  sourceFileUrl?: string;
}

export interface SeminarItem extends ManagedFields {
  title: string;
  presenter: string;
  seminarDate: string;
  year: number;
  category?: string;
  summary?: string;
  registrationUrl?: string;
  meetingUrl?: string;
  presentationUrl?: string;
  presentationSize?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export type PublicationType = 'policy-brief' | 'technical-report' | 'newsletter' | 'other';

export interface PublicationItem extends ManagedFields {
  title: string;
  type: PublicationType;
  year: number;
  summary: string;
  author?: string;
  fileUrl?: string;
  fileSize?: string;
  coverImageUrl?: string;
}

export type VideoType = 'impact' | 'programme-webinar' | 'both';

export interface VideoItem extends ManagedFields {
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  videoType: VideoType;
  programSlug?: string;
  webinarDate?: string;
  presenter?: string;
  displayOrder: number;
}

export type AnnouncementCategory = 'scholarship' | 'admission' | 'event' | 'general';

export interface AnnouncementItem extends ManagedFields {
  title: string;
  message: string;
  category: AnnouncementCategory;
  actionLabel?: string;
  actionUrl?: string;
  startsAt: string;
  endsAt: string;
  priority: number;
}

export type CmsContentType = 'news' | 'event' | 'gallery' | 'seminar' | 'publication' | 'video' | 'announcement';
