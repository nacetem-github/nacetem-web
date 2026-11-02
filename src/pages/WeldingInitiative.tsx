import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowDown,
  Award,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Download,
  Factory,
  GraduationCap,
  HardHat,
  Maximize2,
  ShieldCheck,
  Target,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import ProgramInterestModal from '../components/ProgramInterestModal';

import imgCentre from '../assets/welding/centre.jpg';
import imgClassroom from '../assets/welding/classroom.jpg';
import imgDemo from '../assets/welding/demo.jpg';
import imgBooths from '../assets/welding/booths.jpg';
import imgField from '../assets/welding/field.jpg';
import imgCertificate from '../assets/welding/certificate.jpg';
import imgCohort from '../assets/welding/cohort.jpg';

// TODO: replace with the real curriculum PDF once available (see CapacityBuilding.tsx brochureUrl for the pattern)
const curriculumUrl = '/uploads/welding-initiative/nacetem-welding-initiative-curriculum.pdf';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const objectives = [
  {
    icon: ShieldCheck,
    title: 'International Certification',
    description:
      "Prepare trainees for globally recognised welding certification standards, positioning them for opportunities in Nigeria's and the international labour market.",
  },
  {
    icon: HardHat,
    title: 'Hands-On Technical Training',
    description:
      'Structured, practical instruction on modern welding techniques, safety protocols, and industrial-grade equipment under qualified supervision.',
  },
  {
    icon: Target,
    title: 'Industrial Employability',
    description:
      "Equip participants with market-ready skills aligned to the demands of Nigeria's oil & gas, construction, and manufacturing sectors.",
  },
  {
    icon: Award,
    title: 'Instructor & Institutional Capacity',
    description:
      'Strengthen the pipeline of qualified welding instructors and upgrade training infrastructure across partner centres nationwide.',
  },
];

type Chapter = {
  tag: string;
  title: string;
  body: string;
  img: string;
  alt: string;
  position?: string;
  fit?: 'cover' | 'contain';
};

const chapters: Chapter[] = [
  {
    tag: 'Launch',
    title: 'The doors open',
    body: "The NACETEM Welders' Training Centre welcomes a new cohort, with stakeholders, instructors and trainees gathered to launch the programme.",
    img: imgCentre,
    alt: "Stakeholders and trainees in safety gear outside the NACETEM Welders' Training Centre",
    position: '50% 40%',
  },
  {
    tag: 'Theory',
    title: 'Theory before the torch',
    body: 'Every journey starts in the classroom — the principles, drawings and standards behind a sound weld, taught before anyone picks up an electrode.',
    img: imgClassroom,
    alt: 'Trainees in NACETEM overalls attending a classroom session',
    position: '50% 50%',
  },
  {
    tag: 'Safety',
    title: 'Safety is the first skill',
    body: 'Instructors demonstrate protective equipment, tool handling and safe practice while the whole cohort watches up close.',
    img: imgDemo,
    alt: 'An instructor demonstrating safety gloves to a circle of trainees in hard hats',
    position: '50% 45%',
  },
  {
    tag: 'Practice',
    title: 'Inside the booths',
    body: 'Trainees move into screened welding booths to observe and practise on industrial-grade equipment under qualified supervision.',
    img: imgBooths,
    alt: 'Trainees in hard hats gathered at the entrance to welding booths',
    position: '50% 30%',
  },
  {
    tag: 'Field work',
    title: 'Out in the field',
    body: 'Skills leave the workshop. Trainees take on real fabrication and repair tasks on site, where the work has to hold.',
    img: imgField,
    alt: 'Trainees working on a metal gate outdoors',
    position: '50% 50%',
  },
  {
    tag: 'Certification',
    title: 'Ready for certification',
    body: 'Training is aligned to internationally recognised welding standards, preparing graduates for certification and the opportunities it opens.',
    img: imgCertificate,
    alt: 'NACETEM welding training certificate (design sample)',
    fit: 'contain',
  },
  {
    tag: 'Workforce',
    title: 'A new skilled workforce',
    body: 'A cohort of certification-ready welders, prepared for fabrication, construction, oil & gas and manufacturing.',
    img: imgCohort,
    alt: 'A large graduating cohort of welding trainees in hard hats and safety glasses',
    position: '50% 45%',
  },
];

