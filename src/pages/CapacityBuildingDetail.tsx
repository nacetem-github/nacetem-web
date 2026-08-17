import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Download,
  ExternalLink,
  MapPin,
  Radar,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getCapacityProgram } from '../data/capacityPrograms';
import ProgramInterestModal from '../components/ProgramInterestModal';
import { useData } from '../contexts/DataContext';
import { VideoShowcase } from '../components/VideoShowcase';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const brochureUrl = '/uploads/capacity-building/brochures/capacity-building-brochure.pdf';

const droneCourseDetails = [
  {
    title: 'Certification & Authority',
    icon: ShieldCheck,
    content:
      'Fully compliant with Nigerian Civil Aviation Authority (NCAA) guidelines. Aligned with international standards from ICAO, EASA, and the FAA. Certified by the Nigeria Civil Aviation Authority and the Oil & Gas Trainers Association.',
  },
  {
    title: 'The Hardware & Tech Stack',
    icon: Radar,
    content:
      'Train on a variety of multi-rotor UAS platforms. Master advanced Detect-and-Avoid (DAA) systems including radar and ADS-B. Learn command and control systems utilizing LTE/5G and C2 link redundancy.',
  },
  {
    title: 'Prerequisites & Entry',
    icon: ClipboardCheck,
    content:
      'For the core VLOS certification, candidates must be 18+ years old, hold a valid NIN, and pass a class 3 medical fitness exam. Advanced BVLOS training requires a prior VLOS certificate and 20+ logged flight hours.',
  },
];

