import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  FileText,
  Target,
  TrendingUp,
  Users
} from 'lucide-react';
import { assets } from '../assets';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const chapters = [
  {
    chapter: "Chapter 1",
    title: "Introduction",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfSmuFS3ebMFdLcysYH0pcQcVz10Bgxsnya5eoWh7i0JF9sQw/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 2",
    title: "Appointments and leaving the service",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeuiFtncHon-6V9m6kGsnmPydyAQL5RKJpRaB9StM4lvzYF3Q/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 3",
    title: "Prescribed Examination for confirmation",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdOLjcrik6cq6kix7Ae1AUF0HP-RO7qNDiCRFpeFWo71_EYQQ/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 4",
    title: "Emoluments and Increments",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSc-uvkJjp13kv4Nm6Puv33hQ8GfgaaC1uUzy9Z0Yw5gajnw9Q/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 5",
    title: "Performance Management System",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfIh5YGSuvSXv3eW1knfBjNoIxxcVe_pPT18j6MLaIfU0vi9w/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 6",
    title: "Reward and recognition for outstanding work and meritorious service",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSf6EJQv-jcHEAQQ-nDZAadpKYXz3wkoLUSc0bXn-ZaUDpLNiQ/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 7",
    title: "Training and staff Development within and outside Nigeria",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSclXVnoKKEC_7om-CjPLJCnshu6apGssan8Xw4gfW84QkYUnw/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 8",
    title: "Free Transport Facilities on official Assignments",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSc_pLAaPLhl0AjSbXlts3vyTSPUopyK6CgNsr4Cpslw4xGD3g/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 9",
    title: "Virtual Meetings and Engagement",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSflG7CrSnt8nqz4lKYeEm__SMtbLjtVDWUUqFMbdI_KemZt4A/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 10",
    title: "Discipline",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeCUjqTrmKXoTgbmjJagHAeVsCx862wbkjaHZsbPuzfN2u2Iw/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 11",
    title: "Petitions and Appeals",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfaL0sifLpt7zw05yRkkouscuLgbMXgL0519x4VKVq8mgclsg/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 12",
    title: "Leave",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdkB_ZwSGyxaDewDejerdKL0uAI12Uu35yuMK8lYX2UrOEbcw/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 13",
    title: "Medical and Dental Procedures",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSc05OWwI8x7o4TF9mfD4whMc5hmB98XP9_eCtcSSoY8lIacdw/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 14",
    title: "Allowances",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeFuTapyGg-1BthHHrziEw_T9tHtd_CVDUD_vACLyP2wMaj7g/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 15",
    title: "Innovations and Inventions",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeKOombrQW1Jh9F1Cm6jYwsUvo4F8qNxGbtzzs-QMXdqr7rYg/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 16",
    title: "Section 1: Loss Of Property",
    url: "https://docs.google.com/forms/d/e/1FAIpQLScjnWhELpEVyAm1MauBXPX9BVrqhyXrh-iVy9J5GiGjlabRrg/viewform?usp=sharing&ouid=117472840774183694399"
  },
  {
    chapter: "Chapter 17",
    title: "Application of the public service Rule to federal Government Parastatals",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSec2pFYmdBuaX8uReixvaLT4JAa4ouo_pWvqRXIdAUHBl4u5w/viewform?usp=sharing&ouid=117472840774183694399"
  }
];

const analyticsData = [
  { chapter: "Ch. 1", successRate: 85, visitors: 342 },
  { chapter: "Ch. 2", successRate: 78, visitors: 298 },
  { chapter: "Ch. 3", successRate: 72, visitors: 215 },
  { chapter: "Ch. 4", successRate: 81, visitors: 267 },
  { chapter: "Ch. 5", successRate: 88, visitors: 289 },
  { chapter: "Ch. 6", successRate: 76, visitors: 201 },
  { chapter: "Ch. 7", successRate: 79, visitors: 245 },
  { chapter: "Ch. 8", successRate: 82, visitors: 178 },
  { chapter: "Ch. 9", successRate: 74, visitors: 156 },
  { chapter: "Ch. 10", successRate: 80, visitors: 234 },
  { chapter: "Ch. 11", successRate: 77, visitors: 189 },
  { chapter: "Ch. 12", successRate: 83, visitors: 267 },
  { chapter: "Ch. 13", successRate: 71, visitors: 143 },
  { chapter: "Ch. 14", successRate: 86, visitors: 298 },
  { chapter: "Ch. 15", successRate: 79, visitors: 167 },
  { chapter: "Ch. 16", successRate: 75, visitors: 154 },
  { chapter: "Ch. 17", successRate: 81, visitors: 198 }
];

