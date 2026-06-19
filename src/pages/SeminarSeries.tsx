import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, ExternalLink, Video } from 'lucide-react';
import { assets } from '../assets';
import { useData } from '../contexts/DataContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const seededSeminars = [
  {
    title: "FACTORS INFLUENCING THE ADOPTION OF GREEN SUPPLY CHAIN MANAGEMENT TECHNOLOGIES AND PRACTICES IN SELECTED PHARMACEUTICAL AND TEXTILE FIRMS IN SOUTHWESTERN NIGERIA",
    presenter: "Grace OJO-EMMANUEL",
    date: "21st August, 2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/green-supply-chain-management-technologies-grace-ojo-emmanuel.pptx",
    videoUrl: null,
  },
  {
    title: "ICT Integration in Improving Agility of Petroleum Distribution in Nigeria",
    presenter: "Dr. Obiageli Nneka Nze",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/ict-integration-petroleum-distribution-obiageli-nze.pptx",
    videoUrl: null,
  },
  {
    title: "Modeling the Nigerian Education System: A system dynamics approach",
    presenter: "Victor O. Sobanke (PhD)",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/modeling-nigerian-education-system-victor-sobanke.pptx",
    videoUrl: null,
  },
  {
    title: "Development and Optimization of Super-hydrophobic Biochar-infused Coating for Corrosion Protection of Carbon Steel Pipelines in Oil and Gas Facilities",
    presenter: "Engr. AYUBA, David Mshelia",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/biochar-coating-corrosion-protection-david-mshelia.pptx",
    videoUrl: null,
  },
  {
    title: "Application of RSM in Analyzing Weld Metal Viscosity in Mild Steel Welds",
    presenter: "Engr. Seigha Gumus, FNIMechE",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/rsm-weld-metal-viscosity-seigha-gumus.pptx",
    videoUrl: null,
  },
  {
    title: "Green Project Management in Nigeria: Challenges and Prospects",
    presenter: "Osita Ben Agbatah",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/green-project-management-nigeria-osita-agbatah.pdf",
    videoUrl: null,
  },
  {
    title: "Metering as a Tool for Minimizing Non-Technical Losses in Yola Electricity Distribution Company",
    presenter: "Engr. AMOS, Chinda",
    date: "March 2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/metering-non-technical-losses-yola-electricity-amos-chinda.pptx",
    videoUrl: null,
  },
  {
    title: "MATHEMATICAL MODELLING APPROACH TO GIVE INSIGHT TO THE STUDY OF SINGLE VARIANT FOOD-BORNE NIPAH VIRUS DISEASE TRANSMISSION DYNAMICS",
    presenter: "ABANG SUNDAY IGWE SCOTT (Ph.D, Nigeria)",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/nipah-virus-transmission-dynamics-abang-scott.pdf",
    videoUrl: null,
  },
  {
    title: "The Adoption of Internet-based Technological Innovations in Latecomer Industrial Settings",
    presenter: "OLOMU, MICHAEL O. PhD",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/internet-based-technological-innovations-michael-olomu.pptx",
    videoUrl: null,
  },
  {
    title: "ASSESSMENT OF THE SURFACE WATER AND GROUNDWATER INTERACTION WITHIN THE OPA DRAINAGE BASIN, SOUTH-WESTERN NIGERIA",
    presenter: "OKPURU Ogbonna Aguta",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/surface-water-groundwater-interaction-opa-basin-okpuru-aguta.pptx",
    videoUrl: null,
  },
  {
    title: "PRESIDENTIAL PRIORITIES AND MINISTERIAL DELIVERABLES (PP&MD): THE ROLE OF NACETEM.",
    presenter: "EMEKA JOSEPH",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/presidential-priorities-ministerial-deliverables-emeka-joseph.pptx",
    videoUrl: null,
  },
  {
    title: "Unlocking Nigeria's Natural Resources through Strategies for Sustainable Development in Clean Energy",
    presenter: "Thompson-Adewole Valentina",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/unlocking-nigerias-natural-resources-clean-energy.pptx",
    videoUrl: null,
  },
  {
    title: "Assessment of Atmospheric Particulate Matter and Air Pollutants in Five Motor Parks in Ughelli, Delta State, Nigeria",
    presenter: "Dr. Tari, Joel Honda",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/assessment-atmospheric-particulate-matter-air-pollutants-ughelli.pptx",
    videoUrl: null,
  },
  {
    title: "Digital Transformation in Nigerian Private Universities: Adoption of E-Learning Technologies",
    presenter: "Victor O. Sobanke (PhD)",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/digital-transformation-nigerian-private-universities-elearning.pptx",
    videoUrl: null,
  },
  {
    title: "Collaborative Manufacturing Network: A Tool for SMMEs Growth in Nigeria",
    presenter: "Engr A.A OGUNGBEMI",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/collaborative-manufacturing-network-smmes-growth-nigeria.pptx",
    videoUrl: null,
  },
  {
    title: "Integrated Framework for R&D Commercialisation at Public Research Institutions",
    presenter: "Dr. Babalola O.O. (ADR)",
    date: "20th March, 2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/rd-commercialisation-public-research-institutions.pdf",
    videoUrl: null,
  },
  {
    title: "Proposal on In-Depth Evaluation of Leather Tanning Industry in the North-West Region of Nigeria",
    presenter: "Mohammed Zayyanu Musa",
    date: "2025",
    year: 2025,
    presentationUrl: "/uploads/research/seminar-series/2025/presentations/leather-tanning-industry-north-west-nigeria.pptx",
    videoUrl: null,
  },
  {
    title: "Investigating the Tribological Properties of Mahogany Seed Oil",
    presenter: "Mr Ayuba David Mshelia",
    date: "8th April, 2024",
    year: 2024,
    presentationUrl: null,
    videoUrl: null,
  },
  {
    title: "Technology Management for a Successful Transport System in Nigeria",
    presenter: "Mrs Olayemi Dickson",
    date: "19th March, 2024",
    year: 2024,
    presentationUrl: null,
    videoUrl: null,
  },
  {
    title: "A Hybrid Simulation that Enables Realistic Examination Scenarios",
    presenter: "R. C. Wakawa",
    date: "21st September 2023",
    year: 2023,
    presentationUrl: null,
    videoUrl: null,
  },
  {
    title: "Are you nervous that AI will take your job?",
    presenter: "Dr Olabanji Onifade",
    date: "Oct 19th, 2023",
    year: 2023,
    presentationUrl: null,
    videoUrl: null,
  },
  {
    title: "Determinants of Green Innovation in Small & Medium Scale Enterprises in Nigeria",
    presenter: "Babatunde Adetunji AODU",
    date: "15th June, 2023",
    year: 2023,
    presentationUrl: null,
    videoUrl: null,
  },
  {
    title: "A Hybrid Simulation that Enables Realistic Examination Scenarios",
    presenter: "Dr. Tari Joel Honda",
    date: "20th April, 2023",
    year: 2023,
    presentationUrl: null,
    videoUrl: null,
  },
  {
    title: "Female Participation in Technical, Vocational Education and Occupation in Nigeria (Quality Education-SDG 4; Gender Equality-SDG 5)",
    presenter: "Dr. David Olutunde Babalola",
    date: "19th of April, 2023",
    year: 2023,
    presentationUrl: null,
    videoUrl: null,
  },
  {
    title: "STI Policy Implementation Plan",
    presenter: "Engr. Dr Kazeem Abubakar",
    date: "16th, March 2023",
    year: 2023,
    presentationUrl: null,
    videoUrl: null,
  }
];

