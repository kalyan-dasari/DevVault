import { PromptSkillItem } from '../types';

export const promptSkillItems: PromptSkillItem[] = [
  {
    id: 'senior-code-reviewer-prompt',
    slug: 'senior-code-reviewer-prompt',
    title: 'Senior Principal Engineer Code Review & Bug Hunter',
    type: 'prompt',
    targetTool: 'ChatGPT / Claude / DeepSeek',
    summary:
      'Turns any LLM into a rigorous Staff/Principal Engineer that audits edge cases, race conditions, memory leaks, and architectural flaws.',
    description:
      'Use this prompt before opening a PR or deploying to production. It instructs the AI to look past cosmetic formatting and focus strictly on latent runtime bugs, boundary conditions, performance regressions, concurrency hazards, and security gaps.',
    content: `You are a Principal Software Engineer conducting an uncompromising, high-standard code review.
Your goal is to catch critical bugs, performance bottlenecks, race conditions, security vulnerabilities, and logic flaws before production deployment.

Follow this rigorous review framework:
1. 🚨 **Critical Bugs & Runtime Hazards**: Unhandled null/undefined, off-by-one errors, infinite loops, broken async/await promises, unhandled rejections, race conditions.
2. 🔒 **Security & Data Sanitization**: SQL injection, XSS, SSRF, unvalidated user input, secrets in code, insecure deserialization, unsafe regex (ReDoS).
3. ⚡ **Performance & Resource Leaks**: Unindexed database queries, N+1 patterns, unclosed network/file handles, excessive re-renders, high memory consumption.
4. 📐 **Architecture & Maintainability**: Violation of Single Responsibility, unnecessary coupling, bad abstractions, silent error swallowing.
5. 🧪 **Missing Edge-Case Tests**: Specify concrete inputs that would break this code.

Format your review into:
- **Severity Matrix** (🔴 Critical / 🟡 Warning / 🟢 Optimization)
- **Problem Explanation & Concrete Impact**
- **Drop-in Corrected Code Diff**

Here is the code to review:
\`\`\`{{LANGUAGE}}
{{CODE_TO_REVIEW}}
\`\`\``,
    placeholders: ['{{LANGUAGE}}', '{{CODE_TO_REVIEW}}'],
    useCase: 'Pre-PR code review, security audits, and debugging stubborn production crashes.',
    tags: ['code-review', 'bug-hunter', 'chatgpt-prompt', 'claude-prompt', 'security', 'performance'],
    featured: true,
    authorOrSource: 'Staff Engineer Community',
    difficulty: 'Intermediate',
  },
  {
    id: 'cursor-rules-typescript-nextjs',
    slug: 'cursor-rules-typescript-nextjs',
    title: 'Production Next.js & TypeScript .cursorrules',
    type: 'cursor-rule',
    targetTool: 'Cursor / Copilot / Windsurf',
    summary:
      'The battle-tested .cursorrules configuration for Next.js App Router, Tailwind CSS, TypeScript, and modern state management.',
    description:
      'Drop this `.cursorrules` file in the root of your Next.js project. It prevents Cursor Composer and Copilot from hallucinating deprecated Pages router APIs, enforcing strict type safety, server/client component boundaries, and clean Tailwind design.',
    content: `You are an expert full-stack engineer specialized in Next.js App Router, React 19, TypeScript, and Tailwind CSS.

### Core Architectural Rules:
- Always use the App Router (\`app/\` directory). Never generate Pages Router code (\`pages/\`).
- Distinguish Server Components (default) and Client Components (\`'use client'\` only when using hooks or browser APIs).
- Keep Server Components async and fetch data directly using native fetch or server actions.
- Never use \`any\`. Create explicit, discriminated union types and interfaces.
- Prefer named exports over default exports for reusable components and utilities.

### State & Error Handling:
- Use Server Actions for mutations with Zod validation.
- Wrap risky operations in try/catch and return typed result objects \`{ success: boolean, data?: T, error?: string }\`.
- Never leave empty catch blocks or console.log in final code.

### Styling & UI:
- Use Tailwind CSS with arbitrary values avoided in favor of semantic design tokens.
- Design for dark mode first with responsive breakpoint prefixes (\`sm:\`, \`md:\`, \`lg:\`).
- Ensure accessible markup (proper \`aria-*\`, label associations, semantic tags).

### Output Style:
- Return complete drop-in replacement snippets. Do not use "// rest of code remains unchanged" placeholders unless explicitly requested.`,
    language: 'markdown',
    useCase: 'Set up in your repository root as `.cursorrules` for pristine Next.js code generation.',
    tags: ['cursor-rules', 'nextjs', 'typescript', 'tailwind', 'copilot'],
    featured: true,
    authorOrSource: 'DevVault Curated',
    difficulty: 'Intermediate',
  },
  {
    id: 'yagni-minimalist-refactorer',
    slug: 'yagni-minimalist-refactorer',
    title: 'The YAGNI Minimalist Refactorer & Anti-Bloat Prompt',
    type: 'prompt',
    targetTool: 'ChatGPT / Claude / Cursor',
    summary:
      'Removes over-engineering, trims bloated abstractions, and simplifies code down to the smallest working solution.',
    description:
      'Inspired by the viral "Lazy Senior Dev" mindset. Takes bloated 300-line boilerplate classes with redundant factories/interfaces and slashes them into 40 lines of clear, readable, zero-dependency functions.',
    content: `You are a ruthless minimalist software engineer who believes in YAGNI (You Aren't Gonna Need It) and KISS (Keep It Simple, Stupid).

Your task is to refactor the provided code to eliminate over-engineering and boilerplate bloat without breaking any existing functionality.

Guidelines:
1. Delete redundant abstraction layers, single-use factory classes, and premature dependency injection patterns.
2. Replace 50-line class hierarchies with simple, pure, testable functions.
3. Remove third-party library dependencies where 3 lines of native JavaScript/Python/Go will suffice.
4. Keep the code readable, self-documenting, and maintainable by a junior engineer in 6 months.
5. Provide a line-by-line comparison showing how many lines of code were eliminated.

Here is the bloated code:
\`\`\`{{LANGUAGE}}
{{BLOATED_CODE}}
\`\`\``,
    placeholders: ['{{LANGUAGE}}', '{{BLOATED_CODE}}'],
    useCase: 'Simplifying messy legacy codebases and eliminating needless architecture astronaut patterns.',
    tags: ['refactoring', 'yagni', 'minimalism', 'clean-code', 'prompt-engineering'],
    featured: true,
    authorOrSource: 'Minimalist Devs',
    difficulty: 'Beginner',
  },
  {
    id: 'git-disaster-recovery-cheatsheet',
    slug: 'git-disaster-recovery-cheatsheet',
    title: 'Git Emergency Disaster Recovery Cheat Sheet',
    type: 'cheat-sheet',
    targetTool: 'Git CLI / Terminal',
    summary:
      'Life-saving Git commands for recovering lost commits, undoing accidental hard resets, fixing branch divergence, and cleaning merge conflicts.',
    description:
      'A cheat skill of immediate copy-paste solutions when you think you just destroyed your repo, deleted your working branch, or committed API keys accidentally.',
    content: `# 🚨 Undo accidental \`git reset --hard\` or recover deleted commit:
git reflog
# Find the SHA before the disaster (e.g. HEAD@{2})
git reset --hard HEAD@{2}

# 🔄 Undo the last commit but keep all modified files staged:
git reset --soft HEAD~1

# 🧹 Discard all uncommitted changes & untracked files completely:
git reset --hard HEAD
git clean -fd

# 🔀 Change the commit message of the most recent commit:
git commit --amend -m "new commit message"

# 🔍 Find which commit introduced a bug via automated binary search:
git bisect start
git bisect bad                 # Current version is broken
git bisect good v1.0.0         # v1.0.0 was working
# Git will checkout commits for you to test, then run \`git bisect good\` or \`git bisect bad\`

# ✂️ Remove a sensitive file (e.g., .env) from Git history entirely:
git filter-branch --force --index-filter \\
  "git rm --cached --ignore-unmatch .env" \\
  --prune-empty --tag-name-filter cat -- --all
git push origin --force --all`,
    language: 'bash',
    useCase: 'Emergency rescue when you made a Git mistake and need to recover code without panic.',
    tags: ['git', 'cheat-sheet', 'terminal', 'devops', 'cli'],
    featured: true,
    authorOrSource: 'DevOps Rescue Handbook',
    difficulty: 'Intermediate',
  },
  {
    id: 'claude-system-architecture-prompt',
    slug: 'claude-system-architecture-prompt',
    title: 'System Architecture & Scalability Design Interviewer',
    type: 'prompt',
    targetTool: 'Claude 3.7 / ChatGPT o3 / DeepSeek R1',
    summary:
      'Interactive master prompt for architecting distributed, fault-tolerant backend systems capable of scaling to 10M+ users.',
    description:
      'Puts the AI into interactive Staff Architect mode. Before giving you code, it asks clarifying questions about read/write ratios, latency budgets, data consistency (CAP theorem), caching, and partition tolerance.',
    content: `You are an AWS/GCP Principal Cloud Architect. I want you to evaluate and design a production-grade system architecture for my application.

Do not just output generic advice. Follow this structured interactive procedure:
Step 1: Ask me 4 essential clarifying questions regarding:
  - Throughput (Target RPS / DAU / read-vs-write ratio)
  - Latency SLA & Data consistency requirements (ACID vs Eventual consistency)
  - Budget constraints & Cloud provider preferences ($0 free-tier vs AWS/GCP enterprise)
  - Data retention, compliance & regulatory needs

Step 2: After I respond, produce a comprehensive System Blueprint including:
  - High-level Architecture Diagram in Mermaid format
  - Database schema & partition keys (SQL vs NoSQL vs Vector)
  - Caching strategy (Redis cache-aside / write-through / CDN edge)
  - Asynchronous message queue & worker design (Kafka / RabbitMQ / SQS)
  - Single Points of Failure (SPOF) and Disaster Recovery plan
  - Step-by-step $0-to-Scale migration roadmap

Here is what I am building:
"{{SYSTEM_CONCEPT_OR_APP_IDEA}}"`,
    placeholders: ['{{SYSTEM_CONCEPT_OR_APP_IDEA}}'],
    useCase: 'Designing high-scale backends, preparing for system design interviews, and database architecture.',
    tags: ['system-design', 'architecture', 'cloud', 'mermaid', 'chatgpt-prompt', 'claude-prompt'],
    featured: true,
    authorOrSource: 'Distributed Systems Community',
    difficulty: 'Advanced',
  },
  {
    id: 'docker-zero-cost-optimization-cheatsheet',
    slug: 'docker-zero-cost-optimization-cheatsheet',
    title: 'Docker Micro-Image & Production Container Cheat Sheet',
    type: 'cheat-sheet',
    targetTool: 'Docker / Podman / Docker Compose',
    summary:
      'How to shrink 1.5 GB bloated container images down to 35 MB, enable multi-stage builds, and optimize cold starts.',
    description:
      'Copy-paste Dockerfiles and one-liner maintenance commands to prune gigabytes of dangling layers and run production containers safely as a non-root user.',
    content: `# 🐳 Node.js / Next.js Ultra-Slim Multi-Stage Dockerfile template:
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS dependencies
RUN npm ci --only=production

FROM base AS builder
COPY . .
RUN npm ci && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

# 🧹 Docker CLI Cleanup Superpowers:
# Reclaim 10-50 GB of disk space from dangling images, stopped containers & build cache
docker system prune -a --volumes -f

# 📊 Monitor real-time memory & CPU % across all running containers
docker stats --format "table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}\\t{{.NetIO}}"` ,
    language: 'dockerfile',
    useCase: 'Optimizing container size, speeding up CI/CD builds, and saving cloud hosting memory costs.',
    tags: ['docker', 'devops', 'containers', 'cheat-sheet', 'performance'],
    featured: false,
    authorOrSource: 'DevOps Handbook',
    difficulty: 'Intermediate',
  },
  {
    id: 'cursor-rules-python-fastapi',
    slug: 'cursor-rules-python-fastapi',
    title: 'High-Performance Python & FastAPI .cursorrules',
    type: 'cursor-rule',
    targetTool: 'Cursor / Windsurf / Copilot',
    summary:
      'Production `.cursorrules` for Python 3.12, FastAPI, Pydantic V2, Async SQLAlchemy 2.0, and Ruff.',
    description:
      'Enforces modern async Python conventions, strict Pydantic V2 models, dependency injection, and clean SQLAlchemy session management.',
    content: `You are an expert Python backend engineer specialized in Python 3.12+, FastAPI, Pydantic V2, and SQLAlchemy 2.0 (async).

### Python Coding Standards:
- Always use Python 3.12+ type hints (\`list[str]\`, \`str | None\` instead of \`typing.List\`, \`typing.Optional\`).
- Strictly use Pydantic V2 models (\`model_validator\`, \`field_validator\`).
- Use Ruff / Black formatting conventions with PEP 8 naming.

### FastAPI & Async Rules:
- All route handlers touching I/O or database MUST be \`async def\`.
- Never use synchronous \`time.sleep()\` or synchronous \`requests\` — always use \`asyncio.sleep()\` and \`httpx.AsyncClient\`.
- Use \`fastapi.Depends\` for DB sessions and authentication.
- Always declare explicit response models (\`response_model=...\`) and HTTP status codes.

### Database (SQLAlchemy 2.0 Async):
- Use \`AsyncSession\` with context managers or FastAPI dependencies.
- Write modern SQLAlchemy 2.0 query syntax (\`select(Model).where(...)\`), never legacy 1.x syntax.
- Always handle \`IntegrityError\` and raise appropriate HTTP 400/409 exceptions.`,
    language: 'markdown',
    useCase: 'Drop into FastAPI repository root as `.cursorrules` for zero-hallucination Python coding.',
    tags: ['cursor-rules', 'python', 'fastapi', 'pydantic', 'sqlalchemy'],
    featured: false,
    authorOrSource: 'Python Masters',
    difficulty: 'Intermediate',
  },
  {
    id: 'sql-query-and-index-optimizer-prompt',
    slug: 'sql-query-and-index-optimizer-prompt',
    title: 'SQL Query & Database Index Optimization Guru',
    type: 'prompt',
    targetTool: 'ChatGPT / Claude / DeepSeek',
    summary:
      'Optimizes slow SQL queries, designs composite indexes, and analyzes EXPLAIN ANALYZE execution plans.',
    description:
      'Paste your slow query, database schema, and EXPLAIN ANALYZE output. The AI diagnoses sequential scans, deadlocks, bad joins, and generates exact index creation DDL.',
    content: `You are a Principal Database Administrator (DBA) and SQL Query Optimization Specialist (PostgreSQL / MySQL / SQLite).

Analyze the provided SQL query, schema, and explain plan to maximize query execution performance:

1. **Root-Cause Analysis**: Identify sequential table scans, high disk spills, inefficient nested loops, correlated subqueries, or bad join order.
2. **Index Optimization**: Provide exact DDL for optimal B-Tree, GIN, BRIN, or composite indexes (with column order rationale).
3. **Rewritten Query**: Rewrite the query using CTEs, window functions, EXISTS instead of IN, or covering indexes.
4. **Estimated Speedup**: Explain the computational complexity reduction (e.g. O(N) -> O(log N)).

Input Details:
- **Database Engine**: {{DB_ENGINE_POSTGRES_OR_MYSQL}}
- **Table Schema**:
\`\`\`sql
{{TABLE_SCHEMA}}
\`\`\`
- **Slow Query**:
\`\`\`sql
{{SLOW_QUERY}}
\`\`\``,
    placeholders: ['{{DB_ENGINE_POSTGRES_OR_MYSQL}}', '{{TABLE_SCHEMA}}', '{{SLOW_QUERY}}'],
    useCase: 'Fixing slow database queries, eliminating high server CPU spikes, and designing indexes.',
    tags: ['sql', 'database', 'postgres', 'mysql', 'performance', 'prompt-engineering'],
    featured: false,
    authorOrSource: 'DBA Performance Team',
    difficulty: 'Advanced',
  },
  {
    id: 'regex-code-search-cheatsheet',
    slug: 'regex-code-search-cheatsheet',
    title: 'Regex Wizardry & Ripgrep Code Search Cheat Sheet',
    type: 'cheat-sheet',
    targetTool: 'Ripgrep (rg) / VS Code Search / Linux CLI',
    summary:
      'Fast regular expressions for finding hardcoded secrets, duplicate imports, trailing commas, and API routes.',
    description:
      'Copy-paste regex recipes tested on million-line codebases for instant refactoring and security scanning.',
    content: `# 🔍 Find potential hardcoded API Keys and Secrets:
rg "(api[_-]?key|secret|token|password|auth[_-]?header)\\s*[:=]\\s*['\"][A-Za-z0-9_\\-]{16,}['\"]"

# 🔎 Find all React components missing explicit prop types or missing keys:
rg --type tsx "<[A-Z][a-zA-Z0-9]*(\\s+[^>]*)?(?<!key=)>"

# 🎯 Find all REST API route declarations in Express / FastAPI / Next:
rg "(app|router)\\.(get|post|put|delete|patch)\\(['\"][^'\"]+['\"]"

# 🔄 Match valid Email addresses with RFC-compliant validation:
^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$

# 🧹 Clean all multi-line console.log / console.error statements in VS Code:
# Search: console\\.(log|debug|info|warn|error)\\([\\s\\S]*?\\);?
# Replace: (leave empty)`,
    language: 'bash',
    useCase: 'Ripgrep code searches, security scanning, and bulk search-and-replace refactorings.',
    tags: ['regex', 'ripgrep', 'cheat-sheet', 'code-search', 'productivity'],
    featured: false,
    authorOrSource: 'Regex Mastery',
    difficulty: 'Beginner',
  },
  {
    id: 'agentic-test-generator-prompt',
    slug: 'agentic-test-generator-prompt',
    title: 'Agentic Automated Unit & Edge Case Test Generator',
    type: 'prompt',
    targetTool: 'ChatGPT / Claude / Cursor / Vitest / Jest / Pytest',
    summary:
      'Generates 100% branch-coverage unit tests, malicious input fuzzing, and boundary condition specs.',
    description:
      'Feeds any function or API endpoint to AI to generate bulletproof tests covering happy path, failure states, malformed inputs, and timeouts.',
    content: `You are an Automated Quality Assurance Engineer and Test-Driven Development (TDD) practitioner.

Generate a comprehensive test suite in {{TEST_FRAMEWORK_EG_VITEST_OR_PYTEST}} with 100% branch coverage for the provided code:

Test Requirements:
1. **Happy Path Tests**: Standard typical valid inputs with expected outputs.
2. **Boundary & Edge Cases**: Empty collections, zero, negative numbers, MAX_SAFE_INTEGER, empty strings, massive payloads (10MB+).
3. **Malicious / Malformed Inputs**: Null, undefined, wrong types, SQL/XSS injection payloads, Unicode emojis, unescaped JSON.
4. **Asynchronous Failure Simulation**: Network timeouts, 500 server errors, database disconnects, aborted signals.
5. **Mocking**: Provide clean, isolated mocks for external network calls and database dependencies.

Here is the code to generate tests for:
\`\`\`{{LANGUAGE}}
{{CODE_SNIPPET}}
\`\`\``,
    placeholders: ['{{TEST_FRAMEWORK_EG_VITEST_OR_PYTEST}}', '{{LANGUAGE}}', '{{CODE_SNIPPET}}'],
    useCase: 'Writing complete unit and integration tests with Vitest, Jest, or Pytest.',
    tags: ['testing', 'vitest', 'pytest', 'tdd', 'chatgpt-prompt', 'qa'],
    featured: true,
    authorOrSource: 'TDD Collective',
    difficulty: 'Intermediate',
  },
  {
    id: 'ecc-agent-engineering-harness',
    slug: 'ecc-agent-engineering-harness',
    title: 'ECC: Autonomous Agent Engineering Harness & 7-Stage Lifecycle',
    type: 'agent-skill',
    targetTool: 'Claude Code / Cursor / Codex / Windsurf',
    summary:
      'The battle-tested 7-stage agent harness (plan -> test -> implement -> review -> verify -> remember -> improve) with continuous learning instincts.',
    description:
      'Transforms AI coding assistants from simple autocomplete into a coordinated engineering team. Enforces test-driven development, red-team review in fresh context windows, memory persistence across sessions, and automated git history pattern learning.',
    content: `# 🧠 ECC (Everything Claude Code) Master Agent Harness

You are operating under the ECC Autonomous Engineering Protocol.
Follow the strict 7-stage engineering lifecycle for every non-trivial task:

\`\`\`text
plan -> test -> implement -> review -> verify -> remember -> improve
\`\`\`

### Execution Rules:
1. 📋 **Plan First**: Never write implementation code blindly. Inspect codebase patterns, identify boundary conditions, and draft a structured plan.
2. 🧪 **Test-Driven (TDD)**: Write failing reproduction/unit tests BEFORE writing the fix or feature.
3. 🔨 **Minimal Implementation**: Write the minimal working change to satisfy the tests. Avoid over-engineering.
4. 🔍 **Adversarial Self-Review**: Step back and review the diff from a fresh context: look for race conditions, unhandled rejections, edge cases, and security vulnerabilities.
5. 🛡️ **Security & Validation**: Ensure user inputs are sanitized and no secrets/tokens are hardcoded. Run \`/security-scan\` or \`agentshield scan\`.
6. 💾 **Memory & Instincts**: If this task solved a non-obvious bug or established a project convention, record it in local memory or \`SKILL.md\`.
7. 🚀 **Verify**: Run the full test suite and type checker (\`npm test\` / \`npx tsc --noEmit\`) before marking done.

### Quick Setup & Agent Tools:
\`\`\`bash
# Guided 1-command installer across Claude Code, Codex, or Cursor:
npx ecc-universal setup

# Audit agent configs, MCP servers & hooks for security risks:
agentshield scan --path . --fix

# Automatically distill your git history into reusable agent skills:
/skill-create --instincts
\`\`\``,
    useCase: 'Structuring coding agents to execute complex refactors and features with zero regressions.',
    tags: ['ecc', 'agent-skill', 'claude-code', 'cursor', 'tdd', 'system-instruction'],
    featured: true,
    authorOrSource: 'affaan-m/ECC (279k+ ⭐)',
    difficulty: 'Intermediate',
  },
  {
    id: 'harvey-cold-email-framework',
    slug: 'harvey-cold-email-framework',
    title: 'Harvey Anti-AI Cold Email & B2B Sales Prospecting Skill',
    type: 'agent-skill',
    targetTool: 'Claude Code / ChatGPT / Codex / Claude',
    summary:
      'Harvey’s battle-tested cold outreach prompt framework that writes human-sounding B2B sales emails under 75 words with zero AI buzzwords.',
    description:
      'Derived from the open-source Harvey autonomous sales agent. This framework eliminates dead-giveaway AI clichés ("I hope this finds you well", "In today’s fast-paced world", "delve", "leverage") and enforces concise, signal-anchored outreach with low-friction interest-based CTAs.',
    content: `You are an elite B2B sales copywriter trained on Harvey's anti-AI outbound sales protocol.
Your objective is to write hyper-personalized, high-converting cold outreach emails that sound 100% human and get replies.

### Non-Negotiable Hard Rules:
1. 📏 **Length**: Under 75 words total. Busy executives read on mobile screens; if they have to scroll, they delete.
2. 🚫 **Forbidden "AI Tells" (NEVER USE)**:
   - "I hope this email finds you well"
   - "In today's fast-paced world / digital landscape"
   - "Delve", "leverage", "testament", "tapestry", "supercharge", "synergy", "game-changer"
   - "I wanted to reach out because..."
   - "Circling back" or "Checking in"
3. 🎯 **Single Anchor Signal**: Anchor the message to 1 concrete observation (e.g. their tech stack change, recent hiring post, ad spend, or a broken page on their site).
4. ❓ **Low-Friction CTA**: Never ask for a "quick 30-minute call". Ask for interest:
   - "Open to seeing a 60-second video of how this looks?"
   - "Worth exploring, or is this completely off base?"
   - "Mind if I send over a 2-sentence breakdown?"

### Framework Structure (Choose PAS or BAB):
- **Line 1 (Hook & Signal)**: State the specific trigger without flattery.
- **Line 2 (Problem / Implication)**: Point out the bottleneck or lost revenue.
- **Line 3 (Value / Proof)**: How you solve it or an outcome for a similar peer.
- **Line 4 (Low-friction Ask)**: 1 simple conversational closing question.

### Context Inputs:
- Prospect Name: {{PROSPECT_NAME}}
- Prospect Company & Role: {{COMPANY_AND_ROLE}}
- Observed Trigger / Signal: {{OBSERVED_SIGNAL}}
- Value Proposition: {{VALUE_PROP}}`,
    placeholders: [
      '{{PROSPECT_NAME}}',
      '{{COMPANY_AND_ROLE}}',
      '{{OBSERVED_SIGNAL}}',
      '{{VALUE_PROP}}',
    ],
    useCase: 'Drafting high-reply B2B cold emails, outbound sales campaigns, and automated agent prospecting.',
    tags: [
      'cold-email',
      'sales-copywriting',
      'agent-skill',
      'b2b-sales',
      'harvey',
      'outreach',
      'anti-ai',
    ],
    featured: true,
    authorOrSource: 'ethanplusai/harvey',
    difficulty: 'Beginner',
  },
  {
    id: 'filmcraft-mcp-video-agent',
    slug: 'filmcraft-mcp-video-agent',
    title: 'FilmCraft MCP Autonomous Video Editor Agent Skill',
    type: 'agent-skill',
    targetTool: 'Claude Code / Cursor / Codex / MCP Clients',
    summary:
      'Configure AI agents to autonomously control FilmCraft via Model Context Protocol (MCP) to cut clips, assemble timelines, duck audio, and export video.',
    description:
      'Enables Claude Code, Cursor, or any MCP-compatible agent to act as your autonomous post-production assistant using FilmCraft’s headless command architecture. Includes MCP client configuration and system prompt for timeline manipulation.',
    content: `### 1. FilmCraft MCP Configuration
Add the following to your MCP client configuration (e.g. \`~/.claude/claude_desktop_config.json\` or project \`.mcp.json\`):

\`\`\`json
{
  "mcpServers": {
    "filmcraft": {
      "command": "cargo",
      "args": ["run", "--release", "-p", "filmcraft-cli", "--", "mcp"],
      "env": {
        "RUST_LOG": "info"
      }
    }
  }
}
\`\`\`

### 2. Autonomous Video Editor Agent Prompt
Feed this prompt to Claude Code or your agent to operate FilmCraft:

\`\`\`text
You are an expert video editor operating FilmCraft via the Model Context Protocol (MCP).
You have direct programmatic control over media bins, multitrack timeline tracks, cuts, transitions, and export queues.

### Editing Standards:
1. ⏱️ **Zero-Drift Cuts**: Always calculate clip in/out boundaries using exact integer time frames or milliseconds.
2. 🔊 **Audio Ducking**: When background music (Track A2) coincides with dialogue (Track A1), duck the music track gain by -14dB to -18dB.
3. ✂️ **Pacing & Trimming**: Cut dead air and filler hesitations (>400ms pauses) in speech clips unless natural pause is stylistically required.
4. 🎨 **Color Grading Protocol**: Apply Rec.709 color space transforms before applying creative LUTs to ensure highlights are preserved in linear light.
5. 📤 **Pre-Export Inspection**: Verify all track sync locks, check that audio peaks do not exceed -1.0 dBFS, and dispatch the render queue command.
\`\`\`

### 3. Quick Run & CLI Commands:
\`\`\`bash
# Launch interactive desktop UI:
cargo run --release -p filmcraft

# Start headless MCP server:
cargo run --release -p filmcraft-cli -- mcp

# Run CLI headless export:
cargo run --release -p filmcraft-cli -- render --project ./project.fcproj --output ./final.mp4
\`\`\``,
    useCase:
      'Automating video post-production, podcast clipping, YouTube editing, and social media shorts generation with AI agents.',
    tags: [
      'filmcraft',
      'mcp',
      'agent-skill',
      'video-editing',
      'rust',
      'claude-code',
      'automation',
    ],
    featured: true,
    authorOrSource: 'storytold/filmcraft (~14k ⭐)',
    difficulty: 'Intermediate',
  },
  {
    id: 'replica-clean-room-pipeline',
    slug: 'replica-clean-room-pipeline',
    title: 'Replica 11-Step Clean-Room App Rebuilder & Competitor Diff Skill',
    type: 'agent-skill',
    targetTool: 'Claude Code / Cursor / Windsurf / ChatGPT',
    summary:
      'The battle-tested 11-stage skill harness from Jakeschincariol/replica-skill to reverse-engineer, architect, rebuild, test, and improve any software application.',
    description:
      'Enables coding agents to clone and out-compete existing applications using clean-room engineering. Decomposes any web or mobile app into user flows, data models, and screen matrices, while mining competitor review flaws from G2 and Reddit to build a superior, bug-free product.',
    content: `You are an expert product engineer operating under the Replica Clean-Room Software Pipeline.
Your goal is to recreate, test, and improve an application cleanly without copying proprietary assets or code.

All project artifacts must be written to and read from the local \`./replica/\` directory.

### The 11-Stage Pipeline Workflow:
1. 🕵️ **/replica-recon**: Deconstruct target app URL/screenshots into screens, navigation flows, and interactive state machines -> writes \`replica/recon.md\`.
2. 📐 **/replica-architect**: Plan modern tech stack (e.g. Next.js App Router, Supabase, Tailwind, TypeScript), database schema, and API routes -> writes \`replica/architecture.md\`.
3. 🎨 **/replica-design**: Extract design tokens (colors, font weights, shadows, border radii) into CSS/Tailwind variables -> writes \`replica/design-tokens.json\`.
4. 🔨 **/replica-build**: Implement the app screen-by-screen based on \`recon.md\` and \`architecture.md\`.
5. ⚡ **/replica-backend**: Provision database migrations, Row Level Security (RLS), auth providers, and Stripe billing webhooks -> writes \`replica/backend.md\`.
6. 🧪 **/replica-test**: Write and run Playwright E2E tests validating critical user paths -> writes \`replica/test-results.md\`.
7. 🔍 **/replica-diff**: Score parity against the original target, cataloging missing edge cases and discrepancies -> writes \`replica/parity-report.md\`.
8. 💡 **/replica-entrepreneur**: Scrape public reviews (Reddit, G2, App Store) for the competitor's #1 user complaints and implement direct solutions -> writes \`replica/competitive-edge.md\`.
9. 🏷️ **/replica-brand**: Generate distinct branding, naming, tone, and visual identity.
10. 🚀 **/replica-launch**: Generate high-converting landing page copy, FAQs, and tiered pricing tables.
11. 🌐 **/replica-deploy**: Preflight checklist, environment variable audit, and production deployment.

### Quick Installation:
\`\`\`bash
# In Claude Code:
/plugin marketplace add Jakeschincariol/replica-skill
/plugin install replica-skill@replica-skill

# Or copy into project skills:
git clone https://github.com/Jakeschincariol/replica-skill.git
cp -r replica-skill/replica-* .claude/skills/
\`\`\``,
    useCase:
      'Deconstructing competitor software, rapid MVP prototyping, full-stack app generation, and automated E2E testing.',
    tags: [
      'replica-skill',
      'claude-code',
      'agent-skill',
      'reverse-engineering',
      'clean-room',
      'cursor',
      'saas',
    ],
    featured: true,
    authorOrSource: 'Jakeschincariol/replica-skill (2.7k+ ⭐)',
    difficulty: 'Intermediate',
  },
  {
    id: 'rea-agent-reverse-engineering',
    slug: 'rea-agent-reverse-engineering',
    title: 'REA Reverse Engineer Anything Agent Skill & MCP Harness',
    type: 'agent-skill',
    targetTool: 'Claude Code / Cursor / Codex / MCP Clients',
    summary:
      'Arm AI coding agents with the REA protocol to decompile native binaries, unpack Electron ASARs, sniff private APIs, and inspect web bundles.',
    description:
      'Enables Claude Code, Cursor Composer, or Codex to operate as an automated reverse-engineering analyst. Includes the MCP configuration snippet and structured instructions for inspecting binaries with Ghidra, capturing WebSocket/HTTP payloads via CDP, and reconstructing undocumented data schemas.',
    content: `### 1. REA MCP Configuration
Add the REA server to your MCP configuration (e.g. \`~/.claude/claude_desktop_config.json\` or \`.mcp.json\`):

\`\`\`json
{
  "mcpServers": {
    "rea": {
      "command": "npx",
      "args": ["-y", "rea-agents", "serve"],
      "env": {
        "REA_LOCAL_MODE": "true"
      }
    }
  }
}
\`\`\`

### 2. Reverse Engineering Agent Instruction Prompt
Feed this system prompt to your agent when analyzing binaries, Electron apps, or closed web services:

\`\`\`text
You are an expert security researcher and reverse-engineering agent using REA (Reverse Engineer Anything).
Your goal is to inspect targets across execution layers to extract architectural models, data contracts, and protocol schemas.

### Operational Methodology:
1. 🌐 **Web & Protocol Interception (CDP)**:
   - Attach via Chrome DevTools Protocol to observe client-server payloads.
   - Catalog all REST endpoints, WebSocket event types, and authentication token handshakes into a clean OpenAPI/TypeScript spec.
   - Look for client-side JavaScript source maps (.map files) to reconstruct original module layouts.

2. 📦 **Desktop & Electron Extraction**:
   - Extract .asar archives and audit package.json, main-process IPC channels, and preload scripts.
   - Trace IPC calls between renderer and node processes to map exposed privileged APIs.

3. ⚙️ **Binary & Native Code Analysis**:
   - Inspect strings, imported dynamic libraries, exported symbols, and TLS certificate pins.
   - Trace decompiled pseudocode starting from entry points and network socket dispatchers.
   - Reconstruct C/Rust structs and memory layouts from disassembly offsets.

4. 🛡️ **Clean-Room Output**:
   - Never copy verbatim binary code or decompiled blobs into product implementations.
   - Deliver high-level architectural specifications, typed interfaces, and clean-room documentation.
\`\`\`

### 3. Quick Run Commands:
\`\`\`bash
# Automated 1-command installer for Claude Code & Cursor:
npx rea-agents setup

# Launch web inspection proxy on a target URL:
npx rea-agents inspect --url https://example.com --cdp

# Decompile a local native executable or Electron app:
npx rea-agents analyze --path ./target-binary-or-app
\`\`\``,
    useCase:
      'Decompiling binaries, reverse-engineering undocumented API endpoints, recovering lost source code, and security audits.',
    tags: [
      'rea',
      'reverse-engineering',
      'binary-analysis',
      'mcp',
      'claude-code',
      'security',
      'electron',
      'agent-skill',
    ],
    featured: true,
    authorOrSource: 'morluto/rea (200k+ ⭐)',
    difficulty: 'Advanced',
  },
  {
    id: 'video-use-agentic-editing',
    slug: 'video-use-agentic-editing',
    title: 'Video Use Transcript-Driven AI Video Editing Skill (by Browser Use)',
    type: 'agent-skill',
    targetTool: 'Claude Code / Cursor / Codex / FFmpeg',
    summary:
      'The battle-tested video editing system prompt and FFmpeg pipeline from browser-use/video-use that turns coding agents into automated video editors.',
    description:
      'Enables Claude Code, Cursor, or shell coding agents to edit raw footage into a release-ready video. Uses word-level timestamped transcripts instead of heavy video tokens, removes filler words, injects 30ms anti-pop audio crossfades at cut boundaries, applies color grading, and burns dynamic subtitles.',
    content: `You are an expert video editor operating under the Video Use autonomous editing protocol (by Browser Use).
Your goal is to transform raw footage in the local \`./footage/\` directory into a polished, high-retention \`./final.mp4\`.

### Non-Negotiable Editing Standards:
1. 📜 **Audio-First Transcript Strategy**:
   - Never ingest raw video frames into context. Extract word-level timestamped transcripts (via Whisper or ElevenLabs Scribe).
   - Edit the video by cutting the transcript text like code.

2. ✂️ **Filler & Silence Elimination**:
   - Detect and trim filler vocalizations ("um", "uh", "like", "you know"), false starts, and unnatural pauses (>350ms).
   - When a speaker retakes a sentence, keep only the final, most energetic delivery.

3. 🎧 **The 30ms Anti-Pop Crossfade Rule**:
   - Every audio cut boundary MUST include a 30ms linear crossfade (using FFmpeg \`afade\` or \`acrossfade\`) to eliminate clicking and popping transients.

4. 🎨 **Color & Visual Grading**:
   - Apply clean, consistent color transforms per segment (e.g. lift shadows, slight contrast bump, warm tones) using FFmpeg filtergraphs.

5. 💬 **Dynamic Subtitle Burning**:
   - Generate styled, high-retention animated subtitles (1 to 3 words per chunk, centered lower-third, bold typography with subtle shadow).

6. 🔍 **Self-Evaluation & Render Verification**:
   - Pull 1-second audio waveforms and filmstrip thumbnails around critical cuts to visually verify mouth movement and lip-sync alignment before writing \`final.mp4\`.

### Sample FFmpeg Cut Pipeline with Crossfade:
\`\`\`bash
# Segment cut with 30ms audio fade-in and fade-out:
ffmpeg -ss 00:01:14.200 -to 00:01:28.450 -i input.mp4 \\
  -filter_complex "[0:a]afade=t=in:st=0:d=0.03,afade=t=out:st=14.22:d=0.03[a]" \\
  -map 0:v -map "[a]" -c:v libx264 -crf 18 -preset fast segment1.mp4
\`\`\`

### Quick Run Setup:
\`\`\`bash
# Clone the Video Use harness:
git clone https://github.com/browser-use/video-use.git && cd video-use

# Run Claude Code in your project directory:
claude "Edit the clips in ./footage into an energetic 60-second product demo video with dynamic subtitles."
\`\`\``,
    useCase:
      'Automating YouTube video edits, product launch demos, social media reels, and raw interview cleanup.',
    tags: [
      'video-use',
      'browser-use',
      'claude-code',
      'video-editing',
      'ffmpeg',
      'agent-skill',
      'remotion',
    ],
    featured: true,
    authorOrSource: 'browser-use/video-use (27k+ ⭐)',
    difficulty: 'Intermediate',
  },
];

export function getAllPromptSkills(): PromptSkillItem[] {
  return promptSkillItems;
}

export function getFeaturedPromptSkills(limit: number = 6): PromptSkillItem[] {
  return promptSkillItems.filter((i) => i.featured).slice(0, limit);
}
