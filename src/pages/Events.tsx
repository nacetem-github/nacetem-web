import { Calendar, Clock, Mail, MapPin, Phone, Video, ArrowRight, FileText } from 'lucide-react';
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

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <img
            src={assets.capacityImage}
            alt="NACETEM events"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl mx-auto">
            <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              Programmes & Engagements
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-tight mb-8">
              Events
            </h1>
            <p className="text-lg sm:text-xl text-slate-100/90 leading-relaxed font-light mx-auto max-w-3xl">
              Explore upcoming workshops, stakeholder engagements, conferences, and past NACETEM programmes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Upcoming Events</h2>
              <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">What Is Next</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event, idx) => (
              <motion.article
                key={event.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-slate-50 border border-slate-200 rounded-[11px] overflow-hidden group hover:border-emerald-500 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] h-full">
                  <div className="h-56 md:h-full min-h-[220px] overflow-hidden bg-slate-100">
                    {event.flyerUrl ? (
                      <img
                        src={event.flyerUrl}
                        alt={event.title}
                        className="w-full h-full object-contain object-center"
                      />
                    ) : (
                      <div className="relative h-full w-full">
                        <img src={eventFallbackImages[idx % eventFallbackImages.length]} alt="" className="h-full w-full object-cover opacity-20" aria-hidden="true" />
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
                        <Calendar className="w-3.5 h-3.5 mr-2" /> {event.date}
                      </span>
                      {event.time && (
                        <span className="inline-flex items-center bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                          <Clock className="w-3.5 h-3.5 mr-2" /> {event.time}
                        </span>
                      )}
                      <span className="inline-flex items-center bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                        <MapPin className="w-3.5 h-3.5 mr-2" /> {event.location}
                      </span>
                      <span className="inline-flex items-center bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                        <Video className="w-3.5 h-3.5 mr-2" /> {event.format ?? 'Hybrid'}
                      </span>
                    </div>
                    <h4 className="text-2xl font-serif text-slate-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{event.description}</p>
                    <div className="mt-5 space-y-2 text-sm text-slate-600">
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
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        to={`/events/${getEventSlug(event)}`}
                        className="inline-flex items-center justify-center self-start rounded-[6px] border border-emerald-700 px-5 py-3 text-xs font-bold uppercase tracking-wider text-emerald-800 transition-colors hover:bg-emerald-50"
                      >
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                      {event.actionUrl && (
                        <a
                          href={event.actionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center self-start px-5 py-3 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-[6px] hover:bg-emerald-700 transition-colors"
                        >
                          <Video className="w-4 h-4 mr-2" /> {event.actionLabel ?? 'Register / Join Event'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
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
                <div className="h-48 overflow-hidden bg-slate-100">
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
                <div className="h-48 overflow-hidden bg-slate-900">
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
