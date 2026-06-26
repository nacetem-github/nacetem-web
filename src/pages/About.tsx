import { motion } from 'framer-motion';
import { ArrowRight, Target, Lightbulb, Shield, Users, Leaf, Zap, BookOpen, Monitor, Award, Briefcase, CheckCircle2, Globe, Building2, GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../assets';
import { officialMandates, officialMission, officialVision } from '../data/institutionalProfile';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08
    }
  }
};

const strategicGoalCards = [
  {
    icon: Users,
    label: 'Goal 01',
    title: 'Capacity Building Services',
    goals: ['Strengthen capacity building services of the Agency.'],
  },
  {
    icon: Monitor,
    label: 'Goal 02',
    title: 'Digital Operations',
    goals: ['Digitize operational activities of the Agency.'],
  },
  {
    icon: Building2,
    label: 'Goal 03',
    title: 'Agency Reform Implementation',
    goals: ['Implement FCSSIP25 for the reformation of the Agency.'],
  },
  {
    icon: GraduationCap,
    label: 'Goal 04',
    title: 'STEM Education Training',
    goals: ['Create new STEM education trainings.'],
  },
  {
    icon: Award,
    label: 'Goal 05',
    title: 'Tech-Artisan Certification',
    goals: ['Develop certification programs for tech-artisans.'],
  },
  {
    icon: Zap,
    label: 'Goal 06',
    title: 'Emerging Technology Projects',
    goals: ['Advance the Fish Finding Technology project and Drone Technology Advancement program.'],
  },
  {
    icon: Lightbulb,
    label: 'Goal 07',
    title: 'STI Research and Policy Evaluation',
    goals: ['Advance STI management researches and policy evaluations.'],
  },
  {
    icon: Target,
    label: 'Goal 08',
    title: 'R&D Demonstration Centres',
    goals: ['Establish R&D demonstration centres.'],
  },
  {
    icon: Shield,
    label: 'Goal 09',
    title: 'Novel Technology Procedures',
    goals: ['Design management procedures for novel technology applications.'],
  },
  {
    icon: BookOpen,
    label: 'Goal 10',
    title: 'Staff Capacity Development',
    goals: ['Build capacities of NACETEM staff.'],
  },
];

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <motion.img
            src={assets.headquartersImage}
            alt="NACETEM Office"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            loading="lazy"
            initial={{ scale: 1.08, opacity: 0.18 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <motion.div
          className="absolute left-0 top-24 hidden h-px w-2/5 bg-gradient-to-r from-gold via-gold/60 to-transparent lg:block"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.45, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-0 hidden h-px w-1/3 bg-gradient-to-l from-emerald-400 via-emerald-400/50 to-transparent lg:block"
          initial={{ scaleX: 0, transformOrigin: "right" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.65, ease: "easeOut" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              About NACETEM
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
              Driving Science, Technology and Innovation for National Development
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-100/90 mb-10 leading-relaxed">
              The National Centre for Technology Management (NACETEM) is Nigeria's foremost institution for Science, Technology, and Innovation (STI) policy research, technology management, innovation systems development, and strategic capacity building.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <Link to="/initiatives" className="inline-flex justify-center items-center px-8 py-4 bg-emerald-600 text-white text-xs font-bold tracking-widest uppercase hover:bg-emerald-700 transition duration-300">
                  Explore Our Initiatives <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <Link to="/contact" className="inline-flex justify-center items-center px-8 py-4 bg-transparent border border-slate-500 text-white text-xs font-bold tracking-widest uppercase hover:border-gold hover:text-gold transition duration-300">
                  Contact NACETEM
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Institutional History & Administrative Status */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInLeft}
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
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInRight}
              className="lg:w-1/2 w-full"
            >
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="image-frame relative aspect-square sm:aspect-[4/3] rounded-2xl border border-slate-200/80 shadow-sm">
                <motion.img
                  src={assets.headquartersImage}
                  alt="NACETEM headquarters"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </motion.div>
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
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInLeft} whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="bg-slate-800 border border-slate-700/60 p-10 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-emerald-900/50 flex items-center justify-center rounded-full mb-6">
                <Target className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-gold">Our Vision</h3>
              <p className="text-slate-100/90 leading-relaxed text-lg">
                {officialVision}
              </p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight} whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="bg-slate-800 border border-slate-700/60 p-10 rounded-2xl shadow-lg">
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
                <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.25 }} className="bg-slate-800/50 border border-slate-700/60 p-6 rounded-2xl hover:bg-slate-800 hover:border-slate-600 transition-colors duration-300 shadow-md">
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-6">Our Mandate & Strategic Focus</h2>
            <p className="text-slate-600">NACETEM's mandate is centered on strengthening Nigeria's technological and innovation capabilities through strategic management systems, policy development, and institutional support.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {officialMandates.map((mandate, index) => (
              <motion.article key={mandate.title} variants={fadeInUp} whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm hover:shadow-md">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Official Mandate {index + 1}</p>
                <h3 className="mb-4 text-2xl font-serif text-slate-900">{mandate.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{mandate.description}</p>
              </motion.article>
            ))}
          </motion.div>

          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-10 text-center text-2xl font-serif text-slate-900">Strategic Focus Areas</motion.h3>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: "STI Policy & Research", desc: "Conducting evidence-based policy research and analysis to strengthen Nigeria's innovation ecosystem." },
              { icon: Monitor, title: "Digital Transformation", desc: "Promoting digital governance, smart systems, AI adoption, and technology-enabled public service delivery." },
              { icon: Briefcase, title: "Capacity Building & Training", desc: "Training and developing middle- to high-level manpower through specialized programmes, executive development courses, and institutional strengthening initiatives." },
              { icon: Globe, title: "Technology Foresight", desc: "Providing strategic intelligence and forecasting emerging trends shaping future economies." },
            ].map((focus, idx) => (
              <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -8 }} transition={{ duration: 0.25 }} className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-colors duration-300 group">
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center rounded-sm mb-6 group-hover:bg-emerald-600 transition-colors">
                  <focus.icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-lg text-slate-900 mb-3">{focus.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{focus.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnerships & Collaborations */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row gap-12 items-center">
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInLeft} className="md:w-1/3">
               <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-6">Partnerships & Collaborations</h2>
               <p className="text-slate-600 mb-6 leading-relaxed">
                 NACETEM collaborates with various institutions to strengthen innovation ecosystems, policy implementation, research commercialization, and sustainable development initiatives.
               </p>
             </motion.div>
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="md:w-2/3">
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
                    <motion.div key={idx} variants={fadeInUp} whileHover={{ x: 4 }} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 mr-3 shrink-0"></div>
                      <span>{partner}</span>
                    </motion.div>
                 ))}
               </div>
             </motion.div>
           </div>
        </div>
      </section>

      {/* Director-General's Leadership Direction */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInLeft} className="w-full md:w-1/3">
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="image-frame aspect-[2/3] relative mx-auto max-w-sm rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
                <motion.img
                  src="/uploads/about/dg-main.jpeg"
                  alt="Dr. Olushola Odusanya, Director-General and Chief Executive Officer of NACETEM"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                  whileHover={{ scale: 1.035 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInRight} className="md:w-2/3 max-w-2xl">
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
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer} className="mt-20 border-t border-slate-200 pt-16">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-700">Leadership Priorities</p>
              <h2 className="mb-5 text-3xl font-serif text-slate-900 sm:text-4xl">Director-General's Strategic Goals</h2>
              <p className="text-sm leading-7 text-slate-600">The leadership priorities guiding NACETEM's institutional reform, capacity development, research, and technology programmes.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {strategicGoalCards.map((goal, index) => {
                const GoalIcon = goal.icon;
                const featured = index === 0 || index === 5;

                return (
                  <motion.article
                    key={goal.title}
                    variants={scaleIn}
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ duration: 0.25 }}
                    className={`group relative min-h-[260px] overflow-hidden rounded-lg border p-6 transition-colors duration-300 hover:shadow-2xl hover:shadow-emerald-900/10 ${
                      featured
                        ? 'border-emerald-700 bg-emerald-700 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-900 hover:border-emerald-600/40 hover:bg-white'
                    }`}
                  >
                    <div className={`absolute right-4 top-4 font-serif text-6xl leading-none ${featured ? 'text-white/10' : 'text-slate-200'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className={`mb-8 flex h-14 w-14 items-center justify-center rounded-lg ${
                      featured ? 'bg-white/15 text-gold' : 'bg-white text-emerald-700 shadow-sm ring-1 ring-slate-200'
                    }`}>
                      <GoalIcon className="h-6 w-6" />
                    </div>

                    <p className={`mb-3 text-[10px] font-bold uppercase tracking-widest ${featured ? 'text-gold' : 'text-emerald-700'}`}>
                      {goal.label}
                    </p>
                    <h3 className={`mb-5 min-h-[56px] text-xl font-serif leading-tight ${featured ? 'text-white' : 'text-slate-900'}`}>
                      {goal.title}
                    </h3>

                    {goal.goals.map((item) => (
                      <div key={item} className="flex gap-3">
                        <CheckCircle2 className={`mt-1 h-5 w-5 shrink-0 ${featured ? 'text-gold' : 'text-emerald-600'}`} />
                        <p className={`text-sm leading-7 ${featured ? 'text-white/90' : 'text-slate-600'}`}>
                          {item}
                        </p>
                      </div>
                    ))}

                    <div className={`absolute inset-x-0 bottom-0 h-1 transition-all duration-300 group-hover:h-1.5 ${featured ? 'bg-gold' : 'bg-emerald-600'}`}></div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why NACETEM */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif mb-6">Why NACETEM?</h2>
            <p className="text-slate-100/80 max-w-2xl mx-auto">Providing unmatched expertise in technology management and policy implementation.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "National STI Expertise", desc: "Deep experience in technology management and innovation systems." },
              { title: "Policy-Driven Solutions", desc: "Research and recommendations aligned with national development priorities." },
              { title: "Strategic Partnerships", desc: "Strong collaborations with national and international stakeholders." },
              { title: "Emerging Technology", desc: "Leadership in AI, digital transformation, and innovation ecosystems." },
              { title: "Capacity Development", desc: "Professional training and institutional strengthening programmes." },
              { title: "Research Excellence", desc: "Commitment to evidence-based analysis and impactful outcomes." },
            ].map((reason) => (
              <motion.div key={reason.title} variants={fadeInUp} whileHover={{ y: -7 }} transition={{ duration: 0.25 }} className="border border-slate-700/60 bg-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors duration-300 shadow-md">
                <h4 className="text-lg font-serif text-gold mb-3">{reason.title}</h4>
                <p className="text-sm text-slate-100/90 leading-relaxed">{reason.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24 bg-emerald-900 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <motion.div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-serif mb-6 leading-tight">Partner With NACETEM</motion.h2>
          <motion.p variants={fadeInUp} className="text-emerald-100 text-lg mb-10 leading-relaxed">
            Join us in driving innovation, digital transformation, and sustainable national development through Science, Technology, and Innovation.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link to="/contact#contact-form" className="inline-flex items-center justify-center px-8 py-4 bg-gold text-slate-900 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-emerald-900 transition-colors rounded-sm">
                Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link to="/capacity-building" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-emerald-500 text-white font-bold text-sm tracking-widest uppercase hover:bg-emerald-800 transition-colors rounded-sm">
                Explore Training Programmes
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
