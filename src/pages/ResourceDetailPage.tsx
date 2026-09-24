import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  GitBranch,
  FileText,
  Share2,
  Bookmark,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Terminal,
  Star,
  Flame,
  Lightbulb,
} from 'lucide-react';
import { getResourceBySlug, getRelatedResources } from '../data';
import { PricingBadge } from '../components/PricingBadge';
import { VerificationBadge } from '../components/VerificationBadge';
import { SaveButton } from '../components/SaveButton';
import { CollectionModal } from '../components/CollectionModal';
import { ResourceCard } from '../components/ResourceCard';
import { useVault } from '../context/VaultContext';
import { useToast } from '../context/ToastContext';
import { analytics } from '../services/analytics';

export function ResourceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { customResources } = useVault();
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  // Search in static resources, or in user's custom captured resources
  const resource =
    getResourceBySlug(slug || '') ||
    customResources.find((r) => r.slug.toLowerCase() === (slug || '').toLowerCase());

  useEffect(() => {
    if (resource) {
      analytics.track('resource_view', {
        resourceId: resource.id,
        name: resource.name,
        category: resource.category,
      });
      window.scrollTo(0, 0);
    }
  }, [resource]);

  if (!resource) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">Resource not found</h2>
        <p className="text-slate-400 text-sm">
          The resource "{slug}" may have been moved or removed from the vault.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Explore</span>
        </Link>
      </div>
    );
  }

  const related = getRelatedResources(resource, 3);

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    toast('Link copied to clipboard', 'info');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCommand = () => {
    if (!resource.quickCommand) return;
    navigator.clipboard.writeText(resource.quickCommand);
    setCopiedCommand(true);
    toast('Command copied to clipboard!', 'success');
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to previous</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyShareLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800 transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          <SaveButton
            resourceId={resource.id}
            resourceName={resource.name}
            variant="button"
            onOpenCollectionModal={() => setCollectionModalOpen(true)}
          />
        </div>
      </div>

      {/* Main Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-800 font-mono font-bold text-2xl text-slate-100 shadow-md">
              {resource.name.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                  {resource.name}
                </h1>
                {resource.stars && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{resource.stars}</span>
                  </span>
                )}
                {resource.trendingOnSocial && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-pink-500/15 text-pink-300 border border-pink-500/30 animate-pulse">
                    <Flame className="w-3.5 h-3.5 text-pink-400" />
                    <span>Viral on Social</span>
                  </span>
                )}
                {resource.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>Featured</span>
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                {resource.shortDescription}
              </p>
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <PricingBadge type={resource.pricingType} />
                <VerificationBadge
                  verified={resource.verified}
                  lastVerified={resource.lastVerified}
                />
                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-400 bg-slate-800 border border-slate-700/50 capitalize">
                  {resource.subcategory || resource.category.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex sm:flex-col items-center gap-2 shrink-0">
            <a
              href={resource.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-indigo-600/20 transition-colors"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {resource.githubUrl && (
              <a
                href={resource.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5 text-sky-400" />
                <span>GitHub Repository</span>
              </a>
            )}

            {resource.documentationUrl && (
              <a
                href={resource.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Documentation</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Social Viral Highlight Banner (if applicable) */}
      {resource.socialHighlights && (
        <div className="rounded-xl border border-pink-500/30 bg-pink-950/20 p-4 sm:p-5 flex items-start gap-3">
          <Flame className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-xs font-mono uppercase tracking-wider text-pink-300 font-bold">
              Why This Is Trending on Instagram & Social Media
            </h3>
            <p className="text-sm text-pink-100/90 leading-relaxed">
              {resource.socialHighlights}
            </p>
          </div>
        </div>
      )}

      {/* Quick Setup Command Bar */}
      {resource.quickCommand && (
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs shadow-inner">
          <div className="flex items-center gap-2 text-indigo-300 overflow-x-auto no-scrollbar">
            <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-slate-500">$</span>
            <span className="text-slate-100 font-semibold">{resource.quickCommand}</span>
          </div>
          <button
            type="button"
            onClick={handleCopyCommand}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-sans font-medium transition-colors shrink-0"
          >
            {copiedCommand ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCommand ? 'Copied' : 'Copy Command'}</span>
          </button>
        </div>
      )}

      {/* Grid of Details: Left Main, Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Full Description, Pro Tips, Key Features, Use Cases */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pro Tips & Tricks Section */}
          {resource.proTips && resource.proTips.length > 0 && (
            <div className="p-5 sm:p-6 rounded-2xl border border-amber-500/30 bg-amber-950/15 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-mono text-xs uppercase tracking-wider font-bold">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Actionable Developer Pro Tips & Tricks</span>
              </div>
              <ul className="space-y-2.5 pt-1">
                {resource.proTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Why Developers Love It */}
          {resource.whyDevelopersLoveIt && (
            <div className="space-y-2">
              <h2 className="text-base font-semibold text-slate-200 uppercase tracking-wider font-mono">
                Why Thousands of Developers Use This
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                {resource.whyDevelopersLoveIt}
              </p>
            </div>
          )}

          {/* Detailed Overview */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Overview & Architecture
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {resource.longDescription}
            </p>
          </div>

          {/* Key Features */}
          {resource.features && resource.features.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-slate-200 uppercase tracking-wider font-mono">
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {resource.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-800 bg-slate-900/40 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Best For / Use Cases */}
          {resource.useCases && resource.useCases.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-slate-200 uppercase tracking-wider font-mono">
                Best Suited For
              </h2>
              <ul className="space-y-2">
                {resource.useCases.map((uc, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-300"
                  >
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Verification Notes */}
          {resource.verificationNotes && (
            <div className="p-4 rounded-xl border border-indigo-500/25 bg-indigo-950/20 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-indigo-300 font-mono text-[11px]">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>VERIFICATION AUDIT LOG</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                {resource.verificationNotes}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Pricing Breakdown & Tech Stack */}
        <div className="space-y-6">
          {/* Free Tier Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Free Tier & Open Source Model
            </h3>
            <div className="text-xs text-slate-300 leading-relaxed bg-slate-800/50 p-3 rounded-lg border border-slate-700/60 font-mono">
              {resource.freeTier || resource.pricingDescription || '100% Free Open Source Software'}
            </div>
          </div>

          {/* Tech Stack & Tags */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Technologies & Tags
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {resource.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                >
                  {t}
                </span>
              ))}
              {resource.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-xs font-mono rounded-md bg-slate-800 text-slate-400 border border-slate-700/60"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Resources */}
      {related.length > 0 && (
        <div className="pt-8 border-t border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-100">
            Related Developer Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        </div>
      )}

      {collectionModalOpen && (
        <CollectionModal
          resourceId={resource.id}
          resourceName={resource.name}
          onClose={() => setCollectionModalOpen(false)}
        />
      )}
    </div>
  );
}
