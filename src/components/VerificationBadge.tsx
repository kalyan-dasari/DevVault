import React from 'react';
import { ShieldCheck, Clock } from 'lucide-react';

interface VerificationBadgeProps {
  verified: boolean;
  lastVerified: string;
  compact?: boolean;
  className?: string;
}

export function VerificationBadge({
  verified,
  lastVerified,
  compact = false,
  className = '',
}: VerificationBadgeProps) {
  if (!verified) {
    return (
      <span
        title="Community reported / pending official verification"
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border bg-amber-500/10 text-amber-300 border-amber-500/20 whitespace-nowrap ${className}`}
      >
        <Clock className="w-3 h-3 shrink-0" />
        <span>Unverified Draft</span>
      </span>
    );
  }

  return (
    <span
      title={`Verified accurate as of ${lastVerified}. Check official source for recent pricing changes.`}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border bg-indigo-500/10 text-indigo-300 border-indigo-500/20 whitespace-nowrap ${className}`}
    >
      <ShieldCheck className="w-3 h-3 text-indigo-400 shrink-0" />
      <span>{compact ? 'Verified' : `Verified ${lastVerified}`}</span>
    </span>
  );
}
