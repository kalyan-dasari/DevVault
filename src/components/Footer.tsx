import React from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Heart, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

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
              Curated developer tools, open-source repositories, APIs, student benefits, and architecture stack builders.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 pt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>75+ Verified Resources Indexed</span>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono mb-3">
              Explore Catalog
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/explore?category=ai-tools" className="hover:text-indigo-400 transition-colors">
                  AI Tools & Copilots
                </Link>
              </li>
              <li>
                <Link to="/explore?category=github" className="hover:text-indigo-400 transition-colors">
                  GitHub Repositories
                </Link>
              </li>
              <li>
                <Link to="/explore?category=apis" className="hover:text-indigo-400 transition-colors">
                  Developer APIs
                </Link>
              </li>
              <li>
                <Link to="/explore?category=developer-tools" className="hover:text-indigo-400 transition-colors">
                  Developer Utilities
                </Link>
              </li>
              <li>
                <Link to="/explore?category=hosting" className="hover:text-indigo-400 transition-colors">
                  Hosting & Cloud
                </Link>
              </li>
              <li>
                <Link to="/explore?category=courses" className="hover:text-indigo-400 transition-colors">
                  Courses & Textbooks
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Build & Save */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono mb-3">
              Build & Discover
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/stack-builder" className="hover:text-indigo-400 transition-colors">
                  Stack Builder ("Build With These")
                </Link>
              </li>
              <li>
                <Link to="/student-pack" className="hover:text-indigo-400 transition-colors">
                  Student Developer Pack Perks
                </Link>
              </li>
              <li>
                <Link to="/project-ideas" className="hover:text-indigo-400 transition-colors">
                  1st to Final Year Project Ideas
                </Link>
              </li>
              <li>
                <Link to="/social-import" className="hover:text-indigo-400 transition-colors">
                  "I saw this on Instagram" Capture
                </Link>
              </li>
              <li>
                <Link to="/my-vault" className="hover:text-indigo-400 transition-colors">
                  My Vault & Collections
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
                  Contribute a Resource
                </Link>
              </li>
              <li>
                <Link to="/open-source" className="hover:text-indigo-400 transition-colors">
                  Open Source Guidelines
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-400 transition-colors"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
            <div className="mt-4 p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-[11px] text-slate-400 leading-relaxed">
              <span className="font-medium text-slate-300">Verification Guarantee:</span> All listed free tiers and benefits are re-checked periodically against official vendor terms.
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} DevVault. Free and Open-Source software for developers.</p>
          <p className="text-slate-500 text-center sm:text-right">
            Not affiliated with GitHub, JetBrains, or listed companies. All product trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
