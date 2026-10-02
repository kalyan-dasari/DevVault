import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Terminal, Copy, Check, ExternalLink, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { DeveloperTip } from '../types';
import { useToast } from '../context/ToastContext';

interface TipCardProps {
  key?: React.Key;
  tip: DeveloperTip;
  className?: string;
}

export function TipCard({ tip }: TipCardProps) {
  const { showToast } = useToast();
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedTip, setCopiedTip] = useState(false);

  const handleCopyCmd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!tip.quickCommand) return;
    navigator.clipboard.writeText(tip.quickCommand);
    setCopiedCmd(true);
    showToast('Command copied to clipboard!', 'success');
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleCopyTip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const textToCopy = `💡 ${tip.resourceName} Pro-Tip:\n${tip.tip}${tip.quickCommand ? `\n\nRun command:\n${tip.quickCommand}` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedTip(true);
    showToast('Tip copied to clipboard!', 'success');
    setTimeout(() => setCopiedTip(false), 2000);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/60 p-5 sm:p-6 shadow-md hover:shadow-xl hover:border-amber-500/40 hover:bg-slate-900/90 transition-all duration-300">
      {/* Glow subtle accent */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 pointer-events-none transition-all duration-500" />

      <div>
        {/* Card Header: Source Resource & Badge */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <Link
            to={`/resource/${tip.resourceSlug}`}
            className="flex items-center gap-2 group/link"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover/link:bg-amber-500/20 transition-colors">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 group-hover/link:text-amber-300 transition-colors flex items-center gap-1.5">
                <span>{tip.resourceName}</span>
                <ExternalLink className="w-3 h-3 opacity-40 group-hover/link:opacity-100 text-amber-400 transition-opacity" />
              </h3>
            </div>
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            {tip.stars && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {tip.stars}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-800 text-slate-400 border border-slate-700">
              {tip.resourceCategory}
            </span>
          </div>
        </div>

        {/* Tip Body Text */}
        <div className="mt-4 space-y-3">
          <p className="text-sm text-slate-200 leading-relaxed font-normal">
            {tip.tip}
          </p>

          {tip.whyItMatters && (
            <p className="text-xs text-slate-400/90 italic border-l-2 border-amber-500/30 pl-2.5 py-0.5">
              "{tip.whyItMatters}"
            </p>
          )}
        </div>

        {/* 1-Click Launch Command Terminal Block */}
        {tip.quickCommand && (
          <div className="mt-4 relative group/cmd">
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pr-2">
                <span className="text-slate-500 select-none">$</span>
                <span className="truncate">{tip.quickCommand}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyCmd}
                className="shrink-0 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                title="Copy Command"
                aria-label="Copy Command"
              >
                {copiedCmd ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Tags & Quick Actions */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-hidden max-h-6">
          {tip.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-400 bg-slate-800/50 border border-slate-800"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyTip}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Copy Tip"
          >
            {copiedTip ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-[11px] text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="text-[11px]">Copy Tip</span>
              </>
            )}
          </button>

          <Link
            to={`/resource/${tip.resourceSlug}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
