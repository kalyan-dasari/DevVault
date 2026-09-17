import { Collection } from '../types';

const VAULT_SAVED_IDS_KEY = 'devvault_saved_resource_ids';
const VAULT_COLLECTIONS_KEY = 'devvault_collections';

const DEFAULT_COLLECTIONS: Collection[] = [
  {
    id: 'col-favorites',
    slug: 'favorites',
    name: 'My Favorites',
    description: 'Go-to developer tools, libraries, and frameworks I use in every project.',
    resourceIds: ['res-cursor', 'res-supabase-repo', 'res-shadcn-ui-repo'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'col-saas-stack',
    slug: 'saas-stack',
    name: 'Next SaaS Stack',
    description: 'Tools, APIs, and infrastructure picked for my next production software venture.',
    resourceIds: ['res-fastapi-repo', 'res-supabase-repo', 'res-clerk-auth', 'res-stripe-api', 'res-resend', 'res-posthog'],
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'col-learn-later',
    slug: 'learn-later',
    name: 'Learn Later',
    description: 'Deep-dive courses, algorithms, and technical tutorials bookmarked for weekends.',
    resourceIds: ['res-fullstack-open', 'res-cs50x', 'res-fast-ai', 'res-build-your-own-x'],
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const vaultStorage = {
  getSavedResourceIds(): string[] {
    try {
      const data = localStorage.getItem(VAULT_SAVED_IDS_KEY);
      if (!data) {
        // Initial seed with 4 resources
        const initial = ['res-cursor', 'res-supabase-repo', 'res-shadcn-ui-repo', 'res-resend'];
        localStorage.setItem(VAULT_SAVED_IDS_KEY, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return ['res-cursor', 'res-supabase-repo'];
    }
  },

  saveResource(id: string): string[] {
    const current = this.getSavedResourceIds();
    if (!current.includes(id)) {
      const updated = [id, ...current];
      try {
        localStorage.setItem(VAULT_SAVED_IDS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving resource to vault storage', e);
      }
      return updated;
    }
    return current;
  },

  unsaveResource(id: string): string[] {
    const current = this.getSavedResourceIds();
    const updated = current.filter((item) => item !== id);
    try {
      localStorage.setItem(VAULT_SAVED_IDS_KEY, JSON.stringify(updated));
      // Also remove from all collections
      const collections = this.getCollections();
      const updatedCols = collections.map((col) => ({
        ...col,
        resourceIds: col.resourceIds.filter((resId) => resId !== id),
        updatedAt: new Date().toISOString(),
      }));
      localStorage.setItem(VAULT_COLLECTIONS_KEY, JSON.stringify(updatedCols));
    } catch (e) {
      console.error('Error removing resource from vault storage', e);
    }
    return updated;
  },

  isResourceSaved(id: string): boolean {
    return this.getSavedResourceIds().includes(id);
  },

  getCollections(): Collection[] {
    try {
      const data = localStorage.getItem(VAULT_COLLECTIONS_KEY);
      if (!data) {
        localStorage.setItem(VAULT_COLLECTIONS_KEY, JSON.stringify(DEFAULT_COLLECTIONS));
        return DEFAULT_COLLECTIONS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_COLLECTIONS;
    }
  },

  createCollection(name: string, description: string = '', initialResourceIds: string[] = []): Collection {
    const collections = this.getCollections();
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const newCol: Collection = {
      id: `col-${Date.now()}`,
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
      name,
      description,
      resourceIds: initialResourceIds,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newCol, ...collections];
    try {
      localStorage.setItem(VAULT_COLLECTIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error creating collection', e);
    }
    return newCol;
  },

  updateCollection(id: string, updates: Partial<Pick<Collection, 'name' | 'description' | 'resourceIds'>>): Collection[] {
    const collections = this.getCollections();
    const updated = collections.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });
    try {
      localStorage.setItem(VAULT_COLLECTIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error updating collection', e);
    }
    return updated;
  },

  deleteCollection(id: string): Collection[] {
    const collections = this.getCollections();
    const updated = collections.filter((c) => c.id !== id || c.isDefault);
    try {
      localStorage.setItem(VAULT_COLLECTIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error deleting collection', e);
    }
    return updated;
  },

  addResourceToCollection(collectionId: string, resourceId: string): Collection[] {
    // Ensure resource is also in saved resources
    this.saveResource(resourceId);

    const collections = this.getCollections();
    const updated = collections.map((c) => {
      if (c.id === collectionId && !c.resourceIds.includes(resourceId)) {
        return {
          ...c,
          resourceIds: [...c.resourceIds, resourceId],
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });
    try {
      localStorage.setItem(VAULT_COLLECTIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error adding resource to collection', e);
    }
    return updated;
  },

  removeResourceFromCollection(collectionId: string, resourceId: string): Collection[] {
    const collections = this.getCollections();
    const updated = collections.map((c) => {
      if (c.id === collectionId) {
        return {
          ...c,
          resourceIds: c.resourceIds.filter((id) => id !== resourceId),
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });
    try {
      localStorage.setItem(VAULT_COLLECTIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error removing resource from collection', e);
    }
    return updated;
  },
};
