export type ResourceCategory =
  | 'github'
  | 'ai-tools'
  | 'apis'
  | 'developer-tools'
  | 'hosting'
  | 'student-benefits';

export type PricingType =
  | 'Free'
  | 'Freemium'
  | 'Paid'
  | 'Free Trial'
  | 'Open Source'
  | 'Student Benefit';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Resource {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: ResourceCategory;
  subcategory?: string;
  type:
    | 'tool'
    | 'repo'
    | 'api'
    | 'platform'
    | 'service'
    | 'dataset'
    | 'library'
    | 'student-benefit';
  logo?: string;
  websiteUrl: string;
  githubUrl?: string;
  documentationUrl?: string;
  pricingType: PricingType;
  pricingDescription?: string;
  freeTier?: string;
  studentBenefit?: string;
  limitations?: string;
  features: string[];
  useCases: string[];
  tags: string[];
  technologies: string[];
  difficulty?: DifficultyLevel;
  openSource: boolean;
  apiAvailable: boolean;
  selfHosted: boolean;
  featured: boolean;
  verified: boolean;
  lastVerified: string;
  verificationNotes?: string;
  sourceUrls: string[];
  createdAt: string;
  updatedAt: string;

  // Social & Trending specific fields
  stars?: string;
  starsCount?: number;
  trendingOnSocial?: boolean;
  socialHighlights?: string;
  proTips?: string[];
  quickCommand?: string;
  whyDevelopersLoveIt?: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  resourceIds: string[];
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StudentOffer {
  id: string;
  name: string;
  provider: string;
  category: string;
  benefitDescription: string;
  valueEstimate?: string;
  eligibility: string;
  verificationMethod: string;
  officialUrl: string;
  resourceSlug?: string;
  verified: boolean;
  lastVerified: string;
  isSampleData: boolean;
}

export interface CommunitySubmission {
  id: string;
  name: string;
  websiteUrl: string;
  githubUrl?: string;
  category: ResourceCategory;
  description: string;
  pricingType: PricingType;
  tags: string[];
  whyUseful: string;
  source: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  stars?: string;
  proTips?: string[];
}

export interface ResourceFilterState {
  searchQuery: string;
  category?: ResourceCategory | 'all';
  pricingType?: PricingType | 'all';
  openSourceOnly?: boolean;
  hasApiOnly?: boolean;
  selfHostedOnly?: boolean;
  studentBenefitOnly?: boolean;
  trendingOnSocialOnly?: boolean;
  hasTipsOnly?: boolean;
  difficulty?: DifficultyLevel | 'all';
  sortBy: 'featured' | 'stars' | 'alphabetical' | 'recent' | 'verified';
}
