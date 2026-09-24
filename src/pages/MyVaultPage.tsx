import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  Folder,
  FolderPlus,
  Trash2,
  Download,
  Share2,
  Search,
  Sparkles,
  ExternalLink,
  Edit2,
  Check,
} from 'lucide-react';
import { useVault } from '../context/VaultContext';
import { ResourceCard } from '../components/ResourceCard';
import { useToast } from '../context/ToastContext';
import { Collection } from '../types';

export function MyVaultPage() {
  const {
    savedResources,
    collections,
    createCollection,
    deleteCollection,
    updateCollection,
    removeResourceFromCollection,
  } = useVault();
  const { toast } = useToast();

  const [activeCollectionId, setActiveCollectionId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingCol, setIsCreatingCol] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');

  // Editing state for collection
  const [editingColId, setEditingColId] = useState<string | null>(null);
  const [editColName, setEditColName] = useState('');

  const activeCollection = collections.find((c) => c.id === activeCollectionId);

  // Filter resources based on active collection and search query
  const displayedResources = useMemo(() => {
    let list = savedResources;

    if (activeCollectionId !== 'all' && activeCollection) {
      list = list.filter((r) => activeCollection.resourceIds.includes(r.id));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.shortDescription.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [savedResources, activeCollectionId, activeCollection, searchQuery]);

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    const created = createCollection(newColName.trim(), newColDesc.trim());
    setNewColName('');
    setNewColDesc('');
    setIsCreatingCol(false);
    setActiveCollectionId(created.id);
  };

  const handleSaveRename = (colId: string) => {
    if (!editColName.trim()) return;
    updateCollection(colId, { name: editColName.trim() });
    setEditingColId(null);
  };

  // Export collection / vault to JSON
  const handleExportJSON = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      collection: activeCollection?.name || 'All Saved Resources',
      resources: displayedResources.map((r) => ({
        name: r.name,
        category: r.category,
        url: r.websiteUrl,
        github: r.githubUrl,
        pricing: r.pricingType,
        freeTier: r.freeTier,
      })),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devvault-${activeCollection?.slug || 'saved-resources'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Vault exported as JSON', 'success');
  };

  // Export collection to Markdown
  const handleExportMarkdown = () => {
    let md = `# DevVault Export: ${activeCollection?.name || 'Saved Resources'}\n\n`;
    md += `*Exported on ${new Date().toLocaleDateString()}*\n\n`;
    displayedResources.forEach((r, idx) => {
      md += `### ${idx + 1}. [${r.name}](${r.websiteUrl})\n`;
      md += `- **Category:** ${r.category}\n`;
      md += `- **Pricing:** ${r.pricingType} (${r.freeTier || 'See website'})\n`;
      md += `- **Description:** ${r.shortDescription}\n`;
      if (r.githubUrl) md += `- **GitHub:** ${r.githubUrl}\n`;
      md += `\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devvault-${activeCollection?.slug || 'saved-resources'}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Vault exported as Markdown', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Vault Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
              <Bookmark className="w-4 h-4" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              My Vault
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
              {savedResources.length} items
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Personal curated library of developer resources, organized into custom collections and stacks.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportJSON}
            disabled={displayedResources.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            type="button"
            onClick={handleExportMarkdown}
            disabled={displayedResources.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Markdown</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Left Collections Sidebar / Tabs, Right Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Collections Manager */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Collections ({collections.length})
            </h2>
            <button
              type="button"
              onClick={() => setIsCreatingCol(!isCreatingCol)}
              className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>
          </div>

          {/* New Collection Inline Form */}
          {isCreatingCol && (
            <form
              onSubmit={handleCreateCollection}
              className="p-3 rounded-xl border border-indigo-500/30 bg-indigo-950/20 space-y-2.5"
            >
              <input
                type="text"
                autoFocus
                placeholder="Collection name..."
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Description (optional)..."
                value={newColDesc}
                onChange={(e) => setNewColDesc(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <div className="flex items-center justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsCreatingCol(false)}
                  className="px-2.5 py-1 text-[11px] text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newColName.trim()}
                  className="px-3 py-1 text-[11px] font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50"
                >
                  Create
                </button>
              </div>
            </form>
          )}

          {/* Collection Pills / List */}
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => setActiveCollectionId('all')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeCollectionId === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bookmark className="w-3.5 h-3.5" />
                <span>All Saved Resources</span>
              </div>
              <span className="font-mono text-[11px] opacity-80">
                {savedResources.length}
              </span>
            </button>

            {collections.map((col) => {
              const isSelected = activeCollectionId === col.id;
              const isEditing = editingColId === col.id;

              return (
                <div
                  key={col.id}
                  className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all border ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-600/15 text-indigo-200'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {isEditing ? (
                    <div className="flex items-center gap-1 w-full">
                      <input
                        type="text"
                        autoFocus
                        value={editColName}
                        onChange={(e) => setEditColName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(col.id)}
                        className="w-full px-2 py-1 text-xs rounded bg-slate-900 border border-slate-700 text-slate-100"
                      />
                      <button
                        onClick={() => handleSaveRename(col.id)}
                        className="p-1 text-emerald-400 hover:text-emerald-300"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setActiveCollectionId(col.id)}
                        className="flex-1 flex items-center gap-2 text-left min-w-0"
                      >
                        <Folder className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
                        <span className="truncate">{col.name}</span>
                      </button>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-mono text-[11px] text-slate-500">
                          {col.resourceIds.length}
                        </span>

                        {!col.isDefault && (
                          <div className="hidden group-hover:flex items-center gap-1 ml-1">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingColId(col.id);
                                setEditColName(col.name);
                              }}
                              className="p-1 text-slate-400 hover:text-slate-200"
                              title="Rename collection"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete collection "${col.name}"?`)) {
                                  deleteCollection(col.id);
                                  if (activeCollectionId === col.id) {
                                    setActiveCollectionId('all');
                                  }
                                }
                              }}
                              className="p-1 text-rose-400 hover:text-rose-300"
                              title="Delete collection"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Saved Resources List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Active Collection Filter / Search bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search saved items by title or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-800 bg-slate-900/80 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="text-xs text-slate-400 font-mono">
              {displayedResources.length} saved item{displayedResources.length === 1 ? '' : 's'}
            </div>
          </div>

          {/* Active Collection Description (if any) */}
          {activeCollection && activeCollection.description && (
            <p className="text-xs text-slate-400 italic bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/80">
              "{activeCollection.description}"
            </p>
          )}

          {/* Resources Grid */}
          {displayedResources.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center space-y-3">
              <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
              <h3 className="text-base font-semibold text-slate-200">
                {searchQuery
                  ? 'No matching resources in this collection'
                  : 'This collection is empty'}
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore developer tools, APIs, and open source repositories in DevVault and click the bookmark icon to save them here.
              </p>
              <div className="pt-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium"
                >
                  <span>Explore Resources</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedResources.map((res) => (
                <ResourceCard key={res.id} resource={res} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
