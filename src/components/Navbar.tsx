import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bookmark,
  Share2,
  GitBranch,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  Bot,
  Lightbulb,
  Zap,
  Compass,
} from 'lucide-react';
import { useVault } from '../context/VaultContext';
import { useTheme } from '../context/ThemeContext';

export function Navbar() {
  const location = useLocation();
  const { savedCount } = useVault();
  const { actualTheme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    const [pathUrl, query] = path.split('?');
    if (location.pathname !== pathUrl) return false;

    if (query) {
      return location.search.includes(query);
    }

    // When the link path has no query params (e.g. /explore, /, /my-vault)
    if (path === '/explore') {
      return !location.search || location.search === '?';
    }
    if (path === '/') {
      return !location.search || location.search === '?';
    }
    return true;
  };

  const navLinks = [
    { label: 'Trending Repos', path: '/explore?category=github', icon: GitBranch, highlight: true },
    { label: 'Free AI Tools', path: '/explore?category=ai-tools', icon: Bot },
    { label: 'Tips & Tricks', path: '/explore?tips=true', icon: Lightbulb },
    { label: 'All Resources', path: '/explore', icon: Compass },
    { label: 'My Vault', path: '/my-vault', icon: Bookmark, badge: savedCount },
  ];

  const secondaryLinks = [
    { label: 'Contribute a Repo/Tool', path: '/contribute', icon: Share2 },
    { label: 'Open Source Code', path: '/open-source', icon: GitBranch },
  ];

  return (
    <header
      id="main-navigation"
      className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0b0f17]/90 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus:outline-none"
              aria-label="DevVault Home"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 text-white font-mono font-bold text-base shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <span className="tracking-tighter">&gt;_</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold tracking-tight text-slate-100 group-hover:text-indigo-300 transition-colors">
                    DevVault
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    TRENDING
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                  Trending Repos • Free AI • Dev Tools
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 font-semibold'
                        : item.highlight
                        ? 'text-amber-300/90 hover:text-amber-200 hover:bg-amber-500/10'
                        : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {typeof item.badge === 'number' && item.badge > 0 && (
                      <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-indigo-600 text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick "I saw this on Insta" capture button */}
            <Link
              to="/social-import"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-pink-500/40 bg-gradient-to-r from-pink-500/10 to-indigo-500/10 text-pink-300 hover:from-pink-500/20 hover:to-indigo-500/20 hover:border-pink-400 transition-all shadow-sm"
              title="Save developer repo/tool from Instagram reels, TikTok, or YouTube"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>Saw on Insta?</span>
            </Link>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              aria-label="Toggle light/dark theme"
            >
              {actualTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/98 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-3">
          <div className="space-y-1">
            <span className="px-3 text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Navigation
            </span>
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                    active
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-indigo-400" />
                    <span>{item.label}</span>
                  </div>
                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-1">
            <span className="px-3 text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Community & Capture
            </span>
            <Link
              to="/social-import"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-pink-300 bg-pink-500/10 border border-pink-500/20"
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Saw on Instagram? Quick Import</span>
            </Link>

            {secondaryLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium ${
                    active
                      ? 'bg-indigo-600/20 text-indigo-300'
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
