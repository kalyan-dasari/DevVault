import React from 'react';
import { Resource } from '../types';
import { ResourceCard } from './ResourceCard';
import { EmptyState } from './EmptyState';

interface ResourceGridProps {
  resources: Resource[];
  isLoading?: boolean;
  onResetFilters?: () => void;
  onSelectSuggestion?: (query: string) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export function ResourceGrid({
  resources,
  isLoading = false,
  onResetFilters,
  onSelectSuggestion,
  emptyTitle,
  emptyDescription,
  className = '',
}: ResourceGridProps) {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 ${className}`}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 animate-pulse flex flex-col justify-between h-48"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-1/2 rounded bg-slate-800" />
                <div className="h-3 w-1/3 rounded bg-slate-800/60" />
              </div>
            </div>
            <div className="space-y-2 my-4">
              <div className="h-3 w-full rounded bg-slate-800/60" />
              <div className="h-3 w-4/5 rounded bg-slate-800/40" />
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <div className="h-3 w-16 rounded bg-slate-800/60" />
              <div className="h-3 w-20 rounded bg-slate-800/60" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        onReset={onResetFilters}
        onSelectSuggestion={onSelectSuggestion}
      />
    );
  }

  return (
    <div
      id="resource-grid"
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 ${className}`}
    >
      {resources.map((res) => (
        <ResourceCard key={res.id} resource={res} />
      ))}
    </div>
  );
}
