import {
  ArrowRight,
  ChevronRight,
  Download,
  File,
  FileText,
  Layers,
  Newspaper,
  Tag,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { assets } from '../assets';
import { useData } from '../contexts/DataContext';
import type { PublicationItem, PublicationType } from '../types/content';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const containerClass = 'mx-auto max-w-7xl px-4 pr-10 sm:px-6 sm:pr-12 lg:pl-8 lg:pr-24 xl:pr-28';

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
  'technical-report': File,
  newsletter: Newspaper,
  other: Layers,
};

const typeVisualStyles: Record<PublicationType, { panel: string; icon: string; ring: string }> = {
  'policy-brief': {
    panel: 'bg-emerald-50',
    icon: 'text-emerald-700',
    ring: 'border-emerald-100 bg-white/70',
  },
  'technical-report': {
    panel: 'bg-slate-100',
    icon: 'text-slate-700',
    ring: 'border-slate-200 bg-white/75',
  },
  newsletter: {
    panel: 'bg-amber-50',
    icon: 'text-gold',
    ring: 'border-amber-100 bg-white/75',
  },
  other: {
    panel: 'bg-sky-50',
    icon: 'text-sky-700',
    ring: 'border-sky-100 bg-white/75',
  },
};

const sectionDefinitions = [
  {
    id: 'policy-briefs',
    type: 'policy-brief' as const,
    kicker: 'Policy Briefs',
    title: 'Evidence for Innovation Policy',
  },
  {
    id: 'technical-reports',
    type: 'technical-report' as const,
    kicker: 'Technical Reports',
    title: 'Research Systems and Technical Evidence',
  },
  {
    id: 'newsletter',
    type: 'newsletter' as const,
    kicker: 'Newsletters',
    title: 'NACETEM Newsletter Editions',
  },
  {
    id: 'other-publications',
    type: 'other' as const,
    kicker: 'Additional Publications',
    title: 'More NACETEM Knowledge Resources',
  },
];

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

function fileFormat(url?: string) {
  const extension = url?.split('?')[0]?.split('#')[0]?.split('.').pop();
  return extension ? extension.toUpperCase() : 'Unavailable';
}

function fileSize(item: PublicationItem) {
  return item.fileSize?.trim() || 'Not listed';
}

function publicationImageUrl(item: PublicationItem) {
  const imageFields = item as PublicationItem & {
    image?: string;
    thumbnail?: string;
    authorImage?: string;
  };

  return imageFields.coverImageUrl || imageFields.thumbnail || imageFields.image || imageFields.authorImage || '';
}

function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
      <div className={`${containerClass} py-4`}>
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <li>
            <a href="/" className="font-medium text-slate-600 transition-colors hover:text-emerald-700">
              Home
            </a>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </li>
          <li>
            <a href="/publications" className="font-medium text-slate-600 transition-colors hover:text-emerald-700">
              Publications
            </a>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </li>
          <li className="font-bold text-slate-900" aria-current="page">
            {current}
          </li>
        </ol>
      </div>
    </nav>
  );
}

