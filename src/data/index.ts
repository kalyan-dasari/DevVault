import { Resource, ResourceCategory, ResourceFilterState } from '../types';
import { aiTools } from './ai-tools';
import { githubRepos } from './github-repos';
import { developerApis } from './apis';
import { developerTools } from './dev-tools';
import { hostingCloudResources } from './hosting-cloud';

// Aggregate all resources into a single clean source of truth
export const allResources: Resource[] = [
  ...githubRepos,
  ...aiTools,
  ...developerApis,
  ...developerTools,
  ...hostingCloudResources,
];

export interface CategoryInfo {
  id: ResourceCategory;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  count: number;
  badge?: string;
}

export const categoryMeta: CategoryInfo[] = [
  {
    id: 'github',
    name: 'Trending GitHub Repos',
    slug: 'github',
    description: 'Viral open-source repositories trending on Instagram, high star counts, and battle-tested codebases.',
    iconName: 'GitBranch',
    count: githubRepos.length,
    badge: '⭐ TOP PRIORITY',
  },
  {
    id: 'ai-tools',
    name: 'Free & Open Source AI',
    slug: 'ai-tools',
    description: 'Local LLM runners, reasoning models (DeepSeek, Ollama), free AI gateways, and open weights.',
    iconName: 'Bot',
    count: aiTools.length,
    badge: '🤖 FREE & OSS',
  },
  {
    id: 'apis',
    name: 'Free Developer APIs',
    slug: 'apis',
    description: 'Generous free tier APIs for auth, payments, database backends, transactional email, and analytics.',
    iconName: 'Zap',
    count: developerApis.length,
  },
  {
    id: 'developer-tools',
    name: 'Free Developer Utilities',
    slug: 'developer-tools',
    description: 'CLI terminals, Postman alternatives, database GUIs, network tunnels, and code inspectors.',
    iconName: 'Wrench',
    count: developerTools.length,
  },
  {
    id: 'hosting',
    name: 'Free & Freemium Hosting',
    slug: 'hosting',
    description: 'Serverless edges, container PaaS (Coolify, Render), Postgres databases, and zero-cost static hosting.',
    iconName: 'Cloud',
    count: hostingCloudResources.length,
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return allResources.find((r) => r.slug.toLowerCase() === slug.toLowerCase());
}

export function getResourceById(id: string): Resource | undefined {
  return allResources.find((r) => r.id === id);
}

export function getResourcesByCategory(category: ResourceCategory): Resource[] {
  return allResources.filter((r) => r.category === category);
}

export function getFeaturedResources(limit: number = 6): Resource[] {
  return allResources.filter((r) => r.featured).slice(0, limit);
}

export function getTrendingSocialRepos(): Resource[] {
  return allResources.filter((r) => r.trendingOnSocial || r.category === 'github');
}

export function getProTipsResources(): Resource[] {
  return allResources.filter((r) => r.proTips && r.proTips.length > 0);
}

export function getRelatedResources(resource: Resource, limit: number = 4): Resource[] {
  return allResources
    .filter(
      (r) =>
        r.id !== resource.id &&
        (r.category === resource.category ||
          r.tags.some((tag) => resource.tags.includes(tag)))
    )
    .slice(0, limit);
}

/**
 * Natural search across:
 * - Resource name
 * - Description
 * - Category
 * - Tags
 * - Technologies
 * - Use cases
 * - Pro tips & viral notes
 */
export function searchResources(query: string, source: Resource[] = allResources): Resource[] {
  const q = query.trim().toLowerCase();
  if (!q) return source;

  return source.filter((r) => {
    const inName = r.name.toLowerCase().includes(q);
    const inShort = r.shortDescription.toLowerCase().includes(q);
    const inLong = r.longDescription.toLowerCase().includes(q);
    const inCat = r.category.toLowerCase().includes(q);
    const inTags = r.tags.some((t) => t.toLowerCase().includes(q));
    const inTech = r.technologies.some((tech) => tech.toLowerCase().includes(q));
    const inUseCases = r.useCases.some((uc) => uc.toLowerCase().includes(q));
    const inPricing = r.pricingType.toLowerCase().includes(q) || (r.freeTier && r.freeTier.toLowerCase().includes(q));
    const inStars = r.stars ? r.stars.toLowerCase().includes(q) : false;
    const inSocial = r.socialHighlights ? r.socialHighlights.toLowerCase().includes(q) : false;
    const inTips = r.proTips ? r.proTips.some((tip) => tip.toLowerCase().includes(q)) : false;

    return inName || inShort || inLong || inCat || inTags || inTech || inUseCases || inPricing || inStars || inSocial || inTips;
  });
}

/**
 * Comprehensive multi-faceted filtering
 */
export function filterResources(
  filters: ResourceFilterState,
  source: Resource[] = allResources
): Resource[] {
  let result = source;

  // Search query
  if (filters.searchQuery.trim()) {
    result = searchResources(filters.searchQuery, result);
  }

  // Category filter
  if (filters.category && filters.category !== 'all') {
    result = result.filter((r) => r.category === filters.category);
  }

  // Pricing filter
  if (filters.pricingType && filters.pricingType !== 'all') {
    result = result.filter((r) => {
      if (filters.pricingType === 'Free') {
        return r.pricingType === 'Free' || r.pricingType === 'Open Source';
      }
      return r.pricingType === filters.pricingType;
    });
  }

  // Trending on social / Instagram only
  if (filters.trendingOnSocialOnly) {
    result = result.filter((r) => r.trendingOnSocial);
  }

  // Has actionable tips & tricks only
  if (filters.hasTipsOnly) {
    result = result.filter((r) => Boolean(r.proTips && r.proTips.length > 0));
  }

  // Open Source only
  if (filters.openSourceOnly) {
    result = result.filter((r) => r.openSource);
  }

  // Has API only
  if (filters.hasApiOnly) {
    result = result.filter((r) => r.apiAvailable);
  }

  // Self-hosted only
  if (filters.selfHostedOnly) {
    result = result.filter((r) => r.selfHosted);
  }

  // Student benefit only
  if (filters.studentBenefitOnly) {
    result = result.filter((r) => Boolean(r.studentBenefit) || r.pricingType === 'Student Benefit');
  }

  // Difficulty level
  if (filters.difficulty && filters.difficulty !== 'all') {
    result = result.filter((r) => r.difficulty === filters.difficulty);
  }

  // Sorting
  result = sortResources(result, filters.sortBy);

  return result;
}

export function sortResources(
  resources: Resource[],
  sortBy: ResourceFilterState['sortBy']
): Resource[] {
  const cloned = [...resources];
  switch (sortBy) {
    case 'stars':
      return cloned.sort((a, b) => (b.starsCount || 0) - (a.starsCount || 0));
    case 'featured':
      return cloned.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    case 'alphabetical':
      return cloned.sort((a, b) => a.name.localeCompare(b.name));
    case 'recent':
      return cloned.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    case 'verified':
      return cloned.sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0));
    default:
      return cloned;
  }
}
