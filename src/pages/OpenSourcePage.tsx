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
          DevVault is 100% open-source, community-driven, and designed for longevity without black-box databases.
        </p>
      </div>

      {/* Why DevVault Exists */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-100">
          Why DevVault Was Built
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Developers constantly bookmark tools across browser folders, Twitter bookmarks, Discord DMs, and Instagram reels. Weeks later, when starting a new project, nobody remembers what the tool was called or whether its pricing was bait-and-switch.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          DevVault solves this by offering a clean, verified catalog where developer tools, APIs, and student perks are indexed with verified free tiers and coordinated into architectural stack blueprints.
        </p>
      </div>

      {/* Scalable Directory Architecture */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs font-mono uppercase tracking-wider">
          <FolderTree className="w-4 h-4" />
          <span>Scalable Project Architecture</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Instead of dumping all data into a monolithic file, DevVault separates datasets into modular domain files under <code className="font-mono text-indigo-300">src/data/</code>, making additions and PR reviews friction-free:
        </p>

        <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 space-y-1 overflow-x-auto leading-relaxed">
          <div>DevVault</div>
          <div>├── 🔎 Explore (AI Tools, GitHub Repos, APIs, Dev Tools, Hosting, Learning)</div>
          <div>│   ├── src/data/ai-tools.ts (20 verified AI models & copilots)</div>
          <div>│   ├── src/data/github-repos.ts (20 open source star repos)</div>
          <div>│   ├── src/data/apis.ts (15 developer APIs)</div>
          <div>│   ├── src/data/dev-tools.ts (10 terminal & database GUIs)</div>
          <div>│   ├── src/data/hosting-cloud.ts (10 cloud & serverless hosts)</div>
          <div>│   └── src/data/learning.ts (7 free CS courses & curricula)</div>
          <div>├── 🎓 Student Pack (/student-pack, integration point: src/data/student-pack.ts)</div>
          <div>├── 💡 Project Ideas (/project-ideas, src/data/project-ideas.ts)</div>
          <div>├── 🧰 Stack Builder (/stack-builder, src/data/stacks.ts)</div>
          <div>├── 🔖 My Vault (/my-vault, localStorage + Collections)</div>
          <div>├── 🤝 Contribute (/contribute)</div>
          <div>└── 🌐 Open Source (/open-source)</div>
        </div>
      </div>

      {/* Data Maintenance & Verification Guarantee */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-semibold text-slate-100">
            Zero Phantom Free Tiers
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every resource listed in DevVault contains an explicit <code className="font-mono text-slate-300">verified</code> and <code className="font-mono text-slate-300">lastVerified</code> timestamp to ensure free allowances and student benefits are real.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
          <Code2 className="w-5 h-5 text-sky-400" />
          <h3 className="text-sm font-semibold text-slate-100">
            MIT License
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All code, UI components, and catalog schemas are published under the MIT License. Feel free to inspect, fork, or build your own internal company dev portal with this foundation.
          </p>
        </div>
      </div>
    </div>
  );
}