function CollectionOverview({ published }: { published: PublicationItem[] }) {
  return (
    <section className="border-b border-slate-200 bg-white py-12">
      <div className={containerClass}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {sectionDefinitions.map(({ id, type }) => {
            const items = groupByType(published, type);

            return (
              <a
                key={type}
                href={`#${id}`}
                className="group rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-600 hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Collection</p>
                  <span className="rounded-[4px] bg-slate-100 px-2.5 py-1 text-sm font-bold text-slate-700">{items.length}</span>
                </div>
                <h2 className="text-xl font-serif text-slate-900">{typeLabels[type]}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{typeDescriptions[type]}</p>
                <span className="mt-5 inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700">
                  View Collection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PublicationVisual({ item }: { item: PublicationItem }) {
  const Icon = typeIcons[item.type] ?? FileText;
  const visual = typeVisualStyles[item.type] ?? typeVisualStyles.other;
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = publicationImageUrl(item);

  if (imageSrc && !imageFailed) {
    return (
      <div className={`relative flex h-52 shrink-0 items-center justify-center overflow-hidden border-b border-slate-200 ${visual.panel} md:h-auto md:w-56 md:border-b-0 md:border-r`}>
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/55" />
        <div className="absolute -bottom-14 -left-12 h-40 w-40 rounded-full bg-white/45" />
        <img
          src={imageSrc}
          alt=""
          className="relative h-24 w-24 rounded-[8px] border border-slate-200 bg-white object-cover shadow-sm"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={`relative flex h-52 shrink-0 items-center justify-center overflow-hidden border-b border-slate-200 ${visual.panel} md:h-auto md:w-56 md:border-b-0 md:border-r`}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/55" />
      <div className="absolute -bottom-14 -left-12 h-40 w-40 rounded-full bg-white/45" />
      <div className="relative text-center">
        <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-[8px] border shadow-sm ${visual.ring} ${visual.icon}`}>
          <Icon className="h-12 w-12" />
        </div>
        <div className="mt-5 px-6 text-xs font-bold uppercase tracking-widest text-slate-600">{typeLabels[item.type]}</div>
      </div>
    </div>
  );
}

function MetadataItem({ icon: Icon, label, value }: { icon: typeof FileText; label: string; value: string | number }) {
  const displayValue = String(value ?? '').trim();
  const isMissing = !displayValue || ['not listed', 'unavailable', 'null'].includes(displayValue.toLowerCase());

  return (
    <div className="min-w-0 rounded-[6px] border border-slate-200 bg-slate-50 px-3 py-2">
      <dt className="flex items-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
        <Icon className="mr-1.5 h-3.5 w-3.5" />
        {label}
      </dt>
      <dd className={`mt-1 text-sm font-bold leading-5 ${isMissing ? 'italic text-slate-400/80' : 'text-slate-900'}`}>
        {displayValue || 'Not listed'}
      </dd>
    </div>
  );
}

function PublicationCard({ item }: { key?: string; item: PublicationItem }) {
  const Icon = typeIcons[item.type] ?? FileText;
  const format = fileFormat(item.fileUrl);

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeInUp}
      className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-600 hover:shadow-md"
    >
      <div className="flex h-full flex-col md:flex-row">
        <PublicationVisual item={item} />

        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-[4px] bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              <Icon className="mr-1.5 h-3.5 w-3.5" />
              {typeLabels[item.type]}
            </span>
            <span className="rounded-[4px] border border-slate-200 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
              {item.year}
            </span>
            {item.featured && (
              <span className="rounded-[4px] bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-900">
                Featured
              </span>
            )}
          </div>

          <h4 className="text-xl font-serif leading-tight text-slate-900 sm:text-2xl">{item.title}</h4>
          <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{item.summary}</p>

          <div className="mt-6 border-t border-slate-200 pt-5">
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <MetadataItem icon={User} label="Author Name" value={item.author || 'NACETEM'} />
              <MetadataItem icon={File} label="File Format" value={format} />
              <MetadataItem icon={Tag} label="File Size" value={fileSize(item)} />
            </dl>

            <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="min-w-0 truncate text-xs font-medium text-slate-500">{fileName(item.fileUrl)}</p>
              {item.fileUrl ? (
                <a
                  href={item.fileUrl}
                  download
                  aria-label={`Download ${item.title}`}
                  className="inline-flex min-h-11 shrink-0 transform items-center justify-center rounded-[6px] bg-emerald-700 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download {format !== 'Unavailable' ? format : 'File'}
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex min-h-11 shrink-0 cursor-not-allowed items-center justify-center rounded-[6px] bg-slate-200 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  File Coming Soon
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function PublicationSection({ id, title, kicker, items }: { id: string; title: string; kicker: string; items: PublicationItem[] }) {
  if (!items.length) return null;

  return (
    <section id={id} className="border-b border-slate-200 bg-slate-50 py-16 scroll-mt-28">
      <div className={containerClass}>
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">{kicker}</h2>
            <h3 className="text-3xl font-serif text-slate-900 sm:text-4xl">{title}</h3>
          </div>
          <span className="rounded-[6px] border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700">
            {items.length} record{items.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="space-y-5">
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
  const [selectedNewsletterId, setSelectedNewsletterId] = useState<string | undefined>();

  const published = useMemo(
    () => publications.filter((item) => item.status === 'published').sort(byYearThenTitle),
    [publications],
  );

  const policyBriefs = groupByType(published, 'policy-brief');
  const technicalReports = groupByType(published, 'technical-report');
  const newsletters = groupByType(published, 'newsletter').filter((item) => item.fileUrl);
  const otherPublications = groupByType(published, 'other');
  const selectedNewsletter = newsletters.find((item) => item.id === selectedNewsletterId) ?? newsletters[0];

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

        <div className={`relative z-10 text-center ${containerClass}`}>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center border-b border-gold px-1 pb-1 text-xs font-bold uppercase tracking-widest text-gold">
              NACETEM Knowledge Products
            </div>
            <h1 className="mb-8 text-4xl font-serif leading-tight text-white md:text-5xl lg:text-7xl">Publications</h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-100/90 sm:text-xl">
              Access NACETEM policy briefs, technical reports, newsletters, and other evidence products supporting science, technology, innovation, and national development.
            </p>
          </motion.div>
        </div>
      </section>

      <Breadcrumb current="Knowledge Library" />
      <CollectionOverview published={published} />

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
        <section id="newsletter" className="border-b border-slate-200 bg-white py-16 scroll-mt-28">
          <div className={containerClass}>
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">Newsletters</h2>
                <h3 className="text-3xl font-serif text-slate-900 sm:text-4xl">NACETEM Newsletter Editions</h3>
              </div>
              <span className="rounded-[6px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
                {newsletters.length} edition{newsletters.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-5 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Currently Viewing</p>
                    <h4 className="mt-1 text-xl font-serif text-slate-900">{selectedNewsletter.title}</h4>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <span>{selectedNewsletter.year}</span>
                      <span>{fileFormat(selectedNewsletter.fileUrl)}</span>
                      <span>{fileSize(selectedNewsletter)}</span>
                    </div>
                  </div>
                  <a
                    href={selectedNewsletter.fileUrl}
                    download
                    className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-[6px] bg-emerald-700 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
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
                        onClick={() => setSelectedNewsletterId(newsletter.id)}
                        className={`flex w-full items-center justify-between rounded-[6px] border px-4 py-3 text-left transition-colors ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/60'
                        }`}
                        aria-pressed={isSelected}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-bold">{newsletter.title}</span>
                          <span className="mt-1 block text-xs text-slate-500">
                            {newsletter.year} {fileFormat(newsletter.fileUrl)} newsletter
                          </span>
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
