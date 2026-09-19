import React, { useState } from 'react';
import { Filter, RotateCcw, ChevronDown, Check, SlidersHorizontal, Flame, Lightbulb, Star } from 'lucide-react';
import { ResourceCategory, PricingType, DifficultyLevel, ResourceFilterState } from '../types';
import { categoryMeta } from '../data';

interface ResourceFiltersProps {
  filters: ResourceFilterState;
  onFilterChange: (filters: ResourceFilterState) => void;
  onReset: () => void;
  className?: string;
  totalResultsCount?: number;
}

const PRICING_OPTIONS: { label: string; value: PricingType | 'all' }[] = [
  { label: 'All Pricing', value: 'all' },
  { label: 'Free / 100% Free', value: 'Free' },
  { label: 'Open Source', value: 'Open Source' },
  { label: 'Freemium', value: 'Freemium' },
  { label: 'Free Trial', value: 'Free Trial' },
  { label: 'Paid', value: 'Paid' },
];

const SORT_OPTIONS: { label: string; value: ResourceFilterState['sortBy'] }[] = [
  { label: 'Featured Highlights', value: 'featured' },
  { label: 'GitHub Stars (High to Low)', value: 'stars' },
  { label: 'Alphabetical (A-Z)', value: 'alphabetical' },
  { label: 'Recently Added', value: 'recent' },
  { label: 'Recently Verified', value: 'verified' },
];

export function ResourceFilters({
  filters,
  onFilterChange,
  onReset,
  className = '',
  totalResultsCount,
}: ResourceFiltersProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const hasActiveFilters =
    (filters.category && filters.category !== 'all') ||
    (filters.pricingType && filters.pricingType !== 'all') ||
    filters.trendingOnSocialOnly ||
    filters.hasTipsOnly ||
    filters.openSourceOnly ||
    filters.hasApiOnly ||
    filters.selfHostedOnly;

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile filter toggle bar */}
      <div className="flex items-center justify-between lg:hidden mb-3">
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-700 bg-slate-800 text-slate-200"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
          <span>Filters {hasActiveFilters && '• Active'}</span>
        </button>

        {typeof totalResultsCount === 'number' && (
          <span className="text-xs text-slate-400 font-mono">
            {totalResultsCount} resource{totalResultsCount === 1 ? '' : 's'}
          </span>
        )}
      </div>

      {/* Main Filter Panel */}
      <div
        className={`${
          mobileExpanded ? 'block' : 'hidden'
        } lg:block rounded-2xl border border-slate-800/90 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-sm dark:border-slate-800 dark:bg-[#101522]/80`}
      >
        <div className="flex flex-col gap-4">
          {/* Top Bar: Category Pills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Primary Categories
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-300 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, category: 'all' })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  !filters.category || filters.category === 'all'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                All Categories
              </button>

              {categoryMeta.map((cat) => {
                const active = filters.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      onFilterChange({
                        ...filters,
                        category: active ? 'all' : cat.id,
                      })
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-800/80 text-slate-300 hover:text-slate-100 hover:bg-slate-800 border border-slate-700/60'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.badge && (
                      <span className="text-[10px] opacity-75 font-mono">({cat.count})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Highlight Toggles (Insta Viral, Tips & Tricks, OSS) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() =>
                onFilterChange({
                  ...filters,
                  trendingOnSocialOnly: !filters.trendingOnSocialOnly,
                })
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                filters.trendingOnSocialOnly
                  ? 'bg-pink-500/20 border-pink-500/50 text-pink-300 shadow-sm shadow-pink-500/10'
                  : 'border-slate-700/80 bg-slate-800/70 text-slate-300 hover:text-pink-300 hover:border-pink-500/30'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-pink-400" />
              <span>🔥 Viral on Instagram / Social</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onFilterChange({
                  ...filters,
                  hasTipsOnly: !filters.hasTipsOnly,
                })
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                filters.hasTipsOnly
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm shadow-amber-500/10'
                  : 'border-slate-700/80 bg-slate-800/70 text-slate-300 hover:text-amber-300 hover:border-amber-500/30'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>💡 Has Pro Tips & Tricks</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onFilterChange({
                  ...filters,
                  openSourceOnly: !filters.openSourceOnly,
                })
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                filters.openSourceOnly
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                  : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${filters.openSourceOnly ? 'bg-emerald-400' : 'bg-slate-600'}`} />
              <span>Open Source Only</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onFilterChange({
                  ...filters,
                  selfHostedOnly: !filters.selfHostedOnly,
                })
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                filters.selfHostedOnly
                  ? 'bg-sky-500/15 border-sky-500/40 text-sky-300'
                  : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${filters.selfHostedOnly ? 'bg-sky-400' : 'bg-slate-600'}`} />
              <span>Self-Hostable</span>
            </button>
          </div>

          {/* Bottom Row: Pricing + Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
            {/* Pricing Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Pricing Model
              </label>
              <select
                value={filters.pricingType || 'all'}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    pricingType: e.target.value as PricingType | 'all',
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {PRICING_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Sort Order
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    sortBy: e.target.value as ResourceFilterState['sortBy'],
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
