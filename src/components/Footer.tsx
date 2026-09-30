import React from 'react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60 dark:bg-[#070a10] text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" showTagline={false} />
          <p className="text-slate-500 text-xs text-center sm:text-right">
            © {new Date().getFullYear()} DevVault • Built with Vite, React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
