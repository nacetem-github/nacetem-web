import { ArrowRight, BookOpen, Download, FileText, Layers, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { assets } from '../assets';
import { useData } from '../contexts/DataContext';
import type { PublicationItem, PublicationType } from '../types/content';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const typeLabels: Record<PublicationType, string> = {
  'policy-brief': 'Policy Brief',
  'technical-report': 'Technical Report',
  newsletter: 'Newsletter',
  other: 'Publication',
};

const typeDescriptions: Record<PublicationType, string> = {
  'policy-brief': 'Concise evidence-based insights for policy actors, researchers, institutions, and innovation stakeholders.',
  'technical-report': 'Detailed research reports, assessments, and technical findings for deeper institutional learning.',
  newsletter: 'Periodic updates covering NACETEM programmes, research activities, institutional news, and STI engagements.',
  other: 'Additional knowledge resources produced or shared by NACETEM.',
};

const typeIcons = {
  'policy-brief': FileText,
  'technical-report': BookOpen,
  newsletter: Newspaper,
  other: Layers,
};

function byYearThenTitle(a: PublicationItem, b: PublicationItem) {
  return b.year - a.year || a.title.localeCompare(b.title);
}

function groupByType(items: PublicationItem[], type: PublicationType) {
  return items.filter((item) => item.type === type).sort(byYearThenTitle);
}

function fileName(url?: string) {
  if (!url) return 'File unavailable';
  return decodeURIComponent(url.split('/').pop() ?? 'Download file');
}

function PublicationCard({ item }: { key?: string; item: PublicationItem }) {
  const Icon = typeIcons[item.type] ?? FileText;

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="flex h-full flex-col rounded-[8px] border border-slate-200 bg-white p-6 transition-all hover:border-emerald-500 hover:shadow-lg"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-emerald-700">
          <Icon className="mr-2 h-4 w-4" /> {typeLabels[item.type]}
        </div>
        <span className="rounded-[4px] border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-600">{item.year}</span>
      </div>
      <h4 className="text-xl font-serif leading-tight text-slate-900">{item.title}</h4>
      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{item.summary}</p>
      {item.author && <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">{item.author}</p>}
      <div className="mt-6 border-t border-slate-100 pt-5">
        <p className="mb-3 truncate text-xs text-slate-500">{fileName(item.fileUrl)}</p>
        {item.fileUrl ? (
          <a
            href={item.fileUrl}
            download
            className="inline-flex w-full items-center justify-center rounded-[6px] bg-emerald-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-emerald-700"
          >
            <Download className="mr-2 h-4 w-4" /> Download
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-[6px] bg-slate-200 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500"
          >
            File Coming Soon
          </button>
        )}
      </div>
    </motion.article>
  );
}

function PublicationSection({ id, title, kicker, items }: { id: string; title: string; kicker: string; items: PublicationItem[] }) {
  if (!items.length) return null;

  return (
    <section id={id} className="border-b border-slate-200 bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">{kicker}</h2>
          <h3 className="text-3xl font-serif text-slate-900 sm:text-4xl">{title}</h3>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <PublicationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Publications() {
  const { publications } = useData();
  const published = useMemo(
    () => publications.filter((item) => item.status === 'published').sort(byYearThenTitle),
    [publications],
  );
  const policyBriefs = groupByType(published, 'policy-brief');
  const technicalReports = groupByType(published, 'technical-report');
  const newsletters = groupByType(published, 'newsletter').filter((item) => item.fileUrl);
  const otherPublications = groupByType(published, 'other');
  const sections = [
    { id: 'policy-briefs', type: 'policy-brief' as const, items: policyBriefs },
    { id: 'technical-reports', type: 'technical-report' as const, items: technicalReports },
    { id: 'newsletter', type: 'newsletter' as const, items: newsletters },
  ];
  const [selectedNewsletter, setSelectedNewsletter] = useState<PublicationItem | undefined>(newsletters[0]);

  useEffect(() => {
    if (!selectedNewsletter || !newsletters.some((item) => item.id === selectedNewsletter.id)) {
      setSelectedNewsletter(newsletters[0]);
    }
  }, [newsletters, selectedNewsletter]);

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 font-sans">
      <section className="relative overflow-hidden border-b-8 border-gold bg-slate-900 pb-24 pt-32 lg:pb-32 lg:pt-40">
        <div className="absolute inset-0">
          <img
            src={assets.policyImage}
            alt="NACETEM publications"
            className="h-full w-full object-cover opacity-30 mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center border-b border-gold px-1 pb-1 text-xs font-bold uppercase tracking-widest text-gold">
              NACETEM Knowledge Products
            </div>
            <h1 className="mb-8 text-4xl font-serif leading-tight text-white md:text-5xl lg:text-7xl">
              Publications
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-100/90 sm:text-xl">
              Access NACETEM policy briefs, technical reports, newsletters, and other evidence products supporting science, technology, innovation, and national development.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {sections.map(({ id, type, items }) => {
              const Icon = typeIcons[type];

              return (
                <a
                  key={type}
                  href={`#${id}`}
                  className="group rounded-[8px] border border-slate-200 bg-slate-50 p-7 transition-all hover:border-emerald-500 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[6px] border border-slate-200 bg-white text-emerald-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mb-3 flex items-baseline justify-between gap-4">
                    <h2 className="text-2xl font-serif text-slate-900">{typeLabels[type]}</h2>
                    <span className="text-sm font-bold text-slate-500">{items.length}</span>
                  </div>
                  <p className="mb-6 text-sm leading-6 text-slate-600">{typeDescriptions[type]}</p>
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700">
                    View Collection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <PublicationSection
        id="policy-briefs"
        kicker="Policy Briefs"
        title="Evidence for Innovation Policy"
        items={policyBriefs}
      />

      <PublicationSection
        id="technical-reports"
        kicker="Technical Reports"
        title="Research Systems and Technical Evidence"
        items={technicalReports}
      />

      {selectedNewsletter && (
        <section id="newsletter" className="border-b border-slate-200 bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Newsletters</h2>
              <h3 className="text-3xl font-serif text-slate-900 sm:text-4xl">NACETEM Newsletter Editions</h3>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_300px]">
              <div className="rounded-[8px] border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Currently Viewing</p>
                    <h4 className="mt-1 text-lg font-serif text-slate-900">{selectedNewsletter.title}</h4>
                  </div>
                  <a
                    href={selectedNewsletter.fileUrl}
                    download
                    className="inline-flex items-center justify-center rounded-[6px] bg-emerald-600 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-emerald-700"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </a>
                </div>
                <iframe
                  key={selectedNewsletter.fileUrl}
                  src={`${selectedNewsletter.fileUrl}#toolbar=1&navpanes=0`}
                  title={selectedNewsletter.title}
                  className="h-[72vh] min-h-[520px] w-full bg-slate-100"
                />
              </div>

              <aside className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-32">
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Select Edition</h4>
                <div className="max-h-[620px] space-y-3 overflow-y-auto pr-1">
                  {newsletters.map((newsletter) => {
                    const isSelected = selectedNewsletter.id === newsletter.id;

                    return (
                      <button
                        key={newsletter.id}
                        type="button"
                        onClick={() => setSelectedNewsletter(newsletter)}
                        className={`flex w-full items-center justify-between rounded-[6px] border px-4 py-3 text-left transition-colors ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/60'
                        }`}
                        aria-pressed={isSelected}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-bold">{newsletter.title}</span>
                          <span className="mt-1 block text-xs text-slate-500">{newsletter.year} PDF newsletter</span>
                        </span>
                        <ArrowRight className={`ml-3 h-4 w-4 shrink-0 ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}

      <PublicationSection
        id="other-publications"
        kicker="Additional Publications"
        title="More NACETEM Knowledge Resources"
        items={otherPublications}
      />
    </div>
  );
}
