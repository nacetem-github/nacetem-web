import { useEffect, useState } from 'react';

export const COUNTDOWN_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;

export function parseEventStartTimestamp(startDate?: string, startTime?: string) {
  if (!startDate) return null;
  const normalizedTime = startTime?.match(/^(\d{2}):(\d{2})$/)?.slice(1).join(':');
  const timestamp = Date.parse(normalizedTime ? `${startDate}T${normalizedTime}:00+01:00` : startDate);
  return Number.isNaN(timestamp) ? null : timestamp;
}

function pad(value: number) {
  return String(value).padStart(2, '0');
}

export function formatCountdownUnits(timeRemaining: number) {
  const totalSeconds = Math.floor(timeRemaining / 1000);
  return {
    days: pad(Math.floor(totalSeconds / 86400)),
    hours: pad(Math.floor((totalSeconds % 86400) / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
  };
}

export function useCountdownNow(enabled: boolean) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!enabled) return;
    const intervalId = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(intervalId);
  }, [enabled]);

  return now;
}

/** Live countdown to a single event's start time. Returns null once the window has passed or the event is more than 14 days out. */
export function useEventCountdown(startDate?: string, startTime?: string) {
  const startTimestamp = parseEventStartTimestamp(startDate, startTime);
  const now = useCountdownNow(startTimestamp !== null);

  if (startTimestamp === null) return null;

  const timeRemaining = startTimestamp - now;
  if (timeRemaining <= 0 || timeRemaining > COUNTDOWN_WINDOW_MS) return null;

  return { timeRemaining, ...formatCountdownUnits(timeRemaining) };
}
