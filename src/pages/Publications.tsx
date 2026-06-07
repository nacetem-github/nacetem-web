import { ArrowRight, BookOpen, Download, FileText, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { assets } from '../assets';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const policyBriefs = [
  {
    title: 'How Innovative Are Enterprises in the Nigerian Informal Sector?',
    meta: 'Year 2020 Number 1',
    summary:
      'The informal sector contributes immensely to Nigeria’s economic growth. Around 7 out of every 10 active businesses in Nigeria operate in the informal sector, employing a major share of private-sector workers. This brief examines innovation within informal enterprises and highlights why changing products, services, and business processes matters for competitiveness.',
  },
  {
    title: 'An Overview of Innovation in the Nigerian Business Sector',
    meta: 'Year 2020 Number 2',
    summary:
      'Science, Technology and Innovation indicators are increasingly used by companies, policymakers, and other stakeholders to inform decisions. This brief highlights innovation activity in Nigeria’s industrial sector and the need for government support through infrastructure and economic incentives.',
  },
];

const technicalReports = [
  {
    title: 'Doing Research in Nigeria, Country Report: Assessing Social Science Research System in a Global Perspective',
    summary:
      'Domestic research capacity is critical for sustainable development because it supports scientific evidence based on each country’s social, development, and policy challenges. This report presents findings from the Doing Research Assessment in Nigeria, including social science research production, gender representation, research funding, open access publishing, journal systems, and policy communication.',
    highlights: [
      'Nigeria is the second largest producer of social science research in Africa.',
      'Women remain underrepresented in the social science research system.',
      'Most research grants expended locally come from foreign sources.',
      'Open access publishing is common in Nigeria’s social science research landscape.',
      'Researchers do not communicate findings extensively to policymakers and the public.',
    ],
    author: 'Engineer Professor Okechukwu Ukwuoma, PhD, FIIA, FNSChE, MNSE, KSM',
  },
];

export default function Publications() {
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
              Publications
            </h1>
            <p className="text-lg sm:text-xl text-slate-100/90 leading-relaxed font-light mx-auto max-w-3xl">
              Bridging the Gap Between Technology, Innovation, and Policy for Nigeria’s Sustainable Development.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-slate-200 bg-slate-50 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-[6px] hover:bg-slate-100 transition-colors">
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  <a href="#" className="inline-flex items-center justify-center px-5 py-3 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-[6px] hover:bg-emerald-700 transition-colors">
                    <Download className="w-4 h-4 mr-2" /> Download Full Report
                  </a>
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
                <div className="bg-slate-900 min-h-[280px]">
                  <img src={assets.seminarImage} alt={report.title} className="w-full h-full object-cover opacity-90" />
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
                    <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-slate-200 bg-white text-slate-900 text-xs font-bold uppercase tracking-wider rounded-[6px] hover:bg-slate-100 transition-colors">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                    <a href="#" className="inline-flex items-center justify-center px-5 py-3 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-[6px] hover:bg-emerald-700 transition-colors">
                      <Download className="w-4 h-4 mr-2" /> Download Full Report
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}

