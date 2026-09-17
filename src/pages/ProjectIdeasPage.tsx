import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  Clock,
  Code2,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { projectIdeas } from '../data/project-ideas';
import { getResourceBySlug } from '../data';
import { ProjectDifficulty } from '../types';

export function ProjectIdeasPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const difficulties: { label: string; value: ProjectDifficulty | 'all' }[] = [
    { label: 'All Levels', value: 'all' },
    { label: '1st Year', value: '1st Year' },
    { label: '2nd Year', value: '2nd Year' },
    { label: '3rd Year', value: '3rd Year' },
    { label: 'Final Year / Capstone', value: 'Final Year' },
  ];

  const categories = [
    'all',
    'AI/ML',
    'Web Development',
    'Developer Tools',
    'Startup',
    'Hackathon',
    'Open Source',
  ];

  const filteredIdeas = useMemo(() => {
    return projectIdeas.filter((idea) => {
      const matchDiff = selectedDifficulty === 'all' || idea.difficulty === selectedDifficulty;
      const matchCat = selectedCategory === 'all' || idea.category === selectedCategory;
      return matchDiff && matchCat;
    });
  }, [selectedDifficulty, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Curated Project Ideas
          </h1>
          <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            1st Year to Final Year
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Modern, realistic software project concepts linked directly to developer tools and architectures in DevVault.
        </p>
      </div>

      {/* Difficulty & Category Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Difficulty Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {difficulties.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setSelectedDifficulty(d.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedDifficulty === d.value
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCategory(c)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono capitalize whitespace-nowrap transition-all ${
                selectedCategory === c
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800/80'
              }`}
            >
              {c === 'all' ? 'All Domains' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredIdeas.map((idea) => (
          <div
            key={idea.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 hover:bg-slate-900/90 transition-all shadow-sm space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {idea.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {idea.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 leading-snug pt-1">
                    {idea.title}
                  </h3>
                </div>

                {idea.estimatedHours && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-1 rounded border border-slate-700/60 shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>{idea.estimatedHours}</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {idea.description}
              </p>

              {/* Technologies */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  Suggested Tech Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {idea.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-mono rounded bg-slate-800 text-indigo-300 border border-slate-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features to implement */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  Core Features To Build
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {idea.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What you will learn */}
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1 text-xs">
                <span className="font-mono text-slate-400 uppercase tracking-wider text-[10px] block">
                  Core Engineering Skills Acquired
                </span>
                <ul className="space-y-1 text-slate-300">
                  {idea.whatYouLearn.map((skill, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-indigo-400">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suggested DevVault Resources */}
            {idea.suggestedResourceSlugs && idea.suggestedResourceSlugs.length > 0 && (
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-400 font-mono text-[11px]">
                  Matched DevVault Tools:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {idea.suggestedResourceSlugs.map((slug) => {
                    const res = getResourceBySlug(slug);
                    return (
                      <Link
                        key={slug}
                        to={`/resource/${slug}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
                      >
                        <span>{res?.name || slug}</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
