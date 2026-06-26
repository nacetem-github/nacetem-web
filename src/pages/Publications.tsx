import { ArrowRight, BookOpen, Download, FileText, Layers, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { assets } from '../assets';
import { useData } from '../contexts/DataContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const seededPolicyBriefs = [
  {
    title: 'How Innovative Are Enterprises in the Nigerian Informal Sector?',
    meta: 'Year 2020 Number 1',
    summary:
      "The informal sector contributes immensely to Nigeria's economic growth. Around 7 out of every 10 active businesses in Nigeria operate in the informal sector, employing a major share of private-sector workers. This brief examines innovation within informal enterprises and highlights why changing products, services, and business processes matters for competitiveness.",
  },
  {
    title: 'An Overview of Innovation in the Nigerian Business Sector',
    meta: 'Year 2020 Number 2',
    summary:
      "Science, Technology and Innovation indicators are increasingly used by companies, policymakers, and other stakeholders to inform decisions. This brief highlights innovation activity in Nigeria's industrial sector and the need for government support through infrastructure and economic incentives.",
  },
];

const seededTechnicalReports = [
  {
    title: 'Doing Research in Nigeria, Country Report: Assessing Social Science Research System in a Global Perspective',
    summary:
      "Domestic research capacity is critical for sustainable development because it supports scientific evidence based on each country's social, development, and policy challenges. This report presents findings from the Doing Research Assessment in Nigeria, including social science research production, gender representation, research funding, open access publishing, journal systems, and policy communication.",
    highlights: [
      'Nigeria is the second largest producer of social science research in Africa.',
      'Women remain underrepresented in the social science research system.',
      'Most research grants expended locally come from foreign sources.',
      "Open access publishing is common in Nigeria's social science research landscape.",
      'Researchers do not communicate findings extensively to policymakers and the public.',
    ],
    author: 'Engineer Professor Okechukwu Ukwuoma, PhD, FIIA, FNSChE, MNSE, KSM',
  },
];

const seededNewsletters = [
  {
    year: '2026',
    title: 'NACETEM Newsletter 2026 Edition',
    fileUrl: '/uploads/publications/newsletters/2026/nacetem-newsletter-2026.pdf',
  },
];

