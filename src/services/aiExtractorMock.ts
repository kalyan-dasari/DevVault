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
  stars?: string;
  trendingOnSocial?: boolean;
  socialHighlights?: string;
  proTips?: string[];
  quickCommand?: string;
}

/**
 * Service simulating AI parser for Instagram, TikTok, YouTube, and GitHub links.
 * Parses raw reel captions, star mentions, and developer snippets into structured vault items.
 */
export async function simulateSocialAiExtraction(
  input: string
): Promise<ExtractedResourceDraft> {
  // Simulate network / AI inference delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();

  // Extract GitHub stars if mentioned (e.g. "85k stars", "10,000 stars", "⭐ 50k")
  const starMatch = trimmed.match(/(\d+[\d,.]*\s*k?\+?)\s*(stars|⭐|\*)/i);
  const detectedStars = starMatch ? `${starMatch[1].trim()} ⭐` : undefined;

  // Supabase match
  if (lower.includes('supabase') || lower.includes('postgres')) {
    return {
      name: 'Supabase',
      websiteUrl: 'https://supabase.com',
      githubUrl: 'https://github.com/supabase/supabase',
      category: 'github',
      shortDescription: 'Open source Firebase alternative: Postgres database, Auth, instant APIs, Edge Functions, and Realtime.',
      pricingType: 'Open Source',
      tags: ['postgres', 'database', 'auth', 'open-source', 'viral'],
      features: ['Row Level Security', 'Auto-generated REST API', 'Realtime WebSockets', 'Self-hostable with Docker'],
      sourceSocialUrl: trimmed.startsWith('http') ? trimmed : undefined,
      rawInputSnippet: trimmed.slice(0, 160),
      confidenceScore: 0.98,
      stars: detectedStars || '76k+ ⭐',
      trendingOnSocial: true,
      socialHighlights: 'Viral on Instagram: Popular open-source Firebase replacement with full SQL freedom.',
      proTips: [
        'Enable Row Level Security (RLS) immediately on all new tables to keep data private.',
        'Run `npx supabase start` for instant local development without internet.'
      ],
      quickCommand: 'npx supabase init && npx supabase start',
    };
  }

  // Ollama or DeepSeek match
  if (lower.includes('ollama') || lower.includes('deepseek') || lower.includes('local llm') || lower.includes('llama')) {
    return {
      name: lower.includes('deepseek') ? 'DeepSeek-R1 (Local via Ollama)' : 'Ollama Local LLM',
      websiteUrl: 'https://ollama.com',
      githubUrl: 'https://github.com/ollama/ollama',
      category: 'ai-tools',
      shortDescription: 'Run DeepSeek-R1, Llama 3.3, and top open reasoning models locally on your PC/Mac for free.',
      pricingType: 'Open Source',
      tags: ['local-ai', 'deepseek', 'open-source', 'llm', 'offline'],
      features: ['1-command setup', 'OpenAI-compatible local API', 'Offline GPU/CPU inference', 'Zero subscription fees'],
      sourceSocialUrl: trimmed.startsWith('http') ? trimmed : undefined,
      rawInputSnippet: trimmed.slice(0, 160),
      confidenceScore: 0.95,
      stars: detectedStars || '115k+ ⭐',
      trendingOnSocial: true,
      socialHighlights: 'Trending across Reels: "Run DeepSeek reasoning models on your laptop without paying OpenAI."',
      proTips: [
        'Run `ollama run deepseek-r1:8b` for blazing fast coding reasoning on 16GB RAM.',
        'Use `http://localhost:11434/v1` as your baseURL in any OpenAI SDK app.'
      ],
      quickCommand: 'ollama run deepseek-r1:8b',
    };
  }

  // Coolify match
  if (lower.includes('coolify') || lower.includes('vps') || lower.includes('heroku alternative')) {
    return {
      name: 'Coolify',
      websiteUrl: 'https://coolify.io',
      githubUrl: 'https://github.com/coollabsio/coolify',
      category: 'github',
      shortDescription: 'Self-hosted Heroku & Vercel alternative. Deploy apps and databases to your VPS with 1 command.',
      pricingType: 'Open Source',
      tags: ['devops', 'paas', 'self-hosted', 'docker', 'vercel-alternative'],
      features: ['Git push-to-deploy', 'Free SSL certificates', '1-click PostgreSQL & Redis', 'Docker Compose support'],
      sourceSocialUrl: trimmed.startsWith('http') ? trimmed : undefined,
      rawInputSnippet: trimmed.slice(0, 160),
      confidenceScore: 0.94,
      stars: detectedStars || '39k+ ⭐',
      trendingOnSocial: true,
      socialHighlights: 'Viral on Instagram: Host 30+ Next.js apps on a $4/month VPS without Vercel serverless limits.',
      proTips: [
        'Pair Coolify with an inexpensive Hetzner Cloud ARM VPS for top performance.',
        'Enable PR preview environments inside project deployment settings.'
      ],
      quickCommand: 'curl -fsSL https://cdn.coolify.io/coolify/install.sh | bash',
    };
  }

  // Generic GitHub Repo Detection
  const githubUrlMatch = trimmed.match(/github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)/i);
  if (githubUrlMatch) {
    const owner = githubUrlMatch[1];
    const repo = githubUrlMatch[2];
    const formattedName = repo.charAt(0).toUpperCase() + repo.slice(1).replace(/[-_]/g, ' ');

    return {
      name: formattedName,
      websiteUrl: `https://github.com/${owner}/${repo}`,
      githubUrl: `https://github.com/${owner}/${repo}`,
      category: 'github',
      shortDescription: `Open-source GitHub repository ${owner}/${repo} trending on social media.`,
      pricingType: 'Open Source',
      tags: ['github', 'open-source', 'trending', repo.toLowerCase()],
      features: ['Open-source codebase', 'Community verified on social media'],
      sourceSocialUrl: trimmed.startsWith('http') ? trimmed : undefined,
      rawInputSnippet: trimmed.slice(0, 160),
      confidenceScore: 0.90,
      stars: detectedStars || 'Trending ⭐',
      trendingOnSocial: true,
      socialHighlights: `Discovered from social media caption: "${trimmed.slice(0, 80)}..."`,
      proTips: [
        `Clone repo with git clone https://github.com/${owner}/${repo}.git`,
        'Check the README.md for Docker Compose quick start instructions.'
      ],
      quickCommand: `git clone https://github.com/${owner}/${repo}.git`,
    };
  }

  // Generic fallback
  const words = trimmed.split(/\s+/);
  const potentialName = words.slice(0, 3).join(' ').replace(/https?:\/\//, '').replace(/www\./, '').split('/')[0] || 'Discovered Tool';

  return {
    name: potentialName,
    websiteUrl: trimmed.startsWith('http') ? trimmed : 'https://example.com',
    category: 'developer-tools',
    shortDescription: `Developer tool extracted from social capture: "${trimmed.slice(0, 80)}..."`,
    pricingType: 'Freemium',
    tags: ['discovered', 'developer-tool', 'social-clip'],
    features: ['Discovered via social capture', 'Ready for user customization'],
    sourceSocialUrl: trimmed.startsWith('http') ? trimmed : undefined,
    rawInputSnippet: trimmed.slice(0, 160),
    confidenceScore: 0.82,
    stars: detectedStars,
    trendingOnSocial: true,
    socialHighlights: 'Captured from Instagram/TikTok social feed.',
    proTips: ['Test the free tier before committing to paid production workloads.'],
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
    longDescription: `${draft.shortDescription} Captured via DevVault social media quick-save flow for rapid developer reference and building.`,
    category: draft.category,
    type: draft.category === 'github' ? 'repo' : draft.category === 'ai-tools' ? 'tool' : 'service',
    websiteUrl: draft.websiteUrl,
    githubUrl: draft.githubUrl,
    pricingType: draft.pricingType,
    features: draft.features,
    useCases: ['Prototyping and production developer workflow'],
    tags: draft.tags,
    technologies: ['Web', 'Open Source'],
    openSource: draft.pricingType === 'Open Source',
    apiAvailable: false,
    selfHosted: draft.pricingType === 'Open Source',
    featured: true,
    verified: true,
    lastVerified: 'September 2026 (Social Capture)',
    verificationNotes: 'Extracted from social capture with user confirmation.',
    sourceUrls: draft.sourceSocialUrl ? [draft.sourceSocialUrl] : [draft.websiteUrl],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stars: draft.stars,
    trendingOnSocial: draft.trendingOnSocial ?? true,
    socialHighlights: draft.socialHighlights,
    proTips: draft.proTips,
    quickCommand: draft.quickCommand,
  };
}
