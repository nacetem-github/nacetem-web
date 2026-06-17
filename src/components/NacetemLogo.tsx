import { cn } from '../lib/utils';
import nacetemLogo from '../assets/images/logos/nacetem-logo-full.png';

interface NacetemLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export function NacetemLogo({ className, variant = 'dark' }: NacetemLogoProps) {
  const isLight = variant === 'light';

  return (
    <div
      className={cn(
        "relative isolate flex min-w-0 items-center overflow-hidden rounded-xl border bg-white p-1.5",
        "transition-all duration-300",
        isLight
          ? "border-white/25 shadow-[0_16px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
          : "border-slate-200/80 shadow-[0_8px_24px_rgba(15,23,42,0.07)]",
        className
      )}
    >
      <img
        src={nacetemLogo}
        alt="National Centre for Technology Management"
        className="h-auto w-[190px] max-w-full shrink-0 rounded-lg object-contain sm:w-[220px] lg:w-[240px]"
      />
    </div>
  );
}