type ResourceActionProps = {
  href: string | null;
  type: 'presentation' | 'video';
};

function ResourceAction({ href, type }: ResourceActionProps) {
  const isPresentation = type === 'presentation';
  const Icon = isPresentation ? Download : Video;
  const label = isPresentation ? 'Download Presentation' : 'Watch Seminar Video';
  const unavailableLabel = isPresentation ? 'Presentation Coming Soon' : 'Video Coming Soon';

  if (!href) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center justify-center w-full px-4 py-3 bg-slate-100 border border-slate-200 text-slate-500 font-bold text-[10px] sm:text-xs tracking-wider uppercase rounded-[6px] cursor-not-allowed"
      >
        <Icon className="w-4 h-4 mr-2 shrink-0" /> {unavailableLabel}
      </button>
    );
  }

  return (
    <a
      href={href}
      target={isPresentation ? undefined : '_blank'}
      rel={isPresentation ? undefined : 'noreferrer'}
      download={isPresentation || undefined}
      className={`inline-flex items-center justify-center w-full px-4 py-3 font-bold text-[10px] sm:text-xs tracking-wider uppercase transition-colors rounded-[6px] ${
        isPresentation
          ? 'bg-emerald-600 border border-emerald-600 text-white hover:bg-emerald-700 hover:border-emerald-700'
          : 'bg-white border border-slate-300 text-slate-900 hover:border-emerald-600 hover:text-emerald-700'
      }`}
    >
      <Icon className="w-4 h-4 mr-2 shrink-0" /> {label}
    </a>
  );
}