export default function CapacityBuildingDetail() {
  const { slug } = useParams();
  const program = getCapacityProgram(slug);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const { videos } = useData();

  if (!program) {
    return <Navigate to="/capacity-building" replace />;
  }

  const programmeWebinars = videos.filter((video) => video.status === 'published' && video.programSlug === program.slug && (video.videoType === 'programme-webinar' || video.videoType === 'both'));
  const isDigitalMarketingProgramme = program.slug === 'professional-mtech-digital-marketing-strategy';

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <img
            src={program.img}
            alt={program.title}
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/85 to-slate-900/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl">
            <Link
              to="/capacity-building"
              className="inline-flex items-center text-slate-100 hover:text-gold text-xs font-bold uppercase tracking-widest mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Capacity Building
            </Link>
            <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              {program.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-8">
              {program.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-100/90 leading-relaxed font-light max-w-3xl">
              {program.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14">
            <main className="pb-28">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Programme Overview</h2>
                <h3 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-6">What this programme covers</h3>
                <p className="text-slate-600 leading-[1.6] text-base sm:text-lg mb-12 max-w-[800px]">{program.overview}</p>
              </motion.div>

              {isDigitalMarketingProgramme && (
                <section className="mb-12 rounded-[11px] border border-amber-200 bg-amber-50 p-6 sm:p-8" aria-labelledby="scholarship-offer-title">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-700">Promotional scholarship offer</p>
                  <h3 id="scholarship-offer-title" className="mt-2 text-2xl font-serif text-slate-900">Apply by 20 August 2026</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">Classes for the Professional Master in Digital Marketing and Strategy commence on 29 August 2026.</p>
                  <a
                    href="https://forms.gle/8cY8X3nFC4yuRr2v9"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-[6px] bg-emerald-700 px-6 py-3 text-center text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:w-auto"
                  >
                    Register Now <ExternalLink className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                </section>
              )}

              {programmeWebinars.length > 0 && (
                <section className="mb-14" aria-labelledby="programme-webinar-title">
                  <div className="mb-7">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold">Webinar recording</p>
                    <h2 id="programme-webinar-title" className="mt-2 text-3xl sm:text-4xl font-serif text-slate-900">Watch the Webinar</h2>
                    <p className="mt-3 max-w-3xl text-slate-600">Watch the programme briefing and learn more about its structure, outcomes, and application process.</p>
                  </div>
                  <VideoShowcase videos={programmeWebinars} label="webinar" />
                </section>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <InfoPanel title="Who Should Attend" items={program.audience} icon={Users} />
                <InfoPanel title="Learning Outcomes" items={program.outcomes} icon={CheckCircle2} />
              </div>

              {program.slug === 'training-certification-drone-piloting' && (
                <section className="mb-12">
                  <div className="mb-8">
                    <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 mb-3">Course Details & Requirements</h3>
                    <p className="text-slate-600 leading-[1.6] max-w-[800px]">
                      Build practical flight confidence with a certification pathway designed for regulated, high-value UAS operations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-center [&>*]:md:col-span-2 [&>*:last-child:nth-child(odd)]:md:col-start-2 [&>*:last-child:nth-child(odd)]:lg:col-start-auto">
                    {droneCourseDetails.map((detail) => (
                      <CourseDetailPanel key={detail.title} {...detail} />
                    ))}
                  </div>
                </section>
              )}

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-slate-50 border border-slate-200 rounded-[11px] p-7 sm:p-8"
              >
                <h3 className="text-2xl font-serif text-slate-900 mb-6">Programme Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {program.highlights.map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {(program.curriculum || program.careerOpportunities) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                  {program.curriculum && <InfoPanel title="Curriculum Focus" items={program.curriculum} icon={BookOpen} />}
                  {program.careerOpportunities && (
                    <InfoPanel title="Career Opportunities" items={program.careerOpportunities} icon={Users} />
                  )}
                </div>
              )}
            </main>

            <aside className="lg:sticky lg:top-28 self-start">
              <div className="bg-slate-50 border border-slate-200 rounded-[11px] p-7 shadow-sm">
                <program.icon className={`w-9 h-9 ${program.iconColor} mb-6`} />
                <h2 className="text-2xl font-serif text-slate-900 mb-6">Programme Details</h2>

                <div className="space-y-5 mb-8">
                  <DetailItem icon={Clock} label="Duration" value={program.duration} />
                  <DetailItem icon={BookOpen} label="Format" value={program.format} />
                  <div>
                    <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                      <MapPin className="w-4 h-4 mr-2" /> Study Centres
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-sm">
                        FULLY VIRTUAL
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex flex-1 items-center justify-center px-6 py-3 bg-emerald-700 text-white font-bold text-xs tracking-widest uppercase hover:bg-emerald-800 transition-colors rounded-[6px]"
                    >
                      Contact Admissions <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                    <a
                      href={brochureUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center px-6 py-3 bg-white border border-slate-200 text-slate-900 font-bold text-xs tracking-widest uppercase hover:border-emerald-600 hover:text-emerald-700 transition-colors rounded-[6px]"
                    >
                      <Download className="w-4 h-4 mr-2" /> View Brochure
                    </a>
                  </div>
                  {program.secondaryCta?.type === 'register' ? (
                    <button
                      type="button"
                      onClick={() => setShowInterestForm(true)}
                      className="inline-flex w-full items-center justify-center px-6 py-3 bg-gold text-slate-900 font-bold text-xs tracking-widest uppercase hover:bg-amber-400 transition-colors rounded-[6px] shadow-sm"
                    >
                      {program.secondaryCta.label} <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : program.secondaryCta?.type === 'external' ? (
                    <a
                      href={program.applyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center px-6 py-3 bg-gold text-slate-900 font-bold text-xs tracking-widest uppercase hover:bg-amber-400 transition-colors rounded-[6px] shadow-sm"
                    >
                      {program.secondaryCta.label} <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  ) : null}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ProgramInterestModal
        isOpen={showInterestForm}
        onClose={() => setShowInterestForm(false)}
        programTitle={program.title}
        studyCentres={program.locations}
      />
    </div>
  );
}

type IconComponent = ComponentType<{ className?: string }>;

function InfoPanel({ title, items, icon: Icon }: { title: string; items: string[]; icon: IconComponent }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="bg-white rounded-[11px] p-7 shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
    >
      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-emerald-700" />
      </div>
      <h3 className="text-2xl font-serif text-slate-900 mb-5">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function CourseDetailPanel({
  title,
  content,
  icon: Icon,
}: {
  title: string;
  content: string;
  icon: IconComponent;
  key?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="bg-white rounded-[11px] p-7 shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
    >
      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-emerald-700" />
      </div>
      <h3 className="text-xl font-serif text-slate-900 mb-4 leading-snug">{title}</h3>
      <p className="text-sm text-slate-600 leading-[1.6]">{content}</p>
    </motion.div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: IconComponent; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-sm text-slate-700 leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
