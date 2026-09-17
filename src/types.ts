export type ResourceCategory =
  | 'ai-tools'
  | 'github'
  | 'apis'
  | 'developer-tools'
  | 'hosting'
  | 'databases'
  | 'auth'
  | 'payments'
  | 'email'
  | 'analytics'
  | 'monitoring'
  | 'testing'
  | 'devops'
  | 'cloud'
  | 'courses'
  | 'certifications'
  | 'datasets'
  | 'ui-ux'
  | 'icons'
  | 'fonts'
  | 'templates'
  | 'open-source'
  | 'student-benefits'
  | 'project-ideas';

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
    | 'course'
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
  duration?: string;
  eligibility?: string;
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

export interface StackLayer {
  layerName: string;
  role: string;
  recommendedResourceId: string;
  recommendedName: string;
  alternativeIds: string[];
}

export interface StackTemplate {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  difficulty: DifficultyLevel;
  layers: StackLayer[];
}

export type ProjectDifficulty =
  | '1st Year'
  | '2nd Year'
  | '3rd Year'
  | 'Final Year'
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced';

export type ProjectCategory =
  | 'AI/ML'
  | 'Web Development'
  | 'Developer Tools'
  | 'Mobile'
  | 'IoT'
  | 'Data Science'
  | 'Open Source'
  | 'Hackathon'
  | 'Startup';

export interface ProjectIdea {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: ProjectDifficulty;
  category: ProjectCategory;
  technologies: string[];
  features: string[];
  whatYouLearn: string[];
  suggestedResourceSlugs: string[];
  estimatedHours: string;
}

export interface LearningPathStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  recommendedResourceSlugs: string[];
  actionableAdvice: string;
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  iconName: string;
  category: string;
  steps: LearningPathStep[];
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
}

export interface ResourceFilterState {
  searchQuery: string;
  category?: ResourceCategory | 'all';
  pricingType?: PricingType | 'all';
  openSourceOnly?: boolean;
  hasApiOnly?: boolean;
  selfHostedOnly?: boolean;
  studentBenefitOnly?: boolean;
  difficulty?: DifficultyLevel | 'all';
  sortBy: 'featured' | 'alphabetical' | 'recent' | 'verified';
}
