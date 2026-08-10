import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { supabase } from '../lib/supabase';
import { assets } from '../assets';
import { newsArticles as seededNews } from '../data/news';
import { defaultPublications } from '../data/publications';
import type { AnnouncementItem, CmsContentType, EventItem, GalleryItem, NewsItem, PublicationItem, SeminarItem, VideoItem } from '../types/content';

export type { AnnouncementItem, EventItem, GalleryItem, NewsItem, PublicationItem, SeminarItem, VideoItem } from '../types/content';
type CmsItem = NewsItem | EventItem | GalleryItem | SeminarItem | PublicationItem | VideoItem | AnnouncementItem;
type Setter = Dispatch<SetStateAction<any[]>>;

const now = new Date().toISOString();
const defaultNews: NewsItem[] = seededNews.map((article, index) => ({ ...article, status: 'published', featured: index < 6, publishedAt: article.date }));
const defaultGallery: GalleryItem[] = [
  { id: 'gallery-engagement', title: 'Institutional Engagement', imageUrl: assets.bayelsaNewsImage, imageAlt: 'NACETEM institutional engagement', album: 'Institutional Engagements' },
  { id: 'gallery-capacity', title: 'Capacity Development Session', imageUrl: assets.capacityImage, imageAlt: 'NACETEM capacity development session', album: 'Capacity Development' },
  { id: 'gallery-policy', title: 'STI Policy Programme', imageUrl: assets.policyImage, imageAlt: 'NACETEM STI policy programme', album: 'Policy Programmes' },
  { id: 'gallery-seminar', title: 'Research Seminar Series', imageUrl: assets.seminarImage, imageAlt: 'NACETEM research seminar', album: 'Seminar Series' },
  { id: 'gallery-dashboard', title: 'STI Dashboard & Databank', imageUrl: assets.dashboardImage, imageAlt: 'NACETEM STI Dashboard and Databank', album: 'Digital Platforms' },
  { id: 'gallery-media', title: 'Media Engagement', imageUrl: assets.ntaImage, imageAlt: 'NACETEM media engagement', album: 'Media Engagements' },
].map((item, index) => ({ ...item, url: item.imageUrl, status: 'published' as const, featured: index < 6, publishedAt: now }));
const defaultEvents: EventItem[] = [{
  id: 'entrepreneurship-innovation-driving-organisation-change', title: 'Training Workshop on Entrepreneurship & Innovation: Driving Organisation Change from Within', slug: 'entrepreneurship-innovation-driving-organisation-change',
  startDate: '2026-06-22', endDate: '2026-06-26', displayDate: 'June 22 - 26, 2026', date: 'June 22 - 26, 2026', time: '9:00am - 3:00pm',
  description: 'A NACETEM training workshop for managers, team leaders, strategy and business development professionals, change management and HR professionals, aspiring entrepreneurs, and innovation champions across functions.',
  location: 'NACETEM South-West Office, 9 Kofo Abayomi Street, V.I. Lagos', format: 'Hybrid', flyerUrl: '/uploads/events/flyers/2026/entrepreneurship-innovation-driving-organisation-change/flyer.jpeg', fee: 'N300,000',
  contactPhones: ['07033091950', '08033640647'], contactEmail: 'nacetemsouthwest@gmail.com', status: 'published', featured: true, publishedAt: now,
}];
const defaultAnnouncements: AnnouncementItem[] = [{
  id: 'professional-mtech-digital-marketing-scholarship-2026',
  title: 'Promotional Scholarship Offer – Professional Master in Digital Marketing and Strategy',
  message: 'Apply by 20 August 2026. Classes commence on 29 August 2026.',
  category: 'scholarship',
  actionLabel: 'View programme',
  actionUrl: '/capacity-building/professional-mtech-digital-marketing-strategy',
  startsAt: '2026-08-10T00:00:00+01:00',
  endsAt: '2026-08-20T23:59:59+01:00',
  priority: 100,
  status: 'published',
  featured: true,
  publishedAt: '2026-08-10',
}];
const defaultVideos: VideoItem[] = [{
  id: 'mtech-dms-webinar-2026',
  title: 'M.Tech - DMS Webinar',
  description: 'Webinar recording for the Professional Master in Digital Marketing and Strategy programme.',
  videoUrl: 'https://youtu.be/euaC_LDfxFw',
  videoType: 'programme-webinar',
  programSlug: 'professional-mtech-digital-marketing-strategy',
  displayOrder: 0,
  status: 'published',
  featured: true,
  publishedAt: '2026-08-10',
}];
const defaults = { news: defaultNews, event: defaultEvents, gallery: defaultGallery, seminar: [] as SeminarItem[], publication: defaultPublications, video: defaultVideos, announcement: defaultAnnouncements };
const key = (type: CmsContentType) => `nacetem-cms-${type}`;

