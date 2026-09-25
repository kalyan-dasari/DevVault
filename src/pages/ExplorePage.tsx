import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';
import { allResources, filterResources, getProTipsResources, categoryMeta } from '../data';
import { ResourceFilterState, ResourceCategory, PricingType, DifficultyLevel } from '../types';
import { SearchBar } from '../components/SearchBar';
import { ResourceFilters } from '../components/ResourceFilters';
import { ResourceGrid } from '../components/ResourceGrid';
import { analytics } from '../services/analytics';

const DEFAULT_FILTERS: ResourceFilterState = {
  searchQuery: '',
  category: 'all',
  pricingType: 'all',
  difficulty: 'all',
  openSourceOnly: false,
  hasApiOnly: false,
  selfHostedOnly: false,
  studentBenefitOnly: false,
  trendingOnSocialOnly: false,
  hasTipsOnly: false,
  sortBy: 'featured',
};

const CATEGORY_IDS = categoryMeta.map((c) => c.id);
const isTrue = (value: string | null) => value === 'true' || value === '1';

function filtersFromParams(params: URLSearchParams): ResourceFilterState {
  const category = params.get('category') as ResourceCategory | null;
  const pricing = params.get('pricing') as PricingType | null;
  const difficulty = params.get('difficulty') as DifficultyLevel | null;
  const sortBy = params.get('sort') as ResourceFilterState['sortBy'] | null;

  return {
    searchQuery: params.get('q') || '',
    category: category && CATEGORY_IDS.includes(category) ? category : 'all',
    pricingType: pricing || 'all',
    difficulty: difficulty || 'all',
    openSourceOnly: isTrue(params.get('oss')),
    hasApiOnly: isTrue(params.get('api')),
    selfHostedOnly: isTrue(params.get('selfhosted')),
    studentBenefitOnly: isTrue(params.get('student')),
    trendingOnSocialOnly: isTrue(params.get('trending')),
    hasTipsOnly: isTrue(params.get('tips')),
    sortBy: sortBy || 'featured',
  };
}

function paramsFromFilters(filters: ResourceFilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.searchQuery.trim()) params.set('q', filters.searchQuery.trim());
  if (filters.category && filters.category !== 'all') params.set('category', filters.category);
  if (filters.pricingType && filters.pricingType !== 'all') params.set('pricing', filters.pricingType);
  if (filters.difficulty && filters.difficulty !== 'all') params.set('difficulty', filters.difficulty);
  if (filters.openSourceOnly) params.set('oss', 'true');
  if (filters.hasApiOnly) params.set('api', 'true');
  if (filters.selfHostedOnly) params.set('selfhosted', 'true');
  if (filters.studentBenefitOnly) params.set('student', 'true');
  if (filters.trendingOnSocialOnly) params.set('trending', 'true');
  if (filters.hasTipsOnly) params.set('tips', 'true');
  if (filters.sortBy !== 'featured') params.set('sort', filters.sortBy);
  return params;
}

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramString = searchParams.toString();
  const lastSyncedParams = useRef(paramString);

  const [filters, setFilters] = useState<ResourceFilterState>(() =>
    filtersFromParams(searchParams)
  );

  // Re-sync when the URL changes from outside (navbar, landing page, footer links)
  useEffect(() => {
    if (paramString === lastSyncedParams.current) return;
    lastSyncedParams.current = paramString;
    setFilters(filtersFromParams(searchParams));
  }, [paramString, searchParams]);

  // Keep URL in sync with filter state
  useEffect(() => {
    const next = paramsFromFilters(filters).toString();
    if (next === paramString) return;
    lastSyncedParams.current = next;
    setSearchParams(paramsFromFilters(filters), { replace: true });
  }, [filters, paramString, setSearchParams]);

  const filteredResources = useMemo(
    () => filterResources(filters, allResources),
    [filters]
  );

  const handleFilterChange = (next: ResourceFilterState) => {
    setFilters(next);
    analytics.track('filter_used', {
      category: next.category,
      sortBy: next.sortBy,
      resultCount: filterResources(next, allResources).length,
    });
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    analytics.track('filter_used', { action: 'reset' });
  };

  const handleSearchChange = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
    if (query.trim()) analytics.track('search', { query });
  };

  const handleSelectSuggestion = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const activeCategory = categoryMeta.find((c) => c.id === filters.category);
  const isTipsView = Boolean(filters.hasTipsOnly) && (!filters.category || filters.category === 'all');
  const pageTitle = activeCategory
    ? activeCategory.name
    : isTipsView
    ? 'Developer Tips & Tricks'
    : 'Explore DevVault Catalog';
  const pageDescription = activeCategory
    ? activeCategory.description
    : isTipsView
    ? 'Actionable pro tips from open-source maintainers and viral engineering tutorials, each with a 1-click launch command.'
    : `Search across ${allResources.length} verified trending GitHub repos, open-source AI models, free developer APIs, hosting, and utilities.`;
  const totalInView = activeCategory
    ? allResources.filter((r) => r.category === activeCategory.id).length
    : isTipsView
    ? getProTipsResources().length
    : allResources.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
              <Compass className="w-4 h-4" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              {pageTitle}
            </h1>
            {!activeCategory && !isTipsView && (
              <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                Full Catalog
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">{pageDescription}</p>
        </div>

        {/* Total Results Summary */}
        <div className="text-xs font-mono text-slate-400 flex items-center gap-2 shrink-0">
          <span>Showing</span>
          <span className="font-bold text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
            {filteredResources.length}
          </span>
          <span>of {totalInView} in this view</span>
        </div>
      </div>

      {/* Quick jump to sibling collections */}
      {!activeCategory && !isTipsView && (
        <div className="flex flex-wrap items-center gap-2">
          {categoryMeta.map((cat) => (
            <Link
              key={cat.id}
              to={`/explore?category=${cat.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700/80 bg-slate-800/70 text-slate-300 hover:text-slate-100 hover:border-indigo-500/40 transition-colors"
            >
              <span>{cat.name}</span>
              <span className="text-[10px] font-mono text-slate-500">({cat.count})</span>
            </Link>
          ))}
        </div>
      )}

      {/* Global Search Bar */}
      <div>
        <SearchBar
          value={filters.searchQuery}
          onChange={handleSearchChange}
          showSuggestions={true}
          onSelectSuggestion={handleSelectSuggestion}
          placeholder="Filter by keyword, tech tag, repo name (e.g. 'Supabase', 'Ollama', 'FastAPI', 'DeepSeek', 'Postgres')..."
        />
      </div>

      {/* Multifaceted Filter Panel */}
      <ResourceFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        totalResultsCount={filteredResources.length}
      />

      {/* Results Grid */}
      <div className="pt-2">
        <ResourceGrid
          resources={filteredResources}
          onResetFilters={handleResetFilters}
          onSelectSuggestion={handleSelectSuggestion}
          emptyTitle="No matching resources in the vault"
          emptyDescription="We couldn't find any resources matching your search criteria. Try removing filters or searching for alternative tech terms."
        />
      </div>

      {/* Back to landing page */}
      <div className="pt-2 flex justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-indigo-300 transition-colors"
        >
          <span>Back to DevVault home</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
