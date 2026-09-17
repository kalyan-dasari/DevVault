import { Resource, PricingType, ResourceCategory } from '../types';

export interface ExtractedResourceDraft {
  name: string;
  websiteUrl: string;
  githubUrl?: string;
  category: ResourceCategory;
  shortDescription: string;
  pricingType: PricingType;
  tags: string[];
  features: string[];
  sourceSocialUrl?: string;
  rawInputSnippet: string;
  confidenceScore: number;
}

/**
 * Service simulating the future AI parser for social posts.
 * Parses raw text, Instagram reel captions, YouTube links, or developer URLs
 * and returns a structured draft for developer verification before saving.
 */
export async function simulateSocialAiExtraction(
  input: string
): Promise<ExtractedResourceDraft> {
  // Simulate network / AI inference delay
  await new Promise((resolve) => setTimeout(resolve, 900));

  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();

  // Smart heuristic sample generation based on detected keywords
  if (lower.includes('supabase') || lower.includes('postgres') || lower.includes('database')) {
    return {
      name: 'Supabase Postgres',
      websiteUrl: 'https://supabase.com',
      githubUrl: 'https://github.com/supabase/supabase',
      category: 'databases',
      shortDescription: 'Open source Firebase alternative with real-time Postgres, Auth, and Storage.',
      pricingType: 'Open Source',
      tags: ['postgres', 'database', 'auth', 'open-source'],
      features: ['Row Level Security', 'Auto-generated REST API', 'Realtime WebSockets'],
      sourceSocialUrl: trimmed.startsWith('http') ? trimmed : undefined,
      rawInputSnippet: trimmed.slice(0, 160),
      confidenceScore: 0.94,
    };
  }

  if (lower.includes('cursor') || lower.includes('ide') || lower.includes('editor')) {
    return {
      name: 'Cursor AI Code Editor',
      websiteUrl: 'https://cursor.com',
      category: 'ai-tools',
      shortDescription: 'AI-powered code editor fork of VS Code with smart completions and multi-file diffs.',
      pricingType: 'Freemium',
      tags: ['ai-coding', 'ide', 'vs-code'],
      features: ['Multi-file edits', 'Contextual chat with codebase', 'Terminal AI integration'],
      sourceSocialUrl: trimmed.startsWith('http') ? trimmed : undefined,
      rawInputSnippet: trimmed.slice(0, 160),
      confidenceScore: 0.92,
    };
  }

  if (lower.includes('shadcn') || lower.includes('ui') || lower.includes('tailwind') || lower.includes('component')) {
    return {
      name: 'shadcn/ui Design Primitives',
      websiteUrl: 'https://ui.shadcn.com',
      githubUrl: 'https://github.com/shadcn-ui/ui',
      category: 'developer-tools',
      shortDescription: 'Copy-paste accessible UI component primitives built with Tailwind CSS and Radix UI.',
      pricingType: 'Open Source',
      tags: ['ui', 'react', 'tailwind', 'components'],
      features: ['Accessible Radix primitives', 'Zero npm package lock-in', 'CLI installer'],
      sourceSocialUrl: trimmed.startsWith('http') ? trimmed : undefined,
      rawInputSnippet: trimmed.slice(0, 160),
      confidenceScore: 0.96,
    };
  }

  // Generic heuristic extraction for arbitrary links or text
  const words = trimmed.split(/\s+/);
  const potentialName = words.slice(0, 3).join(' ').replace(/https?:\/\//, '').replace(/www\./, '').split('/')[0] || 'Discovered Resource';

  return {
    name: potentialName,
    websiteUrl: trimmed.startsWith('http') ? trimmed : 'https://example.com',
    category: 'developer-tools',
    shortDescription: `Developer resource extracted from social capture: "${trimmed.slice(0, 80)}..."`,
    pricingType: 'Freemium',
    tags: ['discovered', 'developer-tool', 'social-clip'],
    features: ['Discovered via social capture', 'Pending verification by user'],
    sourceSocialUrl: trimmed.startsWith('http') ? trimmed : undefined,
    rawInputSnippet: trimmed.slice(0, 160),
    confidenceScore: 0.81,
  };
}

export function convertDraftToResource(draft: ExtractedResourceDraft): Resource {
  const slug = draft.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return {
    id: `res-social-${Date.now()}`,
    slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
    name: draft.name,
    shortDescription: draft.shortDescription,
    longDescription: `${draft.shortDescription} Captured via DevVault social media quick-save flow for later review and building.`,
    category: draft.category,
    type: 'tool',
    websiteUrl: draft.websiteUrl,
    githubUrl: draft.githubUrl,
    pricingType: draft.pricingType,
    features: draft.features,
    useCases: ['Prototyping and experimentation'],
    tags: draft.tags,
    technologies: ['Web'],
    openSource: draft.pricingType === 'Open Source',
    apiAvailable: false,
    selfHosted: false,
    featured: false,
    verified: false,
    lastVerified: 'September 2026 (Unverified user capture)',
    verificationNotes: 'Extracted automatically from social capture. Needs community or user verification.',
    sourceUrls: draft.sourceSocialUrl ? [draft.sourceSocialUrl] : [draft.websiteUrl],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
