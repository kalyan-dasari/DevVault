import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GitBranch,
  Bookmark,
  Zap,
  Bot,
  Wrench,
  Cloud,
  Star,
  Flame,
  Lightbulb,
  Terminal,
} from 'lucide-react';
import { categoryMeta, getTrendingSocialRepos, allResources } from '../data';
import { ResourceCard } from '../components/ResourceCard';
import { SearchBar } from '../components/SearchBar';

export function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Trending social repos
  const trendingRepos = getTrendingSocialRepos().slice(0, 6);

  // Top free & open-source AI tools
  const topAiTools = allResources.filter((r) => r.category === 'ai-tools').slice(0, 4);

  // Resources with pro tips
  const tipsResources = allResources.filter((r) => r.proTips && r.proTips.length > 0).slice(0, 3);

  const handleSearchSubmit = (query: string) => {
    navigate(`/explore?q=${encodeURIComponent(query)}`);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return Bot;
      case 'GitBranch':
        return GitBranch;
      case 'Zap':
        return Zap;
      case 'Wrench':
        return Wrench;
      case 'Cloud':
        return Cloud;
      default:
        return Compass;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-8 overflow-hidden">
        {/* Glowing backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-indigo-500/15 via-pink-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center px-4">
          {/* Trending Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/30 bg-gradient-to-r from-pink-500/10 via-indigo-500/10 to-sky-500/10 text-pink-300 text-xs font-mono font-medium mb-6 animate-in fade-in duration-300 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span>Trending on Instagram & Social Media • Verified Free & OSS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.15]">
            The Developer Vault for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-pink-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
              Trending Repos & Free AI Tools
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stop losing tools you saw in Instagram reels and tech feeds. Discover viral open-source repositories with real star counts, free AI models, developer APIs, and battle-tested pro tips & tricks.
          </p>

          {/* Search Hero Bar */}
          <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search trending repos, stars, tools (e.g. 'Ollama', 'Supabase', 'Coolify', 'DeepSeek', 'FastAPI')..."
              showSuggestions={true}
              onSelectSuggestion={handleSearchSubmit}
            />
            {searchQuery && (
              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={() => handleSearchSubmit(searchQuery)}
                  className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  <span>Press Enter to explore all matching tools</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Quick Value Metrics */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Real Star Counts & Highlights</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>Free & Local AI Models</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              <span>Developer Tips & Tricks</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOP PRIORITY: Trending on Instagram & Social Media */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
                Trending on Instagram & Social
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Viral open-source repositories with massive developer adoption and high stars
              </p>
            </div>
          </div>
          <Link
            to="/explore?category=github&trending=true"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors"
          >
            <span>View all trending repos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trendingRepos.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      </section>

      {/* TOP PRIORITY 2: Free & Open-Source AI Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
                Free & Open Source AI Models & Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Run local reasoning models (DeepSeek, Ollama, vLLM) with zero API bills
              </p>
            </div>
          </div>
          <Link
            to="/explore?category=ai-tools"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>View all AI tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {topAiTools.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      </section>

      {/* Pro Tips & Tricks Highlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-sm">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                  Developer Tips & Tricks Spotlight
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Actionable pro tips from open-source maintainers and viral engineering tutorials
                </p>
              </div>
            </div>
            <Link
              to="/explore?tips=true"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors shrink-0"
            >
              <span>Explore All Tips</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {tipsResources.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-100">{res.name}</span>
                    {res.stars && (
                      <span className="text-[11px] font-mono text-amber-400 font-semibold">
                        {res.stars}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 space-y-1.5 text-xs text-slate-300">
                    {res.proTips?.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span className="leading-relaxed">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {res.quickCommand && (
                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center gap-1 text-[11px] font-mono text-indigo-300 bg-slate-950/60 px-2 py-1 rounded">
                    <Terminal className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{res.quickCommand}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Explore by Domain
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Structured datasets curated for quick discovery and building
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryMeta.map((cat) => {
            const Icon = getCategoryIcon(cat.iconName);
            return (
              <Link
                key={cat.id}
                to={`/explore?category=${cat.id}`}
                className="group flex flex-col justify-between p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/90 hover:border-slate-700 transition-all duration-150 hover:-translate-y-0.5 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-800 text-indigo-400 group-hover:text-indigo-300 group-hover:border-indigo-500/40 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono text-slate-400 bg-slate-800/80 border border-slate-700/50">
                      {cat.count} indexed
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-indigo-300 transition-colors">
                  <span>Browse Category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Social Media "I saw this" Capture Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-pink-500/30 bg-gradient-to-r from-pink-950/20 via-slate-900 to-indigo-950/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-pink-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Social Reel Parser</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              Saw a trending GitHub repo on Instagram or YouTube?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Don't lose reel screenshots. Paste the caption or link into DevVault to automatically extract star counts, repo links, killer features, and save it to your personal vault in seconds.
            </p>
          </div>
          <Link
            to="/social-import"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-pink-600/20 transition-all"
          >
            Try Instagram Quick-Save
          </Link>
        </div>
      </section>
    </div>
  );
}
