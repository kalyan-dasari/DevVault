# DevVault

> The developer resource vault you wish you had when you started coding. Centralized, searchable, and organized developer tools, repos, APIs, and student benefits.

**DevVault** is a frontend-only (React + Vite) web app that curates free and freemium developer resources into one searchable vault. It includes a **My Vault** save/bookmark system (localStorage), **Stack Builder** (prebuilt tech stacks), **Student Pack** benefits, **Project Ideas**, **Learning Paths**, and an AI-assisted "I saw this" import tool.

---

## What's Inside the Site

| Page | Route | What it does |
|------|-------|--------------|
| Home | `/` | Landing page with featured resources & categories |
| Explore | `/explore` | Search + filter all curated resources (by pricing, open-source, API, self-hosted, difficulty) |
| Resource Detail | `/resource/:slug` | Full page for each resource (features, use cases, pricing, verification) |
| Stack Builder | `/stack-builder` | 5 prebuilt stack templates (AI SaaS, Dev Tool, Portfolio, Hackathon, RAG) |
| Student Pack | `/student-pack` | Student discounts & free benefits with verification |
| Project Ideas | `/project-ideas` | 10 buildable project ideas (1st year → final year) |
| My Vault | `/my-vault` | Personal saved resources & collections (stored locally in the browser) |
| Social Import | `/social-import` | "I saw this" — save a tool from Instagram/YouTube/Reel captions |
| Contribute | `/contribute` | Submit a new resource to the community |
| Open Source | `/open-source` | Community open-source page entry |

**Totals today:** 81 curated resources • 10 student offers • 10 project ideas • 5 stack templates • 4 learning paths

---

## Content Inventory (Review & Remove)

Use the checkboxes to mark what to **keep** / **remove**. Tick = keep, untick = remove. Edit the file `src/data/*.ts` to actually delete an item.

### 🤖 AI Tools & Models — 20 items
`src/data/ai-tools.ts`

| Keep? | Name | Type | Pricing | Description |
|-------|------|------|---------|-------------|
| [ ] | Cursor | Code Editor | Freemium | AI-first VS Code fork with multi-file edits, codebase indexing, Copilot++ |
| [ ] | v0 by Vercel | UI Generation | Freemium | Prompt → accessible React + Tailwind + shadcn/ui components |
| [ ] | Ollama | Local LLMs | Open Source | Run Llama 3, Mistral, Gemma locally; OpenAI-compatible API |
| [ ] | Groq Cloud | Inference Engine | Freemium | 500+ tokens/sec LPU inference for open models |
| [ ] | Claude 3.5 Sonnet | Foundation Model | Freemium | Anthropic's reasoning/coding model with Artifacts sandbox |
| [ ] | Hugging Face | AI Hub | Freemium | 500k+ open models, datasets, Spaces demos |
| [ ] | Google Gemini API | Multimodal API | Freemium | Up to 2M token context, native audio/video/PDF |
| [ ] | ElevenLabs | Voice & Audio | Freemium | Realistic TTS, voice cloning, sound effects (10k chars/mo free) |
| [ ] | Replicate | Cloud ML API | Freemium | Run open-source models (FLUX, Whisper) serverless, pay-per-second |
| [ ] | LangChain | Agent Framework | Open Source | RAG + agent framework (Python + JS), MIT |
| [ ] | ChromaDB | Vector Database | Open Source | Embedding database for fast local RAG retrieval |
| [ ] | LM Studio | Desktop Tool | Free | GUI to run local GGUF LLMs + local OpenAI server |
| [ ] | Continue | IDE Extension | Open Source | Plug-and-play AI code assistant for any model/API |
| [ ] | Perplexity AI | Search & Research | Freemium | Answer engine with citations + developer API (Sonar) |
| [ ] | Mistral AI | Foundation Model | Freemium | European open-weights models + Codestral API |
| [ ] | DeepSeek Coder | Code Generation | Open Source | Cheap (~$0.14/M tokens) open coding model, 128K context |
| [ ] | OpenAI Whisper | Speech-to-Text | Open Source | 680k-hour multilingual speech recognition, runs offline |
| [ ] | Phind | Developer Search | Freemium | AI search tuned for dev / technical queries |
| [ ] | Together AI | Cloud ML API | Freemium | 100+ open models, fine-tuning/LoRA, GPU clusters |
| [ ] | Bolt.new (StackBlitz) | Fullstack Prototyping | Freemium | In-browser AI full-stack web dev via WebContainers |

