import React, { useState } from 'react';
import { Bookmark, FolderPlus } from 'lucide-react';
import { useVault } from '../context/VaultContext';

interface SaveButtonProps {
  resourceId: string;
  resourceName: string;
  onOpenCollectionModal?: () => void;
  variant?: 'icon' | 'button' | 'compact';
  className?: string;
}

export function SaveButton({
  resourceId,
  resourceName,
  onOpenCollectionModal,
  variant = 'icon',
  className = '',
}: SaveButtonProps) {
  const { isSaved, toggleSave } = useVault();
  const saved = isSaved(resourceId);
  const [animating, setAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimating(true);
    toggleSave(resourceId, resourceName);
    setTimeout(() => setAnimating(false), 300);
  };

  const handleCollectionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOpenCollectionModal) {
      onOpenCollectionModal();
    }
  };

  if (variant === 'button') {
    return (
      <div className="inline-flex items-center rounded-lg border border-slate-700 bg-slate-800/80 shadow-sm overflow-hidden dark:border-slate-700/80 dark:bg-slate-800/80">
        <button
          type="button"
          onClick={handleClick}
          id={`save-btn-${resourceId}`}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
            saved
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
          } ${className}`}
        >
          <Bookmark
            className={`w-3.5 h-3.5 transition-transform ${
              saved ? 'fill-current scale-105' : ''
            } ${animating ? 'scale-125' : ''}`}
          />
          <span>{saved ? 'In Vault' : 'Save to Vault'}</span>
        </button>
        {onOpenCollectionModal && (
          <button
            type="button"
            onClick={handleCollectionClick}
            title="Add to Collection"
            className="px-2 py-1.5 text-slate-400 hover:text-slate-200 border-l border-slate-700 hover:bg-slate-700/60 transition-colors"
          >
            <FolderPlus className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      id={`save-icon-${resourceId}`}
      title={saved ? 'Remove from your Vault' : 'Save to your Vault'}
      className={`p-2 rounded-lg border transition-all ${
        saved
          ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25'
          : 'border-slate-700/60 bg-slate-800/60 text-slate-400 hover:border-slate-600 hover:text-slate-200 hover:bg-slate-700/50'
      } ${className}`}
      aria-label={saved ? 'Remove from vault' : 'Save to vault'}
    >
      <Bookmark
        className={`w-4 h-4 transition-transform ${
          saved ? 'fill-current text-indigo-400' : ''
        } ${animating ? 'scale-125 text-indigo-400' : ''}`}
      />
    </button>
  );
}
