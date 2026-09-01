import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, Camera, ChevronLeft, ChevronRight, Clock, FileText, Images, Mail, MapPin, MonitorPlay, Phone, Video, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../assets';
import { useData } from '../contexts/DataContext';
import { archivedPastEvents } from '../data/pastEvents';
import { getArchivedEventReportByTitle } from '../data/eventReports';
import { eventFallbackImages, formatEventTime, getEventSlug, splitEventsByStatus } from '../utils/eventUtils';
import { EventCountdownBadge } from '../components/EventCountdownBadge';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const galleryEvents = [
  {
    id: 'sti-policy-dialogue-2026',
    title: 'STI Policy Dialogue',
    meta: 'Abuja | 2026',
    folder: 'public/uploads/events/gallery/sti-policy-dialogue-2026/',
    images: [
      { src: assets.policyImage, alt: 'STI policy dialogue session' },
      { src: assets.headquartersImage, alt: 'Participants at STI policy dialogue' },
      { src: assets.dashboardImage, alt: 'STI Dashboard and Databank presentation' },
    ],
  },
  {
    id: 'digital-skills-workshop-2026',
    title: 'Digital Skills Workshop',
    meta: 'Lagos | 2026',
    folder: 'public/uploads/events/gallery/digital-skills-workshop-2026/',
    images: [
      { src: assets.digitalAcademyImage, alt: 'Digital skills workshop classroom' },
      { src: assets.aiEcosystemImage, alt: 'Digital innovation discussion' },
      { src: assets.capacityImage, alt: 'Capacity development training session' },
    ],
  },
  {
    id: 'innovation-management-conference-2026',
    title: 'Innovation Management Conference',
    meta: 'Ile-Ife | 2026',
    folder: 'public/uploads/events/gallery/innovation-management-conference-2026/',
    images: [
      { src: assets.seminarImage, alt: 'Innovation management conference audience' },
      { src: assets.weldingImage, alt: 'Technology demonstration at conference' },
      { src: assets.bayelsaNewsImage, alt: 'NACETEM stakeholder engagement' },
    ],
  },
];
type GalleryAlbum = (typeof galleryEvents)[number];

const responsiveGalleryImage = (src: string) => {
  const isLocalGalleryImage = src.startsWith('/uploads/events/gallery/') && /\.(?:jpe?g|png)$/i.test(src);
  if (!isLocalGalleryImage) return { src };

  const webpSrc = src.replace(/\.(?:jpe?g|png)$/i, '.webp');
  const base = webpSrc.slice(0, -'.webp'.length);

  return {
    src: webpSrc,
    srcSet: [480, 960, 1440].map((width) => `${base}-${width}w.webp ${width}w`).join(', '),
    sizes: '(min-width: 1280px) 680px, (min-width: 1024px) 60vw, 100vw',
  };
};