### 🐙 GitHub Repositories — 20 items
`src/data/github-repos.ts`

| Keep? | Name | Category | Pricing | Description |
|-------|------|----------|---------|-------------|
| [ ] | Supabase | BaaS | Open Source | Firebase alternative: Postgres, Auth, Realtime, Storage |
| [ ] | shadcn/ui | UI Library | Open Source | Copy-paste accessible React components (Radix + Tailwind) |
| [ ] | FastAPI | Backend Framework | Open Source | Python API framework with auto Swagger docs |
| [ ] | Excalidraw | Dev Tooling | Open Source | Hand-drawn style collaborative whiteboard |
| [ ] | Drizzle ORM | Database Tooling | Open Source | Type-safe TS/SQL ORM, zero overhead |
| [ ] | Cal.com | Productivity | Open Source | Self-hostable Calendly alternative |
| [ ] | tRPC | API Framework | Open Source | End-to-end typesafe APIs with zero codegen |
| [ ] | Coolify | PaaS & DevOps | Open Source | Self-hosted Heroku/Netlify alt on any VPS |
| [ ] | Appwrite | BaaS | Open Source | Auth, DB, Functions, Storage for Flutter/Web |
| [ ] | Build Your Own X | Learning | Open Source | Build Git, Docker, OS, DB from scratch |
| [ ] | Developer Roadmap | Learning | Open Source | roadmap.sh visual career paths |
| [ ] | Strapi | Headless CMS | Open Source | JS/TS headless CMS with auto REST/GraphQL |
| [ ] | Novu | Notifications | Open Source | Unified In-App/Push/Email/SMS notifications |
| [ ] | freeCodeCamp | Learning | Free | 10+ free verified coding certifications |
| [ ] | Next.js | Frontend Framework | Open Source | React framework with RSC, SSR, SSG |
| [ ] | PaperMC | Game Dev | Open Source | High-performance Minecraft server software |
| [ ] | Payload CMS | Headless CMS | Open Source | TS-first CMS native to Next.js |
| [ ] | Lucide Icons | Design & Icons | Open Source | 1,400+ clean SVG icons |
| [ ] | AFFiNE | Productivity | Open Source | Notion/Miro alternative, offline-first |
| [ ] | Twenty | Business & CRM | Open Source | Developer-friendly Salesforce alternative |

### ⚡ Developer APIs — 15 items
`src/data/apis.ts`

| Keep? | Name | Category | Pricing | Description |
|-------|------|----------|---------|-------------|
| [ ] | Resend | Email | Freemium | React Email templates, 3,000 emails/mo free |
| [ ] | Clerk Authentication | Auth | Freemium | 10k MAU free, passkeys, React components |
| [ ] | PostHog | Analytics | Freemium | 1M events/mo free: analytics, session replay, flags |
| [ ] | Stripe API | Payments | Freemium | Payment infra, subscriptions (~2.9% + 30¢) |
| [ ] | Upstash | Databases & Cache | Freemium | Serverless Redis/Kafka/Vector, 10k cmd/day free |
| [ ] | OpenWeatherMap API | Data | Freemium | Weather data, 1,000 calls/day free |
| [ ] | Unsplash API | Media & Photos | Free | 5M+ free HD photos, 50 req/hr demo |
| [ ] | Sentry | Monitoring | Freemium | 5k errors/mo free, GitHub Student: 500k/mo |
| [ ] | Cloudinary | Media & Storage | Freemium | URL-based image/video transformations, 25 credits/mo free |
| [ ] | GitHub REST & GraphQL API | Developer | Free | Repos, issues, PRs; 5k req/hr free |
| [ ] | PokéAPI | Public API | Free | No-key Pokémon data API — great beginner sandbox |
| [ ] | CoinGecko Crypto API | Finance | Freemium | 10k+ coins market data, 30 calls/min free |
| [ ] | Twilio API | Communications | Freemium | SMS/voice/WhatsApp/Verify; trial credit + $50 student |
| [ ] | Mapbox API | Maps & Location | Freemium | Vector maps + geocoding, 50k loads/mo free |
| [ ] | Algolia Search API | Search | Freemium | Typo-tolerant instant search, 10k/mo free |

### 🛠️ Developer Tools — 10 items
`src/data/dev-tools.ts`

