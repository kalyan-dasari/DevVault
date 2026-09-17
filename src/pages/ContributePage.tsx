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
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { ResourceCategory, PricingType } from '../types';

export function ContributePage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [category, setCategory] = useState<ResourceCategory>('developer-tools');
  const [pricingType, setPricingType] = useState<PricingType>('Free');
  const [shortDesc, setShortDesc] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !websiteUrl.trim() || !shortDesc.trim()) {
      toast('Please complete all required fields.', 'error');
      return;
    }

    setSubmitted(true);
    toast('Resource submission received for community review!', 'success');
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
            Contribute to DevVault
          </h1>
          <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            Open Source Catalog
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Help expand DevVault by submitting new developer tools, updating inaccurate pricing tiers, or opening pull requests.
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
              <span>Tools with an accessible free tier, free trial, or 100% open-source license.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Developer-centric APIs with published interactive documentation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Active GitHub repositories with clear READMEs and recent commit activity.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Generous student programs or educational discounts with official verification steps.</span>
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
              <span>Spammy, duplicate, or purely commercial non-developer marketing software.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span>Tools with fabricated or unverified student claims.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* GitHub PR Instructions */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs font-mono uppercase tracking-wider">
          <GitPullRequest className="w-4 h-4" />
          <span>Contributing via GitHub Pull Request</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          DevVault's data architecture is modular. All resources live in clean TypeScript arrays in <code className="font-mono text-indigo-300">src/data/</code>. To add a resource directly to git:
        </p>
        <div className="p-3.5 rounded-lg bg-slate-950/80 font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
          <div className="text-slate-500"># 1. Fork the repo and create your branch</div>
          <div>git checkout -b add-resource/my-tool</div>
          <div className="text-slate-500 mt-2"># 2. Add resource object to src/data/[category].ts</div>
          <div>// Ensure verified, pricingType, and freeTier details are filled accurately</div>
          <div className="text-slate-500 mt-2"># 3. Commit and open a Pull Request</div>
          <div>git commit -m "feat(data): add MyTool to developer-tools"</div>
        </div>
      </div>

      {/* Client-side Submission Form */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              Submit a Developer Resource
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Submissions undergo community review and verification before catalog inclusion.
            </p>
          </div>
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl">
            <Check className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-base font-semibold text-slate-100">
              Thank You for Contributing!
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Your submission for "{name}" has been recorded. Our verification checklist will audit the free tier and website before publishing to the main index.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setName('');
                setWebsiteUrl('');
                setGithubUrl('');
                setShortDesc('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-200 hover:bg-slate-700"
            >
              Submit Another Resource
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-1 font-mono uppercase tracking-wider">
                  Resource Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Supabase, Bruno, Coolify"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono uppercase tracking-wider">
                  Official Website URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono uppercase tracking-wider">
                  GitHub URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono uppercase tracking-wider">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ResourceCategory)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="ai-tools">AI Tools</option>
                  <option value="github">GitHub Repositories</option>
                  <option value="apis">Developer APIs</option>
                  <option value="developer-tools">Developer Tools</option>
                  <option value="hosting">Hosting & Cloud</option>
                  <option value="courses">Learning & Courses</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono uppercase tracking-wider">
                  Pricing Model *
                </label>
                <select
                  value={pricingType}
                  onChange={(e) => setPricingType(e.target.value as PricingType)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Free">Free</option>
                  <option value="Open Source">Open Source</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-mono uppercase tracking-wider">
                  Short Description & What Makes It Great *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain what problem it solves for developers and why it deserves a spot in the vault..."
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-md shadow-indigo-600/20 transition-all text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit for Verification</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
