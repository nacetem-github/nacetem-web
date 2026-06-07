import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Target, Activity, Users, Monitor, Shield, GraduationCap, ChevronRight, CheckCircle2, Globe, Building2, Quote, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { assets } from '../assets';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const initiatives = [
  {
    title: "Public Service Rules Exam Prep Tool",
    desc: "AI-supported exam preparation platform designed to help public servants prepare effectively for promotion examinations.",
    img: assets.psrImage
  },
  {
    title: "NACETEM AI-Ecosystem powered by Daimlas",
    desc: "A collaborative platform connecting AI stakeholders, research opportunities, innovation projects, and implementation support.",
    img: assets.aiEcosystemImage
  },
  {
    title: "NACETEM Digital Academy",
    desc: "Professional and academic learning programmes focused on digital skills, innovation, technology management, and institutional transformation.",
    img: assets.digitalAcademyImage
  },
  {
    title: "NACETEM Welding Initiative",
    desc: "A technical capacity-building initiative supporting welding excellence, certification readiness, and industrial skills development.",
    img: assets.weldingImage
  },
  {
    title: "Systems Dynamics and Systems Thinking",
    desc: "A strategic programme for understanding complex systems, improving policy analysis, and strengthening evidence-based decision-making.",
    img: assets.seminarImage
  },
  {
    title: "STI Dashboard / STI Intelligence Platform",
    desc: "A data-driven platform for communicating science, technology, and innovation outputs for national planning and policy coordination.",
    img: assets.dashboardImage
  }
];

