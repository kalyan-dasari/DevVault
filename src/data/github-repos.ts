import { Resource } from '../types';

export const githubRepos: Resource[] = [
  {
    id: 'voicestudio',
    slug: 'voicestudio',
    name: 'VoiceStudio',
    shortDescription:
      'The open-source, fully-local ElevenLabs alternative for instant voice cloning, multi-speaker TTS, video dubbing, and audiobook creation across 646 languages.',
    longDescription: `VoiceStudio is a local-first audio workstation and open-source alternative to ElevenLabs. Built with Electron, Python, Bun, and Rust, it allows developers, creators, and audio engineers to clone voices from short audio clips, design synthetic voices, generate multi-speaker dialogs, perform automatic video dubbing, transcribe, and produce complete audiobooks.

Powered by the high-performance OmniVoice engine, it runs 100% offline with full GPU acceleration (NVIDIA CUDA, Apple Silicon MLX) with zero subscription fees, no telemetry, and complete data privacy.`,
    category: 'github',
    subcategory: 'Voice AI & Speech Synthesis',
    type: 'repo',
    websiteUrl: 'https://voicestudio.sh',
    githubUrl: 'https://github.com/debpalash/VoiceStudio',
    documentationUrl: 'https://voicestudio.sh/docs',
    pricingType: 'Open Source',
    pricingDescription:
      '100% Free & Open Source (AGPL-3.0 License). No subscriptions, tokens, or cloud fees.',
    freeTier:
      'Completely free and unlimited local generation. Zero API keys or cloud accounts needed.',
    features: [
      'Zero-Shot Voice Cloning from 5-second audio samples',
      'Custom Synthetic Voice Designer with pitch, emotion & speed modulation',
      'Automated Video Dubbing with subtitle sync and multi-speaker tracks',
      'Multi-Speaker Dialogue Generator for podcasts and audio dramas',
      'Batch Long-Form Audiobook Creator with chapter splitting',
      'Speech-to-Text & Automatic Transcription in 646 languages',
      '100% Local & Offline (Runs on Apple Silicon MLX & NVIDIA CUDA)',
      'Modern Electron + Bun + Python + Rust architecture with REST API',
    ],
    useCases: [
      'Creating AI voiceovers for YouTube, TikTok, and Instagram reels without recurring SaaS fees',
      'Dubbing international videos and lectures into 600+ localized languages',
      'Building multi-character podcast dramas and interactive NPC game dialogues',
      'Self-hosting an offline ElevenLabs alternative inside private enterprise infrastructure',
      'Narrating full-length audiobooks from PDF and EPUB files locally',
    ],
    tags: [
      'voice-cloning',
      'text-to-speech',
      'tts',
      'elevenlabs-alternative',
      'local-ai',
      'speech-synthesis',
      'dubbing',
      'audiobook',
      'open-source',
      'cuda',
      'mlx',
    ],
    technologies: ['Electron', 'Bun', 'Python', 'Rust', 'PyTorch', 'CUDA', 'Apple MLX', 'FastAPI'],
    difficulty: 'Beginner',
    openSource: true,
    apiAvailable: true,
    selfHosted: true,
    featured: true,
    verified: true,
    lastVerified: '2025-02-15',
    verificationNotes:
      'Verified open-source repository at debpalash/VoiceStudio. Successfully audited AGPL-3.0 license, local offline execution, and active releases.',
    sourceUrls: [
      'https://github.com/debpalash/VoiceStudio',
      'https://voicestudio.sh',
    ],
    createdAt: '2025-02-01T00:00:00Z',
    updatedAt: '2025-02-15T00:00:00Z',

    // Social & Trending specific fields
    stars: '51.7k+ ⭐',
    starsCount: 51700,
    trendingOnSocial: true,
    socialHighlights:
      'Trending virally across Instagram reels and TikTok as the #1 free local ElevenLabs alternative that lets you clone any voice in 5 seconds with zero monthly subscriptions.',
    proTips: [
      'Run `curl -fsSL https://voicestudio.sh/install | sh` for a 1-command installer on macOS and Linux.',
      'Use clean, isolated 5-10 second reference audio with minimal background reverb for the highest quality voice clone.',
      'On Apple Silicon Macs (M1/M2/M3/M4), select the MLX backend in settings for 4x faster generation with unified memory.',
      'Integrate directly with local coding agents via skills using `npx skills add debpalash/VoiceStudio`.',
    ],
    quickCommand: 'curl -fsSL https://voicestudio.sh/install | sh',
    whyDevelopersLoveIt:
      'VoiceStudio eliminates the expensive per-character pricing of commercial TTS APIs. It gives you studio-grade voice cloning and dubbing that runs completely offline on your own GPU with zero data leakage.',
  },
  {
    id: 'archify',
    slug: 'archify',
    name: 'Archify',
    shortDescription:
      'The viral #1 GitHub trending agent skill that turns plain-text prompts & codebases into interactive, verifiable architecture, sequence, and data-flow diagrams with motion and HTML export.',
    longDescription: `Archify is a viral open-source AI agent skill that transforms natural language descriptions and codebase analysis into beautiful, interactive, and verifiable architecture diagrams. Unlike static Mermaid charts or generic auto-layout tools, Archify generates self-contained, interactive HTML diagrams with dark/light theme switching, animated route tracing, upstream/downstream dependency reach, trust boundaries, and crisp PNG/SVG export.

Works natively across Cursor, Claude Code, Codex CLI, OpenCode, and Antigravity via a single command: \`npx skills add tt-a1i/archify -g\`.`,
    category: 'github',
    subcategory: 'Diagrams as Code & Agent Skills',
    type: 'repo',
    websiteUrl: 'https://tt-a1i.github.io/archify/',
    githubUrl: 'https://github.com/tt-a1i/archify',
    documentationUrl: 'https://tt-a1i.github.io/archify/gallery.html',
    pricingType: 'Open Source',
    pricingDescription: '100% Free & Open Source (MIT License).',
    freeTier:
      'Completely free and unlimited local generation. Outputs standalone, zero-dependency HTML files.',
    features: [
      '#1 on GitHub Trending weekly all-language repository leaderboard',
      'Turns single prompt or repo codebase into interactive architecture diagrams',
      'Self-Contained Standalone HTML: Zero runtime dependencies needed to view or share',
      'Animated Path & Route Tracing with upstream/downstream reach highlighting',
      'Native Integration with Cursor, Claude Code, Codex CLI, OpenCode, and Antigravity',
      'Typed JSON Intermediate Representation (IR) with atomic schema & layout validation',
      'Crisp 1200x630 social share cards and full-resolution PNG/SVG clipboard export',
      'Includes 5 diagram modes: Architecture, Workflow, Sequence, Data Flow, and Lifecycle',
    ],
    useCases: [
      'Visualizing complex backend microservices, Redis caching layers, and database queries',
      'Generating interactive architecture maps of unfamiliar GitHub codebases for team onboarding',
      'Exporting high-resolution animated architecture diagrams for technical blog posts & PR reviews',
      'Embedding interactive system maps and workflow diagrams into documentation without Mermaid syntax limits',
    ],
    tags: [
      'architecture-as-code',
      'diagrams',
      'agent-skills',
      'cursor-skill',
      'system-design',
      'mermaid-alternative',
      'open-source',
      'trending-github',
      'interactive-html',
    ],
    technologies: [
      'JavaScript',
      'TypeScript',
      'Node.js',
      'SVG',
      'HTML5',
      'CSS3',
      'Agent Skills',
    ],
    difficulty: 'Beginner',
    openSource: true,
    apiAvailable: true,
    selfHosted: true,
    featured: true,
    verified: true,
    lastVerified: '2026-09-28',
    verificationNotes:
      'Verified stable release v3.0.1, audited MIT license, #1 GitHub Trending leaderboard status, and verified npx skill installation.',
    sourceUrls: [
      'https://github.com/tt-a1i/archify',
      'https://tt-a1i.github.io/archify/',
    ],
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-09-28T00:00:00Z',

    // Social & Trending specific fields
    stars: '38.5k+ ⭐ (#1 Trending)',
    starsCount: 38500,
    trendingOnSocial: true,
    socialHighlights:
      'Ranked #1 on GitHub Trending all-language worldwide list and shared virally across developer Twitter/X and Instagram as the ultimate interactive replacement for Mermaid diagrams.',
    proTips: [
      'Install globally into any coding agent with `npx skills add tt-a1i/archify -g`.',
      'Prompt your agent: "Analyze this repo, then use Archify to create a high-level runtime architecture diagram showing 8–12 core components, external dependencies, and trust boundaries."',
      'Export generated diagrams directly as 1200×630 Route Share Cards for PR reviews and tech Twitter posts.',
      'Click any node in the generated HTML to inspect its upstream and downstream reach with live animated path tracing.',
    ],
    quickCommand: 'npx skills add tt-a1i/archify -g',
    whyDevelopersLoveIt:
      'Archify solves the ugly, static auto-layout frustration of Mermaid and Graphviz by giving coding agents layout judgment, interactive route tracing, and self-contained interactive HTML exports.',
  },
];
