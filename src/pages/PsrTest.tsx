import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../assets';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const chapters = [
  { chapter: "Chapter 1", title: "Introduction" },
  { chapter: "Chapter 2", title: "Appointments and leaving the service" },
  { chapter: "Chapter 3", title: "Prescribed Examination for confirmation" },
  { chapter: "Chapter 4", title: "Emoluments and Increments" },
  { chapter: "Chapter 5", title: "Performance Management System" },
  { chapter: "Chapter 6", title: "Reward and recognition for outstanding work and meritorious service" },
  { chapter: "Chapter 7", title: "Training and staff Development within and outside Nigeria" },
  { chapter: "Chapter 8", title: "Free Transport Facilities on official Assignments" },
  { chapter: "Chapter 9", title: "Virtual Meetings and Engagement" },
  { chapter: "Chapter 10", title: "Discipline" },
  { chapter: "Chapter 11", title: "Petitions and Appeals" },
  { chapter: "Chapter 12", title: "Leave" },
  { chapter: "Chapter 13", title: "Medical and Dental Procedures" },
  { chapter: "Chapter 14", title: "Allowances" },
  { chapter: "Chapter 15", title: "Innovations and Inventions" },
  { chapter: "Chapter 16", title: "Section 1: Loss Of Property" },
  { chapter: "Chapter 17", title: "Application of the public service Rule to federal Government Parastatals" }
];

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
                
                <Link to="#" className="mt-auto inline-flex items-center justify-center w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 font-bold text-xs tracking-widest uppercase hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-colors rounded-[6px] shadow-sm">
                  <FileText className="w-4 h-4 mr-2" /> Take Test
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