const scoreTrend = [
  { attempt: "Attempt 1", score: 68 },
  { attempt: "Attempt 2", score: 72 },
  { attempt: "Attempt 3", score: 75 },
  { attempt: "Attempt 4", score: 74 },
  { attempt: "Attempt 5", score: 78 },
  { attempt: "Latest", score: 81 }
];

const completedChapters = 12;
const sampleAverageScore = 78;
const sampleReadiness = 73;
const strongestChapter = { chapter: "Chapter 5", title: "Performance Management System", score: 91 };
const weakestChapter = { chapter: "Chapter 3", title: "Prescribed Examination for Confirmation", score: 62 };
const recommendedChapter = chapters[12];

const totalAttempts = analyticsData.reduce((total, item) => total + item.visitors, 0);
const averageSuccessRate = analyticsData.reduce((total, item) => total + item.successRate, 0) / analyticsData.length;
const difficultChapters = [...analyticsData].sort((a, b) => a.successRate - b.successRate).slice(0, 5);

const BarChart = ({
  data,
  dataKey,
  color,
  label
}: {
  data: typeof analyticsData;
  dataKey: "successRate" | "visitors";
  color: string;
  label: string;
}) => {
  const maxValue = Math.max(...data.map(d => typeof d[dataKey] === 'number' ? d[dataKey] : 0));

  return (
    <div className="overflow-x-auto pb-2" role="img" aria-label={label}>
      <div className="flex items-end gap-3 h-64 min-w-[720px] px-2">
        {data.map((item) => (
          <div key={item.chapter} className="flex flex-1 flex-col items-center justify-end gap-2 h-full">
            <span className="text-[10px] font-bold text-slate-700">{item[dataKey]}</span>
            <div className="flex h-[200px] items-end">
              <div
                className={`w-5 ${color} rounded-t transition-opacity hover:opacity-80`}
                style={{ height: `${(item[dataKey] / maxValue) * 200}px` }}
              />
            </div>
            <span className="text-[10px] font-medium text-slate-600 whitespace-nowrap">{item.chapter}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MetricCard = ({
  icon: Icon,
  value,
  label,
  detail,
  color
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  detail: string;
  color: string;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
    className="bg-white rounded-[11px] border border-slate-200 p-6 shadow-sm"
  >
    <div className={`w-11 h-11 ${color} rounded-lg flex items-center justify-center mb-5`}>
      <Icon className="w-5 h-5" aria-hidden="true" />
    </div>
    <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
    <p className="font-bold text-sm text-slate-900">{label}</p>
    <p className="text-sm text-slate-600 mt-2">{detail}</p>
  </motion.div>
);

export default function PsrTest() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <img 
            src={assets.psrImage} 
            alt="PSR Test Portal" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl mx-auto">
            <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              Examination Portal
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-tight mb-8">
              PSR Test
            </h1>
            <p className="text-xl text-slate-100/90 mb-10 leading-relaxed font-light mx-auto max-w-3xl">
              Prepare confidently for civil service promotion examinations with chapter-by-chapter practice tests based on the Public Service Rules.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Preparation Modules</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">Public Service Rules Topics</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeInUp} 
                custom={idx}
                className="bg-slate-50 border border-slate-200 rounded-[11px] p-6 hover:shadow-md hover:border-emerald-500 transition-all group flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-[8px] flex items-center justify-center mb-6 shadow-sm">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">
                  {item.chapter}
                </div>
                <h4 className="text-lg font-serif text-slate-900 mb-6 leading-snug flex-1 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h4>
                
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 font-bold text-xs tracking-widest uppercase hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-colors rounded-[6px] shadow-sm"
                >
                  <FileText className="w-4 h-4 mr-2" /> Take Test
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Learner Dashboard Preview</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">Your PSR Preparation Insights</h3>
            <p className="text-slate-600 mt-4 font-light">
              Illustrative data showing how the PSR Exam Prep Tool can guide preparation when learner results are connected.
            </p>
            <span className="inline-flex mt-5 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider">
              Preview Data
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <MetricCard
              icon={Target}
              value={`${sampleReadiness}%`}
              label="Exam Readiness"
              detail="Based on chapter coverage, average score, and recent consistency."
              color="bg-gold/10 text-gold"
            />
            <MetricCard
              icon={CheckCircle2}
              value={`${completedChapters}/${chapters.length}`}
              label="Chapters Completed"
              detail={`${chapters.length - completedChapters} chapters remain in this sample learning path.`}
              color="bg-emerald-100 text-emerald-600"
            />
            <MetricCard
              icon={BarChart3}
              value={`${sampleAverageScore}%`}
              label="Average Score"
              detail="A good foundation, with targeted revision still recommended."
              color="bg-blue-100 text-blue-600"
            />
            <MetricCard
              icon={TrendingUp}
              value={`${scoreTrend.at(-1)?.score}%`}
              label="Latest Score"
              detail={`Up ${scoreTrend.at(-1)!.score - scoreTrend[0].score} points from the first sample attempt.`}
              color="bg-emerald-100 text-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-2 bg-white rounded-[11px] border border-slate-200 p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-slate-900">Score Trend</h4>
                  <p className="text-sm text-slate-600">Progress across six sample attempts</p>
                </div>
              </div>

              <div
                className="flex items-end gap-3 sm:gap-5 h-64"
                role="img"
                aria-label="Sample scores improve from 68 percent on attempt 1 to 81 percent on the latest attempt"
              >
                {scoreTrend.map((item) => (
                  <div key={item.attempt} className="flex flex-1 h-full flex-col items-center justify-end gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.score}%</span>
                    <div className="flex h-[190px] w-full items-end justify-center bg-slate-50 rounded-t">
                      <div
                        className="w-full max-w-12 bg-emerald-500 rounded-t"
                        style={{ height: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs text-center text-slate-600">{item.attempt}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-slate-900 text-white rounded-[11px] border border-slate-900 p-6 sm:p-8 shadow-sm"
            >
              <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                <ArrowRight className="w-5 h-5 text-gold" />
              </div>
              <p className="text-xs font-bold text-gold uppercase tracking-widest mb-3">Recommended Next Step</p>
              <h4 className="text-2xl font-serif mb-3">{recommendedChapter.chapter}</h4>
              <p className="text-white font-bold mb-3">{recommendedChapter.title}</p>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Continue with the next incomplete chapter to improve coverage and raise the sample readiness score.
              </p>
              <a
                href={recommendedChapter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-3 bg-gold text-slate-900 font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors rounded-[6px]"
              >
                Take Recommended Test <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-[11px] border border-slate-200 p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Strongest Chapter</p>
                  <h4 className="text-xl font-serif text-slate-900">{strongestChapter.chapter}</h4>
                  <p className="text-slate-600 mt-1">{strongestChapter.title}</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-5">{strongestChapter.score}%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-[11px] border border-slate-200 p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gold uppercase tracking-widest mb-2">Revision Priority</p>
                  <h4 className="text-xl font-serif text-slate-900">{weakestChapter.chapter}</h4>
                  <p className="text-slate-600 mt-1">{weakestChapter.title}</p>
                  <p className="text-3xl font-bold text-gold mt-5">{weakestChapter.score}%</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-[11px] border border-slate-200 p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-slate-900">Chapters Needing More Revision</h4>
                  <p className="text-sm text-slate-600">Lowest sample success rates</p>
                </div>
              </div>

              <div className="space-y-5">
                {difficultChapters.map((item) => (
                  <div key={item.chapter}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-bold text-slate-900">{item.chapter}</span>
                      <span className="text-slate-600">{item.successRate}% success</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full"
                        style={{ width: `${item.successRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-[11px] border border-slate-200 p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-slate-900">Sample Attempts by Chapter</h4>
                  <p className="text-sm text-slate-600">Illustrative engagement across all tests</p>
                </div>
              </div>
              <BarChart
                data={analyticsData}
                dataKey="visitors"
                color="bg-blue-500"
                label="Sample test attempts by chapter"
              />
              <div className="mt-6 flex items-center justify-between gap-4 text-sm">
                <span className="text-slate-600">Sample Total Attempts:</span>
                <span className="font-bold text-blue-600">{totalAttempts.toLocaleString()}</span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-[11px] border border-slate-200 p-6 text-center">
              <div className="text-3xl font-bold text-gold mb-2">{totalAttempts.toLocaleString()}</div>
              <p className="text-slate-600 text-sm">Sample Test Attempts</p>
            </div>
            <div className="bg-white rounded-[11px] border border-slate-200 p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">{averageSuccessRate.toFixed(1)}%</div>
              <p className="text-slate-600 text-sm">Sample Success Rate</p>
            </div>
            <div className="bg-white rounded-[11px] border border-slate-200 p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{chapters.length}</div>
              <p className="text-slate-600 text-sm">Available Test Chapters</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