| Keep? | Name | Category | Pricing | Description |
|-------|------|----------|---------|-------------|
| [ ] | Bruno | API Testing | Open Source | Offline-first, Git-friendly Postman alternative |
| [ ] | Raycast | Launcher | Freemium | macOS Spotlight replacement, TS extensions |
| [ ] | ngrok | Networking | Freemium | Public HTTPS URLs for localhost tunnels |
| [ ] | Warp Terminal | Terminal | Freemium | Rust-based AI terminal with block output |
| [ ] | OrbStack | Containers | Freemium | Fast lightweight Docker Desktop alternative (macOS) |
| [ ] | TablePlus | Database GUI | Freemium | Native PostgreSQL/MySQL/SQLite/Redis client |
| [ ] | Figma Dev Mode | Design | Freemium | Design inspection → CSS/Swift/XML |
| [ ] | GitLens | IDE Extension | Freemium | Git blame, commit graph in VS Code |
| [ ] | Insomnia | API Testing | Freemium | REST/GraphQL/gRPC/WebSocket client |
| [ ] | Docker Desktop | DevOps | Freemium | Containers, Compose, Kubernetes, scanning |

### ☁️ Hosting & Cloud — 9 items
`src/data/hosting-cloud.ts`

| Keep? | Name | Category | Pricing | Description |
|-------|------|----------|---------|-------------|
| [ ] | Vercel | Frontend Cloud | Freemium | Next.js deploys, preview URLs, 100GB free |
| [ ] | Cloudflare Pages & Workers | Edge Cloud | Freemium | 100k Worker req/day + free static hosting |
| [ ] | Railway | Fullstack PaaS | Freemium | Push-to-deploy backends, managed Postgres/Redis |
| [ ] | Render | Cloud PaaS | Freemium | Free static + web services + free Postgres |
| [ ] | Fly.io | MicroVMs | Freemium | Global Firecracker microVMs, 3 free VMs |
| [ ] | Neon | Serverless DB | Freemium | Postgres with Instant branching + pgvector |
| [ ] | Netlify | Web Hosting | Freemium | Jamstack deploys, forms, edge functions |
| [ ] | Hetzner Cloud | Infra | Paid | Cheap EU VPS (~€4/mo) — use with Coolify |
| [ ] | Koyeb | Serverless PaaS | Freemium | Global deploy + GPU instances, free hobby tier |

### 🎓 Courses & Learning — 7 items
`src/data/learning.ts`

| Keep? | Name | Category | Pricing | Description |
|-------|------|----------|---------|-------------|
| [ ] | Full Stack Open | Full Stack | Free | Univ. of Helsinki React/Node/TS/CI-CD course |
| [ ] | The Odin Project | Web Dev | Free | Zero-to-Job full-stack curriculum |
| [ ] | Harvard CS50x | Computer Science | Free | Intro to CS, free certificate |
| [ ] | Fast.ai Practical DL | AI/ML | Free | Top-down hands-on deep learning |
| [ ] | Exercism | Practice | Free | 70+ language tracks + human mentoring |
| [ ] | web.dev by Google | Web Standards | Free | Performance, a11y, PWA guides |
| [ ] | MIT OpenCourseWare | University CS | Free | MIT CS lecture notes + problem sets |

### 🎁 Student Pack & Benefits — 10 items
`src/data/student-pack.ts`

| Keep? | Name | Provider | Value |
|-------|------|----------|-------|
| [ ] | GitHub Pro & Copilot Access | GitHub | ~$10/mo |
| [ ] | JetBrains All Products Pack | JetBrains | ~$289/yr |
| [ ] | DigitalOcean Cloud Credits | DigitalOcean | $200 credit |
| [ ] | Namecheap Free .ME Domain | Namecheap | ~$18 |
| [ ] | Sentry Performance & Error Tracking | Sentry | ~$26/mo |
| [ ] | 1Password Developer Subscription | 1Password | ~$36/yr |
| [ ] | Canva Pro for Students | Canva | ~$120/yr |
| [ ] | Bootstrap Studio Desktop License | Bootstrap Studio | ~$60 one-time |
| [ ] | Frontend Masters 6-Month Membership | Frontend Masters | ~$234 |
| [ ] | Datadog Infrastructure Monitoring | Datadog | ~$360/yr |

### 💡 Project Ideas — 10 items
`src/data/project-ideas.ts` (1st Year → Final Year)

