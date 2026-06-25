import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Lightbulb, Shield, Users, Leaf, Zap, BookOpen, Monitor, Award, Briefcase, ChevronRight, Globe, Building2, GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../assets';
import { officialMandates, officialMission, officialVision } from '../data/institutionalProfile';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const dgStrategicGoals = [
  'Strengthen the Agency\'s capacity-building services.',
  'Digitise the Agency\'s operational activities.',
  'Implement FCSSIP25 to support institutional reform.',
  'Create new STEM education training programmes.',
  'Develop certification programmes for technology artisans.',
  'Advance fish-finding technology and drone technology programmes.',
  'Expand STI management research and policy evaluation.',
  'Establish research and development demonstration centres.',
  'Design management procedures for novel technology applications.',
  'Build the capacity of NACETEM staff.',
];

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <img 
            src={assets.headquartersImage} 
            alt="NACETEM Office" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              About NACETEM
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
              Driving Science, Technology and Innovation for National Development
            </h1>
            <p className="text-lg text-slate-100/90 mb-10 leading-relaxed">
              The National Centre for Technology Management (NACETEM) is Nigeria's foremost institution for Science, Technology, and Innovation (STI) policy research, technology management, innovation systems development, and strategic capacity building.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/initiatives" className="inline-flex justify-center items-center px-8 py-4 bg-emerald-600 text-white text-xs font-bold tracking-widest uppercase hover:bg-emerald-700 transition duration-300">
                Explore Our Initiatives <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex justify-center items-center px-8 py-4 bg-transparent border border-slate-500 text-white text-xs font-bold tracking-widest uppercase hover:border-gold hover:text-gold transition duration-300">
                Contact NACETEM
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Institutional History & Administrative Status */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="lg:w-1/2"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-700">Our Institutional Journey</p>
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-6">History & Administrative Status</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                NACETEM was established in September 1992 following the second Conference of Ministers Responsible for the Application of Science and Technology to the Socio-Economic Development of Africa (CASTAFRICA II), held in 1987.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                The Centre began operations in January 1993 at Obafemi Awolowo University, Ile-Ife. It operates today as an agency of the Federal Ministry of Innovation, Science and Technology, connecting research, policy, industry and society to support Nigeria's development.
              </p>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
                <div className="flex items-start gap-4">
                  <Building2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" />
                  <div>
                    <h3 className="mb-2 font-bold text-slate-900">Expanded national and regional role</h3>
                    <p className="text-sm leading-6 text-slate-600">
                      In November 2005, NACETEM merged with the former Regional Programme for Technology Management (REPTEM), expanding its role to the West African sub-region and attaining agency status under the then Federal Ministry of Science and Technology.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="lg:w-1/2 w-full"
            >
              <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm">
                <img 
                  src={assets.headquartersImage}
                  alt="NACETEM headquarters"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}
            className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
          >
            {[
              { icon: GraduationCap, date: 'September 1992', title: 'Centre established', detail: 'Created following the CASTAFRICA II recommendation to strengthen technology management capacity.' },
              { icon: MapPin, date: 'January 1993', title: 'Operations commenced', detail: 'NACETEM began operating at Obafemi Awolowo University in Ile-Ife, Osun State.' },
              { icon: Building2, date: 'November 2005', title: 'Mandate expanded', detail: 'The REPTEM merger broadened its regional responsibilities and established its federal agency status.' },
            ].map((milestone) => (
              <motion.article key={milestone.date} variants={fadeInUp} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <milestone.icon className="mb-5 h-7 w-7 text-emerald-700" />
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gold">{milestone.date}</p>
                <h3 className="mb-3 text-lg font-serif text-slate-900">{milestone.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{milestone.detail}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Vision, Mission & Core Values */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-slate-800 border border-slate-700/60 p-10 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-emerald-900/50 flex items-center justify-center rounded-full mb-6">
                <Target className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-gold">Our Vision</h3>
              <p className="text-slate-100/90 leading-relaxed text-lg">
                {officialVision}
              </p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-slate-800 border border-slate-700/60 p-10 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-emerald-900/50 flex items-center justify-center rounded-full mb-6">
                <Globe className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-gold">Our Mission</h3>
              <p className="text-slate-100/90 leading-relaxed text-lg">
                {officialMission}
              </p>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center">
            <h2 className="text-3xl sm:text-4xl font-serif mb-16">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-left">
              {[
                { icon: Lightbulb, title: "Innovation", desc: "Creativity, emerging technologies, transformative solutions." },
                { icon: Award, title: "Excellence", desc: "High standards in research & service delivery." },
                { icon: Shield, title: "Integrity", desc: "Transparency, accountability, professionalism." },
                { icon: Users, title: "Collaboration", desc: "Partnerships across government & academia." },
                { icon: Leaf, title: "Sustainability", desc: "Long-term national growth & systems." },
                { icon: Zap, title: "Impact", desc: "Measurable outcomes for societal well-being." },
              ].map((value, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="bg-slate-800/50 border border-slate-700/60 p-6 rounded-2xl hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 shadow-md">
                  <value.icon className="h-8 w-8 text-gold mb-4" />
                  <h4 className="font-bold mb-2 text-white">{value.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Our Mandate & 5. Strategic Focus Areas */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-6">Our Mandate & Strategic Focus</h2>
            <p className="text-slate-600">NACETEM's mandate is centered on strengthening Nigeria's technological and innovation capabilities through strategic management systems, policy development, and institutional support.</p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {officialMandates.map((mandate, index) => (
              <motion.article key={mandate.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Official Mandate {index + 1}</p>
                <h3 className="mb-4 text-2xl font-serif text-slate-900">{mandate.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{mandate.description}</p>
              </motion.article>
            ))}
          </div>

          <h3 className="mb-10 text-center text-2xl font-serif text-slate-900">Strategic Focus Areas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: "STI Policy & Research", desc: "Conducting evidence-based policy research and analysis to strengthen Nigeria's innovation ecosystem." },
              { icon: Monitor, title: "Digital Transformation", desc: "Promoting digital governance, smart systems, AI adoption, and technology-enabled public service delivery." },
              { icon: Briefcase, title: "Capacity Building & Training", desc: "Training and developing middle- to high-level manpower through specialized programmes, executive development courses, and institutional strengthening initiatives." },
              { icon: Globe, title: "Technology Foresight", desc: "Providing strategic intelligence and forecasting emerging trends shaping future economies." },
            ].map((focus, idx) => (
              <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center rounded-sm mb-6 group-hover:bg-emerald-600 transition-colors">
                  <focus.icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-lg text-slate-900 mb-3">{focus.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{focus.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships & Collaborations */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="md:w-1/3">
               <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-6">Partnerships & Collaborations</h2>
               <p className="text-slate-600 mb-6 leading-relaxed">
                 NACETEM collaborates with various institutions to strengthen innovation ecosystems, policy implementation, research commercialization, and sustainable development initiatives.
               </p>
             </div>
             <div className="md:w-2/3">
               <div className="grid grid-cols-2 sm:grid-cols-3 text-sm font-bold text-slate-600 gap-y-6 gap-x-4">
                 {[
                   "Government (MDAs)",
                   "Universities & Research",
                   "Development Organizations",
                   "Technology Companies",
                   "Innovation Hubs & Startups",
                   "Private Sector",
                   "Regional & Global Partners"
                 ].map((partner, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 mr-3 shrink-0"></div>
                      <span>{partner}</span>
                    </div>
                 ))}
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Director-General's Leadership Direction */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3">
              <div className="aspect-[2/3] relative mx-auto max-w-sm rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-sm">
                <img 
                  src="/uploads/about/dg-main.jpeg"
                  alt="Dr. Olushola Odusanya, Director-General and Chief Executive Officer of NACETEM"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="md:w-2/3 max-w-2xl">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">Office of the Director-General/CEO</p>
              <h2 className="text-3xl font-serif text-slate-900 mb-8 leading-tight">Leadership Direction</h2>
              
              <div className="space-y-6 text-slate-600 leading-relaxed mb-10">
                <p>
                  Under the leadership of Dr. Olushola Odusanya, NACETEM is strengthening its capacity-building services, digitising institutional operations, expanding STEM and technology certification programmes, and deepening STI management research and policy evaluation.
                </p>
                <p>
                  These priorities guide the Centre's institutional reform and its work to build the expertise, evidence and technology-management systems required for sustainable national development.
                </p>
              </div>
              
              <div>
                <p className="font-serif text-xl text-slate-900">Dr. Olushola Odusanya</p>
                <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Director-General / Chief Executive Officer</p>
              </div>
            </div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeInUp} className="mt-20 border-t border-slate-200 pt-16">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-700">Leadership Priorities</p>
              <h2 className="mb-5 text-3xl font-serif text-slate-900 sm:text-4xl">Director-General's Strategic Goals</h2>
              <p className="text-sm leading-7 text-slate-600">The leadership priorities guiding NACETEM's institutional reform, capacity development, research, and technology programmes.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {dgStrategicGoals.map((goal, index) => (
                <article key={goal} className="group flex min-h-40 flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-emerald-500/40 hover:bg-white hover:shadow-md">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">{String(index + 1).padStart(2, '0')}</span>
                    <Target className="h-5 w-5 text-gold" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-serif leading-7 text-slate-900">{goal}</h3>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24 bg-emerald-900 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-serif mb-6 leading-tight">Partner With NACETEM</h2>
          <p className="text-emerald-100 text-lg mb-10 leading-relaxed">
            Join us in driving innovation, digital transformation, and sustainable national development through Science, Technology, and Innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact#contact-form" className="inline-flex items-center justify-center px-8 py-4 bg-gold text-slate-900 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-emerald-900 transition-colors rounded-sm">
              Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/capacity-building" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-emerald-500 text-white font-bold text-sm tracking-widest uppercase hover:bg-emerald-800 transition-colors rounded-sm">
              Explore Training Programmes
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
