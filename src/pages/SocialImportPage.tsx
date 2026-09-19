import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowDown,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  Share2,
  Terminal,
  HelpCircle,
  Star,
  Flame,
  Lightbulb,
} from 'lucide-react';
import {
  simulateSocialAiExtraction,
  convertDraftToResource,
  ExtractedResourceDraft,
} from '../services/aiExtractorMock';
import { useVault } from '../context/VaultContext';
import { useToast } from '../context/ToastContext';
import { ResourceCategory, PricingType } from '../types';

const SAMPLE_CAPTIONS = [
  {
    label: 'Supabase Reel Caption',
    text: 'Check out Supabase! 76k stars on GitHub. It is an open source Firebase alternative with real-time Postgres, Row Level Security, instant auth, and storage. Website: https://supabase.com and 100% open source on github.com/supabase/supabase #postgres #coding',
  },
  {
    label: 'Ollama / DeepSeek-R1 Reel',
    text: 'Run DeepSeek-R1 for FREE locally on your laptop! Ollama has 115k stars on GitHub. 1 command setup: ollama run deepseek-r1:8b with OpenAI API compatibility at localhost:11434 #deepseek #ai #programming',
  },
  {
    label: 'Coolify VPS Deployment Reel',
    text: 'How I host 30 Next.js and backend apps for just $4/month on a Hetzner VPS using Coolify (39k stars). Self-hosted Heroku & Vercel alternative with 1-click Docker databases: https://github.com/coollabsio/coolify',
  },
  {
    label: 'shadcn/ui Component Reel',
    text: 'Stop using heavy UI kits. shadcn/ui (74k stars) gives you copy-paste accessible components built with Tailwind CSS and Radix UI. Free and open source on GitHub: https://github.com/shadcn-ui/ui',
  },
];

