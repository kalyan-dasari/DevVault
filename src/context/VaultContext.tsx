import React, { createContext, useContext, useState, useEffect } from 'react';
import { Collection, Resource } from '../types';
import { vaultStorage } from '../services/vaultStorage';
import { allResources, getResourceById } from '../data';
import { useToast } from './ToastContext';
import { analytics } from '../services/analytics';

interface VaultContextType {
  savedResourceIds: string[];
  savedCount: number;
  collections: Collection[];
  isSaved: (id: string) => boolean;
  toggleSave: (id: string, resourceName?: string) => void;
  createCollection: (name: string, description?: string, initialIds?: string[]) => Collection;
  updateCollection: (id: string, updates: Partial<Pick<Collection, 'name' | 'description' | 'resourceIds'>>) => void;
  deleteCollection: (id: string) => void;
  addResourceToCollection: (collectionId: string, resourceId: string) => void;
  removeResourceFromCollection: (collectionId: string, resourceId: string) => void;
  getCollectionById: (id: string) => Collection | undefined;
  getCollectionBySlug: (slug: string) => Collection | undefined;
  savedResources: Resource[];
  addCustomResource: (resource: Resource) => void;
  customResources: Resource[];
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

const CUSTOM_RESOURCES_KEY = 'devvault_custom_resources';

export function VaultProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [customResources, setCustomResources] = useState<Resource[]>(() => {
    try {
      const data = localStorage.getItem(CUSTOM_RESOURCES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  // Sync on mount
  useEffect(() => {
    setSavedResourceIds(vaultStorage.getSavedResourceIds());
    setCollections(vaultStorage.getCollections());
  }, []);

  const isSaved = (id: string) => savedResourceIds.includes(id);

  const toggleSave = (id: string, resourceName?: string) => {
    const currentlySaved = isSaved(id);
    const targetName = resourceName || 'Resource';

    if (currentlySaved) {
      const updated = vaultStorage.unsaveResource(id);
      setSavedResourceIds(updated);
      setCollections(vaultStorage.getCollections());
      toast(`Removed "${targetName}" from your vault`, 'info');
      analytics.track('resource_unsave', { resourceId: id, name: targetName });
    } else {
      const updated = vaultStorage.saveResource(id);
      setSavedResourceIds(updated);
      toast(`Saved "${targetName}" to your vault`, 'success');
      analytics.track('resource_save', { resourceId: id, name: targetName });
    }
  };

  const createCollection = (name: string, description: string = '', initialIds: string[] = []) => {
    const newCol = vaultStorage.createCollection(name, description, initialIds);
    setCollections(vaultStorage.getCollections());
    toast(`Created collection "${name}"`, 'success');
    analytics.track('collection_created', { collectionName: name, initialCount: initialIds.length });
    return newCol;
  };

  const updateCollection = (
    id: string,
    updates: Partial<Pick<Collection, 'name' | 'description' | 'resourceIds'>>
  ) => {
    const updated = vaultStorage.updateCollection(id, updates);
    setCollections(updated);
    toast('Collection updated', 'info');
  };

  const deleteCollection = (id: string) => {
    const target = collections.find((c) => c.id === id);
    const updated = vaultStorage.deleteCollection(id);
    setCollections(updated);
    toast(`Deleted collection "${target?.name || 'Collection'}"`, 'info');
  };

  const addResourceToCollection = (collectionId: string, resourceId: string) => {
    const col = collections.find((c) => c.id === collectionId);
    const updated = vaultStorage.addResourceToCollection(collectionId, resourceId);
    setCollections(updated);
    setSavedResourceIds(vaultStorage.getSavedResourceIds());
    toast(`Added to "${col?.name || 'Collection'}"`, 'success');
    analytics.track('collection_resource_added', { collectionId, resourceId });
  };

  const removeResourceFromCollection = (collectionId: string, resourceId: string) => {
    const updated = vaultStorage.removeResourceFromCollection(collectionId, resourceId);
    setCollections(updated);
    toast('Removed item from collection', 'info');
  };

  const getCollectionById = (id: string) => collections.find((c) => c.id === id);

  const getCollectionBySlug = (slug: string) =>
    collections.find((c) => c.slug.toLowerCase() === slug.toLowerCase());

  const addCustomResource = (resource: Resource) => {
    const updated = [resource, ...customResources];
    setCustomResources(updated);
    try {
      localStorage.setItem(CUSTOM_RESOURCES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed saving custom resource', e);
    }
    // Auto save to vault
    vaultStorage.saveResource(resource.id);
    setSavedResourceIds(vaultStorage.getSavedResourceIds());
    toast(`Added "${resource.name}" to your Vault!`, 'success');
  };

  // Resolve all saved resources by looking in static data + customResources
  const savedResources: Resource[] = savedResourceIds
    .map((id) => {
      const standard = getResourceById(id);
      if (standard) return standard;
      return customResources.find((r) => r.id === id);
    })
    .filter((r): r is Resource => Boolean(r));

  return (
    <VaultContext.Provider
      value={{
        savedResourceIds,
        savedCount: savedResourceIds.length,
        collections,
        isSaved,
        toggleSave,
        createCollection,
        updateCollection,
        deleteCollection,
        addResourceToCollection,
        removeResourceFromCollection,
        getCollectionById,
        getCollectionBySlug,
        savedResources,
        addCustomResource,
        customResources,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
}

export function useVault() {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
}
