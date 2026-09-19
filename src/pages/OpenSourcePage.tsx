import React from 'react';
import {
  GitBranch,
  ShieldCheck,
  FolderTree,
  Terminal,
  Heart,
  ExternalLink,
  Code2,
  FileText,
  Star,
  Bot,
  Lightbulb,
} from 'lucide-react';

export function OpenSourcePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
            <GitBranch className="w-4 h-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Open Source & Architecture
          </h1>
          <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            MIT Licensed
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          DevVault is 100% open-source, community-driven, and designed for developers to bookmark viral repositories, free AI tools, and developer tricks.
        </p>
      </div>

      {/* Why DevVault Exists */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-100">
          Why DevVault Was Built
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Developers constantly see incredible open-source tools and AI models on Instagram reels, TikTok, Twitter/X, and YouTube. Days later, when starting a new project, nobody remembers the repository name, how many stars it had, or how to run it locally.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          DevVault organizes these trending repositories and free AI models into a clean, verified catalog complete with real GitHub star counts, verified free tiers, one-liner launch commands, and actionable developer tips & tricks.
        </p>
      </div>

      {/* Modular Catalog Architecture */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs font-mono uppercase tracking-wider">
          <FolderTree className="w-4 h-4" />
          <span>Modular Catalog Architecture</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          DevVault separates data into clean modular domain files under <code className="font-mono text-indigo-300">src/data/</code>, making community contributions and PR reviews friction-free:
        </p>

        <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 space-y-1 overflow-x-auto leading-relaxed">
          <div>DevVault</div>
          <div>├── ⭐ Trending GitHub Repositories (src/data/github-repos.ts)</div>
          <div>├── 🤖 Free & Open Source AI Tools (src/data/ai-tools.ts - Ollama, DeepSeek, vLLM)</div>
          <div>├── ⚡ Free Developer APIs (src/data/apis.ts)</div>
          <div>├── 🛠️ Free Developer Utilities (src/data/dev-tools.ts)</div>
          <div>├── ☁️ Free & Freemium Hosting (src/data/hosting-cloud.ts - Coolify, Vercel, Supabase)</div>
          <div>├── 💡 Developer Tips & Tricks (Embedded in resources with 1-click commands)</div>
          <div>├── 📱 Social Reel Parser (/social-import)</div>
          <div>└── 🔖 Personal Vault (/my-vault, localStorage + Collections)</div>
        </div>
      </div>

      {/* Verification Guarantee */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-semibold text-slate-100">
            Zero Phantom Free Tiers
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every resource listed in DevVault contains explicit verification timestamps to ensure free allowances and open-source licenses are genuine.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
          <Code2 className="w-5 h-5 text-sky-400" />
          <h3 className="text-sm font-semibold text-slate-100">
            MIT License
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All code, UI components, and catalog schemas are published under the MIT License. Fork, self-host, or build your own internal developer portal freely.
          </p>
        </div>
      </div>
    </div>
  );
}
