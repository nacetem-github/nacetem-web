import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  FileText,
  Lightbulb,
  Presentation,
  Search,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { assets } from '../assets';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const researchAreas = [
  {
    icon: FileText,
    title: 'STI Policy Research',
    description:
      'Evidence-based studies that support the design, review, and evaluation of science, technology, and innovation policy.',
  },
  {
    icon: BarChart3,
    title: 'Indicators & Intelligence',
    description:
      'Research data, indicators, and analytical frameworks that strengthen planning and national innovation-system monitoring.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Systems',
    description:
      'Research into the institutions, partnerships, and conditions that help knowledge and technology create public value.',
  },
  {
    icon: Users,
    title: 'Technology Management',
    description:
      'Practical insight for institutions managing emerging technologies, research outputs, and innovation programmes.',
  },
];

const researchPathways = [
  {
    icon: Presentation,
    eyebrow: 'Knowledge Exchange',
    title: "Researchers' Seminar Series",
    description:
      'Explore presentations and seminar sessions where researchers share findings across technology, innovation, and policy.',
    link: '/research/seminar-series',
    action: 'Explore Seminars',
  },
  {
    icon: BookOpen,
    eyebrow: 'Research Outputs',
    title: 'Publications',
    description:
      'Access policy briefs, technical reports, and research evidence developed for institutions and decision-makers.',
    link: '/publications',
    action: 'View Publications',
  },
  {
    icon: Search,
    eyebrow: 'Work With Us',
    title: 'Research Collaboration',
    description:
      'Connect with NACETEM on institutional studies, policy analysis, knowledge exchange, and research partnerships.',
    link: '/contact',
    action: 'Start a Conversation',
  },
];

export default function Research() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <img
            src={assets.policyImage}
            alt=""
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/85 to-slate-900/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl">
            <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              Research at NACETEM
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-tight mb-8">
              Evidence for Innovation and National Development
            </h1>
            <p className="text-lg sm:text-xl text-slate-100/90 leading-relaxed font-light max-w-3xl mb-10">
              NACETEM conducts policy research and develops strategic intelligence to improve the management of
              science, technology, and innovation in Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/publications"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-[6px] hover:bg-emerald-700 transition-colors"
              >
                Explore Research Outputs <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-white/30 bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-[6px] hover:bg-white hover:text-slate-900 transition-colors"
              >
                Collaborate With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Research Focus</h2>
            <h3 className="text-3xl sm:text-5xl font-serif text-slate-900 mb-6">
              Turning evidence into better decisions
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Our research connects data, institutions, technology, and public policy to address national priorities
              and strengthen Nigeria's innovation ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchAreas.map((area) => (
              <motion.article
                key={area.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-slate-50 border border-slate-200 rounded-[11px] p-7 hover:border-emerald-500 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-[8px] flex items-center justify-center text-emerald-700 mb-6">
                  <area.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif text-slate-900 mb-3">{area.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{area.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Research Resources</h2>
            <h3 className="text-3xl sm:text-5xl font-serif text-slate-900 mb-6">
              Explore, learn, and collaborate
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Discover research outputs, join knowledge-sharing activities, and find opportunities to work with us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {researchPathways.map((pathway) => (
              <motion.article
                key={pathway.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white border border-slate-200 rounded-[11px] p-8 flex flex-col"
              >
                <pathway.icon className="w-8 h-8 text-emerald-700 mb-7" />
                <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-3">{pathway.eyebrow}</p>
                <h4 className="text-2xl font-serif text-slate-900 mb-4">{pathway.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-8 flex-1">{pathway.description}</p>
                <Link
                  to={pathway.link}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-900 transition-colors"
                >
                  {pathway.action} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-serif mb-4">Build better evidence with NACETEM</h2>
            <p className="text-slate-300 leading-relaxed">
              Partner with our researchers on policy studies, innovation intelligence, institutional learning, and
              technology-management challenges.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3.5 bg-gold text-slate-900 text-xs font-bold uppercase tracking-wider rounded-[6px] hover:bg-white transition-colors shrink-0"
          >
            Discuss a Research Partnership <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
