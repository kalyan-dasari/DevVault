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
  {
    id: 'open-webui',
    slug: 'open-webui',
    name: 'Open WebUI',
    shortDescription:
      'The definitive open-source, self-hosted AI workspace & ChatGPT alternative with Ollama, OpenAI API, local RAG, multi-agent tools, and offline voice.',
    longDescription: `Open WebUI is an extensible, self-hosted AI platform and feature-rich ChatGPT alternative that runs 100% offline.

Supporting Ollama, LM Studio, Groq, vLLM, and all OpenAI-compatible APIs, it brings multi-model conversations, local RAG document search (hybrid BM25 + 9 vector databases), persistent memory, web browsing, voice/video calls with Whisper, image generation (DALL-E, ComfyUI, Automatic1111), and sandboxed agentic execution with Open Terminal.`,
    category: 'github',
    subcategory: 'Self-Hosted AI Workspaces',
    type: 'platform',
    websiteUrl: 'https://openwebui.com',
    githubUrl: 'https://github.com/open-webui/open-webui',
    documentationUrl: 'https://docs.openwebui.com',
    pricingType: 'Open Source',
    pricingDescription:
      '100% Free & Open Source for individuals and teams. Run locally on your own hardware with zero subscription fees.',
    freeTier:
      'Full-featured self-hosted platform: unlimited chats, local RAG, multi-model parallel chat, MCP tool plugins, and local voice.',
    features: [
      'Effortless 1-Command Docker Setup with bundled Ollama & CUDA support',
      'Broad Model Integration: Mix Ollama, LM Studio, Groq, vLLM & OpenAI endpoints',
      'Built-in Local RAG: Hybrid BM25 + Vector search across 9 databases (ChromaDB, PGVector, Qdrant)',
      'Multi-Model Parallel Chat: Compare multiple AI models in the same conversation side-by-side',
      'Agentic Execution: Sandboxed Open Terminal for AI code execution and script running',
      'Plugin & MCP System: Extend with filters, pipes, actions, and OpenAPI/MCP servers',
      'Voice & Video Calls: Hands-free voice chat with local Whisper STT and TTS engines',
      'Granular RBAC & Enterprise SSO: LDAP, OAuth, SCIM 2.0 provisioning, and multi-user groups',
    ],
    useCases: [
      'Replacing paid ChatGPT Plus and Team subscriptions with a private, self-hosted workspace',
      'Chatting securely with private enterprise documents, PDFs, and codebase repositories locally',
      'Running private local LLMs on GPU hardware with complete sovereign data ownership',
      'Building customized AI agents with specialized knowledge bases and automated terminal tools',
    ],
    tags: [
      'open-webui',
      'ollama',
      'chatgpt-alternative',
      'local-ai',
      'self-hosted',
      'rag',
      'mcp',
      'open-source',
      'docker',
    ],
    technologies: [
      'Svelte',
      'Python',
      'FastAPI',
      'Docker',
      'SQLite',
      'PostgreSQL',
      'ChromaDB',
      'Ollama',
    ],
    difficulty: 'Beginner',
    openSource: true,
    apiAvailable: true,
    selfHosted: true,
    featured: true,
    verified: true,
    lastVerified: '2026-08-01',
    verificationNotes:
      'Audited 105k+ star GitHub repository at open-webui/open-webui. Verified Docker container deployment, Ollama compatibility, and RAG pipelines.',
    sourceUrls: [
      'https://github.com/open-webui/open-webui',
      'https://openwebui.com',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',

    // Social & Trending specific fields
    stars: '105k+ ⭐',
    starsCount: 105000,
    trendingOnSocial: true,
    socialHighlights:
      'The undisputed king of self-hosted AI interfaces, viral on Instagram reels, Reddit, and TikTok as the #1 free local ChatGPT alternative that runs completely on your own machine.',
    proTips: [
      'Run `docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main` to launch in seconds.',
      'Type `#` in any chat to instantly upload documents or ground the conversation on URLs and web search.',
      'Use `ghcr.io/open-webui/open-webui:ollama` for a single all-in-one container that bundles both Open WebUI and Ollama with GPU acceleration.',
      'Set `HF_HUB_OFFLINE=1` when deploying in completely air-gapped environments for 100% sovereign offline privacy.',
    ],
    quickCommand:
      'docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main',
    whyDevelopersLoveIt:
      'Open WebUI provides the most polished, ChatGPT-grade UI for local AI with zero cloud lock-in, effortless RAG ingestion, and instant multi-model comparison.',
  },
  {
    id: 'ponytail',
    slug: 'ponytail',
    name: 'Ponytail',
    shortDescription:
      'Makes your AI agent think like the laziest senior dev in the room. Cuts 54% to 94% of unnecessary AI code bloat while staying 100% safe.',
    longDescription: `Ponytail is a viral AI agent skill and plugin that stops LLMs from over-engineering solutions. Instead of letting your AI agent install heavy dependencies or write 400 lines of boilerplate for simple UI tasks, Ponytail forces the agent through a strict 7-rung decision ladder: (1) Does this need to exist? (2) Is it already in this codebase? (3) Does stdlib do it? (4) Native platform feature? (5) Installed dependency? (6) One-liner? (7) Only then: minimum viable code.

Tested across Claude Code, Codex, Cursor, Antigravity, OpenCode, Qoder, and Devin, Ponytail delivers ~54% less code, ~20% lower API costs, and ~27% faster completions without sacrificing security, validation, or accessibility.`,
    category: 'github',
    subcategory: 'AI Coding Agent Skills & Optimization',
    type: 'repo',
    websiteUrl: 'https://github.com/DietrichGebert/ponytail',
    githubUrl: 'https://github.com/DietrichGebert/ponytail',
    documentationUrl: 'https://github.com/DietrichGebert/ponytail#how-it-works',
    pricingType: 'Open Source',
    pricingDescription: '100% Free & Open Source (MIT License).',
    freeTier:
      'Free for all supported agents (Claude Code, Cursor, Codex, Antigravity, Gemini CLI, OpenCode, Devin).',
    features: [
      '54% to 94% Code Reduction: Stops AI agents from generating bloatware and unnecessary packages',
      'Strict 7-Rung Decision Ladder: Prioritizes YAGNI, existing codebase reuse, stdlib, and native browser APIs',
      'Universal Agent Compatibility: Claude Code, Cursor, Codex CLI, Antigravity, OpenCode, Grok, Devin & Qoder',
      '100% Safety Guarantee: Never cuts trust boundaries, error handling, security checks, or accessibility',
      '20% Cost Reduction & 27% Faster: Cuts generated token volume for faster streaming and cheaper billing',
      '4 Optimization Levels: Switch modes on the fly via /ponytail lite, /ponytail full, or /ponytail ultra',
      'Codebase Auditing Tools: Includes /ponytail-review, /ponytail-audit, /ponytail-debt, and /ponytail-gain',
    ],
    useCases: [
      'Preventing Claude Code and Cursor from overcomplicating pull requests with unwanted npm packages',
      'Refactoring bloated legacy components down to native HTML5/CSS and built-in standard libraries',
      'Reducing LLM token usage and billable API costs during agentic pair-programming workflows',
      'Auditing existing codebases for accidental complexity and unnecessary technical debt',
    ],
    tags: [
      'agent-skills',
      'claude-code',
      'cursor-skill',
      'code-optimization',
      'minimalism',
      'antigravity',
      'yagni',
      'developer-tools',
      'open-source',
    ],
    technologies: [
      'JavaScript',
      'Node.js',
      'Python',
      'Markdown',
      'Shell',
      'Claude Code Plugin',
      'Cursor Hooks',
    ],
    difficulty: 'Beginner',
    openSource: true,
    apiAvailable: true,
    selfHosted: true,
    featured: true,
    verified: true,
    lastVerified: '2026-06-18',
    verificationNotes:
      'Audited real-world benchmarks on tiangolo/full-stack-fastapi-template. Verified multi-agent plugins across Claude Code, Codex, and Cursor.',
    sourceUrls: ['https://github.com/DietrichGebert/ponytail'],
    createdAt: '2026-05-01T00:00:00Z',
    updatedAt: '2026-06-18T00:00:00Z',

    // Social & Trending specific fields
    stars: '14.8k+ ⭐',
    starsCount: 14800,
    trendingOnSocial: true,
    socialHighlights:
      'Viral on tech Twitter and LinkedIn as the hilarious and brilliant AI plugin that makes Claude and Cursor act like the cynical senior engineer who deletes 200 lines instead of adding a new library.',
    proTips: [
      'In Claude Code, install with `/plugin marketplace add DietrichGebert/ponytail` then `/plugin install ponytail@ponytail`.',
      'In Antigravity CLI, install directly with `agy plugin install https://github.com/DietrichGebert/ponytail`.',
      'Use `/ponytail-review` on any PR to have your agent point out over-engineered abstractions and suggest native 1-liners.',
      'Switch to `/ponytail ultra` when refactoring legacy code for maximum dependency reduction.',
    ],
    quickCommand: 'agy plugin install https://github.com/DietrichGebert/ponytail',
    whyDevelopersLoveIt:
      'AI agents naturally suffer from verbosity bias and love writing 500 lines of code. Ponytail restores engineering sanity by enforcing "the best code is the code you never wrote."',
  },
];
