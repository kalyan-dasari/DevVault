import React, { useState } from 'react';
import { X, FolderPlus, Check, Plus } from 'lucide-react';
import { useVault } from '../context/VaultContext';

interface CollectionModalProps {
  resourceId: string;
  resourceName: string;
  onClose: () => void;
}

export function CollectionModal({
  resourceId,
  resourceName,
  onClose,
}: CollectionModalProps) {
  const {
    collections,
    createCollection,
    addResourceToCollection,
    removeResourceFromCollection,
  } = useVault();

  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleToggleCollection = (colId: string, isMember: boolean) => {
    if (isMember) {
      removeResourceFromCollection(colId, resourceId);
    } else {
      addResourceToCollection(colId, resourceId);
    }
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    createCollection(newColName.trim(), newColDesc.trim(), [resourceId]);
    setNewColName('');
    setNewColDesc('');
    setIsCreating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        id="collection-modal"
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl dark:border-slate-800 dark:bg-[#111622] text-slate-100"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Add to Collection
            </h3>
            <p className="text-xs text-slate-400 truncate max-w-xs mt-0.5">
              Organize "{resourceName}"
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collections List */}
        <div className="mt-4 max-h-56 overflow-y-auto space-y-2 pr-1">
          {collections.map((col) => {
            const isMember = col.resourceIds.includes(resourceId);
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => handleToggleCollection(col.id, isMember)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  isMember
                    ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-200'
                    : 'border-slate-800 bg-slate-800/40 hover:border-slate-700 hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="text-sm font-medium text-slate-200 truncate">
                    {col.name}
                  </div>
                  {col.description && (
                    <div className="text-xs text-slate-400 truncate">
                      {col.description}
                    </div>
                  )}
                  <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                    {col.resourceIds.length} item{col.resourceIds.length === 1 ? '' : 's'}
                  </div>
                </div>
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                    isMember
                      ? 'border-indigo-500 bg-indigo-600 text-white'
                      : 'border-slate-700 bg-slate-800 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Create new collection inline */}
        {isCreating ? (
          <form onSubmit={handleCreateNew} className="mt-4 p-3 rounded-xl border border-slate-800 bg-slate-800/40 space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Collection Name *
              </label>
              <input
                type="text"
                autoFocus
                placeholder="e.g. Next Big Project"
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Description (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Tools for building an AI SaaS"
                value={newColDesc}
                onChange={(e) => setNewColDesc(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newColName.trim()}
                className="px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50"
              >
                Save & Add
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="mt-4 w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-slate-700 hover:border-slate-500 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
          >
            <FolderPlus className="w-4 h-4" />
            <span>Create New Collection</span>
          </button>
        )}

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
