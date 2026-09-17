import { Resource, ResourceCategory, ResourceFilterState } from '../types';
import { aiTools } from './ai-tools';
import { githubRepos } from './github-repos';
import { developerApis } from './apis';
import { developerTools } from './dev-tools';
import { hostingCloudResources } from './hosting-cloud';
import { learningResources } from './learning';

// Aggregate all resources into a single source of truth
export const allResources: Resource[] = [
  ...aiTools,
  ...githubRepos,
  ...developerApis,
  ...developerTools,
  ...hostingCloudResources,
  ...learningResources,
];

export interface CategoryInfo {
  id: ResourceCategory;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  count: number;
}

export const categoryMeta: CategoryInfo[] = [
  {
    id: 'ai-tools',
    name: 'AI Tools & Models',
    slug: 'ai-tools',
    description: 'Code copilots, local LLM runners, multimodal APIs, and inference engines.',
    iconName: 'Bot',
    count: aiTools.length,
  },
  {
    id: 'github',
    name: 'GitHub Repositories',
    slug: 'github',
    description: 'Battle-tested open-source repositories, developer toolkits, and starters.',
    iconName: 'GitBranch',
    count: githubRepos.length,
  },
  {
    id: 'apis',
    name: 'Developer APIs',
    slug: 'apis',
    description: 'Authentication, payments, transactional email, analytics, and weather APIs.',
    iconName: 'Zap',
    count: developerApis.length,
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    description: 'CLI terminals, native database GUIs, network tunnels, and design inspectors.',
    iconName: 'Wrench',
    count: developerTools.length,
  },
  {
    id: 'hosting',
    name: 'Hosting & Cloud',
    slug: 'hosting',
    description: 'Serverless edges, container PaaS, serverless databases, and VPS providers.',
    iconName: 'Cloud',
    count: hostingCloudResources.length,
  },
  {
    id: 'courses',
    name: 'Courses & Learning',
    slug: 'courses',
    description: 'Free university CS curricula, deep learning textbooks, and interactive coding tracks.',
    iconName: 'GraduationCap',
    count: learningResources.length,
  },
  {
    id: 'student-benefits',
    name: 'Student Pack & Benefits',
    slug: 'student-pack',
    description: 'Verified educational discounts, cloud credits, free domains, and student software.',
    iconName: 'Award',
    count: 10,
  },
  {
    id: 'project-ideas',
    name: 'Project Ideas',
    slug: 'projects',
    description: 'Curated software project concepts from 1st year to startup production apps.',
    iconName: 'Lightbulb',
    count: 10,
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

export function getFeaturedResources(limit: number = 8): Resource[] {
  return allResources.filter((r) => r.featured).slice(0, limit);
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
 */
export function searchResources(query: string, source: Resource[] = allResources): Resource[] {
  const q = query.trim().toLowerCase();
  if (!q) return source;

  // Exact phrase match score
  return source.filter((r) => {
    const inName = r.name.toLowerCase().includes(q);
    const inShort = r.shortDescription.toLowerCase().includes(q);
    const inLong = r.longDescription.toLowerCase().includes(q);
    const inCat = r.category.toLowerCase().includes(q);
    const inTags = r.tags.some((t) => t.toLowerCase().includes(q));
    const inTech = r.technologies.some((tech) => tech.toLowerCase().includes(q));
    const inUseCases = r.useCases.some((uc) => uc.toLowerCase().includes(q));
    const inPricing = r.pricingType.toLowerCase().includes(q) || (r.freeTier && r.freeTier.toLowerCase().includes(q));

    return inName || inShort || inLong || inCat || inTags || inTech || inUseCases || inPricing;
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
