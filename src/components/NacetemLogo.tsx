import React from 'react';
import { cn } from '../lib/utils';
import nacetemLogo from '../download.png';

interface NacetemLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export function NacetemLogo({ className, variant = 'dark' }: NacetemLogoProps) {
  const isLight = variant === 'light';
  
  return (
    <div className={cn("flex items-center gap-3 min-w-0", className)}>
      <div className={cn(
        "relative flex h-14 w-16 shrink-0 items-center justify-center rounded-sm p-1.5",
        isLight ? "bg-white shadow-sm" : "bg-white"
      )}>
        <img src={nacetemLogo} alt="NACETEM logo" className="h-full w-full object-contain" />
      </div>

      <div className="flex min-w-0 flex-col justify-center">
        <span className={cn(
          "text-[14px] sm:text-[17px] font-bold leading-tight font-sans",
          isLight ? "text-white" : "text-[#0b1a45]"
        )}>
          National Centre for
        </span>
        <div className="flex flex-wrap gap-x-1.5 text-[14px] sm:text-[17px] font-bold leading-tight font-sans">
          <span className={isLight ? "text-emerald-100" : "text-[#a14a4c]"}>Technology</span>
          <span className={isLight ? "text-white" : "text-[#0b1a45]"}>Management</span>
        </div>
      </div>
    </div>
  );
}
