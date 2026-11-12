import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Clock3, ExternalLink, MapPin, Video, X } from 'lucide-react';
import type { EventItem } from '../types/content';
import { parseEventStartTimestamp } from '../hooks/useEventCountdown';
import { formatEventTime } from '../utils/eventUtils';

const DISMISS_DELAY_MS = 900;
const TIME_REFRESH_MS = 30_000;

export function FeaturedEventPopup({ event }: { event: EventItem | null }) {
  const [now, setNow] = useState(() => Date.now());
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const startTimestamp = parseEventStartTimestamp(event?.startDate, event?.time);
  const isUpcoming = event?.status === 'published' && startTimestamp !== null && now < startTimestamp;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), TIME_REFRESH_MS);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isUpcoming || !event) return;

    const storageKey = `nacetem-event-popup-${event.id}`;
    if (window.sessionStorage.getItem(storageKey)) return;

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(storageKey, 'shown');
      setIsOpen(true);
    }, DISMISS_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [event, isUpcoming]);

  useEffect(() => {
    if (!isOpen || !isUpcoming) {
      setIsOpen(false);
      return;
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') {
        keyboardEvent.preventDefault();
        setIsOpen(false);
        return;
      }

      if (keyboardEvent.key !== 'Tab') return;
      const focusable: HTMLElement[] = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (keyboardEvent.shiftKey && document.activeElement === first) {
        keyboardEvent.preventDefault();
        last.focus();
      } else if (!keyboardEvent.shiftKey && document.activeElement === last) {
        keyboardEvent.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen, isUpcoming]);

  if (!event || !isOpen || !isUpcoming || typeof document === 'undefined') return null;

  const externalLinkClass =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-3 text-center text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(mouseEvent) => {
        if (mouseEvent.target === mouseEvent.currentTarget) setIsOpen(false);
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="featured-event-title"
        aria-describedby="featured-event-description"
        className="relative my-auto grid w-full max-w-4xl overflow-hidden rounded-2xl border border-white/30 bg-white shadow-2xl lg:grid-cols-[1.05fr_0.95fr]"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close event announcement"
          className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        <div className="flex flex-col justify-center bg-[#004d26] px-6 py-8 text-white sm:px-9 sm:py-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Happening today · NACETEM</p>
          <h2 id="featured-event-title" className="mt-4 pr-8 font-serif text-3xl leading-tight sm:text-4xl">
            {event.title}
          </h2>
          <p id="featured-event-description" className="mt-4 text-sm leading-7 text-emerald-50">
            Explore Horizon Europe, Erasmus+ and European Solidarity Corps open calls, connect with Nigerian and European organisations, and take part in matchmaking.
          </p>

          <div className="mt-6 grid gap-3 text-sm text-emerald-50">
            <p className="flex items-start gap-3">
              <CalendarDays aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{event.displayDate}</span>
            </p>
            <p className="flex items-start gap-3">
              <Clock3 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{formatEventTime(event.time)} West Africa Time</span>
            </p>
            <p className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>Obasanjo Hall, Federal Secretariat Complex, Abuja · Online via Zoom</span>
            </p>
          </div>

          <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-5 text-sm">
            {event.onlineMeetingId && (
              <div>
                <dt className="text-xs font-semibold text-emerald-100/75">Meeting ID</dt>
                <dd className="mt-1 font-mono tabular-nums">{event.onlineMeetingId}</dd>
              </div>
            )}
            {event.onlinePasscode && (
              <div>
                <dt className="text-xs font-semibold text-emerald-100/75">Passcode</dt>
                <dd className="mt-1 font-mono tabular-nums">{event.onlinePasscode}</dd>
              </div>
            )}
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {event.actionUrl && (
              <a
                href={event.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${externalLinkClass} bg-gold text-[#1A1A1A] hover:bg-white focus-visible:ring-gold`}
              >
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
                Register Now
              </a>
            )}
            {event.onlineViewingUrl && (
              <a
                href={event.onlineViewingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${externalLinkClass} border border-white/40 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white`}
              >
                <Video aria-hidden="true" className="h-4 w-4" />
                Join on Zoom
              </a>
            )}
          </div>
          {(event.onlineNotesUrl || event.onlineChatUrl) && (
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-emerald-100">
              {event.onlineNotesUrl && (
                <a className="underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-white" href={event.onlineNotesUrl} target="_blank" rel="noopener noreferrer">
                  Join and take notes
                </a>
              )}
              {event.onlineChatUrl && (
                <a className="underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-white" href={event.onlineChatUrl} target="_blank" rel="noopener noreferrer">
                  Open meeting chat
                </a>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center bg-slate-50 p-4 sm:p-7">
          <img
            src={event.flyerUrl}
            alt={`${event.title} event flyer`}
            width={768}
            height={1152}
            loading="eager"
            decoding="async"
            className="max-h-[34rem] w-auto max-w-full rounded-lg object-contain shadow-md"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
