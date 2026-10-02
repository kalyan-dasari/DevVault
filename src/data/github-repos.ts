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
];