function localItems<T>(type: CmsContentType, fallback: T[]): T[] {
  try { const value = localStorage.getItem(key(type)); return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}
function withDefaultPublications(items: PublicationItem[]) {
  const ids = new Set(items.map((item) => item.id));
  return [...items, ...defaultPublications.filter((item) => !ids.has(item.id))];
}
function withDefaultVideos(items: VideoItem[]) {
  const ids = new Set(items.map((item) => item.id));
  return [...items, ...defaultVideos.filter((item) => !ids.has(item.id))];
}
function sortItems<T extends { featured: boolean; publishedAt: string }>(items: T[]) {
  return [...items].sort((a, b) => Number(b.featured) - Number(a.featured) || String(b.publishedAt).localeCompare(String(a.publishedAt)));
}

interface DataContextType {
  news: NewsItem[]; events: EventItem[]; gallery: GalleryItem[]; seminars: SeminarItem[]; publications: PublicationItem[]; videos: VideoItem[]; announcements: AnnouncementItem[]; isLoading: boolean;
  saveNews(item: NewsItem): Promise<void>; removeNews(id: string): Promise<void>;
  saveEvent(item: EventItem): Promise<void>; addEvent(item: EventItem): Promise<void>; updateEvent(item: EventItem): Promise<void>; removeEvent(id: string): Promise<void>;
  saveGalleryItem(item: GalleryItem): Promise<void>; addGalleryImage(item: GalleryItem): Promise<void>; removeGalleryImage(id: string): Promise<void>;
  saveSeminar(item: SeminarItem): Promise<void>; removeSeminar(id: string): Promise<void>;
  savePublication(item: PublicationItem): Promise<void>; removePublication(id: string): Promise<void>;
  saveVideo(item: VideoItem): Promise<void>; removeVideo(id: string): Promise<void>;
  saveAnnouncement(item: AnnouncementItem): Promise<void>; removeAnnouncement(id: string): Promise<void>;
}
const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState(defaultNews); const [events, setEvents] = useState(defaultEvents); const [gallery, setGallery] = useState(defaultGallery);
  const [seminars, setSeminars] = useState<SeminarItem[]>([]); const [publications, setPublications] = useState<PublicationItem[]>(defaultPublications); const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<VideoItem[]>(defaultVideos); const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(defaultAnnouncements);
  const setters: Record<CmsContentType, Setter> = { news: setNews, event: setEvents, gallery: setGallery, seminar: setSeminars, publication: setPublications, video: setVideos, announcement: setAnnouncements };

  useEffect(() => { (async () => {
    try {
      if (supabase) {
        const { data, error } = await supabase.from('cms_entries').select('id,type,data,created_at,updated_at');
        if (!error && data) {
          (Object.keys(setters) as CmsContentType[]).forEach((type) => {
            const items = data.filter((row) => row.type === type).map((row) => ({ ...row.data, id: row.id, createdAt: row.created_at, updatedAt: row.updated_at }));
            setters[type](type === 'publication' ? withDefaultPublications(items as PublicationItem[]) : type === 'video' ? withDefaultVideos(items as VideoItem[]) : items.length ? items : defaults[type]);
          });
          return;
        }
      }
      (Object.keys(setters) as CmsContentType[]).forEach((type) => {
        const items = localItems<any>(type, defaults[type] as any[]);
        setters[type](type === 'publication' ? withDefaultPublications(items) : type === 'video' ? withDefaultVideos(items) : items);
      });
    } finally { setIsLoading(false); }
  })(); }, []);

  async function save<T extends CmsItem>(type: CmsContentType, item: T) {
    const normalized = { ...item, updatedAt: new Date().toISOString() };
    setters[type]((current) => sortItems([normalized, ...current.filter((entry) => entry.id !== item.id)]));
    if (supabase) {
      const { id, createdAt: _created, updatedAt: _updated, ...data } = normalized as any;
      const { error } = await supabase.from('cms_entries').upsert({ id, type, data, updated_at: new Date().toISOString() });
      if (error) throw error;
    } else {
      const current = localItems<any>(type, defaults[type]).filter((entry) => entry.id !== item.id);
      localStorage.setItem(key(type), JSON.stringify(sortItems([normalized, ...current])));
    }
  }
  async function remove(type: CmsContentType, id: string) {
    setters[type]((current) => current.filter((item) => item.id !== id));
    if (supabase) { const { error } = await supabase.from('cms_entries').delete().eq('id', id).eq('type', type); if (error) throw error; }
    else localStorage.setItem(key(type), JSON.stringify(localItems<any>(type, defaults[type]).filter((item) => item.id !== id)));
  }

  return <DataContext.Provider value={{ news: sortItems(news), events: sortItems(events), gallery: sortItems(gallery), seminars: sortItems(seminars), publications: sortItems(publications), videos: sortItems(videos), announcements: sortItems(announcements), isLoading,
    saveNews: (x) => save('news', x), removeNews: (id) => remove('news', id), saveEvent: (x) => save('event', x), addEvent: (x) => save('event', x), updateEvent: (x) => save('event', x), removeEvent: (id) => remove('event', id),
    saveGalleryItem: (x) => save('gallery', x), addGalleryImage: (x) => save('gallery', x), removeGalleryImage: (id) => remove('gallery', id), saveSeminar: (x) => save('seminar', x), removeSeminar: (id) => remove('seminar', id), savePublication: (x) => save('publication', x), removePublication: (id) => remove('publication', id), saveVideo: (x) => save('video', x), removeVideo: (id) => remove('video', id), saveAnnouncement: (x) => save('announcement', x), removeAnnouncement: (id) => remove('announcement', id),
  }}>{children}</DataContext.Provider>;
}
export function useData() { const value = useContext(DataContext); if (!value) throw new Error('useData must be used within a DataProvider'); return value; }