// ⚠️ TODO: PLACEHOLDER FIGURES — replace with confirmed numbers before publishing.
const stats = [
  { value: 200, suffix: '+', label: 'Trainees enrolled' },
  { value: 4, suffix: '', label: 'Training cohorts' },
  { value: 95, suffix: '%', label: 'Completion rate' },
  { value: 1, suffix: '', label: 'Dedicated training centre' },
];

const gallery = [
  { img: imgCohort, caption: 'The cohort, ready for work', span: 'md:col-span-2 md:row-span-2' },
  { img: imgDemo, caption: 'Safety demonstration in the main hall', span: '' },
  { img: imgBooths, caption: 'At the welding booths', span: 'md:row-span-2' },
  { img: imgClassroom, caption: 'Classroom theory session', span: '' },
  { img: imgField, caption: 'Field practical on a steel gate', span: 'md:col-span-2' },
  { img: imgCentre, caption: "Launch at the Welders' Training Centre", span: 'md:col-span-2' },
];

const personas = [
  {
    icon: Wrench,
    label: 'Artisans',
    title: 'Artisans and vocational welders',
    body: 'Already welding? Turn experience into a recognised qualification and compete for better-paid, skilled roles.',
  },
  {
    icon: GraduationCap,
    label: 'Graduates',
    title: 'Engineering and technical graduates',
    body: 'Add practical, hands-on competence to your degree and enter the industrial workforce job-ready.',
  },
  {
    icon: Users,
    label: 'Instructors',
    title: 'Technical college and vocational school instructors',
    body: 'Sharpen your own practice and strengthen the pipeline of qualified welders you train.',
  },
  {
    icon: Factory,
    label: 'Employers',
    title: 'SMEs and industrial firms',
    body: 'Sponsor staff upskilling and build a certified team for fabrication, construction, oil & gas and manufacturing work.',
  },
];

const tickerItems = [
  'Hands-on training',
  'Safety first',
  'Certification readiness',
  'Fabrication',
  'Construction',
  'Oil & gas',
  'Manufacturing',
  'Qualified supervision',
];

/* ------------------------------------------------------------------ */
/* Sparks — canvas particle system (click / tap anywhere to burst)     */
/* ------------------------------------------------------------------ */

type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number };

function Sparks({
  emitter,
  rate = 2,
  className = '',
}: {
  emitter?: () => { x: number; y: number } | null;
  rate?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const host = canvas.parentElement as HTMLElement;
    let particles: Particle[] = [];
    let raf = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = host.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const spawn = (x: number, y: number, n: number, power = 1) => {
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.6;
        const s = (1.5 + Math.random() * 5) * power;
        particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: 40 + Math.random() * 50, size: 0.8 + Math.random() * 1.8 });
      }
    };

    const onDown = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      spawn(e.clientX - r.left, e.clientY - r.top, 70, 1.4);
    };
    host.addEventListener('pointerdown', onDown);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(host);

    function tick() {
      raf = 0;
      if (!visible) return;
      const w = canvas!.width / dpr;
      const h = canvas!.height / dpr;
      ctx!.clearRect(0, 0, w, h);
      const src = emitter?.();
      if (src) spawn(src.x, src.y, Math.random() < 0.6 ? rate : 0, 0.9);
      ctx!.globalCompositeOperation = 'lighter';
      particles = particles.filter((p) => p.life < p.max && p.y < h + 20);
      for (const p of particles) {
        p.life++;
        p.vy += 0.12;
        p.vx *= 0.99;
        const px = p.x;
        const py = p.y;
        p.x += p.vx;
        p.y += p.vy;
        const t = 1 - p.life / p.max;
        ctx!.strokeStyle = `rgba(255, ${Math.round(150 + 90 * t)}, ${Math.round(60 * t)}, ${t})`;
        ctx!.lineWidth = p.size;
        ctx!.beginPath();
        ctx!.moveTo(px, py);
        ctx!.lineTo(p.x, p.y);
        ctx!.stroke();
      }
      ctx!.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointerdown', onDown);
    };
  }, [emitter, rate, reduce]);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />;
}

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gold">
      <span className="h-px w-8 bg-gold" />
      {children}
    </div>
  );
}

