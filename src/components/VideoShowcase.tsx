import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { VideoItem } from '../types/content';
import { getVideoEmbedUrl } from '../utils/videoUtils';

export function VideoShowcase({ videos, label }: { videos: VideoItem[]; label: string }) {
  const playable = videos
    .map((video) => ({ ...video, embedUrl: getVideoEmbedUrl(video.videoUrl) }))
    .filter((video): video is VideoItem & { embedUrl: string } => Boolean(video.embedUrl))
    .sort((a, b) => a.displayOrder - b.displayOrder || String(b.webinarDate || b.publishedAt).localeCompare(String(a.webinarDate || a.publishedAt)));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= playable.length) setActiveIndex(0);
  }, [activeIndex, playable.length]);

  if (!playable.length) return null;
  const active = playable[activeIndex];

  return <div>
    <div className="relative w-full aspect-video overflow-hidden rounded-[11px] border-[2.11px] border-slate-200 bg-slate-900 shadow-2xl">
      <iframe key={active.id} loading="lazy" className="absolute inset-0 h-full w-full" src={active.embedUrl} title={active.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
    </div>
    <div className="mt-5 text-center">
      <h3 className="text-xl font-serif text-slate-900">{active.title}</h3>
      {(active.presenter || active.webinarDate) && <p className="mt-1 text-xs font-bold uppercase tracking-wider text-emerald-700">{[active.presenter, active.webinarDate ? new Date(`${active.webinarDate}T12:00:00`).toLocaleDateString('en-NG', { dateStyle: 'long' }) : ''].filter(Boolean).join(' · ')}</p>}
      {active.description && <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600">{active.description}</p>}
    </div>
    {playable.length > 1 && <div className="mt-6 flex items-center justify-center gap-4">
      <button type="button" onClick={() => setActiveIndex((current) => (current - 1 + playable.length) % playable.length)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" aria-label={`Show previous ${label}`}><ChevronLeft className="h-5 w-5" /></button>
      <span className="min-w-20 text-center text-xs font-bold uppercase tracking-wider text-slate-500">{activeIndex + 1} of {playable.length}</span>
      <button type="button" onClick={() => setActiveIndex((current) => (current + 1) % playable.length)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" aria-label={`Show next ${label}`}><ChevronRight className="h-5 w-5" /></button>
    </div>}
  </div>;
}
