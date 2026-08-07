import { useMemo, type MouseEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import type { EventItem } from '../contexts/DataContext';
import { COUNTDOWN_WINDOW_MS, formatCountdownUnits, parseEventStartTimestamp, useCountdownNow } from '../hooks/useEventCountdown';

function getSoonestUpcomingEvent(events: EventItem[], referenceTime: number) {
  return events
    .map((event) => ({ event, startTimestamp: parseEventStartTimestamp(event.startDate) }))
    .filter((entry): entry is { event: EventItem; startTimestamp: number } => typeof entry.startTimestamp === 'number')
    .map((entry) => ({ ...entry.event, startTimestamp: entry.startTimestamp }))
    .filter((event) => {
      const delta = event.startTimestamp - referenceTime;
      return delta > 0 && delta <= COUNTDOWN_WINDOW_MS;
    })
    .sort((a, b) => a.startTimestamp - b.startTimestamp)[0] ?? null;
}

export function UpcomingEventCountdown({ events }: { events: EventItem[] }) {
  const now = useCountdownNow(true);
  const nextEvent = useMemo(() => getSoonestUpcomingEvent(events, now), [events, now]);
  if (!nextEvent) return null;

  const countdown = formatCountdownUnits(nextEvent.startTimestamp - now);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.querySelector<HTMLElement>('#upcoming-events');
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
    }
  };

  return (
    <div className="w-full border-b border-gold/25 bg-[linear-gradient(135deg,#004d26_0%,#006633_55%,#075c35_100%)]">
      <a
        href="#upcoming-events"
        onClick={handleClick}
        className="group mx-auto flex max-w-7xl flex-col flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 py-7 text-white transition-colors hover:bg-black/10 sm:flex-row sm:justify-between sm:px-6 sm:py-9 lg:px-8"
      >
        <div className="flex w-full min-w-0 items-center gap-3 sm:w-auto">
          <span className="inline-flex shrink-0 items-center rounded-full bg-gold/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold">
            Upcoming Event
          </span>
          <span className="truncate font-serif text-lg text-white sm:text-xl">{nextEvent.title}</span>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <span className="font-mono text-xl font-bold tracking-wide text-gold sm:text-2xl" aria-live="polite">
            {countdown.days}d : {countdown.hours}h : {countdown.minutes}m : {countdown.seconds}s
          </span>
          <span className="hidden items-center gap-1.5 rounded-[10px] border border-gold/40 px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-gold transition-colors group-hover:bg-gold group-hover:text-[#004d26] sm:inline-flex">
            View Info <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </a>
    </div>
  );
}
