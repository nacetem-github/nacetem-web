import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Database, Download, FileText, Search, UserRound, Video } from 'lucide-react';
import { assets } from '../assets';
import { useData } from '../contexts/DataContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

type YearFilter = 'all' | '2026' | '2025' | '2024' | 'archive';

type DisplaySeminar = {
  title: string;
  presenter: string;
  date: string;
  year: number;
  category: string;
  summary?: string;
  registrationUrl?: string;
  meetingUrl?: string;
  presentationUrl: string | null;
  presentationSize?: string;
  videoUrl: string | null;
  image?: string;
  thumbnail?: string;
  authorImage?: string;
  imageUrl?: string;
};

const seededSeminars: DisplaySeminar[] = [
  {
    title: 'NACETEM Capacity Building',
    presenter: 'Engr. Chibuzo Onyia',
    date: 'January 2026',
    year: 2026,
    category: 'Capacity Building',
    presentationUrl: '/uploads/research/seminar-series/2026/presentations/January/NACETEM CAPACITY BUILDING _Engr-Chibuzo-Onyia_Slide.pptx',
    presentationSize: '8.0 MB',
    videoUrl: null,
  },
  {
    title: 'ENGR Gumus Presentation',
    presenter: 'Engr. Seigha Gumus, FNIMechE',
    date: 'February 2026',
    year: 2026,
    category: 'Engineering Research',
    presentationUrl: '/uploads/research/seminar-series/2026/presentations/February/ENGR Gumus presentation_023257.pptx',
    presentationSize: '563 KB',
    videoUrl: null,
  },
  {
    title: 'Waste to Value Presentation',
    presenter: 'NACETEM Researcher',
    date: 'March 2026',
    year: 2026,
    category: 'Circular Economy',
    presentationUrl: '/uploads/research/seminar-series/2026/presentations/March/Waste to value presentation.pptx',
    presentationSize: '13.0 MB',
    videoUrl: null,
  },
  {
    title: 'May 21 Researchers Series',
    presenter: 'NACETEM Researcher',
    date: 'May 2026',
    year: 2026,
    category: 'Research Seminar',
    presentationUrl: '/uploads/research/seminar-series/2026/presentations/May/MAY 21 RESEARCHERS SERIES (2).pptx',
    presentationSize: '1.8 MB',
    videoUrl: null,
  },
  {
    title: 'FACTORS INFLUENCING THE ADOPTION OF GREEN SUPPLY CHAIN MANAGEMENT TECHNOLOGIES AND PRACTICES IN SELECTED PHARMACEUTICAL AND TEXTILE FIRMS IN SOUTHWESTERN NIGERIA',
    presenter: 'Grace OJO-EMMANUEL',
    date: '21st August, 2025',
    year: 2025,
    category: 'Green Technology',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/green-supply-chain-management-technologies-grace-ojo-emmanuel.pptx',
    presentationSize: '761 KB',
    videoUrl: null,
  },
  {
    title: 'ICT Integration in Improving Agility of Petroleum Distribution in Nigeria',
    presenter: 'Dr. Obiageli Nneka Nze',
    date: '2025',
    year: 2025,
    category: 'Digital Transformation',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/ict-integration-petroleum-distribution-obiageli-nze.pptx',
    presentationSize: '4.3 MB',
    videoUrl: null,
  },
  {
    title: 'Modeling the Nigerian Education System: A system dynamics approach',
    presenter: 'Victor O. Sobanke (PhD)',
    date: '2025',
    year: 2025,
    category: 'Education Systems',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/modeling-nigerian-education-system-victor-sobanke.pptx',
    presentationSize: '474 KB',
    videoUrl: null,
  },
  {
    title: 'Development and Optimization of Super-hydrophobic Biochar-infused Coating for Corrosion Protection of Carbon Steel Pipelines in Oil and Gas Facilities',
    presenter: 'Engr. AYUBA, David Mshelia',
    date: '2025',
    year: 2025,
    category: 'Materials Engineering',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/biochar-coating-corrosion-protection-david-mshelia.pptx',
    presentationSize: '1.8 MB',
    videoUrl: null,
  },
  {
    title: 'Application of RSM in Analyzing Weld Metal Viscosity in Mild Steel Welds',
    presenter: 'Engr. Seigha Gumus, FNIMechE',
    date: '2025',
    year: 2025,
    category: 'Engineering Research',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/rsm-weld-metal-viscosity-seigha-gumus.pptx',
    presentationSize: '736 KB',
    videoUrl: null,
  },
  {
    title: 'Green Project Management in Nigeria: Challenges and Prospects',
    presenter: 'Osita Ben Agbatah',
    date: '2025',
    year: 2025,
    category: 'Project Management',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/green-project-management-nigeria-osita-agbatah.pdf',
    presentationSize: '1.1 MB',
    videoUrl: null,
  },
  {
    title: 'Metering as a Tool for Minimizing Non-Technical Losses in Yola Electricity Distribution Company',
    presenter: 'Engr. AMOS, Chinda',
    date: 'March 2025',
    year: 2025,
    category: 'Energy Systems',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/metering-non-technical-losses-yola-electricity-amos-chinda.pptx',
    presentationSize: '1.7 MB',
    videoUrl: null,
  },
  {
    title: 'MATHEMATICAL MODELLING APPROACH TO GIVE INSIGHT TO THE STUDY OF SINGLE VARIANT FOOD-BORNE NIPAH VIRUS DISEASE TRANSMISSION DYNAMICS',
    presenter: 'ABANG SUNDAY IGWE SCOTT (Ph.D, Nigeria)',
    date: '2025',
    year: 2025,
    category: 'Health Modelling',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/nipah-virus-transmission-dynamics-abang-scott.pdf',
    presentationSize: '805 KB',
    videoUrl: null,
  },
  {
    title: 'The Adoption of Internet-based Technological Innovations in Latecomer Industrial Settings',
    presenter: 'OLOMU, MICHAEL O. PhD',
    date: '2025',
    year: 2025,
    category: 'Industrial Innovation',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/internet-based-technological-innovations-michael-olomu.pptx',
    presentationSize: '2.1 MB',
    videoUrl: null,
  },
  {
    title: 'ASSESSMENT OF THE SURFACE WATER AND GROUNDWATER INTERACTION WITHIN THE OPA DRAINAGE BASIN, SOUTH-WESTERN NIGERIA',
    presenter: 'OKPURU Ogbonna Aguta',
    date: '2025',
    year: 2025,
    category: 'Environmental Research',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/surface-water-groundwater-interaction-opa-basin-okpuru-aguta.pptx',
    presentationSize: '3.5 MB',
    videoUrl: null,
  },
  {
    title: 'PRESIDENTIAL PRIORITIES AND MINISTERIAL DELIVERABLES (PP&MD): THE ROLE OF NACETEM.',
    presenter: 'EMEKA JOSEPH',
    date: '2025',
    year: 2025,
    category: 'STI Policy',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/presidential-priorities-ministerial-deliverables-emeka-joseph.pptx',
    presentationSize: '450 KB',
    videoUrl: null,
  },
  {
    title: "Unlocking Nigeria's Natural Resources through Strategies for Sustainable Development in Clean Energy",
    presenter: 'Thompson-Adewole Valentina',
    date: '2025',
    year: 2025,
    category: 'Clean Energy',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/unlocking-nigerias-natural-resources-clean-energy.pptx',
    presentationSize: '1.9 MB',
    videoUrl: null,
  },
  {
    title: 'Assessment of Atmospheric Particulate Matter and Air Pollutants in Five Motor Parks in Ughelli, Delta State, Nigeria',
    presenter: 'Dr. Tari, Joel Honda',
    date: '2025',
    year: 2025,
    category: 'Environmental Research',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/assessment-atmospheric-particulate-matter-air-pollutants-ughelli.pptx',
    presentationSize: '2.0 MB',
    videoUrl: null,
  },
  {
    title: 'Digital Transformation in Nigerian Private Universities: Adoption of E-Learning Technologies',
    presenter: 'Victor O. Sobanke (PhD)',
    date: '2025',
    year: 2025,
    category: 'Digital Education',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/digital-transformation-nigerian-private-universities-elearning.pptx',
    presentationSize: '406 KB',
    videoUrl: null,
  },
  {
    title: 'Collaborative Manufacturing Network: A Tool for SMMEs Growth in Nigeria',
    presenter: 'Engr A.A OGUNGBEMI',
    date: '2025',
    year: 2025,
    category: 'Manufacturing Systems',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/collaborative-manufacturing-network-smmes-growth-nigeria.pptx',
    presentationSize: '195 KB',
    videoUrl: null,
  },
  {
    title: 'Integrated Framework for R&D Commercialisation at Public Research Institutions',
    presenter: 'Dr. Babalola O.O. (ADR)',
    date: '20th March, 2025',
    year: 2025,
    category: 'R&D Commercialisation',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/rd-commercialisation-public-research-institutions.pdf',
    presentationSize: '1.5 MB',
    videoUrl: null,
  },
  {
    title: 'Proposal on In-Depth Evaluation of Leather Tanning Industry in the North-West Region of Nigeria',
    presenter: 'Mohammed Zayyanu Musa',
    date: '2025',
    year: 2025,
    category: 'Industrial Research',
    presentationUrl: '/uploads/research/seminar-series/2025/presentations/leather-tanning-industry-north-west-nigeria.pptx',
    presentationSize: '444 KB',
    videoUrl: null,
  },
  {
    title: 'Investigating the Tribological Properties of Mahogany Seed Oil',
    presenter: 'Mr Ayuba David Mshelia',
    date: '8th April, 2024',
    year: 2024,
    category: 'Materials Research',
    presentationUrl: null,
    videoUrl: null,
  },
  {
    title: 'Technology Management for a Successful Transport System in Nigeria',
    presenter: 'Mrs Olayemi Dickson',
    date: '19th March, 2024',
    year: 2024,
    category: 'Technology Management',
    presentationUrl: null,
    videoUrl: null,
  },
  {
    title: 'A Hybrid Simulation that Enables Realistic Examination Scenarios',
    presenter: 'R. C. Wakawa',
    date: '21st September 2023',
    year: 2023,
    category: 'Simulation Research',
    presentationUrl: null,
    videoUrl: null,
  },
  {
    title: 'Are you nervous that AI will take your job?',
    presenter: 'Dr Olabanji Onifade',
    date: 'Oct 19th, 2023',
    year: 2023,
    category: 'Artificial Intelligence',
    presentationUrl: null,
    videoUrl: null,
  },
  {
    title: 'Determinants of Green Innovation in Small & Medium Scale Enterprises in Nigeria',
    presenter: 'Babatunde Adetunji AODU',
    date: '15th June, 2023',
    year: 2023,
    category: 'Green Innovation',
    presentationUrl: null,
    videoUrl: null,
  },
  {
    title: 'Female Participation in Technical, Vocational Education and Occupation in Nigeria (Quality Education-SDG 4; Gender Equality-SDG 5)',
    presenter: 'Dr. David Olutunde Babalola',
    date: '19th of April, 2023',
    year: 2023,
    category: 'Education & Gender',
    presentationUrl: null,
    videoUrl: null,
  },
  {
    title: 'STI Policy Implementation Plan',
    presenter: 'Engr. Dr Kazeem Abubakar',
    date: '16th, March 2023',
    year: 2023,
    category: 'STI Policy',
    presentationUrl: null,
    videoUrl: null,
  },
];