| Keep? | Idea | Difficulty | Stack highlights |
|-------|------|------------|------------------|
| [ ] | Terminal-Based Developer Knowledge CLI | 1st Year | Python, SQLite, Git |
| [ ] | Developer Link-In-Bio & Micro-Portfolio | 1st Year | React, Vite, GitHub API |
| [ ] | Interactive Global Weather Radar Dashboard | 2nd Year | Mapbox, OpenWeather, Chart.js |
| [ ] | Lightweight Serverless Uptime & Status Page | 2nd Year | GitHub Actions, Astro, Vercel |
| [ ] | Student Hackathon Team Finder | 2nd Year | Next.js, Supabase, Clerk |
| [ ] | AI Audio Meeting Summarizer & Tracker | 3rd Year | Whisper, FastAPI, Resend |
| [ ] | Local Privacy-Preserving Document Q&A (RAG) | 3rd Year | Ollama, ChromaDB, LangChain |
| [ ] | Realtime Collaborative Whiteboard | Final Year | Canvas, WebSockets, tRPC |
| [ ] | Multi-Tenant API Gateway w/ Rate Limiting | Final Year | Go, Redis, Stripe |
| [ ] | Smart Home Environmental Sensor Hub | Final Year | ESP32, MQTT, Grafana |

### 🧱 Stack Templates — 5 items
`src/data/stacks.ts`

| Keep? | Stack | Difficulty | Purpose |
|-------|-------|------------|---------|
| [ ] | Modern AI SaaS Stack | Intermediate | Ship profitable AI apps fast |
| [ ] | Open Source Developer Tool Stack | Intermediate | Zero cloud lock-in dev tools |
| [ ] | Zero-Cost Modern Developer Portfolio | Beginner | 100% free portfolio hosting |
| [ ] | College Capstone / Hackathon Stack | Beginner | Working demo in 48h |
| [ ] | Autonomous AI Agent & RAG Pipeline | Advanced | RAG + agent workflows |

### 🗺️ Learning Paths — 4 items
`src/data/learning-paths.ts`

| Keep? | Path | Category |
|-------|------|----------|
| [ ] | Modern Frontend Engineer | Web Development |
| [ ] | Backend & Systems Architect | Backend & Systems |
| [ ] | AI & Machine Learning Engineer | AI / ML |
| [ ] | Indie Hacker & Solo Founder | Entrepreneurship |

---

## Tech Stack

- **React 19** + **TypeScript** (~5.8)
- **Vite 6** builder
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **React Router 7** for routing
- **lucide-react** icons, **motion** (Framer Motion) animations
- **Local-first storage** — saves live in browser localStorage (VaultContext), no backend required
- Optional **Google Gemini API** server-side hook (`@google/genai`) for the social-import page (see `.env.example`)

## Getting Started

```bash
# install dependencies (bun or npm)
bun install        # or: npm install

# start dev server on http://localhost:3000
bun run dev        # or: npm run dev

# production build
bun run build

# typecheck / lint
bun run lint
```

## How to Add / Remove Resources (Daily)

All site content lives in `src/data/` as plain TypeScript arrays:

| Edit this file | To change |
|----------------|-----------|
| `src/data/ai-tools.ts` | AI tools & models |
| `src/data/github-repos.ts` | GitHub repos |
| `src/data/apis.ts` | APIs |
| `src/data/dev-tools.ts` | Dev tools |
| `src/data/hosting-cloud.ts` | Hosting & cloud |
| `src/data/learning.ts` | Courses |
| `src/data/student-pack.ts` | Student benefits |
| `src/data/project-ideas.ts` | Project ideas |
| `src/data/stacks.ts` | Stack templates |
| `src/data/learning-paths.ts` | Learning paths |
| `src/data/index.ts` | Category metadata + counts |

**To add a resource** — copy an existing object in the relevant file and update its fields (id, slug, name, urls, pricing, features...). Each item follows the `Resource` interface in `src/types.ts`.

**To remove a resource** — delete its object block from the array. Counts on the site auto-update (they read from `.length` in `src/data/index.ts`).

**To reorder the homepage** — set `featured: true` on items you want promoted.

## Pages Feature Highlights

- **Explore** — natural-language search + filters: category, pricing (Free / Freemium / Paid / Open Source / Student Benefit), open-source-only, has-API-only, self-hosted-only, student-benefit-only, difficulty, and sorting.
- **My Vault** — save any resource to a collection; stored in localStorage, survives page refresh.
- **Student Pack** — offers with eligibility + verification method (most redeemable via GitHub Student Developer Pack).
- **Stack Builder** — each stack defines Frontend / Backend / Database / Auth / Payments / Email / Deploy / Analytics layers, each with a recommended + alternative resource.
- **Resource Detail** — verification badge, last-verified month, feature list, use cases, pricing/limitations, related resources.