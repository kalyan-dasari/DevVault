import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  Sparkles,
  GitBranch,
  ArrowUpRight,
  Star,
  Flame,
  Terminal,
  Copy,
  Check,
  Lightbulb,
} from 'lucide-react';
import { Resource } from '../types';
import { PricingBadge } from './PricingBadge';
import { VerificationBadge } from './VerificationBadge';
import { SaveButton } from './SaveButton';
import { CollectionModal } from './CollectionModal';
import { analytics } from '../services/analytics';
import { useToast } from '../context/ToastContext';

interface ResourceCardProps {
  key?: React.Key;
  resource: Resource;
  className?: string;
}

export function ResourceCard({ resource, className = '' }: ResourceCardProps) {
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const { toast } = useToast();

  const initial = resource.name.charAt(0).toUpperCase();

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    analytics.track('external_link_clicked', {
      resourceId: resource.id,
      name: resource.name,
      url: resource.websiteUrl,
    });
  };

  const handleCopyCommand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!resource.quickCommand) return;
    navigator.clipboard.writeText(resource.quickCommand);
    setCopiedCommand(true);
    toast('Command copied to clipboard!', 'success');
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  return (
    <>
      <div
        id={`resource-card-${resource.slug}`}
        className={`group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-indigo-500/5 dark:border-slate-800/80 dark:bg-[#101522]/80 dark:hover:border-slate-700 ${className}`}
      >
        <div>
          {/* Top Row: Monogram/Icon + Title + Actions */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <Link
              to={`/resource/${resource.slug}`}
              className="flex items-center gap-3 min-w-0 flex-1 group-hover:text-indigo-300 transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-800 font-mono font-bold text-slate-200 shadow-inner group-hover:border-indigo-500/50 group-hover:bg-indigo-950/40 group-hover:text-indigo-300 transition-colors">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-base font-semibold text-slate-100 truncate tracking-tight group-hover:text-indigo-200 transition-colors">
                    {resource.name}
                  </h3>
                  {resource.stars && (
                    <span
                      title="GitHub Stars"
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    >
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{resource.stars}</span>
                    </span>
                  )}
                  {resource.trendingOnSocial && (
                    <span
                      title={resource.socialHighlights || 'Trending on Instagram/Social Media'}
                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-500/15 text-pink-300 border border-pink-500/30 animate-pulse"
                    >
                      <Flame className="w-3 h-3 text-pink-400" />
                      <span>VIRAL</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-400 capitalize">
                    {resource.subcategory || resource.category.replace('-', ' ')}
                  </span>
                  <span className="text-slate-600 text-xs">•</span>
                  <VerificationBadge
                    verified={resource.verified}
                    lastVerified={resource.lastVerified}
                    compact
                  />
                </div>
              </div>
            </Link>

            {/* Bookmark Save */}
            <div className="shrink-0 flex items-center gap-1.5">
              <SaveButton
                resourceId={resource.id}
                resourceName={resource.name}
                onOpenCollectionModal={() => setCollectionModalOpen(true)}
              />
            </div>
          </div>

          {/* Social Viral Highlight Callout */}
          {resource.socialHighlights && (
            <div className="mb-3 px-2.5 py-1.5 rounded-lg border border-pink-500/20 bg-pink-500/5 text-[11px] text-pink-200 flex items-start gap-1.5 leading-snug">
              <Flame className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
              <span className="line-clamp-2">{resource.socialHighlights}</span>
            </div>
          )}

          {/* Short Description */}
          <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed mb-3">
            {resource.shortDescription}
          </p>

          {/* Quick Command Snippet (if available) */}
          {resource.quickCommand && (
            <div className="mb-3 flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950/80 font-mono text-[11px] text-indigo-300">
              <div className="flex items-center gap-1.5 truncate mr-2">
                <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate">{resource.quickCommand}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyCommand}
                title="Copy command"
                className="shrink-0 p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copiedCommand ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          )}

          {/* Pro Tips accordion toggle */}
          {resource.proTips && resource.proTips.length > 0 && (
            <div className="mb-3">
              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400/90 hover:text-amber-300 transition-colors"
              >
                <Lightbulb className="w-3 h-3 text-amber-400" />
                <span>{showTips ? 'Hide Pro Tip' : `💡 Pro Tip (${resource.proTips.length})`}</span>
              </button>
              {showTips && (
                <div className="mt-1.5 p-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5 text-xs text-amber-200/90 space-y-1 font-sans leading-relaxed animate-in fade-in">
                  {resource.proTips.slice(0, 2).map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 text-xs font-bold">•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Section: Tags + Pricing + Actions */}
        <div>
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <PricingBadge type={resource.pricingType} />

            {resource.openSource && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/25">
                <GitBranch className="w-3 h-3" />
                <span>OSS</span>
              </span>
            )}

            {resource.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-400 bg-slate-800/80 border border-slate-700/50"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
            <Link
              to={`/resource/${resource.slug}`}
              className="inline-flex items-center gap-1 font-medium text-slate-300 hover:text-indigo-400 transition-colors"
            >
              <span>View Details & Tips</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {resource.githubUrl ? (
              <a
                href={resource.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleExternalClick}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-100 transition-colors py-1 px-2 rounded-md hover:bg-slate-800"
              >
                <GitBranch className="w-3 h-3 text-sky-400" />
                <span>GitHub</span>
              </a>
            ) : (
              <a
                href={resource.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleExternalClick}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-100 transition-colors py-1 px-2 rounded-md hover:bg-slate-800"
              >
                <span>Official Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {collectionModalOpen && (
        <CollectionModal
          resourceId={resource.id}
          resourceName={resource.name}
          onClose={() => setCollectionModalOpen(false)}
        />
      )}
    </>
  );
}