export default function Initiatives() {
  return (
    <div className="flex-1 bg-slate-50 font-sans overflow-hidden">
      {/* 1. Header & Page Introduction */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <img 
            src={assets.aiEcosystemImage} 
            alt="NACETEM Initiatives" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center text-slate-100 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
            <ArrowLeft className="h-3 w-3 mr-2" />
            Back to Home
          </Link>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl">
            <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              National Programmes
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
              Driving Innovation Through Strategic National Initiatives
            </h1>
            <div className="space-y-6 text-lg text-slate-100/90 leading-relaxed mb-10">
              <p>At NACETEM, our initiatives are designed to strengthen Nigeria’s Science, Technology, and Innovation ecosystem through digital transformation, strategic research, policy intelligence, professional development, and emerging technology adoption.</p>
              <p>These initiatives support government institutions, academia, industry, startups, researchers, public servants, and development partners by creating platforms that promote collaboration, innovation, knowledge management, and national competitiveness.</p>
              <p>Through these programmes, NACETEM continues to provide practical solutions that contribute to evidence-based policymaking, institutional strengthening, workforce development, and sustainable socio-economic growth.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Initiatives Cards */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Core Programmes</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-6">Our Featured Initiatives</h3>
          </div>
          
          <div className="space-y-12">
            {initiatives.map((init, idx) => (
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} key={idx} className="bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row overflow-hidden group rounded-2xl hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all duration-300">
                 <div className="md:w-1/3 h-64 md:h-auto border-b md:border-b-0 md:border-r border-slate-200 relative overflow-hidden">
                    <img src={init.img} alt={init.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                 </div>
                 <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center">
                    <div className="w-12 h-1 bg-gold mb-6"></div>
                    <h2 className="text-2xl font-serif text-slate-900 mb-4">{init.title}</h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-8">{init.desc}</p>
                    <Link to="#" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-emerald-700 hover:text-emerald-900 transition-colors border-b border-transparent hover:border-emerald-700 pb-1 self-start">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                 </div>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Initiatives Matter */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-serif mb-6 text-white">Why These Initiatives Matter</h2>
              <p className="text-slate-100/90 mb-6 leading-relaxed text-lg">
                Nigeria’s development increasingly depends on the ability to harness technology, data, innovation, and institutional knowledge for national transformation.
              </p>
              <p className="text-slate-100/90 mb-8 leading-relaxed">
                NACETEM’s featured initiatives were established to address key development challenges and foster a sustainable future.
              </p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Support evidence-based decision-making",
                "Improve public sector efficiency",
                "Strengthen national innovation systems",
                "Promote digital transformation",
                "Build future-ready skills",
                "Encourage AI & tech adoption",
                "Improve policy coordination",
                "Facilitate stakeholder collaboration",
                "Enhance institutional productivity",
                "Support SDGs"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start text-sm text-emerald-100 bg-slate-800 p-4 rounded-[6px] border border-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-gold mr-3 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* National Impact Areas */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Value Creation</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-6">National Impact Areas</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Monitor, title: "Digital Transformation", desc: "Helping institutions modernize operations through digital systems, AI tools, and technology-enabled solutions." },
              { icon: Building2, title: "Public Sector Capacity", desc: "Supporting professional development and knowledge enhancement for public servants and institutions." },
              { icon: Globe, title: "Innovation Ecosystem", desc: "Connecting researchers, innovators, startups, policymakers, and development partners." },
              { icon: Database, title: "Research & Policy Intelligence", desc: "Providing strategic insights, STI indicators, and analytical frameworks for national planning." },
              { icon: Users, title: "Workforce Development", desc: "Equipping professionals and young people with practical digital and technical skills." },
              { icon: Activity, title: "Emerging Tech Adoption", desc: "Promoting Artificial Intelligence, data systems, automation, and future technologies for development." }
            ].map((impact, idx) => (
              <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white p-8 rounded-[11px] border border-slate-200">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-sm mb-6">
                  <impact.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-slate-900 mb-3">{impact.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{impact.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiative Features Section */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/3">
              <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">Features</h2>
              <h3 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-6">What Our Platforms Offer</h3>
              <p className="text-slate-600 leading-relaxed mb-8">Access a rich suite of tools and resources designed to drive capacity building and innovation.</p>
              <div className="w-16 h-1 bg-gold"></div>
            </div>
            
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Interactive Learning", desc: "Digital courses, learning resources, assessments, and certification programmes." },
                { title: "AI-Powered Systems", desc: "Leverage Artificial Intelligence for learning support, policy insights, and innovation development." },
                { title: "Research Collaboration", desc: "Connect with institutions, researchers, and stakeholders on national innovation projects." },
                { title: "Data & Intelligence", desc: "Visualize STI indicators, performance metrics, and strategic development insights." },
                { title: "Knowledge Resources", desc: "Access policy documents, reports, research outputs, publications, and technical materials." },
                { title: "Institutional Support", desc: "Receive support for training, research development, innovation systems, and strategic planning." }
              ].map((feature, idx) => (
                <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex">
                  <div className="flex-shrink-0 mt-1">
                     <Target className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Alignment & Beneficiaries */}
      <section className="py-24 bg-slate-900 text-white relative border-y-8 border-gold">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               
               {/* Strategic Alignment */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                 <h2 className="text-3xl font-serif text-white mb-6">Supporting National Priorities</h2>
                 <p className="text-emerald-100 mb-8 leading-relaxed">
                   Our initiatives contribute directly to building a knowledge-driven economy and strengthening Nigeria’s global competitiveness, aligning with:
                 </p>
                 <div className="space-y-4">
                   {[
                     "National Science, Technology and Innovation Policy",
                     "National Development Plan",
                     "Digital Economy Policies",
                     "Public Sector Reform Initiatives",
                     "Sustainable Development Goals (SDGs)",
                     "National Capacity Development Priorities",
                     "Innovation and Industrial Development Goals",
                     "Emerging Technology and AI Strategies"
                   ].map((item, idx) => (
                     <div key={idx} className="flex items-center text-sm font-bold text-slate-100/90">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full mr-4 shrink-0"></div>
                        {item}
                     </div>
                   ))}
                 </div>
               </motion.div>

               {/* Beneficiaries */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-slate-800 p-8 rounded-[11px] border border-slate-700">
                 <h2 className="text-2xl font-serif text-white mb-8">Who Benefits From These Initiatives?</h2>
                 <div className="space-y-6">
                    {[
                      { role: "Government Institutions", desc: "Enhancing policy implementation and digital governance." },
                      { role: "Researchers & Academics", desc: "Supporting collaborative research and data access." },
                      { role: "Public Servants", desc: "Professional development and promotion exam support." },
                      { role: "Students & Young Professionals", desc: "Equipping future leaders with digital skills." },
                      { role: "Startups & Innovators", desc: "Opportunities for networking and collaboration." },
                      { role: "Development Partners", desc: "Strategic partnerships for national innovation programmes." }
                    ].map((ben, idx) => (
                      <div key={idx} className="flex flex-col border-b border-slate-700 pb-4 last:border-0 last:pb-0">
                        <span className="text-gold font-bold text-sm tracking-widest uppercase mb-1">{ben.role}</span>
                        <span className="text-sm text-slate-400">{ben.desc}</span>
                      </div>
                    ))}
                 </div>
               </motion.div>

            </div>
         </div>
      </section>

      {/* Quick Statistics */}
      <section className="py-20 bg-emerald-900 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center text-white">
              {[
                { title: "1,000+", label: "Professionals Trained" },
                { title: "Multiple", label: "National Partnerships" },
                { title: "AI & Digital", label: "Transformation Projects" },
                { title: "National", label: "STI Intelligence" },
                { title: "Capacity", label: "Development Programmes" },
                { title: "Actionable", label: "Policy Support" }
              ].map((stat, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="flex flex-col items-center justify-center">
                  <span className="text-3xl font-serif text-gold mb-2">{stat.title}</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-emerald-200">{stat.label}</span>
                </motion.div>
              ))}
           </motion.div>
        </div>
      </section>

      {/* Future Vision & Testimonials */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-16">
             <div className="lg:w-1/2">
               <h2 className="text-3xl font-serif text-slate-900 mb-6">Building the Future of Innovation in Nigeria</h2>
               <p className="text-slate-600 mb-8 leading-relaxed">
                 NACETEM remains committed to expanding these initiatives into integrated national platforms that will strengthen innovation ecosystems, support smart governance, and advance AI adoption.
               </p>
               <p className="text-slate-600 leading-relaxed font-bold border-l-4 border-emerald-600 pl-4 py-2">
                 Our vision is to position Nigeria as a leading innovation-driven economy in Africa through strategic technology management and evidence-based development systems.
               </p>
             </div>
             
             <div className="lg:w-1/2 space-y-6">
                {[
                  "NACETEM's digital initiatives are helping institutions embrace innovation and evidence-based planning.",
                  "The PSR Exam Prep Tool significantly improved accessibility to promotion examination preparation resources.",
                  "The AI Ecosystem initiative is creating meaningful collaboration opportunities for researchers and innovators."
                ].map((quote, idx) => (
                   <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-slate-50 p-6 rounded-[11px] border border-slate-200 relative">
                     <Quote className="absolute top-6 left-6 w-8 h-8 text-slate-200" />
                     <p className="text-sm text-slate-700 italic relative z-10 pl-10 pr-4">{quote}</p>
                   </motion.div>
                ))}
             </div>
           </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24 bg-emerald-900 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-serif mb-6 leading-tight">Partner With NACETEM Initiatives</h2>
          <p className="text-emerald-100 text-lg mb-10 leading-relaxed">
            Collaborate with us to advance innovation, research, digital transformation, and sustainable national development.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <Link to="/initiatives" className="inline-flex items-center justify-center px-8 py-4 bg-gold text-slate-900 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-emerald-900 transition-colors rounded-sm">
              Explore Platforms <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-emerald-500 text-white font-bold text-sm tracking-widest uppercase hover:bg-emerald-800 transition-colors rounded-sm">
              Become a Partner
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-emerald-300 font-bold text-sm tracking-widest uppercase hover:text-white hover:underline transition-colors rounded-sm">
              Contact NACETEM
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
