import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Lightbulb, Shield, Users, Leaf, Zap, BookOpen, Monitor, Award, Briefcase, ChevronRight, CheckCircle2, Globe, Building2, GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../assets';

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
                Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex justify-center items-center px-8 py-4 bg-transparent border border-slate-500 text-white text-xs font-bold tracking-widest uppercase hover:border-gold hover:text-gold transition duration-300">
                Contact NACETEM
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-6">Who We Are</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Established to strengthen Nigeria's technological advancement and national competitiveness, NACETEM serves as a critical think-tank and implementation support institution under the Federal Ministry of Innovation, Science and Technology.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                As a bridge between research, government policy, industry, and society, NACETEM works to ensure that scientific knowledge and emerging technologies contribute directly to national development priorities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Technology Management", "Innovation Policy Research", 
                  "Strategic Planning", "Digital Transformation",
                  "AI Ecosystems", "Capacity Development"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center text-sm font-bold text-slate-800">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-2 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="lg:w-1/2 w-full"
            >
              <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm">
                <img 
                  src={assets.bayelsaNewsImage} 
                  alt="NACETEM institutional engagement" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
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
                To be a globally recognized centre of excellence in technology management, innovation policy research, and strategic development for national transformation.
              </p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-slate-800 border border-slate-700/60 p-10 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-emerald-900/50 flex items-center justify-center rounded-full mb-6">
                <Globe className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-gold">Our Mission</h3>
              <p className="text-slate-100/90 leading-relaxed text-lg">
                To strengthen Nigeria's socio-economic development through effective management of Science, Technology, and Innovation by providing strategic research, policy support, capacity development, and technology-driven solutions.
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: "STI Policy & Research", desc: "Conducting evidence-based policy research and analysis to strengthen Nigeria's innovation ecosystem." },
              { icon: Monitor, title: "Digital Transformation", desc: "Promoting digital governance, smart systems, AI adoption, and technology-enabled public service delivery." },
              { icon: Briefcase, title: "Capacity Building & Training", desc: "Delivering specialized training programmes, executive development courses, and institutional strengthening initiatives." },
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

      {/* 6. Our Impact */}
      <section className="py-24 bg-emerald-900 text-white relative border-t-8 border-gold">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif mb-6">Our Impact</h2>
            <p className="text-emerald-100 leading-relaxed text-lg">
              Over the years, NACETEM has contributed significantly to Nigeria's Science, Technology, and Innovation landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              "STI policy frameworks",
              "Strategic advisory support",
              "Capacity development",
              "Digital transformation initiatives",
              "AI ecosystem development",
              "Technology management research",
              "Innovation-driven projects",
              "National collaborations",
              "Research commercialization",
              "STI intelligence systems"
            ].map((impact, idx) => (
              <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-emerald-800/50 p-6 rounded-2xl border border-emerald-700/50 flex flex-col items-center text-center hover:bg-emerald-800 transition-all duration-300">
                <CheckCircle2 className="h-6 w-6 text-gold mb-3" />
                <p className="text-sm font-bold text-emerald-50 leading-snug">{impact}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Key Initiatives */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Featured Initiatives</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-6">Key Programmes</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "NACETEM AI Ecosystem", desc: "A collaborative platform promoting Artificial Intelligence development, research, policy engagement, and innovation partnerships in Nigeria.", img: assets.aiEcosystemImage },
              { title: "STI Dashboard Platform", desc: "A national intelligence platform designed to communicate and monitor Science, Technology, and Innovation outputs and indicators.", img: assets.dashboardImage },
              { title: "NACETEM Digital Academy", desc: "An online learning and professional development platform focused on emerging technologies, leadership, and innovation management.", img: assets.digitalAcademyImage },
              { title: "Research Commercialization", desc: "Programs designed to bridge the gap between research outputs and industry adoption.", img: assets.policyImage },
              { title: "Technology Foresight", desc: "Strategic future-oriented studies supporting national planning and technological preparedness.", img: assets.seminarImage }
            ].map((initiative, idx) => (
              <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <img src={initiative.img} alt={initiative.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-serif text-slate-900 mb-3">{initiative.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{initiative.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Partnerships & Collaborations */}
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

      {/* 9. Director General Message */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <div className="aspect-[3/4] relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm">
                <img 
                  src={assets.ntaImage} 
                  alt="NACETEM Director General interview" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3 max-w-2xl">
              <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">Message from the Director General/CEO</h2>
              <h3 className="text-3xl font-serif text-slate-900 mb-8 leading-tight">"Together, we can harness technology and innovation for national prosperity."</h3>
              
              <div className="space-y-6 text-slate-600 leading-relaxed mb-10">
                <p>At NACETEM, we recognize that Science, Technology, and Innovation remain critical drivers of economic growth, national competitiveness, and sustainable development.</p>
                <p>Our commitment is to support Nigeria's transformation through strategic research, innovation management, digital transformation, and evidence-based policy support. We continue to build partnerships and develop innovative solutions that position Nigeria for the future global knowledge economy.</p>
              </div>
              
              <div>
                <p className="font-serif text-xl text-slate-900">Dr. Olushola Odusanya</p>
                <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Director General / CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Why NACETEM */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif mb-6">Why NACETEM?</h2>
            <p className="text-slate-100/80 max-w-2xl mx-auto">Providing unmatched expertise in technology management and policy implementation.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "National STI Expertise", desc: "Deep experience in technology management and innovation systems." },
              { title: "Policy-Driven Solutions", desc: "Research and recommendations aligned with national development priorities." },
              { title: "Strategic Partnerships", desc: "Strong collaborations with national and international stakeholders." },
              { title: "Emerging Technology", desc: "Leadership in AI, digital transformation, and innovation ecosystems." },
              { title: "Capacity Development", desc: "Professional training and institutional strengthening programmes." },
              { title: "Research Excellence", desc: "Commitment to evidence-based analysis and impactful outcomes." },
            ].map((reason, idx) => (
              <div key={idx} className="border border-slate-700/60 bg-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 shadow-md">
                <h4 className="text-lg font-serif text-gold mb-3">{reason.title}</h4>
                <p className="text-sm text-slate-100/90 leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Call To Action & Footer Quick Info */}
      <section className="py-24 bg-emerald-900 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-serif mb-6 leading-tight">Partner With NACETEM</h2>
          <p className="text-emerald-100 text-lg mb-10 leading-relaxed">
            Join us in driving innovation, digital transformation, and sustainable national development through Science, Technology, and Innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-gold text-slate-900 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-emerald-900 transition-colors rounded-sm">
              Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/initiatives" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-emerald-500 text-white font-bold text-sm tracking-widest uppercase hover:bg-emerald-800 transition-colors rounded-sm">
              Explore Training 
            </Link>
          </div>
          
          <div className="border-t border-emerald-800/50 pt-12 flex flex-wrap justify-center gap-8 text-left">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-gold" />
              <div>
                <p className="text-xs text-emerald-200 uppercase tracking-widest font-bold">Institution</p>
                <p className="text-sm">National STI Think-Tank</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-gold" />
              <div>
                <p className="text-xs text-emerald-200 uppercase tracking-widest font-bold">Focus</p>
                <p className="text-sm">AI, Digital Transformation, STI Policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-gold" />
              <div>
                <p className="text-xs text-emerald-200 uppercase tracking-widest font-bold">Reach</p>
                <p className="text-sm">Nationwide & International</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
