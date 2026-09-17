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
    text: 'Check out Supabase! It is an open source Firebase alternative with real-time Postgres, Row Level Security, instant auth, and storage. Website: https://supabase.com and 100% open source on github.com/supabase/supabase #postgres #coding',
  },
  {
    label: 'Cursor AI Code Editor Post',
    text: 'Cursor AI is insane for coding! It is a VS Code fork with deep codebase context and instant multi-file code editing. Free plan available at https://cursor.com #developer #ai #programming',
  },
  {
    label: 'shadcn/ui Component Tweet',
    text: 'Stop using heavy UI kits. shadcn/ui gives you copy-paste accessible components built with Tailwind CSS and Radix UI. Free and open source on GitHub: https://github.com/shadcn-ui/ui',
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
  const [draftCategory, setDraftCategory] = useState<ResourceCategory>('developer-tools');
  const [draftPricing, setDraftPricing] = useState<PricingType>('Freemium');
  const [draftDesc, setDraftDesc] = useState('');

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
      toast('Extracted resource draft ready for review', 'info');
    } catch (e) {
      toast('Failed extracting resource metadata', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveDraft = () => {
    if (!extractedDraft) return;

    const modifiedDraft: ExtractedResourceDraft = {
      ...extractedDraft,
      name: draftName.trim() || extractedDraft.name,
      category: draftCategory,
      pricingType: draftPricing,
      shortDescription: draftDesc.trim() || extractedDraft.shortDescription,
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
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            "I saw this on Instagram"
          </h1>
          <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            Social Capture
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Turn reel screenshots, video captions, or quick social links into structured DevVault bookmarks ready to build with.
        </p>
      </div>

      {/* Conceptual Workflow Diagram */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 font-mono text-xs text-slate-400">
        <div className="flex items-center justify-between overflow-x-auto gap-3 py-1 no-scrollbar text-[11px]">
          <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60 text-slate-300 whitespace-nowrap">
            1. Instagram / YouTube Post
          </span>
          <span className="text-slate-600">→</span>
          <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60 text-slate-300 whitespace-nowrap">
            2. Paste URL or Caption
          </span>
          <span className="text-slate-600">→</span>
          <span className="px-2.5 py-1 rounded bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-semibold whitespace-nowrap">
            3. AI Extraction
          </span>
          <span className="text-slate-600">→</span>
          <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60 text-slate-300 whitespace-nowrap">
            4. Review & Verify
          </span>
          <span className="text-slate-600">→</span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold whitespace-nowrap">
            5. Save to DevVault
          </span>
        </div>
      </div>

      {/* Input Box */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono uppercase tracking-wider">
            Paste Social Media Caption, Video URL, or Snippet
          </label>
          <textarea
            rows={4}
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="Paste text from an Instagram reel caption, TikTok video description, YouTube short, or raw URL..."
            className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-mono"
          />
        </div>

        {/* Sample Captions */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-mono text-[11px]">Try sample snippet:</span>
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-indigo-600/20 disabled:opacity-50 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isProcessing ? 'Simulating AI Extraction...' : 'Extract Developer Resource'}</span>
        </button>
      </div>

      {/* Extracted Review Card */}
      {extractedDraft && (
        <div className="rounded-2xl border border-indigo-500/40 bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                Extracted Draft Review
              </h2>
            </div>
            <span className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              Confidence: {Math.round(extractedDraft.confidenceScore * 100)}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Resource Name</label>
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono">Category</label>
              <select
                value={draftCategory}
                onChange={(e) => setDraftCategory(e.target.value as ResourceCategory)}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 font-medium focus:outline-none focus:border-indigo-500"
              >
                <option value="ai-tools">AI Tools</option>
                <option value="github">GitHub Repositories</option>
                <option value="apis">Developer APIs</option>
                <option value="developer-tools">Developer Tools</option>
                <option value="hosting">Hosting & Cloud</option>
                <option value="courses">Learning & Courses</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-mono">Description</label>
              <textarea
                rows={2}
                value={draftDesc}
                onChange={(e) => setDraftDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 font-medium focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono">Official Website</label>
              <div className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-300 font-mono truncate">
                {extractedDraft.websiteUrl}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono">Pricing Model</label>
              <select
                value={draftPricing}
                onChange={(e) => setDraftPricing(e.target.value as PricingType)}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 font-medium focus:outline-none focus:border-indigo-500"
              >
                <option value="Free">Free</option>
                <option value="Open Source">Open Source</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>

          {/* Tags & Features preview */}
          <div className="pt-2 space-y-2 text-xs">
            <span className="text-slate-400 font-mono block">Detected Features:</span>
            <div className="flex flex-wrap gap-1.5">
              {extractedDraft.features.map((f, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                >
                  {f}
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
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-medium transition-colors shadow-md shadow-emerald-600/20"
            >
              <Bookmark className="w-4 h-4" />
              <span>Confirm & Save to Vault</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
