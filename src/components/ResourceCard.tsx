import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles, GraduationCap, GitBranch, ArrowUpRight } from 'lucide-react';
import { Resource } from '../types';
import { PricingBadge } from './PricingBadge';
import { VerificationBadge } from './VerificationBadge';
import { SaveButton } from './SaveButton';
import { CollectionModal } from './CollectionModal';
import { analytics } from '../services/analytics';

interface ResourceCardProps {
  key?: React.Key;
  resource: Resource;
  className?: string;
}

export function ResourceCard({ resource, className = '' }: ResourceCardProps) {
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);

  // Generate initial monogram or icon background
  const initial = resource.name.charAt(0).toUpperCase();

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    analytics.track('external_link_clicked', {
      resourceId: resource.id,
      name: resource.name,
      url: resource.websiteUrl,
    });
  };

  return (
    <>
      <div
        id={`resource-card-${resource.slug}`}
        className={`group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-indigo-500/5 dark:border-slate-800/80 dark:bg-[#101522]/80 dark:hover:border-slate-700 ${className}`}
      >
        <div>
          {/* Top Row: Icon + Name + Actions */}
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
                  {resource.featured && (
                    <span
                      title="Featured in DevVault"
                      className="inline-flex items-center gap-0.5 text-amber-400"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
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

            {/* Quick Bookmark Save */}
            <div className="shrink-0 flex items-center gap-1.5">
              <SaveButton
                resourceId={resource.id}
                resourceName={resource.name}
                onOpenCollectionModal={() => setCollectionModalOpen(true)}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4">
            {resource.shortDescription}
          </p>
        </div>

        {/* Bottom Section: Tags + Pricing + Visit */}
        <div>
          {/* Indicator Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <PricingBadge type={resource.pricingType} />

            {resource.openSource && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/25">
                <GitBranch className="w-3 h-3" />
                <span>OSS</span>
              </span>
            )}

            {Boolean(resource.studentBenefit) && (
              <span
                title={resource.studentBenefit}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border bg-violet-500/10 text-violet-300 border-violet-500/25"
              >
                <GraduationCap className="w-3 h-3" />
                <span>Student Perk</span>
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
              <span>View Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

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
