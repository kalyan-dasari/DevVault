import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  asLink?: boolean;
}

export function Logo({
  size = 'md',
  showTagline = true,
  className = '',
  asLink = true,
}: LogoProps) {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';
  const badgeText = size === 'sm' ? 'text-[9px]' : 'text-[10px]';

  const content = (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      {/* High-Tech Isometric Vault Logo Icon */}
      <div className={`relative flex ${iconSize} shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-0.5 shadow-lg shadow-indigo-500/10 border border-indigo-500/30 group-hover:border-indigo-400/60 group-hover:shadow-indigo-500/25 transition-all duration-300 group-hover:scale-105`}>
        {/* Glow ambient background */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-indigo-600/30 via-sky-500/20 to-purple-600/30 blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity" />

        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 w-full h-full p-1"
        >
          <defs>
            <linearGradient id="vaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="neonGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>

          {/* Outer Isometric Hexagonal Vault Shell */}
          <path
            d="M18 3L31 10.5V25.5L18 33L5 25.5V10.5L18 3Z"
            stroke="url(#vaultGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
          />

          {/* Internal Vault Cube Struts */}
          <path
            d="M18 18L31 10.5M18 18V33M18 18L5 10.5"
            stroke="url(#vaultGradient)"
            strokeWidth="1.5"
            strokeOpacity="0.8"
            strokeLinecap="round"
          />

          {/* Central glowing neon code chevron & node */}
          <path
            d="M14 15L11 18L14 21"
            stroke="url(#neonGlow)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 15L25 18L22 21"
            stroke="url(#neonGlow)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="18" r="2" fill="#38bdf8" className="animate-pulse" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`${textSize} font-black tracking-tight text-slate-100 flex items-center font-sans`}>
            Dev<span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">Vault</span>
          </span>
          <span className={`px-1.5 py-0.2 rounded-full ${badgeText} font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 tracking-wider shadow-sm`}>
            PRO
          </span>
        </div>

        {showTagline && (
          <span className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:inline leading-none mt-0.5">
            Trending Repos • Free AI
          </span>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" className="focus:outline-none" aria-label="DevVault Home">
        {content}
      </Link>
    );
  }

  return content;
}