function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(197,160,89,0.18), transparent 60%)`;

  const onMove = (e: ReactMouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    ry.set((px - 0.5) * 12);
    rx.set(-(py - 0.5) * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative h-full rounded-[14px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-xl hover:border-gold/60"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 transition-opacity group-hover:opacity-100" style={{ background: glow }} />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero({ onApply }: { onApply: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);

  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const torch = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(255,170,80,0.22), rgba(255,120,40,0.08) 40%, transparent 70%)`;

  const onMove = (e: ReactMouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const emitter = useCallback(() => {
    const tip = tipRef.current;
    const host = ref.current;
    if (!tip || !host) return null;
    const t = tip.getBoundingClientRect();
    const h = host.getBoundingClientRect();
    if (t.width === 0) return null;
    return { x: t.left - h.left + t.width / 2, y: t.top - h.top + t.height / 2 };
  }, []);

  const words = ['NACETEM', 'Welding', 'Initiative'];

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-[#0b0d0c] pt-32 pb-24 select-none"
    >
      <motion.img
        src={imgDemo}
        alt=""
        aria-hidden
        style={{ scale: reduce ? 1 : imgScale }}
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b0d0c] via-[#0b0d0c]/75 to-[#0b0d0c]/40" />
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ background: torch }} />
      <Sparks emitter={emitter} rate={3} className="z-0" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-gold backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
          </span>
          Technical Skills &amp; Certification
        </motion.div>

        <h1 className="font-serif text-5xl leading-[1.05] text-white md:text-6xl lg:text-8xl">
          {words.map((w, i) => (
            <span key={w} className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.span
                className={`inline-block ${i === 1 ? 'text-gold italic' : ''}`}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
              {i < words.length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </h1>

        {/* Weld bead that draws itself under the title */}
        <div className="relative mx-auto mt-6 mb-10 h-6 w-full max-w-[560px]">
          <svg viewBox="0 0 560 24" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id="bead" x1="0" x2="1">
                <stop offset="0%" stopColor="#6b5a3a" />
                <stop offset="70%" stopColor="#C5A059" />
                <stop offset="100%" stopColor="#ffb054" />
              </linearGradient>
              <filter id="beadGlow">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <motion.path
              d="M4 12 C 40 4, 60 20, 96 12 S 152 4, 188 12 S 244 20, 280 12 S 336 4, 372 12 S 428 20, 464 12 S 520 4, 556 12"
              fill="none"
              stroke="url(#bead)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#beadGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, delay: 0.6, ease: 'easeInOut' }}
            />
          </svg>
          <motion.span
            ref={tipRef}
            aria-hidden
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200 shadow-[0_0_18px_6px_rgba(255,160,60,0.85)]"
            initial={{ left: '0%', opacity: 0 }}
            animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0.9] }}
            transition={{ duration: 2.2, delay: 0.6, ease: 'easeInOut' }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mx-auto mb-10 max-w-[650px] text-lg font-light leading-[1.6] text-slate-100/90 sm:text-xl"
        >
          A technical capacity-building initiative supporting welding excellence, certification readiness, and industrial skills development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={onApply}
            className="group inline-flex items-center rounded-[6px] bg-emerald-700 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-emerald-900/40 transition hover:bg-emerald-800"
          >
            Apply Now <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="#journey"
            className="inline-flex items-center rounded-[6px] border border-white/25 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition hover:border-gold hover:text-gold"
          >
            Follow the journey <ArrowDown className="ml-2 h-4 w-4" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="mt-10 hidden text-[11px] uppercase tracking-[0.3em] text-white/40 sm:block"
        >
          Tip: click anywhere to strike an arc
        </motion.p>
      </motion.div>
    </section>
  );
}

function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="relative overflow-hidden border-y border-gold/40 bg-gold py-3 text-[#0b0d0c]">
      <motion.div
        className="flex w-max whitespace-nowrap text-xs font-bold uppercase tracking-[0.3em]"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10 pr-10">
            {t}
            <span aria-hidden className="inline-block h-1.5 w-1.5 rotate-45 bg-[#0b0d0c]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Story — sticky scrollytelling                                       */
