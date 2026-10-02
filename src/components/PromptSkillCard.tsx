import React, { useState } from 'react';
import {
  Copy,
  Check,
  Sparkles,
  Bot,
  Terminal,
  Code2,
  FileCode,
  Layers,
  ChevronDown,
  ChevronUp,
  Tag,
  Wand2,
} from 'lucide-react';
import { PromptSkillItem, TipType } from '../types';
import { useToast } from '../context/ToastContext';

interface PromptSkillCardProps {
  key?: React.Key;
  item: PromptSkillItem;
  className?: string;
}

const typeStyles: Record<
  TipType,
  { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
> = {
  prompt: {
    label: 'AI Master Prompt',
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-300',
    border: 'border-indigo-500/20',
    icon: Wand2,
  },
  'cursor-rule': {
    label: '.cursorrules',
    bg: 'bg-sky-500/10',
    text: 'text-sky-300',
    border: 'border-sky-500/20',
    icon: FileCode,
  },
  'cheat-sheet': {
    label: 'CLI Cheat Skill',
    bg: 'bg-amber-500/10',
    text: 'text-amber-300',
    border: 'border-amber-500/20',
    icon: Terminal,
  },
  'agent-skill': {
    label: 'Agent Skill',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-300',
    border: 'border-emerald-500/20',
    icon: Bot,
  },
  'system-instruction': {
    label: 'System Instruction',
    bg: 'bg-purple-500/10',
    text: 'text-purple-300',
    border: 'border-purple-500/20',
    icon: Layers,
  },
};

export function PromptSkillCard({ item, className = '' }: PromptSkillCardProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const styleConfig = typeStyles[item.type] || typeStyles.prompt;
  const TypeIcon = styleConfig.icon;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(item.content);
    setCopied(true);
    showToast(`Copied "${item.title}" to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const isLongContent = item.content.length > 320;
  const displayContent = !expanded && isLongContent
    ? item.content.slice(0, 320) + '...'
    : item.content;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/60 p-5 sm:p-6 shadow-md hover:shadow-2xl hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all duration-300 ${className}`}
    >
      {/* Glow subtle accent */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 pointer-events-none transition-all duration-500" />

      <div>
        {/* Card Header: Type Badge & Target Tool */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border ${styleConfig.bg} ${styleConfig.text} ${styleConfig.border}`}
            >
              <TypeIcon className="w-3.5 h-3.5" />
              <span>{styleConfig.label}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-slate-800/80 text-slate-300 border border-slate-700">
              {item.targetTool}
            </span>
          </div>
        </div>

        {/* Title & Summary */}
        <div className="mt-4 space-y-2">
          <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {item.summary}
          </p>
        </div>

        {/* Placeholders alert if any */}
        {item.placeholders && item.placeholders.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <span className="text-slate-500">Fill placeholders:</span>
            {item.placeholders.map((ph) => (
              <span
                key={ph}
                className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold"
              >
                {ph}
              </span>
            ))}
          </div>
        )}

        {/* Code / Prompt Snippet Block */}
        <div className="mt-4 relative rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-800/80 bg-slate-900/60 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 inline-block" />
              <span className="text-[11px] text-slate-500 ml-1">
                {item.language || (item.type === 'prompt' ? 'prompt' : 'config')}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700/60"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-3.5 text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-56 scrollbar-thin">
            {displayContent}
          </pre>

          {isLongContent && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="w-full py-1.5 text-center text-[11px] font-mono font-medium text-indigo-400 hover:text-indigo-300 bg-slate-900/80 hover:bg-slate-900 border-t border-slate-800/80 transition-colors flex items-center justify-center gap-1"
            >
              <span>{expanded ? 'Show less' : 'Show full prompt'}</span>
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>

      {/* Card Footer: Tags & Full Copy Button */}
      <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-3">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-hidden max-h-6">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-400 bg-slate-800/50 border border-slate-800"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 1-Click Copy Prompt CTA */}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy {item.type === 'cursor-rule' ? 'Rule' : item.type === 'cheat-sheet' ? 'Cheat Skill' : 'Prompt'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
