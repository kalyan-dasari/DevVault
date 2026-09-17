import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  Search,
  Sparkles,
  Award,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { studentOffers } from '../data/student-pack';
import { StudentOffer } from '../types';

export function StudentPackPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSampleDataOnly, setShowSampleDataOnly] = useState<boolean>(false);

  // Extract distinct categories
  const categories = useMemo(() => {
    const set = new Set(studentOffers.map((o) => o.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredOffers = useMemo(() => {
    return studentOffers.filter((offer) => {
      const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        offer.name.toLowerCase().includes(q) ||
        offer.provider.toLowerCase().includes(q) ||
        offer.benefitDescription.toLowerCase().includes(q);
      const matchesSample = showSampleDataOnly ? offer.isSampleData : true;

      return matchesCategory && matchesSearch && matchesSample;
    });
  }, [searchQuery, selectedCategory, showSampleDataOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Student Pack Hero */}
      <div className="relative rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/40 via-slate-900 to-slate-950 p-6 sm:p-10 overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/40 bg-violet-500/15 text-violet-300 text-xs font-mono font-medium">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>GitHub Student Developer Pack Integration</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Supercharge your developer journey for $0 while in school.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Verified student discounts, free cloud credits, domain registrations, and professional IDE licenses. Powered by the GitHub Student Developer Pack.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://education.github.com/pack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-violet-600/20 transition-all"
            >
              <span>Apply for Official Student Pack</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Integration Point: src/data/student-pack.ts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Notice & Non-Fabrication Disclaimer */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-slate-200">
            Official Benefits Verification Notice
          </span>
          <p className="text-slate-400 leading-relaxed">
            Student Pack partner benefits are subject to change by GitHub Education and participating partners. Offers tagged as <span className="font-mono text-violet-300">Sample/Illustrative</span> illustrate future platform data structures without fabricating live quotas. Always verify on the official GitHub Education portal.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search student perks by tool or benefit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">
              {filteredOffers.length} offer{filteredOffers.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Benefits' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-violet-500/40 hover:bg-slate-900/90 transition-all duration-150 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono text-violet-400 font-semibold uppercase tracking-wider">
                    {offer.provider}
                  </span>
                  <h3 className="text-base font-semibold text-slate-100 mt-0.5">
                    {offer.name}
                  </h3>
                </div>
                {offer.isSampleData ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                    Sample Data
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                {offer.benefitDescription}
              </p>

              {offer.valueEstimate && (
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800/80 text-[11px] font-mono text-indigo-300 border border-slate-700/60">
                  <Award className="w-3 h-3" />
                  <span>Est. Value: {offer.valueEstimate}</span>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">
                {offer.category}
              </span>

              <a
                href={offer.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 font-medium transition-colors"
              >
                <span>Claim Offer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
