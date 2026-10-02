import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, GitBranch, Bot, Wand2, ArrowRight, Flame, FileCode, Terminal } from 'lucide-react';
import { allResources, getTrendingSocialRepos, getFeaturedPromptSkills, getAllPromptSkills } from '../data';
import { ResourceCard } from '../components/ResourceCard';
import { PromptSkillCard } from '../components/PromptSkillCard';

export function HomePage() {
  const trendingRepos = getTrendingSocialRepos();
  const featuredSkills = getFeaturedPromptSkills(6);
  const totalSkills = getAllPromptSkills().length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-5 max-w-3xl mx-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-500/10 blur-3xl -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Curated Developer Vault • 100% Free &amp; Open Source</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-100 leading-tight">
          Trending GitHub Repos, AI Tools &amp;{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
            Prompts &amp; Skills
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Discover viral open-source repositories, free local-first AI models, ChatGPT &amp; Claude master prompts, production <code>.cursorrules</code>, and emergency Git cheat skills.
        </p>

        {/* Quick Nav Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/explore?category=github"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <GitBranch className="w-4 h-4 text-sky-400" />
            <span>Trending Repos</span>
          </Link>

          <Link
            to="/explore?category=ai-tools"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>Free AI Tools</span>
          </Link>

          <Link
            to="/tips"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 transition-colors"
          >
            <Wand2 className="w-4 h-4 text-indigo-400" />
            <span>AI Prompts &amp; Skills</span>
          </Link>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Featured / Trending Repos Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-pink-400" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
              Featured &amp; Trending Repositories
            </h2>
          </div>
          <Link
            to="/explore?category=github"
            className="text-xs font-medium text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 transition-colors"
          >
            <span>View all repos</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {trendingRepos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {trendingRepos.map((repo) => (
              <ResourceCard key={repo.id} resource={repo} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-sm border border-dashed border-slate-800 rounded-xl">
            No trending repos loaded yet.
          </div>
        )}
      </div>

      {/* Distinct AI Prompts, Cursor Rules & Cheat Skills Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
                <span>AI Prompts, .cursorrules &amp; Cheat Skills</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  Ready to Copy
                </span>
              </h2>
            </div>
          </div>
          <Link
            to="/tips"
            className="text-xs font-medium text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 transition-colors"
          >
            <span>Browse all {totalSkills} prompts &amp; skills</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {featuredSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSkills.map((item) => (
              <PromptSkillCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-sm border border-dashed border-slate-800 rounded-xl">
            No prompts loaded yet.
          </div>
        )}
      </div>
    </div>
  );
}


