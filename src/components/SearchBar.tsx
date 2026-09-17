import React, { useRef, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  showSuggestions?: boolean;
  onSelectSuggestion?: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
}

const POPULAR_SEARCH_SUGGESTIONS = [
  'Free AI coding tools',
  'React UI libraries',
  'Free APIs',
  'Tools for building SaaS',
  'Student developer benefits',
  'Free hosting',
  'Python backend',
];

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search by name, tags, tech (e.g. "React", "Postgres", "Free AI")...',
  showSuggestions = false,
  onSelectSuggestion,
  className = '',
  autoFocus = false,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global hotkey: press "/" to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          id="global-search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-10 pr-24 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-700/80 bg-slate-900/90 text-slate-100 placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all dark:bg-[#111622]/90 dark:border-slate-800"
        />

        <div className="absolute right-3 flex items-center gap-1.5">
          {value ? (
            <button
              type="button"
              onClick={() => {
                onChange('');
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-slate-200 rounded-md hover:bg-slate-800 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/80 border border-slate-700/60 rounded">
              /
            </kbd>
          )}
        </div>
      </div>

      {showSuggestions && onSelectSuggestion && (
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="flex items-center gap-1 text-slate-500 shrink-0 mr-1 font-mono text-[11px]">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Try:</span>
          </span>
          {POPULAR_SEARCH_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSelectSuggestion(suggestion)}
              className="shrink-0 px-2.5 py-1 rounded-full text-xs border border-slate-800 bg-slate-900/60 text-slate-300 hover:border-indigo-500/40 hover:text-indigo-200 hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