export default function News() {
  const { events, news, gallery } = useData();
  const newsArticles = news.filter((article) => article.status === 'published');
  const [visibleArticles, setVisibleArticles] = useState(3);
  const [featuredArticleIndex, setFeaturedArticleIndex] = useState(0);
  const [activeGalleryId, setActiveGalleryId] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);

  const currentArticles = newsArticles.slice(0, visibleArticles);
  const featuredArticles = newsArticles.filter((article) => article.featured);
  const carouselArticles = featuredArticles.length ? featuredArticles : newsArticles;
  const featuredCardCount = Math.min(3, carouselArticles.length);
  const displayedFeaturedArticles = Array.from(
    { length: featuredCardCount },
    (_, index) => carouselArticles[(featuredArticleIndex + index) % carouselArticles.length]
  );
  const loadedAdditionalArticles = currentArticles.slice(3);
  const hasMoreArticles = visibleArticles < newsArticles.length;
  const { upcomingEvents, pastEvents } = splitEventsByStatus(events.filter((event) => event.status === 'published'));
  const managedGalleryEvents = Object.values(gallery.filter((item) => item.status === 'published').reduce<Record<string, GalleryAlbum>>((albums, item) => {
    const title = item.album || item.title;
    const id = item.id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const meta = [item.location, item.eventDate].filter(Boolean).join(' | ');
    const eventImages = item.images?.length ? item.images : [{ src: item.imageUrl, alt: item.imageAlt }];

    if (item.images?.length) {
      albums[id] = { id, title, meta, folder: '', images: eventImages };
      return albums;
    }

    const legacyId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!albums[legacyId]) albums[legacyId] = { id: legacyId, title, meta, folder: '', images: [] };
    albums[legacyId].images.push(...eventImages);
    return albums;
  }, {})) as GalleryAlbum[];
  const availableGalleries = managedGalleryEvents.length ? managedGalleryEvents : galleryEvents;
  const activeGallery = availableGalleries.find((event) => event.id === activeGalleryId) ?? availableGalleries[0];
  const activeImage = activeGallery.images[activeImageIndex] ?? activeGallery.images[0];
  const nextImage = activeGallery.images[(activeImageIndex + 1) % activeGallery.images.length];
  const previousImage = activeGallery.images[(activeImageIndex - 1 + activeGallery.images.length) % activeGallery.images.length];

  useEffect(() => {
    [activeImage, nextImage, previousImage].forEach((image) => {
      if (!image?.src) return;
      const preload = new Image();
      preload.decoding = 'async';
      preload.src = responsiveGalleryImage(image.src).src;
    });
  }, [activeImage, nextImage, previousImage]);

  const handleLoadMore = () => {
    setVisibleArticles((current) => Math.min(current + 3, newsArticles.length));
  };

  const selectGallery = (eventId: string) => {
    setActiveGalleryId(eventId);
    setActiveImageIndex(0);
    setLightboxImageIndex(null);
  };

  const showPreviousImage = () => {
    setActiveImageIndex((current) => (current === 0 ? activeGallery.images.length - 1 : current - 1));
  };

  const showNextImage = () => {
    setActiveImageIndex((current) => (current === activeGallery.images.length - 1 ? 0 : current + 1));
  };

  const scrollStories = (direction: 'previous' | 'next') => {
    const articleCount = carouselArticles.length;
    if (articleCount <= 1) return;

    setFeaturedArticleIndex((current) => {
      if (direction === 'next') return (current + 1) % articleCount;
      return (current - 1 + articleCount) % articleCount;
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <img
            src={newsArticles[0].image}
            alt={newsArticles[0].imageAlt}
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl mx-auto">
            <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              News, Events & Gallery
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
              News & Gallery
            </h1>
            <p className="text-lg text-slate-100/90 mb-10 leading-relaxed mx-auto max-w-2xl text-center">
              Stay informed with NACETEM activities, strategic engagements, research breakthroughs, training programmes, innovation initiatives, and institutional developments.
              <br /><br />
              Explore upcoming programmes, featured newsroom stories, and event galleries that capture the Centre's work across partnerships, digital transformation, policy research, and capacity development.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="upcoming-events" className="scroll-mt-[132px] py-24 bg-white border-b border-slate-200 sm:scroll-mt-[148px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Programmes & Conferences</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">Upcoming Events</h3>
            <p className="mt-4 text-slate-600">Join our workshops, stakeholder engagements, and conferences.</p>
          </div>

          <div className="mb-10 flex justify-center">
            <a
              href="#past-events"
              className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-emerald-700 px-5 py-3 text-xs font-bold uppercase tracking-widest text-emerald-800 transition-colors hover:bg-emerald-50"
            >
              See Past Events <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, idx) => (
                <motion.article
                  key={event.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="bg-slate-50 border border-slate-200 rounded-[11px] overflow-hidden hover:border-emerald-500 transition-colors group relative flex flex-col"
                >
                  <div className="image-frame aspect-[4/3] bg-slate-100 relative">
                    {event.flyerUrl ? (
                      <img
                        src={event.flyerUrl}
                        alt={`${event.title} flyer`}
                        className="h-full w-full object-contain object-center"
                      />
                    ) : (
                      <>
                        <img
                          src={eventFallbackImages[idx % eventFallbackImages.length]}
                          alt=""
                          className="h-full w-full object-cover opacity-20"
                          aria-hidden="true"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-950/70 px-8 text-center text-white">
                          <Calendar className="mb-4 h-10 w-10 text-gold" />
                          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">NACETEM Event</p>
                          <p className="mt-3 text-xl font-serif leading-tight">Flyer Coming Soon</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-8 flex flex-1 flex-col">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600 transform scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-in-out"></div>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="inline-flex items-center gap-2 bg-white px-3 py-2 border border-slate-100 rounded-[6px] text-xs font-bold uppercase tracking-widest text-emerald-900">
                        <Calendar className="h-4 w-4 text-emerald-600 shrink-0" />
                        {event.date}
                      </span>
                      {event.time && (
                        <span className="inline-flex items-center gap-2 bg-white px-3 py-2 border border-slate-100 rounded-[6px] text-xs font-bold uppercase tracking-widest text-slate-600">
                          <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                          {formatEventTime(event.time)}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-2 bg-white px-3 py-2 border border-slate-100 rounded-[6px] text-xs font-bold uppercase tracking-widest text-slate-600">
                        <Video className="h-4 w-4 text-slate-400 shrink-0" />
                        {event.format ?? 'Hybrid'}
                      </span>
                      <EventCountdownBadge startDate={event.startDate} startTime={event.time} />
                    </div>
                    <h4 className="text-xl font-serif text-slate-900 mb-4 pr-4 leading-tight">{event.title}</h4>
                    <div className="flex items-start text-sm font-bold text-slate-500 mb-4">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-slate-400 shrink-0" />
                      {event.location}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">{event.description}</p>
                    <div className="mb-6 space-y-2 text-sm text-slate-600">
                      {event.fee && <p className="font-bold text-slate-800">Fee: {event.fee}</p>}
                      {event.contactPhones && (
                        <p className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-emerald-700" />
                          {event.contactPhones.join(', ')}
                        </p>
                      )}
                      {event.contactEmail && (
                        <p className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-emerald-700" />
                          {event.contactEmail}
                        </p>
                      )}
                    </div>
                    <div className="mt-auto grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
                      <Link to={`/events/${getEventSlug(event)}`} className="inline-flex min-h-11 w-full items-center justify-center rounded-[6px] border border-emerald-700 px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-emerald-800 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 sm:w-auto">
                        View Details <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                      {event.actionUrl && (
                        <a
                          href={event.actionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-11 w-full items-center justify-center rounded-[6px] bg-emerald-700 px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 sm:w-auto"
                        >
                          <Video className="mr-2 h-4 w-4" /> {event.actionLabel ?? 'Register / Join'}
                        </a>
                      )}
                      {event.onlineViewingUrl && (
                        <a href={event.onlineViewingUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 w-full items-center justify-center rounded-[6px] border border-sky-700 bg-white px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-sky-900 transition-colors hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-700 focus-visible:ring-offset-2 sm:w-auto" aria-label={`Watch ${event.title} online as a view-only attendee`}>
                          <MonitorPlay aria-hidden="true" className="mr-2 h-4 w-4" /> Watch Online
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-[11px]">
              <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h4 className="text-lg font-serif text-slate-900 mb-2">No Upcoming Events</h4>
              <p className="text-sm text-slate-500">Check back later or view our past programmes.</p>
            </div>
          )}
        </div>
      </section>

      <section id="past-events" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Past Events</h2>
              <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">Previous Programmes</h3>
              <p className="mt-4 text-slate-600">
                Events automatically remain above for one week after their date, then appear here as past programmes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {pastEvents.map((event, idx) => (
              <motion.article
                key={event.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white border border-slate-200 rounded-[11px] overflow-hidden group hover:border-emerald-500 transition-colors flex flex-col"
              >
                <div className="image-frame aspect-[4/3] bg-slate-100">
                  <img
                    src={event.flyerUrl ?? eventFallbackImages[idx % eventFallbackImages.length]}
                    alt={event.title}
                    className={`h-full w-full object-center opacity-90 ${event.flyerUrl ? 'object-contain' : 'object-cover transition-transform duration-700 group-hover:scale-105'}`}
                  />
                </div>
                <div className="p-6 flex flex-1 flex-col">
                  <span className="mb-4 inline-flex self-start rounded-sm bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Past Event
                  </span>
                  <h4 className="text-lg font-serif text-slate-900 leading-tight mb-4 group-hover:text-emerald-700 transition-colors">{event.title}</h4>
                  <div className="mt-auto space-y-3 border-t border-slate-100 pt-4 text-sm font-bold text-slate-600">
                    <p className="flex items-center"><Calendar className="mr-2 h-4 w-4 text-gold" /> {event.date}</p>
                    <p className="flex items-start"><MapPin className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-emerald-700" /> {event.location}</p>
                  </div>
                  <Link to={`/events/reports/${getEventSlug(event)}`} className="mt-5 inline-flex items-center justify-center rounded-[6px] bg-emerald-700 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-800">
                    <FileText className="mr-2 h-4 w-4" /> View Report
                  </Link>
                </div>
              </motion.article>
            ))}

            {archivedPastEvents.map((event) => {
              const report = getArchivedEventReportByTitle(event.title);

              return <motion.article
                key={event.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white border border-slate-200 rounded-[11px] overflow-hidden group hover:border-emerald-500 transition-colors flex flex-col"
              >
                <div className="image-frame aspect-[4/3] bg-slate-900">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-1 flex-col">
                  <span className="mb-4 inline-flex self-start rounded-sm bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Past Event
                  </span>
                  <h4 className="text-lg font-serif text-slate-900 leading-tight mb-4 group-hover:text-emerald-700 transition-colors">{event.title}</h4>
                  <div className="mt-auto space-y-3 border-t border-slate-100 pt-4 text-sm font-bold text-slate-600">
                    <p className="flex items-center"><Calendar className="mr-2 h-4 w-4 text-gold" /> {event.date}</p>
                    <p className="flex items-start"><MapPin className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-emerald-700" /> {event.location}</p>
                  </div>
                  {report && (
                    <Link to={`/events/reports/${report.slug}`} className="mt-5 inline-flex items-center justify-center rounded-[6px] bg-emerald-700 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-800">
                      <FileText className="mr-2 h-4 w-4" /> View Report
                    </Link>
                  )}
                </div>
              </motion.article>;
            })}
          </div>
        </div>
      </section>

      <section id="featured-stories" className="py-24 bg-slate-50 relative border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Newsroom</h2>
              <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">Featured Stories</h3>
            </div>
            <div className="mt-6 flex items-center gap-3 md:mt-0">
              <button
                type="button"
                onClick={() => scrollStories('previous')}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700"
                aria-label="Previous featured stories"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollStories('next')}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700"
                aria-label="Next featured stories"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {displayedFeaturedArticles.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group border border-slate-200 rounded-[11px] overflow-hidden bg-white hover:border-emerald-500 transition-colors flex h-full flex-col"
                >
                  <Link to={`/news/${article.slug}`} className="flex flex-col h-full">
                    <div className="image-frame h-48 sm:h-56 relative shrink-0">
                      <img src={article.image} alt={article.imageAlt} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                      <div className="absolute top-0 left-3 max-w-[85%] truncate rounded-sm bg-gold text-slate-900 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">{article.category}</div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-xs text-slate-500 mb-3 font-bold tracking-widest uppercase">{article.date}</div>
                      {article.author && (
                        <div className="mb-3 text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                          By {article.author}
                        </div>
                      )}
                      <h4 className="text-xl font-serif text-slate-900 mb-3 leading-snug group-hover:text-emerald-700 transition-colors">{article.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">{article.summary}</p>
                      <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-emerald-700 mt-auto">
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {loadedAdditionalArticles.length > 0 && (
            <div className="mt-12 border-t border-slate-200 pt-10">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h4 className="text-xl font-serif text-slate-900">More News Entries</h4>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {loadedAdditionalArticles.length} Loaded
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {loadedAdditionalArticles.map((article) => (
                  <Link
                    key={`loaded-${article.id}`}
                    to={`/news/${article.slug}`}
                    className="group rounded-[10px] border border-slate-200 bg-white p-5 transition-colors hover:border-emerald-500"
                  >
                    <div className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">{article.date}</div>
                    <h5 className="text-lg font-serif leading-snug text-slate-900 transition-colors group-hover:text-emerald-700">{article.title}</h5>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">{article.summary}</p>
                    <span className="mt-5 inline-flex items-center text-xs font-bold uppercase tracking-widest text-emerald-700">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {hasMoreArticles && (
            <div className="mt-16 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest rounded-[6px] hover:bg-emerald-800 transition-colors shadow-sm"
              >
                Load More News <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="event-gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Event Gallery</h2>
              <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">Photos From NACETEM Programmes</h3>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Browse moments from NACETEM policy dialogues, training sessions, conferences, and stakeholder engagements.
              </p>
            </div>
            <div className="inline-flex items-center rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              <Images className="mr-2 h-4 w-4 text-emerald-700" />
              {activeGallery.images.length} Images
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
            <div className="space-y-3">
              {availableGalleries.map((event) => {
                const isActive = event.id === activeGallery.id;

                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => selectGallery(event.id)}
                    className={`group w-full rounded-[10px] border p-4 text-left transition-all ${
                      isActive
                        ? 'border-emerald-600 bg-emerald-50 shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-white'
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span>
                        <span className={`block text-sm font-bold leading-snug ${isActive ? 'text-emerald-950' : 'text-slate-900'}`}>{event.title}</span>
                        <span className="mt-2 block text-xs font-bold uppercase tracking-widest text-slate-500">{event.meta}</span>
                      </span>
                      <Camera className={`h-5 w-5 shrink-0 ${isActive ? 'text-emerald-700' : 'text-slate-400 group-hover:text-emerald-600'}`} />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="image-frame rounded-[11px] border border-slate-200 bg-slate-50 shadow-sm">
              <div className="grid grid-cols-1 xl:h-[680px] xl:grid-cols-[1.55fr_0.45fr]">
                <div className="image-frame relative min-h-[540px] bg-slate-950 xl:h-full xl:min-h-0">
                  <button
                    type="button"
                    onClick={() => setLightboxImageIndex(activeImageIndex)}
                    className="absolute inset-0 block w-full text-left"
                    aria-label={`Open ${activeImage.alt}`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${activeGallery.id}-${activeImageIndex}`}
                        {...responsiveGalleryImage(activeImage.src)}
                        alt={activeImage.alt}
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0 h-full w-full object-contain"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent p-5 sm:p-6 text-white">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2">{activeGallery.meta}</p>
                      <h4 className="text-2xl sm:text-3xl font-serif">{activeGallery.title}</h4>
                    </div>
                  </button>
                  <div className="absolute right-4 top-4 flex gap-2">
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-slate-950/40 text-white backdrop-blur transition-colors hover:bg-white hover:text-slate-900"
                      aria-label="Previous gallery image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-slate-950/40 text-white backdrop-blur transition-colors hover:bg-white hover:text-slate-900"
                      aria-label="Next gallery image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex min-h-0 flex-col p-5 sm:p-6">
                  <div className="mb-5 rounded-[8px] border border-slate-200 bg-white p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Selected Event</p>
                    <p className="text-sm font-bold text-slate-900">{activeGallery.title}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-emerald-700">{activeGallery.meta}</p>
                  </div>
                  <div className="grid max-h-[360px] grid-cols-3 gap-3 overflow-y-auto pr-1 xl:max-h-none xl:min-h-0 xl:flex-1 xl:grid-cols-1">
                    {activeGallery.images.map((image, index) => {
                      const isSelected = activeImageIndex === index;

                      return (
                        <button
                          key={`${image.src}-${index}`}
                          type="button"
                          onClick={() => setActiveImageIndex(index)}
                          onDoubleClick={() => setLightboxImageIndex(index)}
                          className={`image-frame group relative rounded-[8px] border transition-all aspect-[4/3] ${
                            isSelected ? 'border-emerald-600 ring-2 ring-emerald-600/20' : 'border-slate-200 hover:border-emerald-300'
                          }`}
                        >
                          <img
                            {...responsiveGalleryImage(image.src)}
                            alt={image.alt}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute bottom-2 left-2 rounded-sm bg-slate-950/70 px-2 py-1 text-[10px] font-bold text-white">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-emerald-900 border-t-8 border-gold relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-white mb-6">Subscribe to NACETEM Newsletter</h2>
          <p className="text-emerald-100 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Stay updated with our latest research, training opportunities, innovation programmes, policy publications, upcoming events, and national STI developments.
          </p>

          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 mb-8" onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-4 rounded-[6px] bg-white text-slate-900 outline-none focus:ring-2 focus:ring-gold"
              required
            />
            <button type="submit" className="px-8 py-4 bg-gold text-slate-900 font-bold uppercase tracking-widest text-sm rounded-[6px] hover:bg-white transition-colors whitespace-nowrap">
              Subscribe Now
            </button>
          </form>
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Join our growing community of professionals and innovators.</p>
        </div>
      </section>

      {lightboxImageIndex !== null && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/90 px-4 py-6">
          <button
            type="button"
            onClick={() => setLightboxImageIndex(null)}
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white hover:text-slate-900"
            aria-label="Close gallery image"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            {...responsiveGalleryImage(activeGallery.images[lightboxImageIndex].src)}
            alt={activeGallery.images[lightboxImageIndex].alt}
            loading="lazy"
            decoding="async"
            className="fullscreen-image h-auto w-auto rounded-[10px] object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
