import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  Sparkles,
  Search,
  Filter,
  Terminal,
  Copy,
  Check,
  Flame,
  Bot,
  GitBranch,
  Cloud,
  Code,
  Wrench,
  Layers,
} from 'lucide-react';
import { getAllDeveloperTips } from '../data';
import { TipCard } from '../components/TipCard';
import { useToast } from '../context/ToastContext';
import { ResourceCategory } from '../types';

export function TipsPage() {
  const { showToast } = useToast();
  const allTips = useMemo(() => getAllDeveloperTips(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedAll, setCopiedAll] = useState(false);

  const categories = [
    { id: 'all', label: 'All Tips', icon: Layers, count: allTips.length },
    {
      id: 'github',
      label: 'Trending Repos',
      icon: GitBranch,
      count: allTips.filter((t) => t.resourceCategory === 'github').length,
    },
    {
      id: 'ai-tools',
      label: 'Free AI Tools',
      icon: Bot,
      count: allTips.filter((t) => t.resourceCategory === 'ai-tools').length,
    },
    {
      id: 'developer-tools',
      label: 'Dev Tools & Utilities',
      icon: Wrench,
      count: allTips.filter((t) => t.resourceCategory === 'developer-tools').length,
    },
    {
      id: 'hosting',
      label: 'Cloud & Hosting',
      icon: Cloud,
      count: allTips.filter((t) => t.resourceCategory === 'hosting').length,
    },
    {
      id: 'apis',
      label: 'Developer APIs',
      icon: Code,
      count: allTips.filter((t) => t.resourceCategory === 'apis').length,
    },
  ];

  const filteredTips = useMemo(() => {
    return allTips.filter((tip) => {
      // Category filter
      if (selectedCategory !== 'all' && tip.resourceCategory !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = tip.resourceName.toLowerCase().includes(q);
        const inTip = tip.tip.toLowerCase().includes(q);
        const inCmd = tip.quickCommand ? tip.quickCommand.toLowerCase().includes(q) : false;
        const inTags = tip.tags.some((tag) => tag.toLowerCase().includes(q));
        const inWhy = tip.whyItMatters ? tip.whyItMatters.toLowerCase().includes(q) : false;
        return inName || inTip || inCmd || inTags || inWhy;
      }

      return true;
    });
  }, [allTips, selectedCategory, searchQuery]);

  const handleCopyAllCommands = () => {
    const commands = filteredTips
      .filter((t) => t.quickCommand)
      .map((t) => `# ${t.resourceName} Pro-Tip:\n${t.quickCommand}`)
      .join('\n\n');

    if (!commands) {
      showToast('No commands to copy in current view', 'info');
      return;
    }

    navigator.clipboard.writeText(commands);
    setCopiedAll(true);
    showToast(`Copied ${filteredTips.filter((t) => t.quickCommand).length} commands!`, 'success');
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800 relative">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono font-semibold">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Developer Cheat Sheet • Actionable Hacks</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-100">
            Developer Tips, Tricks &amp;{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
              1-Click Commands
            </span>
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed">
            High-leverage engineering pro-tips, $0 cloud architecture configurations, token compression setups, and verified 1-liner install commands straight from open-source maintainers.
          </p>
        </div>

        {/* Quick Stats & Action */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Total Actionable Tips: </span>
            <span className="font-bold text-amber-300">{allTips.length}</span>
          </div>

          <button
            type="button"
            onClick={handleCopyAllCommands}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-colors"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 text-slate-950" />
                <span>Copied All Commands</span>
              </>
            ) : (
              <>
                <Terminal className="w-4 h-4" />
                <span>Copy All Commands</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search & Topic Categories Filter Bar */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pro-tips by keyword, tool name, or terminal command (e.g. 'Docker', 'Oracle', 'Ollama', 'DNS', 'Token', 'Cursor')..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all shadow-inner"
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

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold shadow-sm'
                    : 'bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-amber-500/30 text-amber-200' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter summary status */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
        <div>
          Showing <span className="text-amber-300 font-bold">{filteredTips.length}</span> tips
          {selectedCategory !== 'all' && (
            <span> in <span className="text-slate-200 capitalize">{selectedCategory}</span></span>
          )}
          {searchQuery && <span> matching "{searchQuery}"</span>}
        </div>

        {(selectedCategory !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-amber-400 hover:text-amber-300 underline underline-offset-2"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Tips Cards Grid */}
      {filteredTips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center space-y-3 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30">
          <Lightbulb className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">No tips found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No developer tips matched your current search query or category filter. Try searching for different keywords like "Docker", "API", or "DNS".
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Show All Tips
          </button>
        </div>
      )}
    </div>
  );
}
