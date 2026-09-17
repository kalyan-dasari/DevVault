import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Layers,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GitBranch,
  Bookmark,
  Zap,
  Bot,
  Wrench,
  Cloud,
  Terminal,
} from 'lucide-react';
import { categoryMeta, getFeaturedResources } from '../data';
import { ResourceCard } from '../components/ResourceCard';
import { SearchBar } from '../components/SearchBar';

export function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const featured = getFeaturedResources(6);

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
      case 'GraduationCap':
        return GraduationCap;
      default:
        return Compass;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-8 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-b from-indigo-500/10 via-sky-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-medium mb-6 animate-in fade-in duration-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Curated Developer Resource Vault • 75+ Verified Tools</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.15]">
            Stop Googling tools. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Discover, save, and build.
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The developer directory where AI tools, open-source repositories, free APIs, student perks, and architecture stack builders live in one clean, scalable platform.
          </p>

          {/* Search Hero Bar */}
          <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search 75+ tools (e.g. 'FastAPI', 'Postgres', 'Free AI', 'Student perks')..."
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
                  <span>Press Enter or click here to explore results</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Quick value badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Pricing & Free Tiers</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <GitBranch className="w-4 h-4 text-sky-400" />
              <span>Open-Source First</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-indigo-400" />
              <span>Personal Vault Collections</span>
            </div>
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
              Structured datasets organized for fast technical discovery
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      {cat.count} tools
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

      {/* Featured Resources Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
                Featured Highlights
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Hand-picked tools with generous developer tiers and outstanding DX
              </p>
            </div>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>See all resources</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      </section>

      {/* Feature Highlight: Stack Builder Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/40 bg-indigo-500/15 text-indigo-300 text-xs font-mono font-medium">
                <Layers className="w-3.5 h-3.5" />
                <span>Feature: "Build With These"</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight leading-snug">
                Need to build an AI SaaS, Dev Tool, or Hackathon demo?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Skip architecture paralysis. Our Stack Builder recommends coordinated frontend, backend, database, auth, and payment layers, with 1-click links to documentation and free tier setups.
              </p>
              <div className="pt-2">
                <Link
                  to="/stack-builder"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-indigo-600/20 transition-all"
                >
                  <Layers className="w-4 h-4" />
                  <span>Launch Stack Builder</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Architecture Preview Illustration */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-2.5 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Modern AI SaaS Blueprint</span>
                </span>
                <span className="text-[10px] text-emerald-400">VERIFIED STACK</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-800/60 border border-slate-700/50">
                  <span className="text-slate-400 block text-[10px]">FRONTEND</span>
                  <span className="text-indigo-300 font-semibold">React + Tailwind + shadcn</span>
                </div>
                <div className="p-2 rounded bg-slate-800/60 border border-slate-700/50">
                  <span className="text-slate-400 block text-[10px]">BACKEND</span>
                  <span className="text-sky-300 font-semibold">FastAPI (Python async)</span>
                </div>
                <div className="p-2 rounded bg-slate-800/60 border border-slate-700/50">
                  <span className="text-slate-400 block text-[10px]">DATABASE</span>
                  <span className="text-emerald-300 font-semibold">Supabase (PostgreSQL)</span>
                </div>
                <div className="p-2 rounded bg-slate-800/60 border border-slate-700/50">
                  <span className="text-slate-400 block text-[10px]">AUTHENTICATION</span>
                  <span className="text-purple-300 font-semibold">Clerk Auth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media "I saw this" Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Social Capture</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              Saw a cool developer tool on Instagram or YouTube?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Don't lose reel screenshots. Paste the caption or link into DevVault to parse metadata, extract pricing, and bookmark it to your personal vault in seconds.
            </p>
          </div>
          <Link
            to="/social-import"
            className="shrink-0 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs sm:text-sm font-medium transition-colors"
          >
            Try Social Quick-Save
          </Link>
        </div>
      </section>
    </div>
  );
}
