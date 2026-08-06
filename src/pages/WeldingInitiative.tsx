import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, ChevronRight, Download, HardHat, ShieldCheck, Target } from 'lucide-react';
import { assets } from '../assets';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// TODO: replace with the real curriculum PDF once available (see CapacityBuilding.tsx brochureUrl for the pattern)
const curriculumUrl = '/uploads/welding-initiative/nacetem-welding-initiative-curriculum.pdf';

const objectives = [
  {
    icon: ShieldCheck,
    title: 'International Certification',
    description:
      "Prepare trainees for globally recognised welding certification standards, positioning them for opportunities in Nigeria's and the international labour market.",
  },
  {
    icon: HardHat,
    title: 'Hands-On Technical Training',
    description:
      'Structured, practical instruction on modern welding techniques, safety protocols, and industrial-grade equipment under qualified supervision.',
  },
  {
    icon: Target,
    title: 'Industrial Employability',
    description:
      "Equip participants with market-ready skills aligned to the demands of Nigeria's oil & gas, construction, and manufacturing sectors.",
  },
  {
    icon: Award,
    title: 'Instructor & Institutional Capacity',
    description:
      'Strengthen the pipeline of qualified welding instructors and upgrade training infrastructure across partner centres nationwide.',
  },
];

const applicants = [
  'Artisans and vocational welders seeking professional certification',
  'Engineering and technical graduates entering the industrial workforce',
  'Technical college and vocational school instructors',
  'SMEs and industrial firms sponsoring staff upskilling',
];

export default function WeldingInitiative() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <img
            src={assets.weldingImage}
            alt="NACETEM Welding Initiative"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl mx-auto">
            <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              Technical Skills & Certification
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-tight mb-8">
              NACETEM Welding Initiative
            </h1>
            <p className="text-xl text-slate-100/90 mb-10 font-light mx-auto max-w-[650px] leading-[1.6]">
              A technical capacity-building initiative supporting welding excellence, certification readiness,
              and industrial skills development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Overview + Core Objectives */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Overview</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-6">
              Bridging Nigeria's Industrial Skills Gap
            </h3>
            <p className="text-slate-600 text-[15px] leading-relaxed">
              The NACETEM Welding Initiative is a technical capacity-building programme designed to close the
              skills gap in Nigeria's industrial sector. By combining rigorous, hands-on training with
              certification pathways recognised across the industry, the initiative equips artisans, graduates,
              and technicians with the practical competencies required to compete for skilled roles in
              fabrication, construction, oil & gas, and manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((objective) => (
              <motion.div
                key={objective.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white border border-slate-200 rounded-[11px] p-6 sm:p-8 hover:border-emerald-500 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-[8px] flex items-center justify-center bg-emerald-50 mb-6">
                  <objective.icon className="w-6 h-6 text-emerald-700" />
                </div>
                <h4 className="text-lg font-serif text-slate-900 mb-3 leading-snug">{objective.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{objective.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Apply + Call to Action */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Who Should Apply</h2>
              <h3 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-8">Is This Programme Right for You?</h3>
              <ul className="space-y-4">
                {applicants.map((applicant) => (
                  <li key={applicant} className="flex items-start gap-3 text-slate-700 text-[15px] leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{applicant}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-[11px] p-8 sm:p-10 shadow-sm">
              <div className="w-16 h-1 bg-gold mb-8"></div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4">Ready to Get Started?</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                Applications for the NACETEM Welding Initiative are reviewed on a rolling basis. Apply now to
                secure a training slot, or download the full curriculum to review course structure, duration,
                and certification requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-emerald-700 text-white font-bold text-xs tracking-widest uppercase hover:bg-emerald-800 transition-colors rounded-[6px] text-center shadow-sm"
                >
                  Apply Now <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
                <a
                  href={curriculumUrl}
                  download
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-transparent border border-slate-300 text-slate-800 font-bold text-xs tracking-widest uppercase hover:border-emerald-700 hover:text-emerald-700 hover:bg-emerald-50/40 transition-colors rounded-[6px] text-center"
                >
                  <Download className="mr-2 w-4 h-4" /> Download Curriculum
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
