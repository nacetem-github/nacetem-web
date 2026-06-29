import { cn } from '../lib/utils';
import nacetemLogo from '../assets/images/logos/nacetem-logo-full.png';

interface NacetemLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'default' | 'compact';
  unframed?: boolean;
}

export function NacetemLogo({ className, variant = 'dark', size = 'default', unframed = false }: NacetemLogoProps) {
  const isLight = variant === 'light';
  const isCompact = size === 'compact';

  return (
    <div
      className={cn(
        "relative isolate flex min-w-0 items-center overflow-hidden",
        "transition-all duration-300",
        !unframed && "rounded-xl border bg-white p-1.5",
        !unframed && (
          isLight
            ? "border-white/25 shadow-[0_16px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
            : "border-slate-200/80 shadow-[0_8px_24px_rgba(15,23,42,0.07)]"
        ),
        className
      )}
    >
      <img
        src={nacetemLogo}
        alt="National Centre for Technology Management"
        className={cn(
          "h-auto max-w-full shrink-0 rounded-lg object-contain",
          isCompact
            ? "w-[140px] sm:w-[160px] lg:w-[175px]"
            : "w-[190px] sm:w-[220px] lg:w-[240px]"
        )}
      />
    </div>
  );
}
