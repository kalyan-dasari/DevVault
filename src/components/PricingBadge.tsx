import React from 'react';
import { PricingType } from '../types';

interface PricingBadgeProps {
  type: PricingType;
  className?: string;
}

export function PricingBadge({ type, className = '' }: PricingBadgeProps) {
  const getStyles = () => {
    switch (type) {
      case 'Open Source':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Free':
        return 'bg-teal-500/10 text-teal-400 border-teal-500/30';
      case 'Freemium':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'Student Benefit':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
      case 'Free Trial':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Paid':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border font-mono tracking-tight whitespace-nowrap ${getStyles()} ${className}`}
    >
      {type}
    </span>
  );
}
