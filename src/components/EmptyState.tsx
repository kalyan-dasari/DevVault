import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  suggestions?: string[];
  onSelectSuggestion?: (query: string) => void;
}

export function EmptyState({
  title = 'No resources found',
  description = 'Try adjusting your search keywords, clearing active filters, or exploring popular categories.',
  onReset,
  suggestions = ['AI coding', 'Postgres', 'FastAPI', 'Free APIs', 'Student pack'],
  onSelectSuggestion,
}: EmptyStateProps) {
  return (
    <div
      id="empty-state-container"
      className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 dark:bg-slate-900/20 my-6"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-800/80 text-slate-400 mb-4 shadow-sm">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-6">
        {description}
      </p>

      {suggestions && suggestions.length > 0 && onSelectSuggestion && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xs text-slate-500 mr-1 font-mono">Try searching:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSelectSuggestion(s)}
              className="px-2.5 py-1 text-xs rounded-lg border border-slate-700/60 bg-slate-800/60 text-slate-300 hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset all filters</span>
        </button>
      )}
    </div>
  );
}
