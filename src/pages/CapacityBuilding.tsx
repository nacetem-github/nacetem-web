import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, ChevronRight, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../assets';
import { capacityPrograms } from '../data/capacityPrograms';
import ProgramInterestModal from '../components/ProgramInterestModal';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const brochureUrl = "/uploads/capacity-building/brochures/capacity-building-brochure.pdf";

export default function CapacityBuilding() {
  const [interestProgram, setInterestProgram] = useState<{ title: string; locations: string[] } | null>(null);

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <img 
            src={assets.capacityImage} 
            alt="Capacity Building" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl mx-auto">
            <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              Education & Training
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-tight mb-8">
              Capacity Building
            </h1>
            <p className="text-xl text-slate-100/90 mb-10 font-light mx-auto max-w-[650px] leading-[1.6]">
              Strengthening people, institutions, and systems through practical training for Nigeria's innovation economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-16 sm:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Academic & Professional Programmes</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">Explore Our Degrees, Diplomas, and Short-Term Courses</h3>
          </div>
          
          <div className="grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 justify-center [&>*]:lg:col-span-2 [&>*:nth-last-child(2):nth-child(3n+1)]:lg:col-start-2">
            {capacityPrograms.map((program) => (
              <motion.div 
                key={program.slug} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeInUp} 
                className="bg-white border border-slate-200 rounded-[11px] overflow-hidden hover:border-emerald-500 transition-all duration-300 ease-in-out group/card relative flex flex-col self-start shadow-sm hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:border-emerald-500 focus-within:shadow-lg"
              >
                <div className={`image-frame h-44 sm:h-48 relative overflow-hidden ${program.imageFit === 'contain' ? 'bg-white p-2' : ''}`}>
                  <img src={program.cardImg ?? program.img} alt={program.title} className={`w-full h-full ${program.imageFit === 'contain' ? 'object-contain' : 'object-cover'} transform group-hover/card:scale-105 transition-transform duration-700 ease-in-out`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-5 flex items-center">
                    <div className="w-10 h-10 rounded-[8px] flex items-center justify-center bg-white shadow-md">
                      <program.icon className={`w-5 h-5 ${program.iconColor}`} />
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-4 sm:p-5 flex flex-col">
                  <h4 className="text-xl font-serif text-slate-900 mb-2.5 leading-snug group-hover/card:text-emerald-700 transition-all duration-300 ease-in-out">
                    {program.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {program.description}
                  </p>
                  
                  {program.slug === 'professional-mtech-digital-marketing-strategy' ? (
                    <div className="max-h-0 -translate-y-2 overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-hover/card:mb-4 group-hover/card:max-h-12 group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-within/card:mb-4 group-focus-within/card:max-h-12 group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-sm">
                        <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
                        Fully Virtual
                      </span>
                    </div>
                  ) : program.locations.length > 0 && (
                    <div className="max-h-0 -translate-y-2 overflow-hidden border border-transparent bg-slate-50 p-0 opacity-0 transition-all duration-300 ease-in-out group-hover/card:mb-4 group-hover/card:max-h-40 group-hover/card:translate-y-0 group-hover/card:border-slate-100 group-hover/card:p-3 group-hover/card:opacity-100 group-focus-within/card:mb-4 group-focus-within/card:max-h-40 group-focus-within/card:translate-y-0 group-focus-within/card:border-slate-100 group-focus-within/card:p-3 group-focus-within/card:opacity-100 rounded-[6px]">
                      <div className="flex items-center text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                        <MapPin className="w-3.5 h-3.5 mr-2" />
                        Study Centres
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {program.locations.map((loc, i) => (
                          <span key={i} className="text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-sm shadow-sm whitespace-nowrap">
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                
                  <div className="pt-4 mt-auto border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 sm:items-center">
                    {program.applyUrl ? (
                      <a href={program.applyUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-500 text-white font-bold text-xs tracking-widest uppercase rounded-[6px] text-center shadow-[0_6px_18px_rgba(0,102,51,0.38)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_9px_26px_rgba(0,102,51,0.58)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2">
                        <Download className="w-4 h-4 mr-2" /> Apply Here
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setInterestProgram({ title: program.title, locations: program.locations })}
                        className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-500 text-white font-bold text-xs tracking-widest uppercase rounded-[6px] text-center shadow-[0_6px_18px_rgba(0,102,51,0.38)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_9px_26px_rgba(0,102,51,0.58)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                      >
                        <Download className="w-4 h-4 mr-2" /> Apply Here
                      </button>
                    )}
                    <Link to={`/capacity-building/${program.slug}`} className="flex-1 group/read-more inline-flex items-center justify-center px-4 py-3 bg-transparent border border-slate-400 text-slate-800 font-bold text-xs tracking-widest uppercase rounded-[6px] text-center transition-all duration-300 ease-in-out hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2">
                      Read More <ChevronRight className="ml-1.5 h-4 w-4 transition-all duration-300 ease-in-out group-hover/read-more:translate-x-[5px]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brochure Preview */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
            <div className="max-w-2xl">
              <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Programme Brochure</h2>
              <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">View the Capacity Building Brochure</h3>
            </div>
            <a
              href={brochureUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 text-white font-bold text-xs tracking-widest uppercase hover:bg-emerald-800 transition-colors rounded-[6px] shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" /> Open PDF
            </a>
          </div>

          <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
            <div className="pdf-container">
              <iframe
                title="Capacity Building brochure PDF viewer"
                src={brochureUrl}
              />
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">If the preview does not load in your browser, open or download the brochure directly.</p>
              <a
                href={brochureUrl}
                download
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 text-white font-bold text-xs tracking-widest uppercase hover:bg-emerald-800 transition-colors rounded-[6px] shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" /> Download PDF Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Newsletter link placeholder since there's already one globally or in footprint, we ensure it blends naturally */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="w-16 h-1 bg-gold mx-auto mb-8"></div>
           <h3 className="text-2xl font-serif text-slate-900 mb-6">Invest in Your Future</h3>
           <p className="text-slate-600 leading-relaxed max-w-xl mx-auto mb-8">
             Our academic and professional courses are designed to arm you with cutting-edge skills for the future of science, technology, and organizational leadership.
           </p>
           <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-800 text-white font-bold text-xs tracking-widest uppercase hover:bg-emerald-900 transition-colors shadow-sm rounded-sm">
             Contact Admissions <ChevronRight className="ml-2 w-4 h-4" />
           </Link>
        </div>
      </section>

      <ProgramInterestModal
        isOpen={!!interestProgram}
        onClose={() => setInterestProgram(null)}
        programTitle={interestProgram?.title ?? ''}
        studyCentres={interestProgram?.locations ?? []}
      />
    </div>
  );
}
