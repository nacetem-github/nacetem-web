import { ArrowLeft, Calendar, CheckCircle2, FileText, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { archivedPastEvents } from '../data/pastEvents';
import { getArchivedEventReportBySlug } from '../data/eventReports';
import { eventFallbackImages, getEventSlug } from '../utils/eventUtils';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function EventReport() {
  const { slug } = useParams();
  const { events } = useData();
  const dynamicEvent = events.find((event) => getEventSlug(event) === slug);
  const archivedReport = getArchivedEventReportBySlug(slug);
  const archivedEvent = archivedReport
    ? archivedPastEvents.find((event) => event.title === archivedReport.title)
    : undefined;

  if (!dynamicEvent && (!archivedReport || !archivedEvent)) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-32 font-sans">
        <div className="mx-auto max-w-3xl rounded-[11px] border border-slate-200 bg-white p-10 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Report Not Found</p>
          <h1 className="mb-6 text-3xl font-serif text-slate-900">This event report is not available.</h1>
          <Link to="/news#past-events" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-emerald-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Past Events
          </Link>
        </div>
      </div>
    );
  }

  const title = dynamicEvent?.title ?? archivedEvent!.title;
  const date = dynamicEvent?.date ?? archivedEvent!.date;
  const location = dynamicEvent?.location ?? archivedEvent!.location;
  const image = dynamicEvent?.flyerUrl ?? archivedEvent?.image ?? eventFallbackImages[0];
  const summary = dynamicEvent?.description ?? archivedReport!.summary;
  const focusAreas = archivedReport?.focusAreas ?? [];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <section className="relative overflow-hidden border-b-8 border-gold bg-slate-900 pb-20 pt-32 lg:pt-40">
        <div className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover opacity-25 mix-blend-overlay" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/85 to-slate-900/40"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/news#past-events" className="mb-10 inline-flex items-center text-xs font-bold uppercase tracking-widest text-gold hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Past Events
          </Link>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-gold">Concluded Event Report</p>
            <h1 className="text-4xl font-serif leading-tight text-white md:text-5xl lg:text-6xl">{title}</h1>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold text-slate-100">
              <span className="inline-flex items-center rounded-[6px] border border-white/20 bg-white/10 px-4 py-2"><Calendar className="mr-2 h-4 w-4 text-gold" /> {date}</span>
              <span className="inline-flex items-center rounded-[6px] border border-white/20 bg-white/10 px-4 py-2"><MapPin className="mr-2 h-4 w-4 text-gold" /> {location}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="overflow-hidden rounded-[11px] border border-slate-200 bg-slate-900">
            <img src={image} alt={title} className={`h-full min-h-[360px] max-h-[620px] w-full object-center ${dynamicEvent?.flyerUrl ? 'object-contain bg-slate-100' : 'object-cover'}`} />
          </motion.div>

          <motion.article initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="mb-8 flex items-center gap-3 border-b border-slate-200 pb-5">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] bg-emerald-50 text-emerald-700"><FileText className="h-5 w-5" /></span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Public Report</p>
                <h2 className="mt-1 text-2xl font-serif text-slate-900">Event Overview</h2>
              </div>
            </div>
            <p className="text-base leading-8 text-slate-600">{summary}</p>

            {focusAreas.length > 0 && (
              <div className="mt-10">
                <h3 className="mb-5 text-xl font-serif text-slate-900">Documented Focus Areas</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {focusAreas.map((area) => (
                    <div key={area} className="flex items-start rounded-[8px] border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">
                      <CheckCircle2 className="mr-3 mt-0.5 h-4 w-4 shrink-0 text-emerald-700" /> {area}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 rounded-[10px] border border-amber-200 bg-amber-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Report Note</p>
              <p className="mt-3 text-sm leading-relaxed text-amber-950/75">
                This page contains the currently approved public event summary. Additional presentations, resolutions, attendance records, or supporting documents can be added when they are cleared for publication.
              </p>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
}
