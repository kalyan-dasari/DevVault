import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  Wand2,
  FileCode,
  Terminal,
  Bot,
  Layers,
  Check,
  Copy,
  Lightbulb,
} from 'lucide-react';
import { getAllPromptSkills } from '../data';
import { PromptSkillCard } from '../components/PromptSkillCard';
import { useToast } from '../context/ToastContext';
import { TipType } from '../types';

export function TipsPage() {
  const { showToast } = useToast();
  const allItems = useMemo(() => getAllPromptSkills(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [copiedAll, setCopiedAll] = useState(false);

  const typeFilters: { id: string; label: string; icon: React.ComponentType<{ className?: string }>; count: number }[] = [
    { id: 'all', label: 'All Prompts & Skills', icon: Layers, count: allItems.length },
    {
      id: 'prompt',
      label: 'ChatGPT & Claude Prompts',
      icon: Wand2,
      count: allItems.filter((i) => i.type === 'prompt').length,
    },
    {
      id: 'cursor-rule',
      label: '.cursorrules & IDE Rules',
      icon: FileCode,
      count: allItems.filter((i) => i.type === 'cursor-rule').length,
    },
    {
      id: 'cheat-sheet',
      label: 'CLI & Git Cheat Skills',
      icon: Terminal,
      count: allItems.filter((i) => i.type === 'cheat-sheet').length,
    },
    {
      id: 'agent-skill',
      label: 'Agent Skills & Architecture',
      icon: Bot,
      count: allItems.filter((i) => i.type === 'agent-skill' || i.type === 'system-instruction').length,
    },
  ];

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Type filter
      if (selectedType !== 'all') {
        if (selectedType === 'agent-skill') {
          if (item.type !== 'agent-skill' && item.type !== 'system-instruction') return false;
        } else if (item.type !== selectedType) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inSummary = item.summary.toLowerCase().includes(q);
        const inTool = item.targetTool.toLowerCase().includes(q);
        const inContent = item.content.toLowerCase().includes(q);
        const inTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const inPlaceholders = item.placeholders
          ? item.placeholders.some((p) => p.toLowerCase().includes(q))
          : false;
        return inTitle || inSummary || inTool || inContent || inTags || inPlaceholders;
      }

      return true;
    });
  }, [allItems, selectedType, searchQuery]);

  const handleCopyAll = () => {
    const text = filteredItems
      .map((item) => `### ${item.title} (${item.targetTool})\n\n${item.content}`)
      .join('\n\n---\n\n');

    if (!text) {
      showToast('No prompts to copy', 'info');
      return;
    }

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    showToast(`Copied ${filteredItems.length} prompts & skills!`, 'success');
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800 relative">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Prompts • .cursorrules • Developer Cheat Skills</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-100">
            AI Prompts, Rules &amp;{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
              Developer Skills
            </span>
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed">
            Curated battle-tested system prompts for ChatGPT &amp; Claude, production <code>.cursorrules</code> files, Git emergency recovery commands, and architecture review templates.
          </p>
        </div>

        {/* Total Summary and Copy Action */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Total Curated Skills: </span>
            <span className="font-bold text-indigo-300">{allItems.length}</span>
          </div>

          <button
            type="button"
            onClick={handleCopyAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-colors"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Copied All Visible</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy All Visible</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search and Type Filter Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts, .cursorrules, and cheat skills (e.g. 'Next.js', 'Refactor', 'Git', 'FastAPI', 'Review', 'Docker')..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {typeFilters.map((filter) => {
            const Icon = filter.icon;
            const active = selectedType === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedType(filter.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-indigo-600/25 text-indigo-200 border border-indigo-500/50 font-semibold shadow-sm'
                    : 'bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{filter.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Status */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
        <div>
          Showing <span className="text-indigo-300 font-bold">{filteredItems.length}</span> prompts &amp; skills
          {selectedType !== 'all' && (
            <span> in <span className="text-slate-200 capitalize">{selectedType}</span></span>
          )}
          {searchQuery && <span> matching "{searchQuery}"</span>}
        </div>

        {(selectedType !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedType('all');
              setSearchQuery('');
            }}
            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Prompts & Skills Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <PromptSkillCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center space-y-3 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30">
          <Lightbulb className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">No prompts or skills found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No items matched your current search query. Try searching for "Git", "Next.js", "Docker", or "Refactor".
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedType('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Show All Prompts
          </button>
        </div>
      )}
    </div>
  );
}