export default function Publications() {
  const { publications } = useData();
  const published = publications.filter((item) => item.status === 'published');
  const managedPolicyBriefs = published.filter((item) => item.type === 'policy-brief').map((item) => ({ ...item, meta: `Year ${item.year}` }));
  const policyBriefs = managedPolicyBriefs.length ? managedPolicyBriefs : seededPolicyBriefs;
  const managedTechnicalReports = published.filter((item) => item.type === 'technical-report').map((item) => ({ ...item, highlights: [] as string[], author: item.author ?? 'NACETEM' }));
  const technicalReports = managedTechnicalReports.length ? managedTechnicalReports : seededTechnicalReports;
  const managedNewsletters = published.filter((item) => item.type === 'newsletter' && item.fileUrl).map((item) => ({ year: String(item.year), title: item.title, fileUrl: item.fileUrl! }));
  const newsletters = managedNewsletters.length ? managedNewsletters : seededNewsletters;
  const [selectedNewsletter, setSelectedNewsletter] = useState(newsletters[0]);
  useEffect(() => { if (!newsletters.some((item) => item.fileUrl === selectedNewsletter.fileUrl)) setSelectedNewsletter(newsletters[0]); }, [newsletters, selectedNewsletter.fileUrl]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <img
            src={assets.policyImage}
            alt="NACETEM publications"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl mx-auto">
            <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              NACETEM Knowledge Products
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-tight mb-8">
              Research Publications and Knowledge Resources
            </h1>
            <p className="text-lg sm:text-xl text-slate-100/90 leading-relaxed font-light mx-auto max-w-3xl">
              Explore NACETEM's policy briefs, technical reports, newsletters, and evidence products supporting science, technology, innovation, and national development.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="#policy-briefs" className="group bg-slate-50 border border-slate-200 rounded-[11px] p-8 hover:border-emerald-500 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-[8px] bg-white border border-slate-200 flex items-center justify-center mb-6 text-emerald-700">
                <FileText className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-serif text-slate-900 mb-4">Policy Brief</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Concise evidence-based insights for policy actors, researchers, institutions, and innovation stakeholders.
              </p>
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700">
                View Policy Briefs <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a href="#technical-reports" className="group bg-slate-50 border border-slate-200 rounded-[11px] p-8 hover:border-emerald-500 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-[8px] bg-white border border-slate-200 flex items-center justify-center mb-6 text-emerald-700">
                <BookOpen className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-serif text-slate-900 mb-4">Technical Report</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Detailed research reports, system assessments, and technical findings for deeper institutional learning.
              </p>
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700">
                View Technical Reports <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a href="#newsletter" className="group bg-slate-50 border border-slate-200 rounded-[11px] p-8 hover:border-emerald-500 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-[8px] bg-white border border-slate-200 flex items-center justify-center mb-6 text-emerald-700">
                <Newspaper className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-serif text-slate-900 mb-4">Newsletter</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Periodic updates covering NACETEM programmes, research activities, institutional news, and STI engagements.
              </p>
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700">
                View Newsletters <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="policy-briefs" className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Policy Brief</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">Evidence for Innovation Policy</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {policyBriefs.map((brief) => (
              <motion.article
                key={brief.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white border border-slate-200 rounded-[11px] p-8 sm:p-10 hover:border-emerald-500 hover:shadow-xl transition-all"
              >
                <div className="flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700 mb-5">
                  <Layers className="w-4 h-4 mr-2" /> {brief.meta}
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif text-slate-900 mb-5 leading-tight">{brief.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-8">{brief.summary}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    disabled
                    className="inline-flex cursor-not-allowed items-center justify-center px-5 py-3 border border-slate-200 bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-[6px]"
                    aria-label={`${brief.title} details are not yet available`}
                  >
                    Details Coming Soon <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                  <button
                    type="button"
                    disabled
                    className="inline-flex cursor-not-allowed items-center justify-center px-5 py-3 bg-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-[6px]"
                    aria-label={`${brief.title} download is not yet available`}
                  >
                    <Download className="w-4 h-4 mr-2" /> Download Coming Soon
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="technical-reports" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Technical Report</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">Research Systems and Technical Evidence</h3>
          </div>

          {technicalReports.map((report) => (
            <motion.article
              key={report.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-slate-50 border border-slate-200 rounded-[11px] overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr]">
                <div className="image-frame bg-slate-900 min-h-[280px]">
                  <img src={assets.policyImage} alt={report.title} className="w-full h-full object-cover opacity-90" />
                </div>
                <div className="p-8 sm:p-10 lg:p-12">
                  <div className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700 mb-5">
                    <BookOpen className="w-4 h-4 mr-2" /> Technical Report
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-serif text-slate-900 mb-6 leading-tight">{report.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-8">{report.summary}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {report.highlights.map((item) => (
                      <div key={item} className="bg-white border border-slate-200 rounded-[6px] p-4 text-sm text-slate-700 leading-relaxed">
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-serif text-slate-900 mb-8">{report.author}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      disabled
                      className="inline-flex cursor-not-allowed items-center justify-center px-5 py-3 border border-slate-200 bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-[6px]"
                      aria-label={`${report.title} details are not yet available`}
                    >
                      Details Coming Soon <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                    <button
                      type="button"
                      disabled
                      className="inline-flex cursor-not-allowed items-center justify-center px-5 py-3 bg-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-[6px]"
                      aria-label={`${report.title} download is not yet available`}
                    >
                      <Download className="w-4 h-4 mr-2" /> Download Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="newsletter" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Newsletter</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">NACETEM Newsletter Editions</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
            <div className="rounded-[11px] border border-slate-200 bg-white shadow-sm">
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

            <aside className="rounded-[11px] border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-32">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Select Edition</h4>
              <div className="space-y-3">
                {newsletters.map((newsletter) => {
                  const isSelected = selectedNewsletter.year === newsletter.year;

                  return (
                    <button
                      key={newsletter.year}
                      type="button"
                      onClick={() => setSelectedNewsletter(newsletter)}
                      className={`flex w-full items-center justify-between rounded-[8px] border px-4 py-3 text-left transition-colors ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/60'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span>
                        <span className="block text-sm font-bold">{newsletter.year} Edition</span>
                        <span className="mt-1 block text-xs text-slate-500">PDF newsletter</span>
                      </span>
                      <ArrowRight className={`h-4 w-4 ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
