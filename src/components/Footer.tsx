import React from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Heart, ShieldCheck, Sparkles, ExternalLink, Bot, Zap, Wrench, Cloud } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60 dark:bg-[#070a10] text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 font-mono font-bold text-white text-xs">
                &gt;_
              </div>
              <span className="text-base font-bold text-slate-200">DevVault</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Curated vault of trending GitHub repositories, open-source AI tools & models, free developer APIs, utilities, and actionable developer tips & tricks.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 pt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Repositories & Free AI Models</span>
            </div>
          </div>

          {/* Col 2: High-Priority Categories */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono mb-3">
              Core Catalog
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-sky-400" />
                  <span>Trending GitHub Repos</span>
                </Link>
              </li>
              <li>
                <Link to="/explore?category=ai-tools" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Free & Open Source AI</span>
                </Link>
              </li>
              <li>
                <Link to="/explore?category=apis" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Free Developer APIs</span>
                </Link>
              </li>
              <li>
                <Link to="/explore?category=developer-tools" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Developer Utilities</span>
                </Link>
              </li>
              <li>
                <Link to="/explore?category=hosting" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Cloud className="w-3.5 h-3.5 text-purple-400" />
                  <span>Free & Freemium Hosting</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Discovery & Capture */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono mb-3">
              Discovery & Social
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/explore?trending=true" className="hover:text-indigo-400 transition-colors">
                  🔥 Viral on Instagram / Social
                </Link>
              </li>
              <li>
                <Link to="/explore?tips=true" className="hover:text-indigo-400 transition-colors">
                  💡 Developer Tips & Tricks
                </Link>
              </li>
              <li>
                <Link to="/social-import" className="text-pink-400 hover:text-pink-300 transition-colors font-medium">
                  ✨ "Saw this on Insta" Quick Save
                </Link>
              </li>
              <li>
                <Link to="/my-vault" className="hover:text-indigo-400 transition-colors">
                  🔖 My Vault & Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Transparency */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono mb-3">
              Transparency
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contribute" className="hover:text-indigo-400 transition-colors">
                  Submit a Trending Repo or Tool
                </Link>
              </li>
              <li>
                <Link to="/open-source" className="hover:text-indigo-400 transition-colors">
                  Open Source Architecture
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-400 transition-colors"
                >
                  <span>GitHub Community</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
            <div className="mt-4 p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-[11px] text-slate-400 leading-relaxed">
              <span className="font-medium text-slate-300">Verified Free Guarantee:</span> We verify free models, open-source licenses, and zero-cost quotas before indexing.
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} DevVault. Free and Open-Source software for developers.</p>
          <p className="text-slate-500 text-center sm:text-right">
            Curated by developers for developers. All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
