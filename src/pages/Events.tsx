import { Calendar, Clock, MapPin, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { assets } from '../assets';
import { useData } from '../contexts/DataContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const pastEvents = [
  {
    title: 'One Day Sensitization Workshop / Stakeholders Engagement on STI Indicator Dashboard for Nigeria',
    date: 'August 7, 2025',
    location: 'Online',
    image: assets.dashboardImage,
  },
  {
    title: 'Leveraging Science, Technology & Innovation for Tackling the Perennial Food Insecurity Challenge in Nigeria',
    date: 'August 6, 2024',
    location: 'Online',
    image: assets.policyImage,
  },
  {
    title: 'Connecting Innovators: Unlocking the Potential of Market-ready Technological Solutions for Blue Economy in Nigeria',
    date: 'December 20, 2023',
    location: 'FCT Archives and History Bureau, 5 Peace Drive OPP, AGIS Area 11, Garki-Abuja, FCT',
    image: assets.bayelsaNewsImage,
  },
  {
    title: 'Artificial Intelligence in the Public Sector',
    date: 'December 4, 2023',
    location: 'Army Resource Centre, opposite KASCO Market, Mambila Barracks Junction, Asokoro, Abuja',
    image: assets.ntaImage,
  },
];

export default function Events() {
  const { events } = useData();

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
            {events.map((event, idx) => (
              <motion.article
                key={event.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-slate-50 border border-slate-200 rounded-[11px] overflow-hidden group hover:border-emerald-500 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] h-full">
                  <div className="h-56 md:h-full min-h-[220px] overflow-hidden bg-slate-900">
                    <img
                      src={idx === 0 ? assets.dashboardImage : assets.capacityImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col">
                    <div className="flex flex-wrap gap-3 mb-5">
                      <span className="inline-flex items-center bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                        <Calendar className="w-3.5 h-3.5 mr-2" /> {event.date}
                      </span>
                      <span className="inline-flex items-center bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                        <MapPin className="w-3.5 h-3.5 mr-2" /> {event.location}
                      </span>
                    </div>
                    <h4 className="text-2xl font-serif text-slate-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{event.description}</p>
                    {event.description.includes('https://') && (
                      <a
                        href="https://us06web.zoom.us/j/86234028398?pwd=4fVFWkMacIsRcHVA4qrmlgOsy5GMJM.1"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center justify-center self-start px-5 py-3 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-[6px] hover:bg-emerald-700 transition-colors"
                      >
                        <Video className="w-4 h-4 mr-2" /> Join Zoom
                      </a>
                    )}
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
            {pastEvents.map((event) => (
              <motion.article
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
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
