import { ArrowLeft, Calendar, Clock, Download, ExternalLink, Mail, MapPin, MonitorPlay, Phone, UserRound, Users, Video } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { eventFallbackImages, formatEventTime, getEventSlug } from '../utils/eventUtils';

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
  const storedActions = JSON.parse(window.localStorage.getItem('nacetem-event-actions') ?? '{}');
  const storedAction = storedActions[event.id] as { actionUrl?: string; actionLabel?: string } | undefined;
  const actionUrl = event.actionUrl ?? storedAction?.actionUrl;
  const actionLabel = event.actionLabel ?? storedAction?.actionLabel ?? 'Register / Join Event';

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <section className="relative overflow-hidden bg-slate-900 pb-20 pt-32 lg:pt-40">
        <div className="absolute inset-0">
          <img
            src={eventImage}
            alt=""
            className="h-full w-full object-cover opacity-25 mix-blend-overlay"
            aria-hidden="true"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="image-frame rounded-[11px] border border-slate-200 bg-slate-900">
            {event.flyerUrl ? (
              <img
                src={event.flyerUrl}
                alt={`${event.title} flyer`}
                className="h-full max-h-[760px] w-full object-contain object-top"
                loading="lazy"
                decoding="async"
              />
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
              <DetailCard icon={Clock} label="Time" value={formatEventTime(event.time) || 'To be announced'} />
              <DetailCard icon={Video} label="Format" value={event.format ?? 'Hybrid'} />
              <DetailCard icon={MapPin} label="Location" value={event.location} />
            </div>

            <div className="mt-8 rounded-[11px] border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-4 text-2xl font-serif text-slate-900">About This Event</h2>
              <p className="text-sm leading-relaxed text-slate-600">{event.description}</p>
            </div>

            {(event.host || event.facilitator) && (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {event.host && <DetailCard icon={UserRound} label="Host" value={event.host} />}
                {event.facilitator && <DetailCard icon={UserRound} label="Facilitator" value={event.facilitator} />}
              </div>
            )}

            {event.partners && event.partners.length > 0 && (
              <div className="mt-8 rounded-[11px] border border-slate-200 bg-white p-6">
                <div className="mb-4 flex items-center text-xs font-bold uppercase tracking-widest text-emerald-700">
                  <Users aria-hidden="true" className="mr-2 h-4 w-4" /> In partnership with
                </div>
                <ul className="grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                  {event.partners.map((partner) => <li key={partner} className="flex items-start gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{partner}</li>)}
                </ul>
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {event.fee && <DetailCard icon={Calendar} label="Fee" value={event.fee} />}
              {event.contactPhones && event.contactPhones.length > 0 && <DetailCard icon={Phone} label="Phone" value={event.contactPhones.join(', ')} />}
              {event.contactEmail && <DetailCard icon={Mail} label="Email" value={event.contactEmail} />}
            </div>

            {event.onlineViewingUrl && (
              <div className="mt-8 rounded-[11px] border border-sky-200 bg-sky-50 p-4 sm:p-6">
                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-sky-800">
                    <MonitorPlay aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl font-serif text-slate-900">Unable to attend physically?</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-700">You may watch the event online. Online viewers will be able to observe the simulation but will not participate actively in the negotiation exercise.</p>
                    {(event.onlineMeetingId || event.onlinePasscode) && (
                      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                        {event.onlineMeetingId && <div><dt className="font-bold text-slate-900">Meeting ID</dt><dd className="mt-1 break-words font-mono tabular-nums text-slate-700">{event.onlineMeetingId}</dd></div>}
                        {event.onlinePasscode && <div><dt className="font-bold text-slate-900">Passcode</dt><dd className="mt-1 break-words font-mono tabular-nums text-slate-700">{event.onlinePasscode}</dd></div>}
                      </dl>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              {event.sourceFileUrl && (
                <a href={event.sourceFileUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-full items-center justify-center rounded-[6px] border border-emerald-700 px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 sm:w-auto">
                  <Download className="mr-2 h-4 w-4" /> Download Event File
                </a>
              )}
              {actionUrl ? (
                <a
                  href={actionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-[6px] bg-emerald-700 px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 sm:w-auto"
                >
                  <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" /> {actionLabel}
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-[6px] bg-slate-200 px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-slate-500 sm:w-auto"
                >
                  <Video className="mr-2 h-4 w-4" /> Registration Link Coming Soon
                </button>
              )}
              {event.onlineViewingUrl && (
                <a
                  href={event.onlineViewingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-[6px] border border-sky-700 bg-white px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-sky-900 transition-colors hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-700 focus-visible:ring-offset-2 sm:w-auto"
                >
                  <MonitorPlay aria-hidden="true" className="mr-2 h-4 w-4" /> Watch Online
                </a>
              )}
              <Link to="/news#past-events" className="inline-flex min-h-12 w-full items-center justify-center rounded-[6px] border border-slate-300 px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-slate-700 transition-colors hover:border-emerald-700 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 sm:w-auto">
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
