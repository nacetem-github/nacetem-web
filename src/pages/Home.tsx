import { Link } from 'react-router-dom';
import { ArrowRight, Search, Landmark, GraduationCap, Layers, MapPin, Calendar as CalendarIcon, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { assets } from '../assets';
import { NewsletterSubscribe } from '../components/NewsletterSubscribe';
import { getEventSlug, splitEventsByStatus } from '../utils/eventUtils';

const heroSlides = [
  {
    image: assets.headquartersImage,
    title: 'NACETEM Headquarters',
  },
  {
    image: assets.capacityImage,
    title: 'Capacity Development Programmes',
  },
  {
    image: assets.policyImage,
    title: 'STI Policy Engagement',
  },
];

const galleryFallbacks = [
  { id: 'fallback-1', url: assets.bayelsaNewsImage, title: 'Institutional Engagement' },
  { id: 'fallback-2', url: assets.capacityImage, title: 'Capacity Development Session' },
  { id: 'fallback-3', url: assets.policyImage, title: 'STI Policy Programme' },
  { id: 'fallback-4', url: assets.seminarImage, title: 'Research Seminar Series' },
  { id: 'fallback-5', url: assets.dashboardImage, title: 'STI Intelligence Platform' },
  { id: 'fallback-6', url: assets.ntaImage, title: 'Media Engagement' },
];

export default function Home() {
  const { gallery, events, news } = useData();
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const activeHero = heroSlides[activeHeroIndex];
  const displayedGallery = [
    ...gallery.filter((item) => item.status === 'published'),
    ...galleryFallbacks.filter((fallback) => !gallery.some((img) => img.url === fallback.url)),
  ].slice(0, 6);
  const featuredStories = news.filter((article) => article.status === 'published' && article.featured);
  const storyPool = featuredStories.length ? featuredStories : news.filter((article) => article.status === 'published');
  const displayedStories = Array.from({ length: Math.min(3, storyPool.length) }, (_, index) => storyPool[(activeStoryIndex + index) % storyPool.length]);
  const homepageEvents = splitEventsByStatus(events.filter((event) => event.status === 'published')).upcomingEvents
    .sort((a, b) => a.startDate.localeCompare(b.startDate)).slice(0, 2);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-slate-50 border-b border-slate-200 text-slate-900 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl min-w-0"
            >
              <div className="inline-flex items-center text-gold font-serif italic text-xl mb-6">
                Welcome To
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-tight mb-6 leading-none">
                National Centre for Technology Management
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-full">
                Driving Science, Technology, and Innovation for national development through policy research, strategic capacity building, innovation system development, and technology management initiatives that strengthen evidence-based decision-making and institutional growth.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/initiatives" className="inline-flex justify-center items-center w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors">
                  Explore Initiatives
                </Link>
                <Link to="/contact" className="inline-flex justify-center items-center w-full sm:w-auto px-6 py-3 bg-transparent border border-slate-300 hover:border-slate-400 text-slate-900 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors">
                  Contact Us
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-12 lg:mt-0 min-w-0 flex justify-center lg:justify-end"
            >
              <div className="relative z-10 w-full max-w-[520px]">
                <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold to-transparent -translate-y-1/2 z-0"></div>
                <div className="relative mx-auto aspect-square w-full max-w-[500px] rounded-full border-[10px] border-white bg-slate-100 shadow-2xl overflow-hidden z-10">
                  <motion.img
                    key={activeHero.image}
                    src={activeHero.image}
                    alt={activeHero.title}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.08, rotate: 1.5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-full ring-1 ring-black/10 pointer-events-none"></div>
                  <div className="absolute inset-x-12 bottom-10 h-1 bg-white/40 rounded-full overflow-hidden">
                    <motion.div
                      key={activeHeroIndex}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5, ease: 'linear' }}
                      className="h-full bg-gold"
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-3">
                  {heroSlides.map((slide, idx) => (
                    <button
                      key={slide.title}
                      type="button"
                      onClick={() => setActiveHeroIndex(idx)}
                      className={`h-2.5 rounded-full transition-all ${idx === activeHeroIndex ? 'w-10 bg-emerald-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                      aria-label={`Show ${slide.title}`}
                    />
                  ))}
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute bottom-8 right-0 sm:right-4 w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-emerald-50 border border-emerald-100 z-0"></div>
              <div className="absolute top-2 left-0 sm:left-4 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-100 border border-slate-200 z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="bg-white border-b border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 max-w-7xl mx-auto border-x border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="flex flex-col p-6">
            <div className="text-emerald-600 mb-4"><Search className="h-7 w-7" /></div>
            <h3 className="font-serif text-lg text-slate-900 mb-2">Policy Research</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Supporting evidence-based STI policy and national planning.</p>
          </div>
          <div className="flex flex-col p-6">
            <div className="text-emerald-600 mb-4"><Landmark className="h-7 w-7" /></div>
            <h3 className="font-serif text-lg text-slate-900 mb-2">Federal Ministry</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Under the Federal Ministry of Innovation, Science and Technology.</p>
          </div>
          <div className="flex flex-col p-6">
            <div className="text-emerald-600 mb-4"><GraduationCap className="h-7 w-7" /></div>
            <h3 className="font-serif text-lg text-slate-900 mb-2">Capacity Development.</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Training public and private sector stakeholders for institutional growth.</p>
          </div>
          <div className="flex flex-col p-6">
            <div className="text-emerald-600 mb-4"><Layers className="h-7 w-7" /></div>
            <h3 className="font-serif text-lg text-slate-900 mb-2">Innovation Ecosystem</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Strengthening partnerships, platforms, and innovation.</p>
          </div>
        </div>
      </section>

      {/* Featured Initiatives */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col mb-16 max-w-3xl"
          >
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Featured Initiatives</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-4 leading-tight">Flagship Programmes Driving Innovation and Capacity Development</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Explore NACETEM's key platforms and programmes supporting policy research, digital transformation, professional skills development, innovation systems, and evidence-based national planning.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Public Service Rules Exam Prep Tool",
                desc: "AI-supported exam preparation platform designed to help public servants prepare effectively for promotion examinations.",
                link: "/psr-test",
                img: assets.psrImage
              },
              {
                title: "NACETEM AI-Ecosystem powered by Daimlas",
                desc: "A collaborative platform connecting AI stakeholders, research opportunities, innovation projects, and implementation support.",
                link: "/initiatives#ai-ecosystem",
                img: assets.aiEcosystemImage
              },
              {
                title: "NACETEM Digital Academy",
                desc: "Professional and academic learning programmes focused on digital skills, innovation, technology management, and institutional transformation.",
                link: "/initiatives#digital-academy",
                img: assets.digitalAcademyImage
              },
              {
                title: "NACETEM Welding Initiative",
                desc: "A technical capacity-building initiative supporting welding excellence, certification readiness, and industrial skills development.",
                link: "/initiatives#welding-initiative",
                img: assets.weldingImage
              },
              {
                title: "Systems Dynamics and Systems Thinking",
                desc: "A strategic programme for understanding complex systems, improving policy analysis, and strengthening evidence-based decision-making.",
                link: "/initiatives#systems-thinking",
                img: assets.seminarImage
              },
              {
                title: "STI Dashboard / STI Intelligence Platform",
                desc: "A data-driven platform for communicating science, technology, and innovation outputs for national planning and policy coordination.",
                link: "/initiatives#sti-dashboard",
                img: assets.dashboardImage
              }
            ].map((initiative, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl group flex flex-col p-5 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all duration-300">
                <div className="h-48 overflow-hidden mb-4 border border-slate-100 rounded-xl">
                  <img src={initiative.img} alt={initiative.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex-1 flex flex-col pt-2">
                  <h4 className="text-lg font-serif text-slate-900 mb-2">{initiative.title}</h4>
                  <p className="text-slate-500 mb-4 flex-1 text-xs leading-relaxed">{initiative.desc}</p>
                  <Link to={initiative.link} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-emerald-700 transition-colors border-b border-transparent hover:border-emerald-700 pb-1 self-start">
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Mandate & Mission */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden text-center lg:text-left">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10 pointer-events-none">
          <div className="w-[800px] h-[800px] border-[40px] border-emerald-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 opacity-10 pointer-events-none">
          <div className="w-[600px] h-[600px] bg-emerald-600 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center"
          >
            
            {/* Left Column: Mandate Header & List */}
            <div>
              <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold/70 pb-1 px-1 mx-auto lg:mx-0">
                Our Mandate
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
                Strategic National Responsibilities
              </h2>
              <p className="text-white/72 text-[15px] mb-10 leading-8 max-w-xl mx-auto lg:mx-0">
                NACETEM delivers institutional capacity, policy intelligence, and advanced STI management support to strengthen national development outcomes.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="group rounded-2xl border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.08]">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex justify-center items-center text-emerald-300 mb-6 group-hover:bg-emerald-500/20 transition-colors">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-serif text-white mb-3 group-hover:text-gold transition-colors">Policy Research</h4>
                  <p className="text-white/68 text-sm leading-7">
                    To conduct policy research, evaluation and review with a view to providing sound policy advice for dynamic technology-driven, knowledge-based development.
                  </p>
                </div>

                <div className="group rounded-2xl border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.08]">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex justify-center items-center text-emerald-300 mb-6 group-hover:bg-emerald-500/20 transition-colors">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-serif text-white mb-3 group-hover:text-gold transition-colors">Capacity Building</h4>
                  <p className="text-white/68 text-sm leading-7">
                    To design and run postgraduate courses/programmes in STI management in conjunction with appropriate established institutions at home and abroad.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Mission and Vision Cards */}
            <div className="flex flex-col gap-8 relative pb-8 pt-8">
              {/* Decorative connecting line hidden on small screens */}
              <div className="hidden lg:block absolute left-[-40px] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent"></div>

              <div className="bg-emerald-900/45 backdrop-blur-md border border-emerald-500/25 rounded-[28px] p-8 sm:p-10 relative group overflow-hidden transition-all hover:bg-emerald-900/60 lg:mr-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/10 blur-2xl group-hover:bg-emerald-400/20 transition-all"></div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-200 mb-4">Purpose</div>
                <h3 className="text-3xl sm:text-4xl font-serif mb-5 text-gold flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <span className="w-10 h-px bg-gold hidden sm:block"></span>
                  Our Mission
                </h3>
                <p className="text-white/82 text-[15px] leading-8 text-center lg:text-left relative z-10">
                  To play a leading role in the build-up of expertise for effective management of science, technology and innovation and to actively engage in policy research, design, evaluation and review.
                </p>
              </div>

              <div className="bg-white/[0.065] backdrop-blur-md border border-white/15 rounded-[28px] p-8 sm:p-10 relative group overflow-hidden transition-all hover:bg-white/[0.09] lg:ml-12 shadow-2xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-2xl group-hover:bg-white/15 transition-all"></div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/55 mb-4">Direction</div>
                <h3 className="text-3xl sm:text-4xl font-serif mb-5 text-white flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <span className="w-10 h-px bg-white/80 hidden sm:block"></span>
                  Our Vision
                </h3>
                <p className="text-white/74 text-[15px] leading-8 text-center lg:text-left relative z-10">
                  To be an internationally recognised centre of excellence in science, technology and innovation management for sustainable development.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-white overflow-hidden text-center lg:text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col mb-20 max-w-3xl mx-auto lg:mx-0"
          >
             <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 mb-6 leading-tight">Programmes and Interventions</h2>
             <p className="text-sm text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">Focused on capacity, research, and collaborative innovation systems.</p>
          </motion.div>

          <div className="space-y-24">
            {[
              {
                title: "Policy Research & Advisory",
                desc: "NACETEM's policy research projects are designed to assist policymakers in improving the management of science, technology, and innovation. We provide research-driven insights, data-backed guidance, and cutting-edge policy options.",
                label: "Evidence-led strategy",
                img: assets.policyImage,
                link: "/research"
              },
              {
                title: "Capacity Building",
                desc: "NACETEM's capacity building programmes are designed to address knowledge gaps within the national innovation system. We deploy targeted training initiatives, practical workshops, and a continuous learning focus.",
                label: "Skills for institutions",
                img: assets.capacityImage,
                link: "/capacity-building"
              },
              {
                title: "Innovation Systems",
                desc: "NACETEM's innovation systems and partnership initiatives strengthen collaboration among STI stakeholders. Our programmes aim for improved coordination, accelerated technology infusion, and strengthened ecosystems.",
                label: "Connected ecosystems",
                img: assets.aiEcosystemImage,
                link: "/initiatives"
              }
            ].map((program, idx) => {
              const isEven = idx % 2 !== 0;
              return (
                <div key={idx} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full lg:w-1/2"
                  >
                    <div className="relative rounded-[28px] border border-gold/40 bg-white p-2 shadow-xl shadow-slate-900/5">
                      <div className="absolute -inset-3 rounded-[34px] border border-emerald-600/10 pointer-events-none"></div>
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] border border-white ring-1 ring-slate-200/80">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent z-10 transition-colors duration-500"></div>
                        <img src={program.img} alt={program.title} loading="lazy" decoding="async" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out" />
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    className="w-full lg:w-1/2 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                      <span className="h-px w-12 bg-gold"></span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                        {program.label}
                      </span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-5 leading-tight">{program.title}</h3>
                    <p className="text-slate-600 text-[15px] mb-8 leading-8 max-w-xl mx-auto lg:mx-0">{program.desc}</p>
                    <div className="mx-auto lg:mx-0">
                      <Link to={program.link} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-emerald-700 border-b border-slate-300 hover:border-emerald-700 pb-1 transition-colors group">
                        Learn More <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col mb-12 max-w-3xl"
          >
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-4">Gallery & Media</h2>
            <p className="text-sm text-slate-600">Visual highlights from our events, workshops, and institutional milestones.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedGallery.map((img) => (
              <div key={img.id} className="bg-white border border-slate-200/80 rounded-2xl group flex flex-col p-5 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all duration-300">
                <div className="h-64 overflow-hidden mb-4 border border-slate-100 rounded-xl relative">
                  <img src={img.url} alt={img.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/5 transition-colors duration-500"></div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-serif text-slate-900">{img.title}</h4>
                </div>
              </div>
            ))}
          </motion.div>
          
          <div className="mt-10 text-center pt-8 relative">
            <div className="absolute top-0 left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/70 to-transparent"></div>
            <Link to="/news#event-gallery" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-emerald-700 border-b border-transparent hover:border-emerald-700 pb-1">
              View Complete Gallery <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-slate-50 relative">
        <div className="absolute top-0 left-1/2 h-px w-[min(78rem,calc(100%-2rem))] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row justify-between items-end mb-12"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-4">Upcoming Events</h2>
              <p className="text-sm text-slate-600">Join our workshops, conferences, and capacity-building sessions focusing on science, technology, and innovation management.</p>
            </div>
            <Link to="/events" className="hidden md:inline-flex items-center text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 border-b border-transparent hover:border-emerald-700 pb-1">
              View All Events <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {homepageEvents.map((event) => (
              <div key={event.id} className="bg-white border border-slate-200 p-8 hover:border-emerald-600 transition-all group flex flex-col md:flex-row gap-6">
                {event.flyerUrl ? (
                  <div className="h-40 md:h-auto md:w-32 overflow-hidden bg-slate-900 border border-slate-100 shrink-0">
                    <img src={event.flyerUrl} alt={`${event.title} flyer`} loading="lazy" decoding="async" className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 p-4 shrink-0 min-w-24">
                    <CalendarIcon className="h-6 w-6 text-emerald-600 mb-2" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gold text-center">{event.date.split(' ')[0]}</span>
                    <span className="text-2xl font-serif text-slate-900 leading-none mt-1">{event.date.split(' ')[1]?.replace(',', '') || ''}</span>
                  </div>
                )}
                <div className="flex flex-col flex-1 justify-center">
                  <div className="mb-3 inline-flex items-center self-start bg-slate-100 px-2 py-1 text-[10px] uppercase tracking-widest font-bold text-emerald-700">
                    <CalendarIcon className="h-3 w-3 mr-1" /> {event.date}{event.time ? ` | ${event.time}` : ''}
                  </div>
                  <h3 className="text-xl font-serif text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{event.title}</h3>
                  <div className="flex items-center text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-3 gap-2 flex-wrap">
                    <span className="flex items-center bg-slate-100 px-2 py-1"><MapPin className="h-3 w-3 mr-1" /> {event.location}</span>
                    {event.fee && <span className="flex items-center bg-slate-100 px-2 py-1">Fee: {event.fee}</span>}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{event.description}</p>
                  <Link to={`/events/${getEventSlug(event)}`} className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-900 hover:text-emerald-700 mt-auto border-b border-transparent hover:border-emerald-700 pb-1 self-start">
                    Event Details <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/events" className="inline-flex items-center justify-center px-6 py-3 border border-emerald-600 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-emerald-50 transition-colors w-full">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-20 bg-slate-50 relative">
        <div className="absolute top-0 left-1/2 h-px w-[min(78rem,calc(100%-2rem))] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 h-px w-[min(78rem,calc(100%-2rem))] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-4">News & Updates</h2>
            <p className="text-sm text-slate-600 leading-relaxed">Stay Updated with NACETEM Activities and Programmes. Explore our latest news, upcoming events, and key activities across NACETEM's programmes, collaborations, and national engagements.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {displayedStories.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.slug}`}
                className="group flex flex-col h-full min-h-[520px] bg-white border border-slate-200/80 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="relative h-56 mb-6 border border-slate-100 rounded-xl overflow-hidden shrink-0">
                  <img src={article.image} alt={article.imageAlt} loading="lazy" decoding="async" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest">{article.category}</div>
                </div>
                <p className="text-xs text-gold mb-3 font-bold uppercase tracking-widest">{article.date}</p>
                <h3 className="text-xl font-serif text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors leading-tight line-clamp-3">{article.title}</h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed flex-1 line-clamp-5">{article.summary}</p>
                <span className="text-slate-900 font-bold uppercase tracking-widest text-xs inline-flex items-center mt-auto border-b border-transparent group-hover:border-slate-900 pb-1 self-start">Read More <ArrowRight className="ml-1 h-3 w-3" /></span>
              </Link>
            ))}
          </motion.div>
          {storyPool.length > 3 && (
            <div className="mt-8 flex items-center justify-center gap-3" aria-label="Featured story slider controls">
              <button type="button" onClick={() => setActiveStoryIndex((current) => (current - 1 + storyPool.length) % storyPool.length)} className="rounded-full border border-slate-300 px-4 py-2 text-xs font-bold uppercase tracking-wider hover:border-emerald-600">Previous</button>
              <span className="text-xs text-slate-500">{activeStoryIndex + 1} / {storyPool.length}</span>
              <button type="button" onClick={() => setActiveStoryIndex((current) => (current + 1) % storyPool.length)} className="rounded-full border border-slate-300 px-4 py-2 text-xs font-bold uppercase tracking-wider hover:border-emerald-600">Next</button>
            </div>
          )}
          
          <div className="mt-10 text-center">
            <Link to="/news" className="inline-flex items-center justify-center px-6 py-3 border border-emerald-600 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-emerald-50 transition-colors w-full sm:w-auto">
              View All News <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 h-px w-[min(78rem,calc(100%-2rem))] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
             <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-4 border-b border-gold pb-1 px-1">
               Our Partners
             </div>
             <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-4">Trusted Collaborators and Strategic Partners</h2>
             <p className="text-sm text-slate-600">We collaborate with leading institutions, organizations, and partners to advance science, technology, and innovation in Nigeria.</p>
          </div>

          <div className="relative w-full overflow-hidden flex whitespace-nowrap py-8 px-2 group/partners">
            <div className="absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            <div 
               className="partner-marquee flex items-center gap-12 sm:gap-24 shrink-0"
            >
              {[
                { src: assets.apodissiLogo, alt: "APODISSI" },
                { src: assets.osustechLogo, alt: "Olusegun Agagu University of Science and Technology" },
                { src: assets.whitecloudLogo, alt: "Whitecloud TVET" },
                { src: assets.wentworthLogo, alt: "Wentworth Institute of Technology" },
                { src: assets.arcoLogo, alt: "ARCO Worldwide" },
                { src: assets.daimlasLogo, alt: "Daimlas AI Ecosystem Builders" },
                { src: assets.apodissiLogo, alt: "APODISSI" },
                { src: assets.osustechLogo, alt: "Olusegun Agagu University of Science and Technology" },
                { src: assets.whitecloudLogo, alt: "Whitecloud TVET" },
                { src: assets.wentworthLogo, alt: "Wentworth Institute of Technology" },
                { src: assets.arcoLogo, alt: "ARCO Worldwide" },
                { src: assets.daimlasLogo, alt: "Daimlas AI Ecosystem Builders" },
              ].map((logo, idx) => (
                <div key={idx} className="flex items-center justify-center h-24 w-48 shrink-0 transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-105">
                  <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain drop-shadow-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <NewsletterSubscribe />

      {/* Call to Action Section */}
      <section className="py-24 bg-emerald-900 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-serif mb-6 leading-tight">Ready to collaborate on Innovation?</h2>
          <p className="text-emerald-100 text-lg mb-10 leading-relaxed">
            Join NACETEM's programmes and initiatives to drive sustainable development and technological advancement in Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-gold text-slate-900 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-emerald-900 transition-colors rounded-sm">
              Partner With Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/about" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-emerald-500 text-white font-bold text-sm tracking-widest uppercase hover:bg-emerald-800 transition-colors rounded-sm">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="py-24 bg-slate-50 relative">
        <div className="absolute top-0 left-1/2 h-px w-[min(78rem,calc(100%-2rem))] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-slate-900 mb-4">Watch Our Impact</h2>
            <p className="text-slate-600">Discover how NACETEM is shaping the STI landscape across the nation.</p>
          </div>
          <div className="relative w-full aspect-video rounded-[11px] overflow-hidden shadow-2xl border-[2.11px] border-slate-200 bg-slate-900">
            <iframe 
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full" 
              src="https://www.youtube.com/embed/ca28dtNXL64?si=uJyrihc5jfUwXTgc" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