/* ------------------------------------------------------------------ */

function ChapterBlock({ chapter, index, onActive }: { chapter: Chapter; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex items-center py-10 lg:min-h-[85vh]">
      <motion.div
        animate={{ opacity: inView ? 1 : 0.25, x: inView ? 0 : 12 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* Mobile image */}
        <div className="mb-6 overflow-hidden rounded-[14px] lg:hidden">
          <img
            src={chapter.img}
            alt={chapter.alt}
            loading="lazy"
            className={`aspect-[4/3] w-full ${chapter.fit === 'contain' ? 'bg-[#0f2a1c] object-contain' : 'object-cover'}`}
            style={{ objectPosition: chapter.position }}
          />
        </div>
        <div className="mb-4 flex items-baseline gap-4">
          <span className="font-serif text-6xl leading-none text-gold/30 lg:text-7xl">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">{chapter.tag}</span>
        </div>
        <h3 className="mb-4 font-serif text-3xl text-white sm:text-4xl">{chapter.title}</h3>
        <p className="max-w-md text-[17px] leading-relaxed text-slate-300">{chapter.body}</p>
      </motion.div>
    </div>
  );
}

function Journey() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const heat = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const barHeight = useTransform(heat, [0, 1], ['0%', '100%']);
  const barColor = useTransform(heat, [0, 0.5, 1], ['#64748b', '#ff7a2f', '#C5A059']);
  const onActive = useCallback((i: number) => setActive(i), []);

  return (
    <section id="journey" ref={ref} className="relative scroll-mt-20 bg-[#0b0d0c] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 max-w-2xl lg:mb-0">
          <Eyebrow>The Journey</Eyebrow>
          <h2 className="font-serif text-4xl text-white sm:text-5xl">From classroom to certified.</h2>
          <p className="mt-4 text-lg text-slate-400">Scroll through a trainee's path, one chapter at a time.</p>
        </Reveal>

        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* Sticky photo stage */}
          <div className="hidden lg:block">
            <div className="sticky top-24 h-[calc(100vh-8rem)] py-6">
              <div className="relative h-full overflow-hidden rounded-[18px] border border-white/10 bg-[#0f2a1c] shadow-2xl shadow-black/60">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={active}
                    src={chapters[active].img}
                    alt={chapters[active].alt}
                    initial={{ clipPath: 'inset(0 0 100% 0)', scale: 1.15, filter: 'brightness(1.6) saturate(0.4)' }}
                    animate={{ clipPath: 'inset(0 0 0% 0)', scale: 1, filter: 'brightness(1) saturate(1)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute inset-0 h-full w-full ${chapters[active].fit === 'contain' ? 'object-contain p-6' : 'object-cover'}`}
                    style={{ objectPosition: chapters[active].position }}
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">{chapters[active].tag}</div>
                      <div className="font-serif text-xl">{chapters[active].title}</div>
                    </motion.div>
                  </AnimatePresence>
                  <div className="font-mono text-sm text-white/60">
                    {String(active + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
                  </div>
                </div>
                {/* Chapter dots */}
                <div className="absolute top-5 right-5 flex gap-1.5">
                  {chapters.map((c, i) => (
                    <span
                      key={c.tag}
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-gold' : i < active ? 'w-1.5 bg-gold/60' : 'w-1.5 bg-white/30'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chapters with heat bar */}
          <div className="relative pl-8 lg:pl-10">
            <div className="absolute top-0 bottom-0 left-0 w-[3px] rounded-full bg-white/10">
              <motion.div
                className="w-full rounded-full shadow-[0_0_14px_2px_rgba(255,122,47,0.6)]"
                style={{ height: barHeight, backgroundColor: barColor }}
              />
            </div>
            {chapters.map((c, i) => (
              <Fragment key={c.tag}>
                <ChapterBlock chapter={c} index={i} onActive={onActive} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Impact                                                              */
/* ------------------------------------------------------------------ */

function Impact() {
  return (
    <section className="relative overflow-hidden bg-emerald-700 py-20 text-white">
      <div aria-hidden className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(45deg,#fff_0,#fff_1px,transparent_1px,transparent_14px)]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <Fragment key={s.label}>
            <Reveal delay={i * 0.1} className="border-l border-white/20 pl-6">
              <div className="font-serif text-5xl text-gold sm:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80">{s.label}</div>
            </Reveal>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery + lightbox                                                  */
/* ------------------------------------------------------------------ */

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const [origin, setOrigin] = useState<number | null>(null);
  const [dir, setDir] = useState(0);

  const go = useCallback((d: number) => {
    setDir(d);
    setOpen((o) => (o === null ? o : (o + d + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, go]);

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <h2 className="font-serif text-4xl text-slate-900 sm:text-5xl">Moments from the floor.</h2>
          </div>
          <p className="max-w-sm text-slate-600">Tap any photo to open it full-screen. Use your arrow keys or swipe to browse.</p>
        </Reveal>

        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[220px] md:grid-cols-4">
          {gallery.map((g, i) => (
            <motion.button
              key={g.caption}
              type="button"
              onClick={() => {
                setOrigin(i);
                setOpen(i);
              }}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className={`group relative overflow-hidden rounded-[14px] bg-slate-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${g.span}`}
              aria-label={`Open photo: ${g.caption}`}
            >
              <motion.img
                layoutId={`photo-${i}`}
                src={g.img}
                alt={g.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-60 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-4 bottom-4 flex translate-y-2 items-end justify-between text-white opacity-90 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-sm font-medium">{g.caption}</span>
                <Maximize2 className="h-4 w-4 shrink-0 opacity-70" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={gallery[open].caption}
          >
            <motion.figure className="relative flex max-h-full max-w-6xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={open}
                layoutId={open === origin ? `photo-${open}` : undefined}
                initial={open === origin ? undefined : { opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                src={gallery[open].img}
                alt={gallery[open].caption}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                className="max-h-[78vh] w-auto cursor-grab rounded-[10px] object-contain shadow-2xl active:cursor-grabbing"
              />
              <figcaption className="mt-4 flex w-full items-center justify-between gap-4 text-white">
                <span className="font-serif text-lg">{gallery[open].caption}</span>
                <span className="font-mono text-sm text-white/50">
                  {open + 1} / {gallery.length}
                </span>
              </figcaption>
            </motion.figure>
            <button type="button" aria-label="Close" onClick={() => setOpen(null)} className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:block"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:block"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Who should apply — interactive persona picker                       */
/* ------------------------------------------------------------------ */

function Personas({ onApply }: { onApply: () => void }) {
  const [sel, setSel] = useState(0);
  const P = personas[sel];
  return (
    <section className="border-t border-slate-200 bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow>Who Should Apply</Eyebrow>
          <h2 className="font-serif text-4xl text-slate-900 sm:text-5xl">Is this programme right for you?</h2>
          <p className="mt-4 text-slate-600">Pick the option that sounds most like you.</p>
        </Reveal>

        <div className="mx-auto max-w-4xl">
          <div role="tablist" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {personas.map((p, i) => {
              const Icon = p.icon;
              const on = i === sel;
              return (
                <button
                  key={p.label}
                  role="tab"
                  aria-selected={on}
                  type="button"
                  onClick={() => setSel(i)}
                  className={`relative flex flex-col items-center gap-2 rounded-[12px] border px-4 py-5 text-sm font-bold uppercase tracking-widest transition ${
                    on ? 'border-transparent text-white' : 'border-slate-200 text-slate-600 hover:border-gold hover:text-slate-900'
                  }`}
                >
                  {on && <motion.span layoutId="persona-pill" className="absolute inset-0 rounded-[12px] bg-[#0b0d0c]" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
                  <Icon className={`relative h-6 w-6 ${on ? 'text-gold' : ''}`} />
                  <span className="relative text-[11px]">{p.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative mt-6 overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50 p-8 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={sel}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-serif text-2xl text-slate-900">{P.title}</h3>
                  <p className="mt-2 max-w-xl text-slate-600">{P.body}</p>
                </div>
                <button
                  type="button"
                  onClick={onApply}
                  className="inline-flex shrink-0 items-center justify-center rounded-[6px] bg-emerald-700 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-emerald-800"
                >
                  {sel === 3 ? 'Sponsor staff' : 'Apply now'} <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

function FinalCta({ onApply }: { onApply: () => void }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b0d0c] py-28 text-center">
      <img src={imgCohort} alt="" aria-hidden className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b0d0c] via-[#0b0d0c]/70 to-[#0b0d0c]" />
      <Sparks className="z-0" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <Briefcase className="mx-auto mb-6 h-8 w-8 text-gold" />
          <h2 className="font-serif text-4xl text-white sm:text-6xl">
            Ready to strike <span className="italic text-gold">your first arc?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
            Applications are reviewed on a rolling basis. Apply now to secure a training slot, or download the full curriculum to review course structure,
            duration, and certification requirements.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onApply}
              className="group inline-flex items-center justify-center rounded-[6px] bg-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#0b0d0c] shadow-[0_0_40px_rgba(197,160,89,0.35)] transition hover:shadow-[0_0_60px_rgba(255,160,60,0.55)]"
            >
              Apply Now <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={curriculumUrl}
              download
              className="inline-flex items-center justify-center rounded-[6px] border border-white/25 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:border-gold hover:text-gold"
            >
              <Download className="mr-2 h-4 w-4" /> Download Curriculum
            </a>
          </div>
          <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-white/30">Click to make sparks</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function WeldingInitiative() {
  const [showInterestForm, setShowInterestForm] = useState(false);
  const openForm = useCallback(() => setShowInterestForm(true), []);

  // Page-wide scroll progress bar + sticky apply pill
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const [showPill, setShowPill] = useState(false);
  useEffect(() => scrollY.on('change', (v) => setShowPill(v > window.innerHeight * 0.8)), [scrollY]);

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 font-sans">
      <motion.div aria-hidden className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-orange-500 via-gold to-emerald-600" style={{ scaleX: progress }} />

      <Hero onApply={openForm} />
      <Ticker />

      {/* Overview + objectives */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-16 max-w-3xl text-center">
            <Eyebrow>Overview</Eyebrow>
            <h2 className="mb-6 font-serif text-4xl text-slate-900 sm:text-5xl">Bridging Nigeria's industrial skills gap.</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              The NACETEM Welding Initiative is a technical capacity-building programme designed to close the skills gap in Nigeria's industrial sector. By
              combining rigorous, hands-on training with certification pathways recognised across the industry, the initiative equips artisans, graduates,
              and technicians with the practical competencies required to compete for skilled roles in fabrication, construction, oil &amp; gas, and
              manufacturing.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: 1000 }}>
            {objectives.map((o, i) => {
              const Icon = o.icon;
              return (
                <Fragment key={o.title}>
                  <Reveal delay={i * 0.1} className="h-full">
                    <TiltCard>
                      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[10px] bg-emerald-700/10 text-emerald-700 transition-colors group-hover:bg-gold group-hover:text-[#0b0d0c]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-3 font-serif text-xl text-slate-900">{o.title}</h3>
                      <p className="text-[15px] leading-relaxed text-slate-600">{o.description}</p>
                    </TiltCard>
                  </Reveal>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      <Journey />
      <Impact />
      <Gallery />
      <Personas onApply={openForm} />
      <FinalCta onApply={openForm} />

      {/* Floating apply pill (bottom-left so it doesn't cover the grievance button) */}
      <AnimatePresence>
        {showPill && !showInterestForm && (
          <motion.button
            type="button"
            onClick={openForm}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#0b0d0c] py-3 pr-5 pl-3 text-xs font-bold uppercase tracking-widest text-white shadow-2xl ring-1 ring-gold/40 transition hover:ring-gold"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gold text-[#0b0d0c]">
              <HardHat className="h-4 w-4" />
            </span>
            Apply now
          </motion.button>
        )}
      </AnimatePresence>

      <ProgramInterestModal isOpen={showInterestForm} onClose={() => setShowInterestForm(false)} programTitle="NACETEM Welding Initiative" />
    </div>
  );
}
