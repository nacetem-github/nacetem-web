import React from 'react';
import { motion } from 'framer-motion';
import { Download, GraduationCap, MapPin, ChevronRight, BookOpen, Microscope, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../assets';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const programs = [
  {
    icon: GraduationCap,
    title: "Postgraduate Diploma in Technology Management",
    description: "Applications are invited from suitably qualified candidates for admission into one year part-time Postgraduate Diploma Course in Technology Management at:",
    locations: ["Ile Ife", "Lagos Study Centre", "Abuja Study Centre", "Bayelsa Study Centre", "Enugu Study Centre"],
    iconColor: "text-emerald-500",
    bgLight: "bg-emerald-50",
    img: assets.pgdImage
  },
  {
    icon: BookOpen,
    title: "Professional Master in Technology Management (M.Tech.)",
    description: "National Centre for Technology Management in collaboration with Federal University of Technology (FUTMINNA) offers Professional Masters in Technology Management.",
    locations: [],
    iconColor: "text-blue-500",
    bgLight: "bg-blue-50",
    img: assets.capacityImage
  },
  {
    icon: Microscope,
    title: "Professional M.Tech. in Nanoscience / Nanotechnology",
    description: "Nanotechnology is an emerging interdisciplinary field of research involving diverse expertise in Engineering/Building Technology, Life science, Physics, Chemistry, Mathematics, Medicine, Agriculture and information processing. Globally, activities in nanotechnology are growing rapidly.",
    locations: [],
    iconColor: "text-purple-500",
    bgLight: "bg-purple-50",
    img: assets.seminarImage
  },
  {
    icon: Globe,
    title: "Professional M.Tech. in Digital Marketing and Strategy",
    description: "The M.Tech. in Digital Marketing and Strategy programme is designed to prepare individuals with the required intellectual capacity for marketing products or services using digital channels and also contributing to knowledge in academia. The programme is designed to...",
    locations: [],
    iconColor: "text-orange-500",
    bgLight: "bg-orange-50",
    img: assets.digitalAcademyImage
  }
];

export default function CapacityBuilding() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <img 
            src={assets.capacityImage} 
            alt="Capacity Building" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            loading="lazy"
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
            <p className="text-xl text-slate-100/90 mb-10 leading-relaxed font-light mx-auto max-w-3xl">
              Bridging the Gap Between Technology, Innovation, and Policy for Nigeria’s Sustainable Development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Academic & Professional Programmes</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900">Explore Our Degrees and Diplomas</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {programs.map((program, idx) => (
              <motion.div 
                key={idx} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeInUp} 
                className="bg-white border border-slate-200 rounded-[11px] overflow-hidden hover:border-emerald-500 transition-colors group relative flex flex-col h-full shadow-sm hover:shadow-md"
              >
                <div className="h-56 sm:h-64 overflow-hidden relative">
                  <img src={program.img} alt={program.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 flex items-center">
                    <div className={`w-12 h-12 rounded-[8px] flex items-center justify-center bg-white shadow-md`}>
                      <program.icon className={`w-6 h-6 ${program.iconColor}`} />
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 sm:p-8 flex flex-col">
                  <h4 className="text-2xl font-serif text-slate-900 mb-4 leading-snug group-hover:text-emerald-700 transition-colors">
                    {program.title}
                  </h4>
                  <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
                    {program.description}
                  </p>
                  
                  {program.locations.length > 0 && (
                    <div className="mb-8 p-4 bg-slate-50 border border-slate-100 rounded-[6px]">
                      <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
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
                
                  <div className="pt-8 mt-auto border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                    <Link to="#" className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs tracking-widest uppercase hover:bg-slate-100 transition-colors rounded-[6px] text-center">
                      Read More
                    </Link>
                    <Link to="#" className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-bold text-xs tracking-widest uppercase hover:bg-emerald-700 transition-colors rounded-[6px] text-center shadow-sm">
                      <Download className="w-4 h-4 mr-2" /> Download Form
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
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
      
    </div>
  );
}
