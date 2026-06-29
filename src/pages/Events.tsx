import { useEffect, useState } from 'react';
import { Calendar, Clock, Mail, MapPin, Phone, Video, ArrowRight, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { assets } from '../assets';
import { useData } from '../contexts/DataContext';
import { archivedPastEvents } from '../data/pastEvents';
import { getArchivedEventReportByTitle } from '../data/eventReports';
import { eventFallbackImages, getEventSlug, splitEventsByStatus } from '../utils/eventUtils';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Events() {
  const { events: allEvents } = useData();
  const events = allEvents.filter((event) => event.status === 'published');
  const { upcomingEvents, pastEvents } = splitEventsByStatus(events);
  const [activeUpcomingIndex, setActiveUpcomingIndex] = useState(0);
  const activeUpcomingEvent = upcomingEvents.length ? upcomingEvents[activeUpcomingIndex % upcomingEvents.length] : null;

  useEffect(() => {
    if (upcomingEvents.length && activeUpcomingIndex >= upcomingEvents.length) setActiveUpcomingIndex(0);
  }, [activeUpcomingIndex, upcomingEvents.length]);

  const showPreviousUpcoming = () => {
    if (!upcomingEvents.length) return;
    setActiveUpcomingIndex((current) => (current - 1 + upcomingEvents.length) % upcomingEvents.length);
  };

  const showNextUpcoming = () => {
    if (!upcomingEvents.length) return;
    setActiveUpcomingIndex((current) => (current + 1) % upcomingEvents.length);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      <section className="relative overflow-hidden border-b-8 border-gold bg-slate-950 py-20 lg:py-28">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0">
          <img
            src={assets.capacityImage}
            alt="NACETEM events"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(0,102,51,0.35),transparent_32%),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(15,23,42,0.84)_48%,rgba(2,6,23,0.96))]"></div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl">
            <div className="mb-6 inline-flex items-center border-b border-gold px-1 pb-1 text-xs font-bold uppercase tracking-widest text-gold">
              Programmes & Engagements
            </div>
            <h1 className="mb-8 font-serif text-5xl leading-tight text-white md:text-6xl lg:text-7xl">
              Events
            </h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-slate-100/90 sm:text-xl">
              Explore upcoming workshops, stakeholder engagements, conferences, and past NACETEM programmes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 28 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative min-h-[320px] overflow-hidden rounded-[10px] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur"
          >
            <div className="absolute -left-5 -top-5 h-28 w-28 border-l border-t border-gold/70"></div>
            <div className="absolute -bottom-5 -right-5 h-28 w-28 border-b border-r border-emerald-400/45"></div>
            <div className="relative h-[330px] overflow-hidden rounded-[8px] bg-slate-900 sm:h-[420px] lg:h-[500px]">
              <img
                src={assets.capacityImage}
                alt="NACETEM workshop and event participants"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gold">NACETEM Events</p>
                <p className="max-w-md font-serif text-2xl leading-tight">Training, policy engagement, research exchange, and national STI programmes.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Upcoming Events</h2>
              <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">What Is Next</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={showPreviousUpcoming}
                disabled={upcomingEvents.length <= 1}
                className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-emerald-600/40 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Show previous upcoming event"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNextUpcoming}
                disabled={upcomingEvents.length <= 1}
                className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-emerald-600/40 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Show next upcoming event"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            {activeUpcomingEvent ? (
              <motion.article
                key={activeUpcomingEvent.id}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                variants={fadeInUp}
                className="group overflow-hidden rounded-[11px] border border-slate-200 bg-slate-50 shadow-sm transition-colors hover:border-emerald-500"
              >
                <div className="grid min-h-[420px] grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="image-frame min-h-[320px] bg-slate-100">
                    {activeUpcomingEvent.flyerUrl ? (
                      <img
                        src={activeUpcomingEvent.flyerUrl}
                        alt={activeUpcomingEvent.title}
                        className="w-full h-full object-contain object-center"
                      />
                    ) : (
                      <div className="relative h-full w-full">
                        <img src={eventFallbackImages[activeUpcomingIndex % eventFallbackImages.length]} alt="" className="h-full w-full object-cover opacity-20" aria-hidden="true" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-950/70 px-6 text-center text-white">
                          <Calendar className="mb-4 h-10 w-10 text-gold" />
                          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">NACETEM Event</p>
                          <p className="mt-3 text-xl font-serif leading-tight">Flyer Coming Soon</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col">
                    <div className="flex flex-wrap gap-3 mb-5">
                      <span className="inline-flex items-center bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                        <Calendar className="w-3.5 h-3.5 mr-2" /> {activeUpcomingEvent.date}
                      </span>
                      {activeUpcomingEvent.time && (
                        <span className="inline-flex items-center bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                          <Clock className="w-3.5 h-3.5 mr-2" /> {activeUpcomingEvent.time}
                        </span>
                      )}
                      <span className="inline-flex items-center bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                        <MapPin className="w-3.5 h-3.5 mr-2" /> {activeUpcomingEvent.location}
                      </span>
                      <span className="inline-flex items-center bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                        <Video className="w-3.5 h-3.5 mr-2" /> {activeUpcomingEvent.format ?? 'Hybrid'}
                      </span>
                    </div>
                    <h4 className="text-2xl font-serif text-slate-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors">
                      {activeUpcomingEvent.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{activeUpcomingEvent.description}</p>
                    <div className="mt-5 space-y-2 text-sm text-slate-600">
                      {activeUpcomingEvent.fee && <p className="font-bold text-slate-800">Fee: {activeUpcomingEvent.fee}</p>}
                      {activeUpcomingEvent.contactPhones && (
                        <p className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-emerald-700" />
                          {activeUpcomingEvent.contactPhones.join(', ')}
                        </p>
                      )}
                      {activeUpcomingEvent.contactEmail && (
                        <p className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-emerald-700" />
                          {activeUpcomingEvent.contactEmail}
                        </p>
                      )}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        to={`/events/${getEventSlug(activeUpcomingEvent)}`}
                        className="inline-flex items-center justify-center self-start rounded-[6px] border border-emerald-700 px-5 py-3 text-xs font-bold uppercase tracking-wider text-emerald-800 transition-colors hover:bg-emerald-50"
                      >
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                      {activeUpcomingEvent.actionUrl && (
                        <a
                          href={activeUpcomingEvent.actionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center self-start px-5 py-3 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-[6px] hover:bg-emerald-700 transition-colors"
                        >
                          <Video className="w-4 h-4 mr-2" /> {activeUpcomingEvent.actionLabel ?? 'Register / Join Event'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 border-t border-slate-200 bg-white px-6 py-4">
                  {upcomingEvents.map((event, idx) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => setActiveUpcomingIndex(idx)}
                      className={`h-2 rounded-full transition-all ${idx === activeUpcomingIndex ? 'w-8 bg-emerald-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                      aria-label={`Show ${event.title}`}
                    />
                  ))}
                </div>
              </motion.article>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="overflow-hidden rounded-[11px] border border-slate-200 bg-slate-950 shadow-xl"
              >
                <div
                  className="relative min-h-[360px] px-6 py-14 text-center text-white sm:px-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '34px 34px',
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,51,0.35),transparent_38%)]"></div>
                  <div className="relative mx-auto flex max-w-2xl flex-col items-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                      <Calendar className="h-8 w-8" />
                    </div>
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-gold">Upcoming Events</p>
                    <h4 className="mb-5 font-serif text-3xl leading-tight sm:text-4xl">There is no upcoming event at the moment.</h4>
                    <p className="text-sm leading-7 text-slate-200">
                      New NACETEM workshops, stakeholder engagements, and public programmes will appear here as soon as they are published.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Past Events</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">Previous Programmes</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {pastEvents.map((event, idx) => (
              <motion.article
                key={event.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white border border-slate-200 rounded-[11px] overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500 transition-all duration-300"
              >
                <div className="image-frame h-48 bg-slate-100">
                  <img
                    src={event.flyerUrl ?? eventFallbackImages[idx % eventFallbackImages.length]}
                    alt={event.title}
                    className={`w-full h-full object-center ${event.flyerUrl ? 'object-contain' : 'object-cover group-hover:scale-105 transition-transform duration-700'}`}
                  />
                </div>
                <div className="p-6 flex flex-col min-h-[280px]">
                  <div className="flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <h4 className="text-xl font-serif text-slate-900 leading-tight mb-5 group-hover:text-emerald-700 transition-colors">
                    {event.title}
                  </h4>
                  <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                    <span className="inline-flex items-center text-sm font-bold text-slate-600">
                      <Clock className="w-4 h-4 mr-2 text-gold" /> {event.date}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2.5 py-1 rounded-sm">
                      Expired
                    </span>
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
                className="bg-white border border-slate-200 rounded-[11px] overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500 transition-all duration-300"
              >
                <div className="image-frame h-48 bg-slate-900">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col min-h-[280px]">
                  <div className="flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700 mb-4">
                    {event.location === 'Online' ? <Video className="w-4 h-4 mr-2" /> : <MapPin className="w-4 h-4 mr-2" />}
                    <span>{event.location}</span>
                  </div>
                  <h4 className="text-xl font-serif text-slate-900 leading-tight mb-5 group-hover:text-emerald-700 transition-colors">
                    {event.title}
                  </h4>
                  <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                    <span className="inline-flex items-center text-sm font-bold text-slate-600">
                      <Clock className="w-4 h-4 mr-2 text-gold" /> {event.date}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2.5 py-1 rounded-sm">
                      Expired
                    </span>
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
    </div>
  );
}
