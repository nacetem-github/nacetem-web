import React from 'react';
import { motion } from 'framer-motion';
import { FileText, BookOpen, TrendingUp, Users } from 'lucide-react';
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

const BarChart = ({ data, dataKey, color }: { data: typeof analyticsData; dataKey: keyof typeof analyticsData[0]; color: string }) => {
  const maxValue = Math.max(...data.map(d => typeof d[dataKey] === 'number' ? d[dataKey] : 0));

  return (
    <div className="flex items-end gap-1 h-64 justify-center">
      {data.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <div
            className={`w-3 ${color} rounded-t transition-all hover:opacity-80`}
            style={{ height: `${(item[dataKey] as number / maxValue) * 200}px` }}
          >
            <div className="text-[10px] text-slate-700 text-center pt-1 opacity-0 hover:opacity-100">
              {item[dataKey]}
            </div>
          </div>
          <span className="text-[10px] font-medium text-slate-600">{item.chapter}</span>
        </div>
      ))}
    </div>
  );
};

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
              Bridging the Gap Between Technology, Innovation, and Policy for Nigeria’s Sustainable Development.
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
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Performance Insights</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">Test Analytics & Engagement</h3>
            <p className="text-slate-600 mt-4 font-light">Track your performance across all chapters</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Success Rate Chart */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-[11px] border border-slate-200 p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-slate-900">Success Rate by Chapter</h4>
                  <p className="text-sm text-slate-600">Percentage of passing grades</p>
                </div>
              </div>
              <BarChart data={analyticsData} dataKey="successRate" color="bg-emerald-500" />
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-slate-600">Average Success Rate:</span>
                <span className="font-bold text-emerald-600">79.4%</span>
              </div>
            </motion.div>

            {/* Visitors Chart */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-[11px] border border-slate-200 p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-slate-900">Total Visitors by Chapter</h4>
                  <p className="text-sm text-slate-600">Number of test attempts</p>
                </div>
              </div>
              <BarChart data={analyticsData} dataKey="visitors" color="bg-blue-500" />
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-slate-600">Total Attempts:</span>
                <span className="font-bold text-blue-600">3,742</span>
              </div>
            </motion.div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-[11px] border border-slate-200 p-6 text-center"
            >
              <div className="text-4xl font-bold text-gold mb-2">3,742</div>
              <p className="text-slate-600 text-sm">Total Test Attempts</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-[11px] border border-slate-200 p-6 text-center"
            >
              <div className="text-4xl font-bold text-emerald-600 mb-2">79.4%</div>
              <p className="text-slate-600 text-sm">Average Success Rate</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-[11px] border border-slate-200 p-6 text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">17</div>
              <p className="text-slate-600 text-sm">Active Test Chapters</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