const yearOptions: Array<{ value: YearFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: 'archive', label: 'Archive' },
];

function formatSeminarDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function formatDisplayText(value: string) {
  const minorWords = new Set(['a', 'an', 'and', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with']);
  const acronymWords = new Set(['ai', 'ict', 'r&d', 'rsm', 'sdg', 'sti', 'smmes', 'pp&md']);

  return value
    .split(/(\s+)/)
    .map((part, index) => {
      if (/^\s+$/.test(part)) return part;

      return part
        .split(/(-)/)
        .map((segment) => {
          if (segment === '-') return segment;
          if (/[a-z]/.test(segment) && !/^[A-Z][a-z]+$/.test(segment)) return segment;
          if (/^[A-Z]\.(?:[A-Z]\.)*$/i.test(segment)) return segment.toUpperCase();
          const lower = segment.toLowerCase();
          const trimmed = lower.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '');

          if (!trimmed) return segment;
          if (acronymWords.has(trimmed)) return segment.toUpperCase();
          if (trimmed === 'phd' || trimmed === 'ph.d') return segment.replace(/[a-z.]+/i, 'PhD');
          if (minorWords.has(trimmed) && index !== 0) return lower;

          return lower.replace(/[a-z]/, (char) => char.toUpperCase());
        })
        .join('');
    })
    .join('');
}

function fileName(url: string | null) {
  if (!url) return 'No file attached';
  return decodeURIComponent(url.split('/').pop() ?? 'presentation-file');
}

function fileSize(seminar: DisplaySeminar) {
  return seminar.presentationSize?.trim() || 'Not listed';
}

function seminarImageUrl(seminar: DisplaySeminar) {
  return seminar.imageUrl || seminar.thumbnail || seminar.image || seminar.authorImage || '';
}

function isArchiveYear(year: number) {
  return year < 2024;
}

function searchableText(seminar: DisplaySeminar) {
  return [
    seminar.title,
    seminar.presenter,
    seminar.category,
    seminar.summary,
    seminar.year,
    seminar.date,
    fileName(seminar.presentationUrl),
  ]
    .join(' ')
    .toLowerCase();
}

function filterSeminars(seminars: DisplaySeminar[], query: string, year: YearFilter, author: string) {
  const normalizedQuery = query.trim().toLowerCase();

  return seminars.filter((seminar) => {
    const matchesSearch = !normalizedQuery || searchableText(seminar).includes(normalizedQuery);
    const matchesYear =
      year === 'all' ||
      (year === 'archive' ? isArchiveYear(seminar.year) : seminar.year === Number(year));
    const matchesAuthor = author === 'all' || seminar.presenter === author;

    return matchesSearch && matchesYear && matchesAuthor;
  });
}

function SeminarFilterBar({
  searchQuery,
  selectedYear,
  selectedAuthor,
  authors,
  resultCount,
  totalCount,
  onSearchChange,
  onYearChange,
  onAuthorChange,
}: {
  searchQuery: string;
  selectedYear: YearFilter;
  selectedAuthor: string;
  authors: string[];
  resultCount: number;
  totalCount: number;
  onSearchChange(value: string): void;
  onYearChange(value: YearFilter): void;
  onAuthorChange(value: string): void;
}) {
  return (
    <div className="mb-10 rounded-[8px] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-2 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Research Archive Filter</p>
          <h4 className="mt-2 text-2xl font-serif text-slate-900">Find Seminar Materials</h4>
        </div>
        <p className="text-sm font-semibold text-slate-600">
          Showing <span className="text-slate-900">{resultCount}</span> of <span className="text-slate-900">{totalCount}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(150px,0.55fr)_minmax(220px,0.8fr)]">
        <label htmlFor="seminar-search" className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Search
          <span className="relative mt-2 block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="seminar-search"
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search titles, keywords, categories, or file names"
              className="h-12 w-full rounded-[6px] border border-slate-200 bg-white pl-10 pr-4 text-sm font-semibold normal-case text-slate-800 outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            />
          </span>
        </label>

        <label htmlFor="seminar-year" className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Year
          <select
            id="seminar-year"
            value={selectedYear}
            onChange={(event) => onYearChange(event.target.value as YearFilter)}
            className="mt-2 h-12 w-full rounded-[6px] border border-slate-200 bg-white px-3 text-sm font-semibold normal-case text-slate-800 outline-none transition-colors hover:border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          >
            {yearOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="seminar-author" className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Author
          <select
            id="seminar-author"
            value={selectedAuthor}
            onChange={(event) => onAuthorChange(event.target.value)}
            className="mt-2 h-12 w-full rounded-[6px] border border-slate-200 bg-white px-3 text-sm font-semibold normal-case text-slate-800 outline-none transition-colors hover:border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          >
            <option value="all">All Authors</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {formatDisplayText(author)}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

function SeminarVisualBlock({ seminar }: { seminar: DisplaySeminar }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = seminarImageUrl(seminar);

  if (imageSrc && !imageFailed) {
    return (
      <div className="relative flex h-44 shrink-0 items-center justify-center overflow-hidden border-b border-slate-200 bg-sky-50 lg:h-auto lg:w-48 lg:border-b-0 lg:border-r">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/70" />
        <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-white/55" />
        <img
          src={imageSrc}
          alt=""
          className="relative h-20 w-20 rounded-[8px] border border-slate-200 bg-white object-cover shadow-sm md:h-24 md:w-24"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className="relative flex h-44 shrink-0 items-center justify-center overflow-hidden border-b border-slate-200 bg-sky-50 lg:h-auto lg:w-48 lg:border-b-0 lg:border-r">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/70" />
      <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-white/55" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-[8px] border border-sky-100 bg-white/80 text-sky-700 shadow-sm">
        <Database className="h-10 w-10" />
      </div>
    </div>
  );
}

function MissingText({ children }: { children: string }) {
  const isMissing = !children || ['not listed', 'no file attached'].includes(children.toLowerCase());
  return <span className={isMissing ? 'italic text-slate-400/80' : 'text-slate-800'}>{children}</span>;
}

function SeminarCard({ seminar }: { key?: string; seminar: DisplaySeminar }) {
  const hasPresentation = Boolean(seminar.presentationUrl);

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeInUp}
      className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-600 hover:shadow-md"
    >
      <div className="flex flex-col lg:flex-row">
        <SeminarVisualBlock seminar={seminar} />

        <div className="grid min-w-0 flex-1 gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_210px] lg:items-center">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-[4px] bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                {seminar.year}
              </span>
              <span className="rounded-[4px] bg-sky-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-800">
                {seminar.category}
              </span>
              <span className="inline-flex items-center rounded-[4px] border border-slate-200 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <Calendar className="mr-1.5 h-3.5 w-3.5" />
                {formatSeminarDate(seminar.date)}
              </span>
            </div>

            <h4 className="text-xl font-serif leading-tight text-slate-900 sm:text-2xl">{formatDisplayText(seminar.title)}</h4>

            <div className="mt-4 flex items-start gap-3 rounded-[6px] border border-slate-200 bg-slate-50 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700">
                <UserRound className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Author</p>
                <p className="mt-1 text-sm font-bold leading-5 text-slate-900">{formatDisplayText(seminar.presenter)}</p>
              </div>
            </div>

            {seminar.summary ? <p className="mt-4 text-sm leading-6 text-slate-600">{seminar.summary}</p> : null}

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_150px]">
              <div className="rounded-[6px] border border-slate-200 bg-white px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">File Name</p>
                <p className="mt-1 truncate text-sm font-bold">
                  <MissingText>{fileName(seminar.presentationUrl)}</MissingText>
                </p>
              </div>
              <div className="rounded-[6px] border border-slate-200 bg-white px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">File Size</p>
                <p className="mt-1 text-sm font-bold">
                  <MissingText>{fileSize(seminar)}</MissingText>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:items-stretch">
            {hasPresentation ? (
              <a
                href={seminar.presentationUrl ?? undefined}
                download
                className="inline-flex min-h-12 transform items-center justify-center rounded-[6px] bg-emerald-700 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-[6px] bg-slate-200 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                File Pending
              </button>
            )}

            {seminar.videoUrl ? (
              <a
                href={seminar.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-slate-300 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-900 transition-colors hover:border-emerald-600 hover:text-emerald-700"
              >
                <Video className="mr-2 h-4 w-4" />
                Watch Video
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function SeminarSeries() {
  const { seminars: managedSeminars } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<YearFilter>('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');

  const seminars: DisplaySeminar[] = managedSeminars
    .filter((item) => item.status === 'published')
    .map((item) => ({
      ...item,
      date: item.seminarDate,
      category: item.category || 'Research Seminar',
      presentationUrl: item.presentationUrl ?? null,
      presentationSize: item.presentationSize || 'Not listed',
      videoUrl: item.videoUrl ?? null,
    }));

  const displayedSeminars = seminars.length ? seminars : seededSeminars;
  const authors = useMemo(
    () => Array.from(new Set(displayedSeminars.map((seminar) => seminar.presenter))).sort((a, b) => a.localeCompare(b)),
    [displayedSeminars],
  );
  const filteredSeminars = useMemo(
    () => filterSeminars(displayedSeminars, searchQuery, selectedYear, selectedAuthor).sort((a, b) => b.year - a.year || a.title.localeCompare(b.title)),
    [displayedSeminars, searchQuery, selectedAuthor, selectedYear],
  );

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 font-sans">
      <section className="relative overflow-hidden border-b-8 border-gold bg-slate-900 pb-24 pt-32 lg:pb-32 lg:pt-40">
        <div className="absolute inset-0">
          <img
            src={assets.seminarImage}
            alt="NACETEM Seminar Series"
            className="h-full w-full object-cover opacity-30 mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center border-b border-gold px-1 pb-1 text-xs font-bold uppercase tracking-widest text-gold">
              Research
            </div>
            <h1 className="mb-8 text-4xl font-serif leading-tight text-white md:text-5xl lg:text-7xl">Research Seminars</h1>
            <p className="mx-auto mb-10 max-w-3xl text-xl font-light leading-relaxed text-slate-100/90">
              Sharing research findings, emerging ideas, and practical insights across science, technology,
              innovation, and public policy.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 pr-10 sm:px-6 sm:pr-12 lg:px-8 lg:pr-24 xl:pr-28">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-600">NACETEM Researchers' Seminar Series</h2>
            <h3 className="text-3xl font-serif text-slate-900 sm:text-4xl">Research Archive</h3>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              Filter high-volume seminar records by keyword, year, and author, then download the available presentation files.
            </p>
          </div>

          <SeminarFilterBar
            searchQuery={searchQuery}
            selectedYear={selectedYear}
            selectedAuthor={selectedAuthor}
            authors={authors}
            resultCount={filteredSeminars.length}
            totalCount={displayedSeminars.length}
            onSearchChange={setSearchQuery}
            onYearChange={setSelectedYear}
            onAuthorChange={setSelectedAuthor}
          />

          {filteredSeminars.length > 0 ? (
            <div className="space-y-5 lg:pr-20 xl:pr-24">
              {filteredSeminars.map((seminar) => (
                <SeminarCard key={`${seminar.title}-${seminar.presenter}-${seminar.year}`} seminar={seminar} />
              ))}
            </div>
          ) : (
            <div className="rounded-[8px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center lg:mr-20 xl:mr-24">
              <FileText className="mx-auto mb-5 h-9 w-9 text-emerald-700" />
              <h4 className="mb-3 text-2xl font-serif text-slate-900">No matching seminar records</h4>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600">
                Adjust your search, year, or author filters to widen the archive results.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
