import { useEffect, useId, useRef, useState, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, BookOpen, ChevronDown, FileText, Lightbulb, Presentation, Search, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { assets } from '../assets';

const fadeInUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } } };
type CardIcon = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;

const researchAreas: { icon: CardIcon; title: string; description: string }[] = [
  { icon: FileText, title: 'STI Policy Research', description: 'Evidence-based studies that support the design, review, and evaluation of science, technology, and innovation policy, translating rigorous research into practical direction for institutions and public decision-makers.' },
  { icon: BarChart3, title: 'Indicators & Intelligence', description: "Research data, indicators, and analytical frameworks that strengthen planning, reveal emerging trends, and improve the monitoring of Nigeria's national innovation system." },
  { icon: Lightbulb, title: 'Innovation Systems', description: 'Research into the institutions, partnerships, capabilities, and enabling conditions that help knowledge and technology move from promising ideas to measurable public value.' },
  { icon: Users, title: 'Technology Management', description: 'Practical insight for institutions managing emerging technologies, research outputs, innovation programmes, and the organisational change required for responsible adoption.' },
];

const researchPathways = [
  { icon: Presentation, eyebrow: 'Knowledge Exchange', title: "Researchers' Seminar Series", description: 'Explore presentations and seminar sessions where researchers share findings, methods, and practical insights across technology, innovation, public policy, and national development priorities.', link: '/research/seminar-series', action: 'Explore Seminars' },
  { icon: BookOpen, eyebrow: 'Research Outputs', title: 'Publications', description: 'Access policy briefs, technical reports, newsletters, and research evidence developed to help institutions and decision-makers understand complex STI issues and act with confidence.', link: '/publications', action: 'View Publications' },
  { icon: Search, eyebrow: 'Work With Us', title: 'Research Collaboration', description: 'Connect with NACETEM on institutional studies, policy analysis, knowledge exchange, joint research, and strategic partnerships designed around shared evidence needs.', link: '/contact', action: 'Start a Conversation' },
];

function ExpandableSummary({ text, lines = 3 }: { text: string; lines?: number }) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const summaryId = useId();

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;
    const measure = () => { if (!expanded) setCanExpand(paragraph.scrollHeight > paragraph.clientHeight + 1); };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(paragraph);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <p ref={paragraphRef} id={summaryId} className="text-sm leading-7 text-slate-600" style={expanded ? undefined : { display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: lines, overflow: 'hidden' }}>{text}</p>
      {(canExpand || expanded) && (
        <button type="button" aria-controls={summaryId} aria-expanded={expanded} onClick={() => setExpanded((value) => !value)} className="mt-3 inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 rounded-md px-1 text-xs font-bold uppercase tracking-wider text-emerald-700 outline-none transition-colors hover:text-emerald-900 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4">
          {expanded ? 'Show less' : 'Read summary'}
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );
}

export default function Research() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 font-sans">
      <section className="relative overflow-hidden border-b-8 border-gold bg-slate-900 pb-20 pt-32 lg:pb-28 lg:pt-40">
        <div className="absolute inset-0">
          <img src={assets.policyImage} alt="" className="h-full w-full object-cover opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/55" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl items-end gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl">
            <div className="mb-6 inline-flex items-center border-b border-gold px-1 pb-1 text-xs font-bold uppercase tracking-widest text-gold">Research at NACETEM</div>
            <h1 className="mb-7 max-w-4xl text-4xl font-serif leading-tight text-white md:text-5xl lg:text-7xl">Evidence for innovation and national development</h1>
            <p className="mb-9 max-w-3xl text-lg font-light leading-8 text-slate-100/90 sm:text-xl">We connect rigorous policy research, strategic intelligence, and national priorities to improve how science, technology, and innovation are managed in Nigeria.</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/publications" className="inline-flex min-h-12 items-center justify-center rounded-[6px] bg-emerald-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900">Explore Research Outputs <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
              <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-[6px] border border-white/40 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900">Collaborate With Us</Link>
            </div>
          </motion.div>
          <motion.aside initial="hidden" animate="visible" variants={fadeInUp} aria-label="NACETEM research approach" className="hidden border-l border-white/20 pl-8 lg:block">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold">Our research approach</p>
            <ol className="space-y-5 text-sm leading-6 text-white">
              {['Generate credible evidence', 'Translate insight for policy', 'Strengthen institutional action'].map((item, index) => <li key={item} className="flex items-start gap-4"><span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 font-semibold text-gold">{index + 1}</span><span className="pt-1">{item}</span></li>)}
            </ol>
          </motion.aside>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(20rem,0.55fr)] lg:items-end">
            <div><h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Research Focus</h2><h3 className="max-w-2xl text-3xl font-serif text-slate-900 sm:text-5xl">Turning evidence into better decisions</h3></div>
            <p className="max-w-xl text-base leading-8 text-slate-600 lg:justify-self-end">Our work connects data, institutions, technology, and public policy to address national priorities and strengthen Nigeria's innovation ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {researchAreas.map((area, index) => (
              <motion.article key={area.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group flex min-h-[22rem] flex-col rounded-[11px] border border-slate-200 bg-slate-50 p-7 transition-colors hover:border-emerald-700">
                <div className="mb-8 flex items-center justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-slate-200 bg-white text-emerald-700"><area.icon aria-hidden="true" className="h-6 w-6" /></div><span className="font-serif text-2xl text-slate-400" aria-hidden="true">0{index + 1}</span></div>
                <h4 className="mb-4 min-h-[3.5rem] text-xl font-serif leading-7 text-slate-900">{area.title}</h4>
                <ExpandableSummary text={area.description} lines={4} />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center"><h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Research Resources</h2><h3 className="mb-6 text-3xl font-serif text-slate-900 sm:text-5xl">Continue your research journey</h3><p className="text-base leading-8 text-slate-600">Discover research outputs, join knowledge-sharing activities, and find opportunities to work with us.</p></div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {researchPathways.map((pathway) => (
              <motion.article key={pathway.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex min-h-[25rem] flex-col rounded-[11px] border border-slate-200 bg-white p-8">
                <pathway.icon aria-hidden="true" className="mb-7 h-8 w-8 text-emerald-700" /><p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gold">{pathway.eyebrow}</p><h4 className="mb-4 min-h-[4rem] text-2xl font-serif leading-8 text-slate-900">{pathway.title}</h4>
                <ExpandableSummary text={pathway.description} lines={3} />
                <Link to={pathway.link} className="mt-6 inline-flex min-h-11 w-fit items-center rounded-md text-xs font-bold uppercase tracking-wider text-emerald-700 transition-colors hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4">{pathway.action} <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl"><p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">Research partnerships</p><h2 className="mb-4 text-3xl font-serif sm:text-4xl">Build better evidence with NACETEM</h2><p className="max-w-2xl leading-8 text-slate-300">Partner with our researchers on policy studies, innovation intelligence, institutional learning, and technology-management challenges.</p></div>
          <Link to="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-[6px] bg-gold px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-900 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900">Discuss a Research Partnership <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
