import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Lightbulb, Shield, Users, Leaf, Zap, BookOpen, Monitor, Award, Briefcase, ChevronRight, ChevronLeft, CheckCircle2, Globe, Building2, GraduationCap, MapPin } from 'lucide-react';
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

const strategicGoalCards = [
  {
    icon: Monitor,
    label: 'Goal 01',
    title: 'E-NACETEM Digital Operations',
    goals: [
      'Digitize all operational activities and services of the Agency (E-NACETEM).',
    ],
  },
  {
    icon: Building2,
    label: 'Goal 02',
    title: 'Agency Reform Implementation',
    goals: [
      'Implement FCSSIP25 for the reformation of the Agency.',
    ],
  },
  {
    icon: GraduationCap,
    label: 'Goal 03',
    title: 'New STEM Education Programmes',
    goals: [
      'Create new STEM education programs.',
    ],
  },
  {
    icon: Briefcase,
    label: 'Goal 04',
    title: 'Tech-Artisan Certification',
    goals: [
      'Develop certification programs for tech-artisans.',
    ],
  },
  {
    icon: Zap,
    label: 'Goal 05',
    title: 'Technology Infusion Across Sectors',
    goals: [
      'Drive technology infusion programs to all sectors of the national economy.',
    ],
  },
  {
    icon: Lightbulb,
    label: 'Goal 06',
    title: 'STI Research and Policy Evaluation',
    goals: [
      'Advance STI management researches and policy evaluations.',
    ],
  },
];

export default function About() {
  const [activeGoalIndex, setActiveGoalIndex] = useState(0);
  const activeGoal = strategicGoalCards[activeGoalIndex];
  const nextGoal = strategicGoalCards[(activeGoalIndex + 1) % strategicGoalCards.length];
  const ActiveGoalIcon = activeGoal.icon;
  const NextGoalIcon = nextGoal.icon;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveGoalIndex((current) => (current + 1) % strategicGoalCards.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

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
              <div className="relative">
                <div className="absolute -left-4 -top-4 h-24 w-24 border-l border-t border-gold/70"></div>
                <div className="absolute -right-4 -bottom-4 h-24 w-24 border-b border-r border-emerald-600/35"></div>
                <div className="aspect-[3/4] relative overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10">
                  <div className="relative h-full overflow-hidden rounded-lg bg-slate-100">
                    <img 
                      src={assets.dgImage} 
                      alt="Dr. Olushola Odusanya, NACETEM Director General and CEO" 
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Director General / CEO</p>
                      <p className="mt-1 font-serif text-2xl leading-tight">Dr. Olushola Odusanya</p>
                    </div>
                  </div>
                </div>
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

      {/* 9b. DG/CEO Strategic Goals */}
      <section className="py-24 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="max-w-xl lg:sticky lg:top-28"
            >
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-4">From the DG/CEO's Desk</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 mb-6 leading-tight">
                New Strategic Goals of NACETEM
              </h2>
              <p className="text-slate-600 leading-8 text-[15px] mb-8">
                NACETEM's renewed goals focus on digital transformation, public-sector reform, STEM education, artisan certification, technology infusion, and STI policy evaluation for national development.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveGoalIndex((activeGoalIndex - 1 + strategicGoalCards.length) % strategicGoalCards.length)}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-emerald-600/40 hover:text-emerald-700"
                  aria-label="Show previous strategic goal"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGoalIndex((activeGoalIndex + 1) % strategicGoalCards.length)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-emerald-600 bg-emerald-600 px-5 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-emerald-700"
                  aria-label="Show next strategic goal"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -left-5 top-10 hidden h-32 w-32 border-l border-t border-gold/60 lg:block"></div>
              <div className="absolute -right-5 bottom-10 hidden h-32 w-32 border-b border-r border-emerald-600/30 lg:block"></div>

              <div className="relative rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4 shadow-2xl shadow-slate-900/8">
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-4">
                  <motion.div
                    key={activeGoal.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="relative min-h-[420px] overflow-hidden rounded-lg border border-slate-200 bg-white p-7 sm:p-10"
                  >
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-600 via-gold to-emerald-600"></div>
                    <div className="absolute right-6 top-6 text-slate-100">
                      <ActiveGoalIcon className="h-28 w-28" />
                    </div>

                    <div className="relative z-10 flex min-h-[340px] flex-col">
                      <div className="mb-10 flex items-start justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-900/15">
                            <ActiveGoalIcon className="h-8 w-8" />
                          </div>
                          <div>
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gold">{activeGoal.label}</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Strategic priority</p>
                          </div>
                        </div>
                        <div className="hidden sm:block font-serif text-7xl leading-none text-slate-100">
                          {String(activeGoalIndex + 1).padStart(2, '0')}
                        </div>
                      </div>

                      <div className="mt-auto max-w-2xl">
                        <h3 className="text-3xl sm:text-5xl font-serif leading-tight text-slate-900 mb-8">{activeGoal.title}</h3>
                        {activeGoal.goals.map((goal) => (
                          <div key={goal} className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6">
                            <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-600" />
                            <p className="text-base sm:text-lg leading-8 text-slate-700">{goal}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
                    {strategicGoalCards.map((goal, idx) => {
                      const GoalIcon = goal.icon;
                      const isActive = idx === activeGoalIndex;

                      return (
                        <button
                          key={goal.title}
                          type="button"
                          onClick={() => setActiveGoalIndex(idx)}
                          className={`group flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                            isActive
                              ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-900/15'
                              : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-600/30 hover:bg-slate-50'
                          }`}
                          aria-label={`Show ${goal.title}`}
                        >
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            isActive ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100'
                          }`}>
                            <GoalIcon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <p className={`text-[9px] font-bold uppercase tracking-widest ${isActive ? 'text-emerald-50' : 'text-gold'}`}>
                              {goal.label}
                            </p>
                            <p className="truncate text-sm font-semibold">{goal.title}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <button
                    type="button"
                    onClick={() => setActiveGoalIndex((activeGoalIndex + 1) % strategicGoalCards.length)}
                    className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm transition-colors hover:border-emerald-600/30"
                    aria-label={`Preview next strategic goal: ${nextGoal.title}`}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-gold">
                      <NextGoalIcon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Next goal</p>
                      <p className="truncate text-sm font-semibold text-slate-900">{nextGoal.title}</p>
                    </div>
                    <ChevronRight className="ml-auto h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-700" />
                  </button>

                  <div className="flex items-center justify-end gap-2">
                    {strategicGoalCards.map((goal, idx) => (
                      <button
                        key={goal.label}
                        type="button"
                        onClick={() => setActiveGoalIndex(idx)}
                        className={`h-2 rounded-full transition-all ${idx === activeGoalIndex ? 'w-8 bg-emerald-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                        aria-label={`Show ${goal.title}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
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
