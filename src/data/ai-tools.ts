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
  {
    id: 'list-of-free-google-ai-tools',
    slug: 'list-of-free-google-ai-tools',
    name: '15 Free Google AI Tools Directory',
    shortDescription:
      'The $300+/month AI stack Google quietly ships for free: 15 verified Google AI tools with transparent breakdowns of what is free, limits, and the catch.',
    longDescription: `An honest, transparent directory of 15 free Google AI tools and developer utilities worth $300+/month that Google provides at zero cost. Curated by @exploraX_, this collection breaks down exactly what's free, exact quota limits, and the catches for each tool.

Includes tools across coding (Gemini CLI, Gemini Code Assist, Jules, Antigravity), interface design & brand marketing (Stitch, Pomelli, Mixboard), research & multimedia (NotebookLM, Flow Music, Code Wiki), and no-code AI app workflows (Opal, Google AI Studio).`,
    category: 'ai-tools',
    subcategory: 'Free Google AI Stack',
    type: 'repo',
    websiteUrl: 'https://github.com/Moh4696/list-of-free-google-ai-tools',
    githubUrl: 'https://github.com/Moh4696/list-of-free-google-ai-tools',
    documentationUrl: 'https://github.com/Moh4696/list-of-free-google-ai-tools#readme',
    pricingType: 'Open Source',
    pricingDescription:
      '100% Free & Open Source (CC0-1.0 Public Domain). All 15 tools featured have legitimate free tiers.',
    freeTier:
      'Access to 15 full Google AI tools (Gemini Code Assist: 180k completions/mo, NotebookLM: 100 notebooks, Gemini CLI: unlimited with free key, Jules: 15 tasks/day).',
    features: [
      'Gemini Code Assist: Free 180,000 code completions/month & 240 chat requests/day for individuals',
      'Gemini CLI: Official open-source terminal agent with code execution & git PR support (npx @google/gemini-cli)',
      'NotebookLM: Free grounding on 50 sources/notebook, summaries, mind maps & AI audio podcast generation',
      'Jules: Autonomous cloud agent solving GitHub issues & submitting PRs (15 free tasks/day)',
      'Stitch: Google Labs AI interface generator outputting production HTML, CSS, Tailwind & Figma export',
      'Pomelli: Reverse-engineers brand DNA from websites to generate social media marketing campaigns',
      'Code Wiki: Gemini-powered interactive codebase explainer generating architecture & sequence diagrams',
      'Google AI Studio: Playground & API gateway with 1M-token context window & generous free rate limits',
    ],
    useCases: [
      'Replacing paid tools like GitHub Copilot, Cursor, Notion AI, Devin, and Canva with Google free tools',
      'Automating routine GitHub issues and repo PRs using Jules and Gemini CLI',
      'Synthesizing dense research papers and PDFs into audio overviews using NotebookLM',
      'Rapidly prototyping UI designs and landing pages using Stitch into Tailwind and Figma',
    ],
    tags: [
      'google-ai',
      'gemini',
      'gemini-cli',
      'notebooklm',
      'free-ai-tools',
      'code-assist',
      'jules',
      'stitch',
      'pomelli',
      'open-source',
    ],
    technologies: [
      'Google Gemini',
      'Gemini 3 Pro',
      'TypeScript',
      'Node.js',
      'Python',
      'Markdown',
      'Google Labs',
    ],
    difficulty: 'Beginner',
    openSource: true,
    apiAvailable: true,
    selfHosted: false,
    featured: true,
    verified: true,
    lastVerified: '2026-08-04',
    verificationNotes:
      'Audited all 15 Google AI tools, their beta availability, and free tier limits.',
    sourceUrls: ['https://github.com/Moh4696/list-of-free-google-ai-tools'],
    createdAt: '2026-08-04T00:00:00Z',
    updatedAt: '2026-08-04T00:00:00Z',

    // Social & Trending specific fields
    stars: '⭐ 15 Free Tools',
    starsCount: 450,
    trendingOnSocial: true,
    socialHighlights:
      'Viral on developer Twitter/X and Instagram as the curated secret list of 15 free Google AI tools that replace over $300/mo in paid SaaS subscriptions.',
    proTips: [
      'Run `npx @google/gemini-cli` to instantly get a terminal agent that reads your code and opens PRs using your free Google AI Studio key.',
      'Use NotebookLM to upload up to 50 PDFs/audio files per notebook to generate interactive audio podcast deep-dives for free.',
      'Gemini Code Assist offers individuals 180,000 free code completions/month in VS Code, JetBrains, and Cursor with zero credit card.',
      'Use Stitch (stitch.withgoogle.com) to generate responsive Tailwind code and Figma exports from natural language prompts.',
    ],
    quickCommand: 'npx @google/gemini-cli',
    whyDevelopersLoveIt:
      'Every single tool on the list includes an honest "catch" section describing exact daily caps, waitlists, and limitations, cutting through marketing hype to deliver real developer utility.',
  },
];
