import { Timer } from 'lucide-react';
import { useEventCountdown } from '../hooks/useEventCountdown';

export function EventCountdownBadge({ startDate }: { startDate?: string }) {
  const countdown = useEventCountdown(startDate);
  if (!countdown) return null;

  return (
    <span
      className="inline-flex items-center gap-2 rounded-[6px] bg-emerald-900 px-3 py-2 text-xs font-bold uppercase tracking-widest text-emerald-100"
      aria-live="polite"
    >
      <Timer className="h-4 w-4 shrink-0 text-emerald-300" />
      {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
    </span>
  );
}
