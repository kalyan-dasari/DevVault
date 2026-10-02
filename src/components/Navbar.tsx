import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  GitBranch,
  Bot,
  Wand2,
  Bookmark,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import { useVault } from '../context/VaultContext';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';

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
    { label: 'Prompts & Skills', path: '/tips', icon: Wand2 },
    { label: 'My Vault', path: '/my-vault', icon: Bookmark, badge: savedCount },
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
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 ml-2">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 font-semibold shadow-sm'
                        : item.highlight
                        ? 'text-amber-300/90 hover:text-amber-200 hover:bg-amber-500/10 border border-transparent'
                        : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
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
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
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
              className="md:hidden p-2 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800"
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
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
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
        </div>
      )}
    </header>
  );
}
