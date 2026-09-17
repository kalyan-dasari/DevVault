import React, { useState } from 'react';
import { Filter, RotateCcw, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';
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
  { label: 'Free / OSS', value: 'Free' },
  { label: 'Freemium', value: 'Freemium' },
  { label: 'Open Source', value: 'Open Source' },
  { label: 'Student Benefit', value: 'Student Benefit' },
  { label: 'Free Trial', value: 'Free Trial' },
  { label: 'Paid', value: 'Paid' },
];

const DIFFICULTY_OPTIONS: { label: string; value: DifficultyLevel | 'all' }[] = [
  { label: 'All Levels', value: 'all' },
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
];

const SORT_OPTIONS: { label: string; value: ResourceFilterState['sortBy'] }[] = [
  { label: 'Featured First', value: 'featured' },
  { label: 'Recently Verified', value: 'verified' },
  { label: 'Alphabetical (A-Z)', value: 'alphabetical' },
  { label: 'Recently Updated', value: 'recent' },
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
    (filters.difficulty && filters.difficulty !== 'all') ||
    filters.openSourceOnly ||
    filters.hasApiOnly ||
    filters.selfHostedOnly ||
    filters.studentBenefitOnly;

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

      {/* Main Filter Panel (Always visible on desktop, toggleable on mobile) */}
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
                Categories
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Middle Row: Pricing + Difficulty + Quick Toggles + Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-800">
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

            {/* Difficulty Level */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Experience Level
              </label>
              <select
                value={filters.difficulty || 'all'}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    difficulty: e.target.value as DifficultyLevel | 'all',
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {DIFFICULTY_OPTIONS.map((opt) => (
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

            {/* Quick Boolean Checkboxes */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Attributes
              </label>
              <div className="flex flex-wrap gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      openSourceOnly: !filters.openSourceOnly,
                    })
                  }
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                    filters.openSourceOnly
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${filters.openSourceOnly ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  <span>Open Source</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      studentBenefitOnly: !filters.studentBenefitOnly,
                    })
                  }
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                    filters.studentBenefitOnly
                      ? 'bg-violet-500/15 border-violet-500/40 text-violet-300'
                      : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${filters.studentBenefitOnly ? 'bg-violet-400' : 'bg-slate-600'}`} />
                  <span>Student Perks</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      hasApiOnly: !filters.hasApiOnly,
                    })
                  }
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                    filters.hasApiOnly
                      ? 'bg-sky-500/15 border-sky-500/40 text-sky-300'
                      : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${filters.hasApiOnly ? 'bg-sky-400' : 'bg-slate-600'}`} />
                  <span>Has API</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
