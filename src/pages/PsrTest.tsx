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

const ScoreTrendChart = ({ data }: { data: typeof scoreTrend }) => {
  const width = 600;
  const height = 240;
  const paddingX = 42;
  const paddingY = 28;
  const minScore = 50;
  const maxScore = 100;
  const plotWidth = width - paddingX * 2;
  const plotHeight = height - paddingY * 2;
  const points = data.map((item, index) => ({
    ...item,
    x: paddingX + (index / (data.length - 1)) * plotWidth,
    y: paddingY + ((maxScore - item.score) / (maxScore - minScore)) * plotHeight
  }));

  return (
    <figure>
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {data.map((item, index) => (
          <div key={item.attempt} className="rounded-lg border border-slate-200 bg-emerald-50/60 p-3">
            <p className="text-xs text-slate-600">{item.attempt}</p>
            <div className="flex items-end justify-between gap-2 mt-2">
              <span className="text-xl font-bold text-slate-900">{item.score}%</span>
              {index > 0 && (
                <span className={`text-xs font-bold ${item.score >= data[index - 1].score ? "text-emerald-600" : "text-gold"}`}>
                  {item.score >= data[index - 1].score ? "+" : ""}{item.score - data[index - 1].score}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:block rounded-xl border border-slate-200 bg-gradient-to-b from-emerald-50/60 to-white p-5">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          role="img"
          aria-labelledby="score-trend-title score-trend-description"
        >
          <title id="score-trend-title">Score trend across six sample attempts</title>
          <desc id="score-trend-description">
            Scores rise from 68 percent on attempt one to 81 percent on the latest attempt.
          </desc>
          <defs>
            <linearGradient id="scoreTrendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#006633" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#006633" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[60, 70, 80, 90, 100].map((tick) => {
            const y = paddingY + ((maxScore - tick) / (maxScore - minScore)) * plotHeight;
            return (
              <g key={tick} aria-hidden="true">
                <line x1={paddingX} x2={width - paddingX} y1={y} y2={y} stroke="rgba(26,26,26,0.1)" />
                <text x={paddingX - 10} y={y + 4} textAnchor="end" fontSize="11" fill="rgba(26,26,26,0.65)">
                  {tick}%
                </text>
              </g>
            );
          })}

          <path
            d={`M ${points[0].x} ${height - paddingY} ${points.map(point => `L ${point.x} ${point.y}`).join(" ")} L ${points.at(-1)!.x} ${height - paddingY} Z`}
            fill="url(#scoreTrendFill)"
            aria-hidden="true"
          />
          <polyline
            points={points.map(point => `${point.x},${point.y}`).join(" ")}
            fill="none"
            stroke="#006633"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          />

          {points.map((point) => (
            <g
              key={point.attempt}
              tabIndex={0}
              role="graphics-symbol"
              aria-label={`${point.attempt}: ${point.score} percent`}
              className="outline-none"
            >
              <circle cx={point.x} cy={point.y} r="9" fill="white" stroke="#006633" strokeWidth="4" />
              <text x={point.x} y={point.y - 16} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1A1A1A">
                {point.score}%
              </text>
              <text x={point.x} y={height - 7} textAnchor="middle" fontSize="11" fill="rgba(26,26,26,0.72)">
                {point.attempt === "Latest" ? "Latest" : point.attempt.replace("Attempt ", "A")}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-slate-600">Overall improvement</span>
        <span className="font-bold text-emerald-600">+{data.at(-1)!.score - data[0].score} percentage points</span>
      </figcaption>

      <table className="sr-only">
        <caption>Score trend data</caption>
        <thead>
          <tr><th>Attempt</th><th>Score</th></tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.attempt}><td>{item.attempt}</td><td>{item.score}%</td></tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
};

const AttemptsChart = ({ data }: { data: typeof analyticsData }) => {
  const maxValue = Math.max(...data.map(item => item.visitors));

  return (
    <figure>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3" role="list" aria-label="Sample test attempts by chapter">
        {data.map((item) => (
          <div
            key={item.chapter}
            className="rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500"
            role="listitem"
          >
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs mb-2">
              <span className="font-bold text-slate-900">{item.chapter}</span>
              <span className="font-bold text-blue-600">{item.visitors.toLocaleString()}</span>
            </div>
            <div
              className="h-2.5 bg-slate-100 rounded-full overflow-hidden"
              role="progressbar"
              tabIndex={0}
              aria-label={`${item.chapter}: ${item.visitors} sample attempts`}
              aria-valuemin={0}
              aria-valuemax={maxValue}
              aria-valuenow={item.visitors}
            >
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                style={{ width: `${(item.visitors / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <table className="sr-only">
        <caption>Sample attempts by chapter</caption>
        <thead>
          <tr><th>Chapter</th><th>Attempts</th></tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.chapter}><td>{item.chapter}</td><td>{item.visitors}</td></tr>
          ))}
        </tbody>
      </table>
    </figure>
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
            loading="eager"
            fetchPriority="high"
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
              <div className="flex items-start gap-3 mb-8 sm:mb-10">
                <div className="w-10 h-10 shrink-0 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-slate-900">Score Trend</h4>
                  <p className="text-sm text-slate-600">Progress across six sample attempts</p>
                </div>
              </div>

              <ScoreTrendChart data={scoreTrend} />
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
              <div className="flex items-start gap-3 mb-8">
                <div className="w-10 h-10 shrink-0 bg-gold/10 rounded-lg flex items-center justify-center">
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
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm mb-2">
                      <span className="font-bold text-slate-900">{item.chapter}</span>
                      <span className="text-slate-600">{item.successRate}% success</span>
                    </div>
                    <div
                      className="h-2 bg-slate-100 rounded-full overflow-hidden focus:ring-2 focus:ring-gold focus:ring-offset-2 outline-none"
                      role="progressbar"
                      tabIndex={0}
                      aria-label={`${item.chapter}: ${item.successRate} percent sample success rate`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={item.successRate}
                    >
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
              <div className="flex items-start gap-3 mb-8">
                <div className="w-10 h-10 shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-slate-900">Sample Attempts by Chapter</h4>
                  <p className="text-sm text-slate-600">Illustrative engagement across all tests</p>
                </div>
              </div>
              <AttemptsChart data={analyticsData} />
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-sm">
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
