import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Sparkles,
  ArrowRight,
  Bookmark,
  Check,
  ChevronRight,
  Terminal,
  ExternalLink,
  Code2,
  Database,
  Shield,
  Zap,
  CreditCard,
  Mail,
  Activity,
  FolderPlus,
} from 'lucide-react';
import { stackTemplates } from '../data/stacks';
import { getResourceById } from '../data';
import { useVault } from '../context/VaultContext';
import { useToast } from '../context/ToastContext';
import { StackTemplate } from '../types';

export function StackBuilderPage() {
  const { createCollection } = useVault();
  const { toast } = useToast();
  const [selectedStackId, setSelectedStackId] = useState<string>(stackTemplates[0].id);
  const [savedAsCollection, setSavedAsCollection] = useState(false);

  // Active stack template
  const currentStack = stackTemplates.find((s) => s.id === selectedStackId) || stackTemplates[0];

  const handleSaveStackToVault = () => {
    // Extract all recommended resource IDs
    const resourceIds = currentStack.layers.map((l) => l.recommendedResourceId);
    createCollection(
      `${currentStack.title}`,
      `Tech stack blueprint for ${currentStack.category}: ${currentStack.tagline}`,
      resourceIds
    );
    setSavedAsCollection(true);
    toast(`Saved "${currentStack.title}" as a new collection in My Vault!`, 'success');
    setTimeout(() => setSavedAsCollection(false), 3000);
  };

  const getLayerIcon = (layerName: string) => {
    const lower = layerName.toLowerCase();
    if (lower.includes('front')) return Code2;
    if (lower.includes('back') || lower.includes('api')) return Terminal;
    if (lower.includes('data') || lower.includes('local')) return Database;
    if (lower.includes('auth')) return Shield;
    if (lower.includes('ai')) return Zap;
    if (lower.includes('pay')) return CreditCard;
    if (lower.includes('mail')) return Mail;
    if (lower.includes('analytics') || lower.includes('error')) return Activity;
    return Layers;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-4 h-4" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              Stack Builder
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              "Build With These"
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Production-ready architectural blueprints. Pick what you want to build and get an integrated, battle-tested technology stack.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveStackToVault}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-indigo-600/20 transition-all self-start md:self-auto"
        >
          {savedAsCollection ? <Check className="w-4 h-4" /> : <FolderPlus className="w-4 h-4" />}
          <span>{savedAsCollection ? 'Saved to Vault!' : 'Save Blueprint to Vault'}</span>
        </button>
      </div>

      {/* Blueprint Template Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {stackTemplates.map((tpl) => {
          const isSelected = tpl.id === selectedStackId;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => setSelectedStackId(tpl.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-600/15 text-indigo-200 shadow-sm'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{tpl.title}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
                {tpl.layers.length} layers
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Selected Blueprint Overview */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                {currentStack.title}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {currentStack.difficulty}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-indigo-300 font-mono mt-1">
              {currentStack.tagline}
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Category: <span className="text-slate-200">{currentStack.category}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          {currentStack.description}
        </p>

        {/* Coordinated Layers Stack Grid */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            Recommended Architecture Layers
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentStack.layers.map((layer, idx) => {
              const LayerIcon = getLayerIcon(layer.layerName);
              const resource = getResourceById(layer.recommendedResourceId);

              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60 transition-all gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-800/80 text-indigo-400">
                      <LayerIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-slate-400 uppercase">
                          {layer.layerName}
                        </span>
                        <span className="text-slate-600 text-xs">•</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-100">
                          {layer.recommendedName}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {layer.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    {resource ? (
                      <Link
                        to={`/resource/${resource.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-indigo-200 transition-colors"
                      >
                        <span>View Resource</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-mono">
                        Standard Tool
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Recommendation Concept Notice */}
      <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-6 flex items-start gap-4">
        <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <span className="font-semibold text-slate-100 block">
            Future Dynamic AI Stack Recommender Architecture
          </span>
          <p className="text-slate-400 text-xs">
            The data model in <code className="font-mono text-indigo-300">src/data/stacks.ts</code> is architected to support dynamic parameterization. Soon, you will be able to type freeform requirements (e.g. "Voice-first meeting assistant for doctors") to generate custom multi-layered resource packages automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
