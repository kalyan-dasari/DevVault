import React, { useState } from 'react';
import {
  Share2,
  CheckCircle2,
  AlertCircle,
  GitPullRequest,
  FileCode,
  Send,
  Sparkles,
  ShieldCheck,
  Check,
  Star,
  Lightbulb,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { ResourceCategory, PricingType } from '../types';

export function ContributePage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [stars, setStars] = useState('');
  const [category, setCategory] = useState<ResourceCategory>('github');
  const [pricingType, setPricingType] = useState<PricingType>('Open Source');
  const [shortDesc, setShortDesc] = useState('');
  const [proTip, setProTip] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !websiteUrl.trim() || !shortDesc.trim()) {
      toast('Please complete all required fields.', 'error');
      return;
    }

    setSubmitted(true);
    toast('Repository / tool submission received for community review!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
            <Share2 className="w-4 h-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Contribute a Trending Repo or Tool
          </h1>
          <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            Community Driven
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Found a viral GitHub repo or free AI tool on Instagram, TikTok, or Reddit? Submit it here to feature in the vault.
        </p>
      </div>

      {/* Quality Guidelines Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* What gets accepted */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs font-mono uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>What Gets Accepted</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Trending open-source GitHub repositories with active communities.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Free and open-weights AI models, local runners, and developer gateways.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Generous free-tier developer APIs and CLI utilities with real pro tips.</span>
            </li>
          </ul>
        </div>

        {/* What gets rejected */}
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/15 p-5 space-y-3">
          <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs font-mono uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>What Gets Rejected</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span>Affiliate-loaded landing pages or paywalled tools without free tiers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span>Abandoned or unmaintained GitHub repositories (inactive &gt; 2 years).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span>Fake 'free tier' claims that require upfront credit cards for trial.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Submission Form Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
        {submitted ? (
          <div className="text-center py-12 space-y-4 animate-in fade-in">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">
              Submission Received!
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you for contributing <strong className="text-slate-100">{name}</strong> to DevVault. Our maintainers will verify its free tier, stars, and licensing before adding it to the main catalog.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setWebsiteUrl('');
                  setGithubUrl('');
                  setShortDesc('');
                  setStars('');
                  setProTip('');
                }}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                Submit Another Resource
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
              <FileCode className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-100">
                Resource Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5 font-mono">
                  Tool or Repository Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Supabase, Ollama, Coolify"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5 font-mono">
                  Category <span className="text-rose-400">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ResourceCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="github">Trending GitHub Repositories</option>
                  <option value="ai-tools">Free & Open Source AI</option>
                  <option value="apis">Developer APIs</option>
                  <option value="developer-tools">Developer Tools</option>
                  <option value="hosting">Hosting & Cloud</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5 font-mono">
                  Website URL <span className="text-rose-400">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5 font-mono">
                  GitHub Repository URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/owner/repo"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5 font-mono">
                  Stars Count (e.g. "85k+ ⭐")
                </label>
                <input
                  type="text"
                  placeholder="e.g. 75k+ ⭐"
                  value={stars}
                  onChange={(e) => setStars(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5 font-mono">
                  Pricing Type
                </label>
                <select
                  value={pricingType}
                  onChange={(e) => setPricingType(e.target.value as PricingType)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="Open Source">Open Source (100% Free)</option>
                  <option value="Free">Free</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-medium mb-1.5 font-mono">
                  Short Description & Killer Feature <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="What does it do and why is it special? (e.g. Open source Firebase alternative with real-time Postgres...)"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-medium mb-1.5 font-mono">
                  Useful Pro Tip & Trick
                </label>
                <textarea
                  rows={2}
                  placeholder="Share a killer tip developers should know when using this (e.g. Use 'npx supabase start' to spin up locally without internet...)"
                  value={proTip}
                  onChange={(e) => setProTip(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Resource</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
