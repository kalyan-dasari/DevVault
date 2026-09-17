import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, Sparkles, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { allResources, filterResources, categoryMeta } from '../data';
import { ResourceFilterState, ResourceCategory, PricingType, DifficultyLevel } from '../types';
import { SearchBar } from '../components/SearchBar';
import { ResourceFilters } from '../components/ResourceFilters';
import { ResourceGrid } from '../components/ResourceGrid';
import { analytics } from '../services/analytics';

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filter values from URL query parameters
  const initialCategory = (searchParams.get('category') as ResourceCategory) || 'all';
  const initialQuery = searchParams.get('q') || '';
  const initialPricing = (searchParams.get('pricing') as PricingType) || 'all';

  const [filters, setFilters] = useState<ResourceFilterState>({
    searchQuery: initialQuery,
    category: initialCategory,
    pricingType: initialPricing,
    difficulty: 'all',
    openSourceOnly: searchParams.get('oss') === 'true',
    hasApiOnly: searchParams.get('api') === 'true',
    selfHostedOnly: searchParams.get('selfhosted') === 'true',
    studentBenefitOnly: searchParams.get('student') === 'true',
    sortBy: 'featured',
  });

  // Keep URL parameters in sync when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.searchQuery.trim()) params.q = filters.searchQuery.trim();
    if (filters.category && filters.category !== 'all') params.category = filters.category;
    if (filters.pricingType && filters.pricingType !== 'all') params.pricing = filters.pricingType;
    if (filters.difficulty && filters.difficulty !== 'all') params.difficulty = filters.difficulty;
    if (filters.openSourceOnly) params.oss = 'true';
    if (filters.hasApiOnly) params.api = 'true';
    if (filters.selfHostedOnly) params.selfhosted = 'true';
    if (filters.studentBenefitOnly) params.student = 'true';

    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  // Execute filtering & sorting
  const filteredResources = useMemo(() => {
    return filterResources(filters, allResources);
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      pricingType: 'all',
      difficulty: 'all',
      openSourceOnly: false,
      hasApiOnly: false,
      selfHostedOnly: false,
      studentBenefitOnly: false,
      sortBy: 'featured',
    });
    analytics.track('filter_used', { action: 'reset' });
  };

  const handleSearchChange = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
    if (query.trim()) {
      analytics.track('search', { query });
    }
  };

  const handleSelectSuggestion = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
              <Compass className="w-4 h-4" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              Explore DevVault
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search across {allResources.length} verified developer tools, repositories, and APIs.
          </p>
        </div>

        {/* Total Results Summary */}
        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
          <span>Showing</span>
          <span className="font-bold text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
            {filteredResources.length}
          </span>
          <span>of {allResources.length} resources</span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div>
        <SearchBar
          value={filters.searchQuery}
          onChange={handleSearchChange}
          showSuggestions={true}
          onSelectSuggestion={handleSelectSuggestion}
          placeholder="Filter by keyword, tech tag, framework (e.g. 'React', 'Python', 'FastAPI', 'Free AI')..."
        />
      </div>

      {/* Multifaceted Filter Panel */}
      <ResourceFilters
        filters={filters}
        onFilterChange={setFilters}
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
          emptyDescription={`We couldn't find any resources matching your search criteria. Try removing filters or searching for alternative tech terms.`}
        />
      </div>
    </div>
  );
}
