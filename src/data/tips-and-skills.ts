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
];

export function getAllPromptSkills(): PromptSkillItem[] {
  return promptSkillItems;
}

export function getFeaturedPromptSkills(limit: number = 6): PromptSkillItem[] {
  return promptSkillItems.filter((i) => i.featured).slice(0, limit);
}
