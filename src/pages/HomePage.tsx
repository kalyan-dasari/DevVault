import React from 'react';
import { Sparkles, Terminal, Code2, PlusCircle } from 'lucide-react';

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-8">
      {/* Subtle glowing ambient backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-b from-indigo-500/15 via-sky-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Fresh Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-medium animate-in fade-in duration-300">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
        <span>DevVault • Clean Slate Ready</span>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-100">
          Ready to Build Your New{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
            DevVault
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
          The foundation is clean, modular, and fast. Tell me what sections, layouts, or features you want to build first!
        </p>
      </div>

      {/* Quick Setup Blueprint Cards */}
      <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left font-mono text-xs">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold">
            <Terminal className="w-4 h-4" />
            <span>1. Data & Schema</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
            Ready to define custom categories, tags, star metrics, and attributes.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-semibold">
            <Code2 className="w-4 h-4" />
            <span>2. UI & Layout</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
            Ready for your layout (feed, grid, cards, bento, filters, or search).
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <PlusCircle className="w-4 h-4" />
            <span>3. Features & Tools</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
            Ready for instant search, quick save, modal previews, or imports.
          </p>
        </div>
      </div>
    </div>
  );
}
