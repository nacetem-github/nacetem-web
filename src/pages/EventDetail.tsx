import { ArrowLeft, Calendar, Clock, Mail, MapPin, Phone, Video } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { eventFallbackImages, getEventSlug } from '../utils/eventUtils';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function EventDetail() {
  const { slug } = useParams();
  const { events } = useData();
  const event = events.find((item) => getEventSlug(item) === slug);

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-32 font-sans">
        <div className="mx-auto max-w-3xl rounded-[11px] border border-slate-200 bg-white p-10 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Event Not Found</p>
          <h1 className="mb-6 text-3xl font-serif text-slate-900">This event could not be found.</h1>
          <Link to="/news#upcoming-events" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-emerald-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const eventImage = event.flyerUrl ?? eventFallbackImages[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <section className="relative overflow-hidden bg-slate-900 pb-20 pt-32 lg:pt-40">
        <div className="absolute inset-0">
          <img src={eventImage} alt="" className="h-full w-full object-cover opacity-25 mix-blend-overlay" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/85 to-slate-900/40"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/news#upcoming-events" className="mb-10 inline-flex items-center text-xs font-bold uppercase tracking-widest text-gold hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News & Gallery
          </Link>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-gold">Event Details</p>
            <h1 className="text-4xl font-serif leading-tight text-white md:text-5xl lg:text-6xl">{event.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-100/90">{event.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="overflow-hidden rounded-[11px] border border-slate-200 bg-slate-900">
            {event.flyerUrl ? (
              <img src={event.flyerUrl} alt={`${event.title} flyer`} className="h-full max-h-[760px] w-full object-contain object-top" />
            ) : (
              <div className="flex min-h-[460px] flex-col items-center justify-center bg-emerald-950 px-8 text-center text-white">
                <Calendar className="mb-5 h-12 w-12 text-gold" />
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">NACETEM Event</p>
                <p className="mt-4 text-2xl font-serif">Flyer Coming Soon</p>
              </div>
            )}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex flex-col">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailCard icon={Calendar} label="Date" value={event.date} />
              <DetailCard icon={Clock} label="Time" value={event.time ?? 'To be announced'} />
              <DetailCard icon={Video} label="Format" value={event.format ?? 'Hybrid'} />
              <DetailCard icon={MapPin} label="Location" value={event.location} />
            </div>

            <div className="mt-8 rounded-[11px] border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-4 text-2xl font-serif text-slate-900">About This Event</h2>
              <p className="text-sm leading-relaxed text-slate-600">{event.description}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {event.fee && <DetailCard icon={Calendar} label="Fee" value={event.fee} />}
              {event.contactPhones && event.contactPhones.length > 0 && <DetailCard icon={Phone} label="Phone" value={event.contactPhones.join(', ')} />}
              {event.contactEmail && <DetailCard icon={Mail} label="Email" value={event.contactEmail} />}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {event.actionUrl ? (
                <a
                  href={event.actionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-[6px] bg-emerald-700 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-800"
                >
                  <Video className="mr-2 h-4 w-4" /> {event.actionLabel ?? 'Register / Join Event'}
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-[6px] bg-slate-200 px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500"
                >
                  <Video className="mr-2 h-4 w-4" /> Registration Link Coming Soon
                </button>
              )}
              <Link to="/news#past-events" className="inline-flex items-center justify-center rounded-[6px] border border-slate-300 px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-700 transition-colors hover:border-emerald-700 hover:text-emerald-700">
                See Past Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

type DetailCardProps = {
  icon: typeof Calendar;
  label: string;
  value: string;
};

function DetailCard({ icon: Icon, label, value }: DetailCardProps) {
  return (
    <div className="rounded-[10px] border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center text-xs font-bold uppercase tracking-widest text-emerald-700">
        <Icon className="mr-2 h-4 w-4" /> {label}
      </div>
      <p className="text-sm font-bold leading-relaxed text-slate-800">{value}</p>
    </div>
  );
}
