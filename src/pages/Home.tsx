import { Link } from 'react-router-dom';
import { ArrowRight, Search, Landmark, GraduationCap, Layers, MapPin, Calendar as CalendarIcon, MonitorPlay, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { assets } from '../assets';
import { NewsletterSubscribe } from '../components/NewsletterSubscribe';
import { UpcomingEventCountdown } from '../components/UpcomingEventCountdown';
import { formatEventTime, getEventSlug, splitEventsByStatus } from '../utils/eventUtils';
import { officialMandates, officialMission, officialVision } from '../data/institutionalProfile';
import { AnnouncementSlider } from '../components/AnnouncementSlider';
import { VideoShowcase } from '../components/VideoShowcase';
import type { VideoItem } from '../types/content';

const heroSlides = [
  {
    image: assets.headquartersImage,
    title: 'NACETEM Headquarters',
    eyebrow: 'Institutional leadership',
  },
  {
    image: assets.capacityImage,
    title: 'Capacity Development Programmes',
    eyebrow: 'Skills and training',
  },
  {
    image: assets.policyImage,
    title: 'STI Policy Engagement',
    eyebrow: 'Evidence for policy',
  },
  {
    image: assets.seminarImage,
    title: 'Research Seminar Series',
    eyebrow: 'Knowledge exchange',
  },
  {
    image: assets.industrialInspectionImage,
    title: 'Industry and Innovation Systems Engagement',
    eyebrow: 'Connected ecosystems',
  },
];

const galleryFallbacks = [
  { id: 'fallback-1', url: assets.bayelsaNewsImage, title: 'Institutional Engagement' },
  { id: 'fallback-2', url: assets.capacityImage, title: 'Capacity Development Session' },
  { id: 'fallback-3', url: assets.policyImage, title: 'STI Policy Programme' },
  { id: 'fallback-4', url: assets.seminarImage, title: 'Research Seminar Series' },
  { id: 'fallback-5', url: assets.dashboardImage, title: 'STI Dashboard & Databank' },
  { id: 'fallback-6', url: assets.ntaImage, title: 'Media Engagement' },
];

const impactVideos: VideoItem[] = [
  { id: 'impact-D1IlaQF0DzI', title: 'NACETEM impact video', videoUrl: 'https://www.youtube.com/watch?v=D1IlaQF0DzI', videoType: 'impact', displayOrder: 1, status: 'published', featured: false, publishedAt: '2026-01-01' },
  { id: 'impact-il3STHCjnPk', title: 'NACETEM impact short', videoUrl: 'https://www.youtube.com/watch?v=il3STHCjnPk', videoType: 'impact', displayOrder: 2, status: 'published', featured: false, publishedAt: '2026-01-01' },
  { id: 'impact-ca28dtNXL64', title: 'NACETEM impact across Nigeria', videoUrl: 'https://www.youtube.com/watch?v=ca28dtNXL64', videoType: 'impact', displayOrder: 3, status: 'published', featured: false, publishedAt: '2026-01-01' },
  { id: 'impact-GM0ETQvVHKI', title: 'NACETEM impact short video', videoUrl: 'https://www.youtube.com/watch?v=GM0ETQvVHKI', videoType: 'impact', displayOrder: 4, status: 'published', featured: false, publishedAt: '2026-01-01' },
];

export default function Home() {
  const { gallery, events, news, videos, announcements } = useData();
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const activeHero = heroSlides[activeHeroIndex];
  const nextHero = heroSlides[(activeHeroIndex + 1) % heroSlides.length];
  const displayedGallery = [
    ...gallery.filter((item) => item.status === 'published'),
    ...galleryFallbacks.filter((fallback) => !gallery.some((img) => img.url === fallback.url)),
  ].slice(0, 6);
  const featuredStories = news.filter((article) => article.status === 'published' && article.featured);
  const storyPool = featuredStories.length ? featuredStories : news.filter((article) => article.status === 'published');
  const displayedStories = Array.from({ length: Math.min(3, storyPool.length) }, (_, index) => storyPool[(activeStoryIndex + index) % storyPool.length]);
  const homepageEvents = splitEventsByStatus(events.filter((event) => event.status === 'published')).upcomingEvents
    .sort((a, b) => a.startDate.localeCompare(b.startDate)).slice(0, 5);
  const activeEvent = homepageEvents.length ? homepageEvents[activeEventIndex % homepageEvents.length] : null;
  const managedImpactVideos = videos.filter((video) => video.status === 'published' && (video.videoType === 'impact' || video.videoType === 'both'));

  useEffect(() => {
    if (isHeroPaused || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isHeroPaused, prefersReducedMotion]);

  useEffect(() => {
    if (homepageEvents.length && activeEventIndex >= homepageEvents.length) setActiveEventIndex(0);
  }, [activeEventIndex, homepageEvents.length]);

  const showPreviousEvent = () => {
    if (!homepageEvents.length) return;
    setActiveEventIndex((current) => (current - 1 + homepageEvents.length) % homepageEvents.length);
  };

  const showNextEvent = () => {
    if (!homepageEvents.length) return;
    setActiveEventIndex((current) => (current + 1) % homepageEvents.length);
  };

  return (
    <div className="flex-1">
      <UpcomingEventCountdown events={events.filter((event) => event.status === 'published')} />
      <AnnouncementSlider announcements={announcements} />

      {/* Hero Section */}
      <section className="relative bg-slate-50 border-b border-slate-200 text-slate-900 overflow-hidden">
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-[0.72]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,102,51,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.10) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
          animate={prefersReducedMotion ? undefined : { backgroundPosition: ['0px 0px', '44px 44px'] }}
          transition={prefersReducedMotion ? undefined : { duration: 18, ease: 'linear', repeat: Infinity }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent blur-sm"
          animate={prefersReducedMotion ? undefined : { x: ['0%', '280%'] }}
          transition={prefersReducedMotion ? undefined : { duration: 9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(0,102,51,0.13),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.58),rgba(248,250,252,0.82))]" aria-hidden="true"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
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
              <div className="relative z-10 w-full max-w-[650px]">
                <div className="relative mx-auto aspect-square w-full max-w-[610px]">
                  <motion.div
                    key={`orbit-${activeHeroIndex}`}
                    initial={{ rotate: -18 }}
                    animate={{ rotate: 342 }}
                    transition={{ duration: isHeroPaused || prefersReducedMotion ? 0 : 5, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-dashed border-gold/60"
                  />
                  <div className="absolute inset-5 rounded-full border border-emerald-600/20"></div>
                  <div className="absolute inset-10 rounded-full bg-white shadow-2xl shadow-slate-900/10"></div>

                  <div className="absolute inset-5 overflow-hidden rounded-full border-[8px] border-white bg-slate-100 shadow-2xl">
                    <motion.img
                      key={activeHero.image}
                      src={activeHero.image}
                      alt={activeHero.title}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent"></div>
                    <div className="absolute inset-0 rounded-full ring-1 ring-black/10 pointer-events-none"></div>
                    <div className="absolute bottom-12 left-10 right-10 text-center text-white">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gold">{activeHero.eyebrow}</p>
                      <h2 className="text-2xl sm:text-3xl font-serif leading-tight">{activeHero.title}</h2>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveHeroIndex((activeHeroIndex + 1) % heroSlides.length)}
                    className="absolute right-2 top-8 w-28 overflow-hidden rounded-full border-[6px] border-white bg-white shadow-2xl shadow-slate-900/20 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold sm:right-5 sm:top-10 sm:w-36"
                    aria-label={`Preview next image: ${nextHero.title}`}
                  >
                    <div className="aspect-square overflow-hidden rounded-full bg-slate-100">
                      <motion.img
                        key={nextHero.image}
                        src={nextHero.image}
                        alt=""
                        initial={{ opacity: 0.65, scale: 1.12 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="absolute inset-x-2 bottom-2 rounded-full bg-white/90 px-2 py-1 text-center text-[9px] font-bold uppercase tracking-widest text-emerald-700">
                      Next
                    </span>
                  </button>

                  <div className="absolute bottom-5 left-1/2 w-[68%] -translate-x-1/2">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/65">
                      <motion.div
                        key={activeHeroIndex}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: isHeroPaused || prefersReducedMotion ? 0 : 5, ease: 'linear' }}
                        className="h-full bg-gold"
                      />
                    </div>
                  </div>

                  <div className="absolute -bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-lg shadow-slate-900/8">
                    {heroSlides.map((slide, idx) => (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => setActiveHeroIndex(idx)}
                        className={`h-2.5 rounded-full transition-all ${idx === activeHeroIndex ? 'w-8 bg-emerald-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                        aria-label={`Show ${slide.title}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute left-2 top-16 hidden h-24 w-24 rounded-full border border-gold/40 lg:block"></div>
                <div className="absolute bottom-8 right-4 hidden h-28 w-28 rounded-full border border-emerald-600/20 lg:block"></div>
                <div className="mt-12 flex items-center justify-center">
                  {prefersReducedMotion ? (
                    <span className="inline-flex h-9 items-center rounded-full border border-slate-200 bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Motion reduced</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsHeroPaused((current) => !current)}
                      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700"
                      aria-label={isHeroPaused ? 'Resume automatic hero slideshow' : 'Pause automatic hero slideshow'}
                      aria-pressed={isHeroPaused}
                    >
                      {isHeroPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                      {isHeroPaused ? 'Play' : 'Pause'}
                    </button>
                  )}
                </div>
              </div>
              <div className="absolute bottom-10 right-0 h-20 w-20 rounded-full border border-emerald-600/10 bg-emerald-50/60 z-0"></div>
              <div className="absolute top-8 left-0 h-16 w-16 rounded-full border border-slate-200 bg-slate-100/70 z-0"></div>
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
            <h3 className="font-serif text-lg text-slate-900 mb-2">Capacity Development</h3>
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
            <h2 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Flagship Platforms</h2>
            <h3 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-4 leading-tight">Digital Tools and Strategic Initiatives</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Access NACETEM's specialised platforms for public-service learning, digital skills, AI collaboration, technical development, systems thinking, and STI intelligence.</p>
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
                img: assets.psrPlatformImage
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
                img: assets.digitalAcademyPlatformImage
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
                title: "STI Dashboard & Databank",
                desc: "A data-driven platform for communicating science, technology, and innovation outputs for national planning and policy coordination.",
                link: "https://stidashboard.nacetem.gov.ng",
                external: true,
                img: assets.stiDashboardPlatformImage
              }
            ].map((initiative, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl group flex flex-col p-5 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all duration-300">
                <div className="image-frame aspect-[16/10] mb-4 overflow-hidden rounded-xl border border-slate-100 bg-white p-2 sm:aspect-[4/3] sm:p-3 lg:aspect-[16/10]">
                  <img
                    src={initiative.img}
                    alt={initiative.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 flex flex-col pt-2">
                  <h4 className="text-lg font-serif text-slate-900 mb-2">{initiative.title}</h4>
                  <p className="text-slate-500 mb-4 flex-1 text-xs leading-relaxed">{initiative.desc}</p>
                  {initiative.external ? (
                    <a href={initiative.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-emerald-700 transition-colors border-b border-transparent hover:border-emerald-700 pb-1 self-start">
                      Visit the STI Dashboard &amp; Databank <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  ) : (
                    <Link to={initiative.link} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-emerald-700 transition-colors border-b border-transparent hover:border-emerald-700 pb-1 self-start">
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  )}
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
                    {officialMandates[0].description}
                  </p>
                </div>

                <div className="group rounded-2xl border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.08]">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex justify-center items-center text-emerald-300 mb-6 group-hover:bg-emerald-500/20 transition-colors">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-serif text-white mb-3 group-hover:text-gold transition-colors">Capacity Building</h4>
                  <p className="text-white/68 text-sm leading-7">
                    {officialMandates[1].description}
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
                  {officialMission}
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
                  {officialVision}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Functions */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-3xl"
          >
             <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">What We Do</p>
             <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-5 leading-tight">NACETEM's Core Functions</h2>
             <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">Three connected areas define our institutional work and national contribution.</p>
          </motion.div>

          <div className="space-y-24">
            {[
              {
                title: "Policy Research & Advisory",
                desc: "Research-driven insights, STI evidence, and practical policy options for public institutions and national planning.",
                label: "Evidence-led strategy",
                icon: Search,
                img: assets.policyImage,
                link: "/research"
              },
              {
                title: "Capacity Building",
                desc: "Targeted courses, professional training, and practical workshops that strengthen institutional and individual capability.",
                label: "Skills for institutions",
                icon: GraduationCap,
                img: assets.capacityImage,
                link: "/capacity-building"
              },
              {
                title: "Innovation Systems",
                desc: "Partnerships and platforms that connect researchers, government, industry, innovators, and development stakeholders.",
                label: "Connected ecosystems",
                icon: Layers,
                img: assets.industrialInspectionImage,
                link: "/initiatives"
              }
            ].map((program, index) => {
              const reversed = index % 2 !== 0;
              return (
                <div key={program.title} className={`flex flex-col items-center gap-12 lg:gap-20 ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                  <motion.div initial={{ opacity: 0, x: reversed ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, ease: 'easeOut' }} className="w-full lg:w-1/2">
                    <div className="relative rounded-[28px] border border-gold/40 bg-white p-2 shadow-xl shadow-slate-900/5">
                      <div className="pointer-events-none absolute -inset-3 rounded-[34px] border border-emerald-600/10"></div>
                      <div className="image-frame relative aspect-[4/3] w-full rounded-[20px] border border-white ring-1 ring-slate-200/80">
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                        <img src={program.img} alt={program.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-105" />
                      </div>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: reversed ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }} className="flex w-full flex-col justify-center lg:w-1/2">
                    <div className="mb-6 flex items-center gap-4"><span className="h-px w-12 bg-gold"></span><span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700">{program.label}</span></div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-700"><program.icon className="h-6 w-6" /></div>
                    <h3 className="mb-5 text-3xl font-serif leading-tight text-slate-900 sm:text-4xl">{program.title}</h3>
                    <p className="mb-8 max-w-xl text-[15px] leading-8 text-slate-600">{program.desc}</p>
                    <Link to={program.link} className="group inline-flex items-center self-start border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-slate-900 hover:border-emerald-700 hover:text-emerald-700">Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
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
                <div className="image-frame h-64 mb-4 border border-slate-100 rounded-xl relative">
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
      <section id="upcoming-events" className="scroll-mt-[132px] py-20 bg-slate-50 relative sm:scroll-mt-[148px]">
        <div className="absolute top-0 left-1/2 h-px w-[min(78rem,calc(100%-2rem))] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-4">Upcoming Events</h2>
              <p className="text-sm text-slate-600">Join our workshops, conferences, and capacity-building sessions focusing on science, technology, and innovation management.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={showPreviousEvent}
                disabled={homepageEvents.length <= 1}
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-emerald-600/40 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Show previous homepage event"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNextEvent}
                disabled={homepageEvents.length <= 1}
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-emerald-600/40 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Show next homepage event"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <Link to="/News" className="hidden md:inline-flex items-center text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 border-b border-transparent hover:border-emerald-700 pb-1">
                View All Events <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="relative"
          >
            {activeEvent ? (
              <div key={activeEvent.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-emerald-600 hover:shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr]">
                  <div className="image-frame min-h-[280px] bg-slate-100">
                    {activeEvent.flyerUrl ? (
                      <img src={activeEvent.flyerUrl} alt={`${activeEvent.title} flyer`} loading="lazy" decoding="async" className="h-full w-full object-contain object-center" />
                    ) : (
                      <div className="relative h-full min-h-[280px] w-full overflow-hidden bg-slate-950">
                        <img src={assets.capacityImage} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-20" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-white">
                          <CalendarIcon className="mb-4 h-12 w-12 text-gold" />
                          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">NACETEM Event</p>
                          <p className="mt-3 font-serif text-2xl">Flyer Coming Soon</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex min-h-[360px] flex-col justify-center p-7 sm:p-10">
                    <div className="mb-5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center bg-slate-100 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold text-emerald-700">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1.5" /> {activeEvent.date}{activeEvent.time ? ` | ${formatEventTime(activeEvent.time)}` : ''}
                      </span>
                      <span className="inline-flex max-w-full items-start bg-slate-100 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold text-slate-500">
                        <MapPin className="mr-1.5 mt-0.5 h-3.5 w-3.5 shrink-0" /> <span className="min-w-0 break-words">{activeEvent.location}</span>
                      </span>
                      {activeEvent.fee && <span className="inline-flex items-center bg-slate-100 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold text-slate-500">Fee: {activeEvent.fee}</span>}
                    </div>
                    <h3 className="mb-4 font-serif text-2xl leading-tight text-slate-900 transition-colors hover:text-emerald-700 sm:text-3xl">{activeEvent.title}</h3>
                    <p className="mb-6 text-sm leading-7 text-slate-600">{activeEvent.description}</p>
                    <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
                      <Link to={`/events/${getEventSlug(activeEvent)}`} className="inline-flex min-h-11 w-full items-center justify-center rounded-[6px] border border-slate-300 px-4 text-center text-xs font-bold uppercase tracking-widest text-slate-900 hover:border-emerald-700 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 sm:w-auto">
                        Event Details <ArrowRight aria-hidden="true" className="ml-1 h-3 w-3" />
                      </Link>
                      {activeEvent.onlineViewingUrl && <a href={activeEvent.onlineViewingUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 w-full items-center justify-center rounded-[6px] border border-sky-700 px-4 text-center text-xs font-bold uppercase tracking-widest text-sky-900 transition-colors hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-700 focus-visible:ring-offset-2 sm:w-auto" aria-label={`Watch ${activeEvent.title} online as a view-only attendee`}><MonitorPlay aria-hidden="true" className="mr-2 h-4 w-4" /> Watch Online</a>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4">
                  {homepageEvents.map((event, index) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => setActiveEventIndex(index)}
                      className={`h-2 rounded-full transition-all ${index === activeEventIndex ? 'w-8 bg-emerald-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                      aria-label={`Show ${event.title}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl">
                <div
                  className="relative min-h-[360px] px-6 py-14 text-center text-white sm:px-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '34px 34px',
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,51,0.35),transparent_38%)]"></div>
                  <div className="relative mx-auto flex max-w-2xl flex-col items-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                      <CalendarIcon className="h-8 w-8" />
                    </div>
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-gold">Upcoming Events</p>
                    <h3 className="mb-5 font-serif text-3xl leading-tight sm:text-4xl">There is no upcoming event at the moment.</h3>
                    <p className="text-sm leading-7 text-slate-200">
                      New NACETEM workshops, stakeholder engagements, and public programmes will appear here as soon as they are published.
                    </p>
                  </div>
                </div>
              </div>
            )}
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
                <div className="image-frame relative h-56 mb-6 border border-slate-100 rounded-xl shrink-0">
                  <img src={article.image} alt={article.imageAlt} loading="lazy" decoding="async" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-0 left-3 max-w-[85%] truncate rounded-sm bg-gold text-slate-900 text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest">{article.category}</div>
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
          <VideoShowcase videos={managedImpactVideos.length ? managedImpactVideos : impactVideos} label="impact video" />
        </div>
      </section>
    </div>
  );
}