export default function SeminarSeries() {
  const { seminars: managedSeminars } = useData();
  const seminars = managedSeminars.filter((item) => item.status === 'published').map((item) => ({ ...item, date: item.seminarDate, presentationUrl: item.presentationUrl ?? null, videoUrl: item.videoUrl ?? null }));
  const displayedSeminars = seminars.length ? seminars : seededSeminars;
  const currentYear = new Date().getFullYear();
  const recentYears = Array.from({ length: 3 }, (_, index) => currentYear - index);
  const archiveSeminars = displayedSeminars.filter((seminar) => seminar.year < currentYear - 2);
  const [selectedYear, setSelectedYear] = useState<number | 'archive'>(currentYear);
  const visibleSeminars =
    selectedYear === 'archive'
      ? archiveSeminars
      : displayedSeminars.filter((seminar) => seminar.year === selectedYear);

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <img 
            src={assets.seminarImage} 
            alt="NACETEM Seminar Series" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl mx-auto">
            <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              Research
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-tight mb-8">
              Research Seminars
            </h1>
            <p className="text-xl text-slate-100/90 mb-10 leading-relaxed font-light mx-auto max-w-3xl">
              Sharing research findings, emerging ideas, and practical insights across science, technology,
              innovation, and public policy.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">NACETEM RESEARCHERS' SEMINAR SERIES</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">Latest Presentations</h3>
            <p className="text-sm text-slate-600 leading-relaxed mt-5">
              Browse seminar presentations and recordings from the current year, the previous two years, or the archive.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-14" aria-label="Filter seminars by year">
            {recentYears.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                aria-pressed={selectedYear === year}
                className={`min-w-24 px-5 py-3 rounded-[6px] border text-xs font-bold uppercase tracking-widest transition-colors ${
                  selectedYear === year
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-700'
                }`}
              >
                {year}
              </button>
            ))}
            {archiveSeminars.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedYear('archive')}
                aria-pressed={selectedYear === 'archive'}
                className={`px-5 py-3 rounded-[6px] border text-xs font-bold uppercase tracking-widest transition-colors ${
                  selectedYear === 'archive'
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-700'
                }`}
              >
                Older Seminars
              </button>
            )}
          </div>

          <div className="flex items-end justify-between gap-6 mb-8 pb-5 border-b border-slate-200">
            <div>
              <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-2">
                {selectedYear === 'archive' ? 'Seminar Archive' : 'Selected Year'}
              </p>
              <h4 className="text-2xl sm:text-3xl font-serif text-slate-900">
                {selectedYear === 'archive' ? `Before ${currentYear - 2}` : selectedYear}
              </h4>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {visibleSeminars.length} {visibleSeminars.length === 1 ? 'Seminar' : 'Seminars'}
            </p>
          </div>

          {visibleSeminars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {visibleSeminars.map((seminar) => (
                <motion.div
                  key={`${seminar.title}-${seminar.presenter}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="bg-slate-50 border border-slate-200 rounded-[11px] p-8 hover:border-emerald-500 transition-all shadow-sm hover:shadow-md group flex flex-col h-full"
                >
                  <div className="flex-1">
                    <div className="inline-block bg-white text-emerald-700 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-[4px] border border-emerald-100 mb-6">
                      <Calendar className="w-3 h-3 inline mr-1 -mt-0.5" /> {seminar.date}
                    </div>
                    <h4 className="text-xl font-serif text-slate-900 mb-4 leading-snug group-hover:text-emerald-700 transition-colors">
                      {seminar.title}
                    </h4>
                    <p className="text-slate-600 text-sm mb-6 flex items-center">
                      <span className="font-bold text-slate-700 mr-2">Presented by:</span> {seminar.presenter}
                    </p>
                  </div>

                  <div className="pt-6 mt-auto border-t border-slate-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <ResourceAction href={seminar.presentationUrl} type="presentation" />
                      <ResourceAction href={seminar.videoUrl} type="video" />
                      {'registrationUrl' in seminar && seminar.registrationUrl && <a href={seminar.registrationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700"><ExternalLink className="mr-2 h-4 w-4" /> Register</a>}
                      {'meetingUrl' in seminar && seminar.meetingUrl && <a href={seminar.meetingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700"><Video className="mr-2 h-4 w-4" /> Join Meeting</a>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-[11px] px-6 py-16 text-center">
              <Calendar className="w-9 h-9 text-emerald-700 mx-auto mb-5" />
              <h4 className="text-2xl font-serif text-slate-900 mb-3">
                No seminars published for {selectedYear}
              </h4>
              <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                New presentations and recordings will appear here as they become available. You can browse another year
                or visit the older seminar archive.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
