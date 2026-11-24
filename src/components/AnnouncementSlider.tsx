import { Bell, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { AnnouncementItem } from '../types/content';

const categoryLabels = { scholarship: 'Scholarship', admission: 'Admissions', event: 'Event', general: 'Important notice' };

export function AnnouncementSlider({ announcements }: { announcements: AnnouncementItem[] }) {
  const [now, setNow] = useState(() => Date.now());
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const active = useMemo(() => announcements.filter((item) => item.status === 'published' && new Date(item.startsAt).getTime() <= now && new Date(item.endsAt).getTime() > now).sort((a, b) => b.priority - a.priority || String(b.publishedAt).localeCompare(String(a.publishedAt))), [announcements, now]);

  useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 60_000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { if (activeIndex >= active.length) setActiveIndex(0); }, [active.length, activeIndex]);
  useEffect(() => {
    if (paused || reducedMotion || active.length < 2) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % active.length), 6500);
    return () => window.clearInterval(timer);
  }, [active.length, paused, reducedMotion]);

  if (!active.length) return null;
  const item = active[activeIndex];
  const actionClass = 'inline-flex w-full shrink-0 items-center justify-center rounded-md bg-white px-5 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-emerald-900 transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto';
  const action = item.actionUrl && item.actionLabel ? item.actionUrl.startsWith('/')
    ? <Link to={item.actionUrl} className={actionClass}>{item.actionLabel}</Link>
    : <a href={item.actionUrl} target="_blank" rel="noreferrer" className={actionClass}>{item.actionLabel}</a> : null;

  return <section aria-label="Important announcements" aria-live="polite" className="border-b border-emerald-700 bg-emerald-900 text-white">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
      <div className="flex min-w-0 flex-1 gap-3">
        <Bell className="mt-1 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">{categoryLabels[item.category]}</p>
          <h2 className="mt-1 font-serif text-lg leading-tight">{item.title}</h2>
          <p className="mt-1 text-sm leading-6 text-emerald-50">{item.message}</p>
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center gap-2 self-start sm:w-auto lg:self-center">
        {action}
        {active.length > 1 && <>
          <button type="button" onClick={() => setActiveIndex((current) => (current - 1 + active.length) % active.length)} className="rounded-full p-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white" aria-label="Previous announcement"><ChevronLeft className="h-5 w-5" /></button>
          <span className="text-xs tabular-nums text-emerald-100">{activeIndex + 1}/{active.length}</span>
          <button type="button" onClick={() => setActiveIndex((current) => (current + 1) % active.length)} className="rounded-full p-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white" aria-label="Next announcement"><ChevronRight className="h-5 w-5" /></button>
          <button type="button" onClick={() => setPaused((value) => !value)} className="rounded-full p-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white" aria-label={paused ? 'Play announcements' : 'Pause announcements'}>{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>
        </>}
      </div>
    </div>
  </section>;
}