export function SocialImportPage() {
  const navigate = useNavigate();
  const { addCustomResource } = useVault();
  const { toast } = useToast();

  const [inputContent, setInputContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedDraft, setExtractedDraft] = useState<ExtractedResourceDraft | null>(null);

  // Editable draft states
  const [draftName, setDraftName] = useState('');
  const [draftCategory, setDraftCategory] = useState<ResourceCategory>('github');
  const [draftPricing, setDraftPricing] = useState<PricingType>('Open Source');
  const [draftDesc, setDraftDesc] = useState('');
  const [draftStars, setDraftStars] = useState('');
  const [draftQuickCommand, setDraftQuickCommand] = useState('');
  const [draftTip, setDraftTip] = useState('');

  const handleExtract = async (contentToExtract?: string) => {
    const text = contentToExtract || inputContent;
    if (!text.trim()) return;

    setIsProcessing(true);
    try {
      const draft = await simulateSocialAiExtraction(text);
      setExtractedDraft(draft);
      setDraftName(draft.name);
      setDraftCategory(draft.category);
      setDraftPricing(draft.pricingType);
      setDraftDesc(draft.shortDescription);
      setDraftStars(draft.stars || '');
      setDraftQuickCommand(draft.quickCommand || '');
      setDraftTip(draft.proTips ? draft.proTips.join('\n') : '');
      toast('Extracted resource draft ready for review', 'info');
    } catch (e) {
      toast('Failed extracting resource metadata', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveDraft = () => {
    if (!extractedDraft) return;

    const tipsArray = draftTip
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

    const modifiedDraft: ExtractedResourceDraft = {
      ...extractedDraft,
      name: draftName.trim() || extractedDraft.name,
      category: draftCategory,
      pricingType: draftPricing,
      shortDescription: draftDesc.trim() || extractedDraft.shortDescription,
      stars: draftStars.trim() || undefined,
      quickCommand: draftQuickCommand.trim() || undefined,
      proTips: tipsArray.length > 0 ? tipsArray : undefined,
    };

    const newResource = convertDraftToResource(modifiedDraft);
    addCustomResource(newResource);
    navigate('/my-vault');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            "I saw this on Instagram / Reels"
          </h1>
          <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-pink-500/15 text-pink-300 border border-pink-500/30">
            Smart Capture
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Turn reel screenshots, video captions, or quick GitHub links into structured DevVault bookmarks with star counts, killer features, and tips & tricks.
        </p>
      </div>

      {/* Conceptual Workflow Diagram */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 font-mono text-xs text-slate-400">
        <div className="flex items-center justify-between overflow-x-auto gap-3 py-1 no-scrollbar text-[11px]">
          <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60 text-slate-300 whitespace-nowrap">
            1. Instagram / Reel Post
          </span>
          <span className="text-slate-600">→</span>
          <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60 text-slate-300 whitespace-nowrap">
            2. Paste Caption / GitHub Link
          </span>
          <span className="text-slate-600">→</span>
          <span className="px-2.5 py-1 rounded bg-pink-600/20 border border-pink-500/40 text-pink-300 font-semibold whitespace-nowrap">
            3. AI Star & Feature Extraction
          </span>
          <span className="text-slate-600">→</span>
          <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60 text-slate-300 whitespace-nowrap">
            4. Review & Add Pro Tip
          </span>
          <span className="text-slate-600">→</span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold whitespace-nowrap">
            5. Saved to Your Vault
          </span>
        </div>
      </div>

      {/* Input Box */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono uppercase tracking-wider">
            Paste Instagram Reel Caption, YouTube Short, or GitHub URL
          </label>
          <textarea
            rows={4}
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="Paste text from an Instagram reel caption, TikTok video description, YouTube short, or raw github.com/owner/repo URL..."
            className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-pink-500 leading-relaxed font-mono"
          />
        </div>

        {/* Sample Captions */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-mono text-[11px]">Try sample caption:</span>
          {SAMPLE_CAPTIONS.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputContent(s.text);
                handleExtract(s.text);
              }}
              className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => handleExtract()}
          disabled={isProcessing || !inputContent.trim()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-pink-600/20 disabled:opacity-50 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isProcessing ? 'Analyzing Reel & Extracting Data...' : 'Extract Repository / Tool'}</span>
        </button>
      </div>

      {/* Extracted Review Card */}
      {extractedDraft && (
        <div className="rounded-2xl border border-pink-500/40 bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                Extracted Draft Review
              </h2>
            </div>
            <span className="text-[11px] font-mono text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
              Confidence: {Math.round(extractedDraft.confidenceScore * 100)}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Resource / Repo Name</label>
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 font-medium focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono">Category</label>
              <select
                value={draftCategory}
                onChange={(e) => setDraftCategory(e.target.value as ResourceCategory)}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 font-medium focus:outline-none focus:border-pink-500"
              >
                <option value="github">Trending GitHub Repos</option>
                <option value="ai-tools">Free & Open Source AI</option>
                <option value="apis">Developer APIs</option>
                <option value="developer-tools">Developer Tools</option>
                <option value="hosting">Hosting & Cloud</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono">Stars (e.g. 75k+ ⭐)</label>
              <input
                type="text"
                value={draftStars}
                onChange={(e) => setDraftStars(e.target.value)}
                placeholder="e.g. 85k+ ⭐"
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 font-medium focus:outline-none focus:border-pink-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono">Quick Install / Launch Command</label>
              <input
                type="text"
                value={draftQuickCommand}
                onChange={(e) => setDraftQuickCommand(e.target.value)}
                placeholder="e.g. git clone ... or npx ... or pip install ..."
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 font-medium focus:outline-none focus:border-pink-500 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-mono">Short Description</label>
              <textarea
                rows={2}
                value={draftDesc}
                onChange={(e) => setDraftDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 font-medium focus:outline-none focus:border-pink-500 leading-relaxed"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-mono">
                Actionable Developer Pro Tips & Tricks (1 per line)
              </label>
              <textarea
                rows={2}
                value={draftTip}
                onChange={(e) => setDraftTip(e.target.value)}
                placeholder="e.g. Use Docker Compose for 1-command offline development..."
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 font-medium focus:outline-none focus:border-pink-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono">Official Website / Repo URL</label>
              <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-300 font-mono truncate">
                {extractedDraft.websiteUrl}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono">Pricing Model</label>
              <select
                value={draftPricing}
                onChange={(e) => setDraftPricing(e.target.value as PricingType)}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 font-medium focus:outline-none focus:border-pink-500"
              >
                <option value="Open Source">Open Source</option>
                <option value="Free">100% Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>

          {/* Tags preview */}
          <div className="pt-2 space-y-2 text-xs">
            <span className="text-slate-400 font-mono block">Detected Tags:</span>
            <div className="flex flex-wrap gap-1.5">
              {extractedDraft.tags.map((f, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700/60 font-mono"
                >
                  #{f}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              Will be saved to: <strong className="text-slate-200">My Vault</strong>
            </span>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-md shadow-emerald-600/20"
            >
              <Bookmark className="w-4 h-4" />
              <span>Confirm & Save to My Vault</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
