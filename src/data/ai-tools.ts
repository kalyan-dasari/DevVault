import { Resource } from '../types';

export const aiTools: Resource[] = [
  {
    id: 'free-llm-credits',
    slug: 'free-llm-credits',
    name: 'Free LLM Credits & Compute Directory',
    shortDescription:
      'Every verified platform giving out free LLM credits, permanent free tiers without credit cards, GPU compute, and startup grants with confidence tags.',
    longDescription: `A comprehensive, battle-tested directory tracking every provider giving out free LLM credits, permanent rate-limited free tiers (no credit card needed), self-serve trial credits, startup grants up to $1M (AWS, Google Cloud, Microsoft Founders Hub, NVIDIA Inception), and free GPU compute.

Features a curated guide on how to build a 100% $0/month AI development stack using Google AI Studio, Groq, NVIDIA NIM, and OpenRouter, plus critical safety audits on unverified third-party gateways.`,
    category: 'ai-tools',
    subcategory: 'AI Credits & Free Compute',
    type: 'repo',
    websiteUrl: 'https://github.com/Moh4696/free-llm-credits',
    githubUrl: 'https://github.com/Moh4696/free-llm-credits',
    documentationUrl: 'https://github.com/Moh4696/free-llm-credits#readme',
    pricingType: 'Open Source',
    pricingDescription:
      '100% Free & Open Source directory detailing $10,000+ in legitimate free developer AI credits and zero-credit-card LLM tiers.',
    freeTier:
      'Permanent free tiers across Google AI Studio, Groq, NVIDIA NIM, Mistral, GitHub Models, and Hugging Face.',
    features: [
      'Always-Free LLM Tiers with no credit card required (Google AI Studio, Groq, NVIDIA NIM, Mistral)',
      'Self-Serve Instant Trial Credits catalog (Modal, Baseten, Fireworks AI, SambaNova, Together AI)',
      'The Full AWS Stack Blueprint: $200 instant free tier tasks up to $200k Activate grants',
      'Startup & Accelerator Credit Portals (OpenAI, Anthropic Claude, Microsoft Founders Hub, Google for Startups)',
      'Free Cloud GPU & Compute options (Google Colab, Kaggle, Modal, Nosana)',
      'Student, Academic & Open Source Grants (Claude for OSS, GitHub Student Developer Pack)',
      'The $0/month Stacking Strategy for individual developers to never pay for tokens',
      'Security Warning Guide on unverified third-party prompt-logging gateways',
    ],
    useCases: [
      'Building and testing AI agents and LLM applications completely for $0',
      'Claiming instant free GPU credits for fine-tuning and inference without adding a credit card',
      'Unlocking startup credits (up to $200k) via Activate Org IDs from Brex/Mercury',
      'Finding reliable zero-cost fallbacks when one AI provider hits rate limits',
    ],
    tags: [
      'free-llm',
      'ai-credits',
      'gpu-compute',
      'free-tier',
      'llm-apis',
      'open-source',
      'startups',
      'groq',
      'nvidia-nim',
      'google-ai-studio',
    ],
    technologies: [
      'Python',
      'JSON',
      'Markdown',
      'OpenAI API',
      'Anthropic API',
      'AWS Bedrock',
      'Groq',
      'NVIDIA NIM',
    ],
    difficulty: 'Beginner',
    openSource: true,
    apiAvailable: true,
    selfHosted: false,
    featured: true,
    verified: true,
    lastVerified: '2026-08-04',
    verificationNotes:
      'Audited direct links, free-tier limits, and program requirements for all major AI cloud providers.',
    sourceUrls: ['https://github.com/Moh4696/free-llm-credits'],
    createdAt: '2026-08-04T00:00:00Z',
    updatedAt: '2026-08-04T00:00:00Z',

    // Social & Trending specific fields
    stars: '⭐ Curated Guide',
    starsCount: 500,
    trendingOnSocial: true,
    socialHighlights:
      'Viral developer cheat-sheet revealing how to get thousands of dollars in free AI compute and permanent zero-card LLM API access.',
    proTips: [
      'Individual $0 stack: Combine Google AI Studio (huge context) + Groq (ultra-fast inference) + NVIDIA NIM (open frontier models) for 100% free daily queries.',
      'A one-time $10 top-up on OpenRouter unlocks 1,000 requests/day on dozens of free open models permanently.',
      'Complete the 5 AWS onboarding tasks (launch EC2, configure RDS, deploy Lambda, test Bedrock, set budget) to instantly get $200 in usable credits.',
      'Avoid unverified third-party gateways promising unlimited free tokens—they may log sensitive prompts and resell access in violation of upstream terms.',
    ],
    quickCommand: 'git clone https://github.com/Moh4696/free-llm-credits.git',
    whyDevelopersLoveIt:
      'It provides a transparent, no-fluff roadmap to getting real, high-value AI compute and API credits without getting trapped by deceptive marketing or scam gateways.',
  },
];
