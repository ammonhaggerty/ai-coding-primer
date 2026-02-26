# Intro to Full-Stack AI Product Development

## Article Outline — v4

---

## Framing & Thesis

**Audience:** Non-coders — designers, product managers, founders, researchers, hobbyists — anyone with ideas who has been blocked by the technical wall. Also: lapsed engineers and creative technologists who drifted away from hands-on building and want back in.

**Core thesis:** A single person can now build, deploy, and iterate on a real product by partnering with AI. Not a mockup. Not a no-code toy. A real, full-stack application. This article is a practical, opinionated guide to doing it — what tools to use, what it costs, and what the experience actually feels like.

**Tone:** Practical, grounded, zero hype. Feels like a friend who's done it walking you through how. Acknowledges that looking at this from the outside is scarier than actually doing it — like standing at the edge before a bungee jump. Once you step off, the fear is replaced by "wait, that's it?"

**Central argument about skills:** The most important skills in AI-supported product development are *imagination* and *curiosity*. The ability to envision something that doesn't exist yet, and the drive to keep asking "what if?" These are the skills AI cannot replicate and that matter most when AI handles implementation.

**Automation philosophy:** The reader may have never opened a terminal. Every step that *can* be automated *should* be automated. The starter repo includes setup scripts, the Claude Skill handles detection and guided installation, and the article makes clear when something is "Claude does this for you" vs. "you need to do this yourself." The goal: the reader's first terminal interaction is typing `claude` — and Claude takes it from there.

**Accompanying resources:**
- Open-source starter kit (clone and run, with setup automation)
- **"AI Dev Intro" Claude Skill** — an interactive guide that detects environment state, installs missing tools, configures services, and walks the reader through their first build
- TL;DR fast-track (see below)
- This article as the conceptual companion

---

## TL;DR — The Fast Track

*For readers who want to skip the philosophy and start building.*

A condensed version (1-2 pages) that assumes the reader is on a Mac, has basic comfort clicking around, and just wants to get to a working setup as fast as possible:

1. **Sign up for Claude** → claude.ai, Pro ($20/mo) or Max ($100/mo)
2. **Install Ghostty** → download from ghostty.org, open it
3. **Install Claude Code** → paste one command into Ghostty
4. **Clone the starter repo** → paste one command
5. **Run `claude`** → the AI Dev Intro Skill activates, detects what's missing, and walks you through everything else: VS Code, Node.js, Git, Cloudflare account, MCP servers, first deploy
6. **You're building** → Claude guides you through creating your first feature

The TL;DR lives at the top of the article (or as a separate companion page) with a link to "read the full guide for context." It's the bungee jump: just step off, the harness (Claude + the skill) catches you.

**What the setup script / skill automates:**
- Detecting OS and installed tools
- Installing Node.js (via nvm), Git, Wrangler CLI
- Configuring MCP servers (context7, Cloudflare, Figma, Playwright)
- Adding skills (primer-skills, brainstorming, using-superpowers, writing-skills, subagent-driven-development, writing-plans, frontend-design, systematic-debuggin)
- Creating Cloudflare account connection (walks through OAuth)
- Scaffolding a first project from the starter template
- Running a local dev server
- Deploying a "Hello World" to a live URL
- Verifying everything works end-to-end

**What still requires the human:**
- Creating accounts (Claude, Cloudflare, GitHub, Figma) — these need email/password and payment info
- Approving Claude's permission prompts (by design)
- Deciding what to build (the fun part)

---

## About the Author

*(To be written in full later — key beats below)*

- Background: studied computer science, started career as an engineer — but quickly gravitated toward the intersection of building and designing. Creative technologist for most of the career: coding, designing, and thinking about product simultaneously.
- The business side too: founder multiple times, creative leadership roles, wearing every hat because startups require it.
- The AI coding journey was gradual, not a lightning bolt: StackOverflow → GitHub Copilot → ChatGPT → Cursor → Claude Code. Each step removed a little more friction. Claude Code was the one that changed the equation entirely.
- Cloudflare as a breath of fresh air: spent 4 years deep in the Vercel ecosystem. It's excellent for what it does. But Cloudflare's integrated environment — Workers, R2, D1, AI, DNS, all under one roof — has been a genuinely different experience. Simpler. Less ceremony. More direct.
- The honest framing: this isn't someone who "learned to code with AI." This is someone with a technical background who watched AI close the last remaining gaps — and now sees that path open for people without that background.

---

## Part 1: The Landscape

### 1.1 — What Changed (and What Didn't)

- The traditional barrier to building software was never just syntax. It was environments, dependencies, deployment, debugging, security, state management, networking — a hundred interlocking systems that each take months to understand.
- AI has been chipping away at this for years. Copilot helped with autocomplete. ChatGPT could explain code. Cursor wrapped it in an editor. Each step helped, but you still needed a developer's brain running in the background — catching edge cases, knowing when the AI was wrong, stepping in for the last 10%.
- **The step change: Claude Opus 4.6.** This is the model that went from ~90% success to ~99%. That remaining 10% was where developer instincts used to kick in — "that approach won't work because of X," or "you're missing the error handling for Y." Opus 4.6 catches those things itself.
- **A concrete example:** Building a complete iOS app over a weekend. Not a tutorial project — a real app, submitted to the App Store. Zero lines of code written by hand. Every feature built by Claude. Every bug diagnosed and fixed by Claude. Every configuration decision guided by Claude. This isn't theoretical. It happened.
- What AI *didn't* change: you still need to know what you're building and why. Product thinking, user empathy, and design judgment are more important than ever — because the bottleneck is no longer implementation. The bottleneck is vision.
- **The fear vs. the reality:** From the outside, this looks impossibly technical. Terminal commands, deployment pipelines, database schemas — it sounds like it requires years of training. It doesn't. It's like looking down from a cliff dive: the anticipation is worse than the jump. Once you're in motion, Claude is right there with you, and the scary technical stuff is just... conversation.

### 1.2 — The Mental Model: You're the Dreamer, AI is the Builder

- You don't need to know how to frame a wall to imagine the house you want to live in.
- You don't need to know music theory to hear the song in your head.
- You don't need to know how to code to know what your product should *feel* like — what it should do, who it's for, what problem it solves.
- Your job: vision, decisions, taste, domain knowledge, empathy for your users
- AI's job: implementation, syntax, configuration, debugging, documentation
- The loop: dream it → describe it → build it → react to it → refine it → ship it
- When it breaks down: when you skip the dreaming. When the prompt is vague because the thinking is vague. AI is an extraordinary builder, but it can't want something on your behalf.
- **A note on "wrappers"** (Cursor, Lovable, Bolt, Replit Agent, etc.): These tools add a layer between you and what's actually happening. They can be useful for quick experiments, but they obscure the real tools and create dependencies on products that may not last. More importantly, they limit your ceiling — you can only do what the wrapper anticipated. This guide recommends going direct: Claude Code in a real terminal, real infrastructure, real deployment. It's not harder. It's more honest. And it grows with you without limits.

### 1.3 — What You'll Need: The Complete Toolkit

Every tool, what it costs, what it does, how hard it is to set up, and whether Claude manages it for you.

**The Toolkit Matrix:**

| Tool | What It Does | Cost | Setup | Claude Manages? |
|---|---|---|---|---|
| **Claude Pro/Max** | AI partner — the engine for everything | $20/mo (Pro) or $100/mo (Max) | Easy (sign up) | — |
| **Claude Code** | AI in your terminal — reads, writes, runs code | Included w/ Pro or Max | Easy (one command) | — |
| **Ghostty** | Terminal app (Mac) — where Claude Code lives | Free | Easy (download) | — |
| **VS Code** | Code editor — where you see what Claude builds | Free | Easy (download) | — |
| **Git + GitHub** | Version control — your undo button and backup | Free | Medium (Claude helps) | Yes |
| **Node.js** | JavaScript runtime — required engine for the stack | Free | Easy (one install) | Yes |
| **Cloudflare Account** | Hosting, storage, databases, AI, domains | Free tier + ~$5-25/mo at scale | Easy (sign up) | Partially |
| **Wrangler CLI** | Cloudflare's command-line tool | Free | Easy (Claude installs) | Yes |
| **Figma** | Design tool — optional but recommended | Free tier / $15/mo | Easy (sign up) | Via MCP |
| **MCP Servers** | Plugins that connect Claude to services | Free | Medium (Claude helps) | Yes |
| **D1 (Database)** | SQLite database on Cloudflare | Free tier (generous) | Easy (Claude sets up) | Yes |
| **R2 (Storage)** | File storage on Cloudflare | Free tier (10GB) | Easy (Claude sets up) | Yes |

**What this actually costs:**

- **Getting started:** $20/mo (Claude Pro). Everything else runs on free tiers. You can explore, learn, build small projects, and get a feel for the workflow.
- **When you get serious:** $100/mo (Claude Max). Here's the practical reality — once you're actively building, you're in constant dialogue with Claude. Planning, building, debugging, iterating, deploying. On the Pro plan, you'll hit usage limits and wait for token reloads. It's manageable for dabbling, but it breaks your flow on a real project. Max removes that friction entirely. You won't *need* it on day one, but you'll *want* it the first time you're deep in a build and hit a wall.
- **Typical monthly spend for active building:** ~$105-125 (Claude Max + some Cloudflare usage beyond free tier + optional Figma).
- **Why not the API?** Developers often use Claude via the API (pay-per-token). For this workflow, the subscription is simpler and usually cheaper for the kind of sustained, back-and-forth building we're describing.

### 1.4 — What We're Going to Build

- Overview of the complete environment: terminal, editor, AI partner, cloud infrastructure, design pipeline, deployment
- Preview of the finished starter project — a simple but real full-stack app with a database, AI features, and a live URL anyone can visit
- What "full stack" means here: front-end (what users see), back-end (logic and APIs), database (stored data), AI (intelligence), deployment (live on the internet), domain (your URL) — one person, the whole thing

---

## Part 2: Setting Up Your Workshop

### 2.1 — The Foundation: Terminal, Editor, Runtime

- **Ghostty (terminal):** Fast, clean, Mac-native, stays out of your way. Download, install, open. This is where you'll talk to Claude Code. *(Windows/Linux alternatives noted, but the article uses Ghostty throughout.)*
- **VS Code (editor):** Your window into what Claude builds. You won't need to *write* code here, but you'll *read* it, and that matters over time. Not Cursor — since Claude Code runs in the terminal, Cursor's AI layer is redundant and sometimes conflicts. VS Code is cleaner.
- **Node.js:** One install, then forget about it. Claude needs this engine running. Version management via `nvm` (Claude sets it up).
- **Git + GitHub:** Your undo button, your backup, your project history. Claude handles the commands. You'll learn what they mean naturally as you watch.

### 2.2 — Claude Code: Your AI Partner

- What it is: an AI that lives in your terminal. Reads files, writes files, runs commands, searches documentation, connects to services, iterates with you in real time.
- Installation: one command
- First interaction: ask Claude to create a simple HTML page, open it, then ask it to change something — watching the loop in action for the first time
- The permission model: Claude asks before doing anything potentially destructive
- **Getting started with Pro ($20/mo):** sign up, connect, verify. You can do everything in this article on Pro — just be aware of usage limits. When you're ready for uninterrupted building, upgrade to Max.
- The key mindset: Claude is not autocomplete. It's a collaborator. Talk to it like you'd talk to a skilled builder you've hired — clear intent, specific feedback, trust but verify.

### 2.3 — MCP Servers: Connecting Claude to the World

- What MCP is, simply: connections that let Claude interact with external services directly — not by you copy-pasting, but by Claude reaching out itself
- The servers we'll install:
  - **context7** — live documentation lookup. When Claude needs to know how a library works, it pulls current docs instead of relying on (potentially outdated) training data.
  - **Cloudflare** — Claude can search Cloudflare docs and manage your workers directly
  - **Figma** — Claude reads your design files and generates code from them
- How to install: editing a config file (Claude walks you through it)
- Verifying it works: ask Claude to look something up and watch it happen

### 2.4 — Skills: Teaching Claude Your Patterns

- What Skills are: instruction files that teach Claude how to do specific things well — like giving a new team member a playbook
- Why they matter: without skills, Claude is a generalist. With skills, it knows *your* workflow.
- The skills that come with the starter kit
- How to create your own (brief — covered more in the repo)
- **The "AI Dev Intro" skill:** the custom skill built for this article — detects your environment state, installs what's missing, and guides you through your first build. This is the reader's primary hands-on companion.

### 2.5 — CLAUDE.md: Your Project's Memory

- The most important file in any Claude-assisted project
- What goes in it: project context, tech stack, code patterns, constraints, gotchas
- Why it matters: Claude reads this at the start of every session — it's how your project "remembers" itself between conversations
- A living document: you update it as the project evolves
- Walking through a real CLAUDE.md from a production project

---

## Part 3: The Cloud — Where Your App Lives

### 3.1 — Why Cloudflare

- Your app needs to live somewhere people can reach it
- Cloudflare Workers: your code runs on servers all over the world, close to your users
- Why Cloudflare specifically:
  - Free tier is genuinely generous (100K requests/day, 10GB storage, 5M database reads/mo)
  - Deployment takes seconds
  - Everything integrated: compute, storage, database, AI, DNS — one account, one dashboard
  - The developer experience is clean, and Claude knows it extremely well
- Personal context: after 4 years in the Vercel ecosystem, Cloudflare has been simpler. Less ceremony. More direct. Vercel is excellent for what it does, but Cloudflare's all-in-one approach is a better fit for this workflow.

### 3.2 — Your First Deploy

- Creating your Cloudflare account
- Claude installs Wrangler (Cloudflare's CLI)
- Together you write a "Hello World" worker
- One command: it's live on the internet
- Visiting the URL — your code, running worldwide
- Optional: custom domain setup

### 3.3 — The Building Blocks

Plain-English overview of the services you'll use:

- **Workers** — the compute. Your code runs here. When someone visits your URL, a Worker responds.
- **R2** — file storage. Images, PDFs, fonts, uploads. Like a hard drive in the cloud. Free up to 10GB.
- **D1** — the database. Structured data: users, sessions, content. Like a spreadsheet that code can query.
  - *D1 vs. Turso:* Both are SQLite databases that work at the edge. D1 is Cloudflare-native — simpler setup, no extra account, tightly integrated. Turso is independent and more flexible. **This guide uses D1** for simplicity: one fewer account, one fewer set of credentials, everything in one place. Turso is the natural next step if you outgrow D1 or need your database outside Cloudflare.
- **Workers AI** — AI models on Cloudflare. Text generation, image understanding, embeddings. No separate API account.
- **KV** — fast key-value storage. Settings, feature flags, caches.
- A simple diagram: user → Worker → database/storage/AI → response

### 3.4 — Security and Secrets

- You'll have API keys, database URLs, credentials. They need protection.
- **The rule:** secrets never go in your code. Claude knows this, but you should understand why.
- **Environment variables:** secrets stored separately, injected at runtime
- **Wrangler secrets:** how Claude pushes secrets to Cloudflare securely
- **`.env` and `.gitignore`:** local secrets that stay local
- **What happens when you mess up:** accidentally committing a secret to GitHub (and how to recover)
- Claude will warn you if you're about to do something insecure — but you're the last line of defense

---

## Part 4: Building — From Idea to Working Product

### 4.1 — Starting with Intent

- Before any code: what are you building and why?
- Write a clear brief — 2-3 paragraphs: the product, the user, the core experience
- This brief becomes your first real prompt to Claude
- Specificity matters: "build me a social app" → chaos. "Build a page where a user answers 5 questions and sees a personalized result" → progress.
- 10 minutes of clear thinking saves hours of building

### 4.2 — Design: Figma → Claude

- Designing screens in Figma (or sketching on paper — Figma isn't required)
- The Figma MCP workflow: Claude reads your design file and generates matching code
- What translates well: layout, spacing, color, typography, component structure
- What needs your judgment: interaction patterns, edge cases, responsive behavior
- The design system advantage: a component library (DaisyUI) means Claude produces consistent, good-looking UI without pixel-level instruction

### 4.3 — The Stack (Explained for Humans)

Every tool in the app-building stack, what it does, and why:

- **Hono** — web framework. The skeleton connecting URLs to responses.
- **HTML** — the bones of every web page. Claude writes it. It's surprisingly readable.
- **Tailwind CSS** — styling without separate files. `class="text-lg font-bold"` reads almost like English.
- **DaisyUI** — pre-built components. `class="btn btn-primary"` = a styled button, instantly.
- **HTMX** — makes pages interactive without JavaScript. Forms that submit, content that loads — all from HTML attributes.
- **Alpine.js** — small interactive bits: show/hide, toggles, counters.
- Why this stack: no build step, CDN-delivered, readable, and Claude is excellent at it.

### 4.4 — Building a Feature: The Full Loop

A concrete walkthrough — one feature, start to finish:

- **The prompt:** describing what you want in plain English, with context
- **Claude works:** creates files, writes routes, builds UI, connects the database
- **Running locally:** `npm run dev`, open browser, see it
- **The first issue:** something doesn't work. This is normal. This is always normal.
- **Describing the problem:** "when I click submit, nothing happens." Claude diagnoses and fixes.
- **Iterating:** three or four rounds of "close, but change X"
- **Deploying:** one command. Live.
- **The rhythm:** dream → describe → build → react → refine → ship → repeat

### 4.5 — Working with Data

- Tell Claude what data you need to store — in plain English
- Claude creates the schema, the tables, the queries
- Everything boils down to four operations: Create, Read, Update, Delete
- The `schema.sql` pattern: one file defining your database structure
- When data meets AI: generating content, analyzing patterns, personalizing experiences

### 4.6 — Adding AI to Your Product

- **System prompts:** instructions that tell an AI model how to behave in your app
- **Building chat:** conversational interfaces — the most common AI feature
- **AI as substance, not decoration:** when AI genuinely improves the experience vs. when it's tacked on
- **Workers AI:** models on Cloudflare's infrastructure — no separate key, no separate bill
- **Cost reality:** tokens cost money. Understanding roughly what things cost.

---

## Part 5: The Daily Practice

### 5.1 — How to Think with Claude

- **Plan mode:** asking Claude to think through an approach before building
- **Reading what Claude builds:** you don't need to understand every line, but understand the *shape* — what files exist, what they do, how they connect
- **Evolving CLAUDE.md:** every lesson learned gets added. Your project gets smarter over time.
- **Git as a journal:** commit messages tell the story of what changed and why

### 5.2 — When Things Break

- **The mindset:** breaking things is the most common state of building. Professional engineers break things constantly. This is not failure.
- **Describing problems:** "I expected X, I got Y, here's what I see." That's the entire skill.
- **Error messages:** they look terrifying. They're informative. Claude translates.
- **The common culprits:** environment variable not set, cookie misconfigured, deployment out of sync, schema mismatch
- **The loop:** describe → Claude investigates → Claude fixes → verify → continue

### 5.3 — Iterating and Shipping

- Ship early, learn fast, throw away what doesn't work
- Share a URL, watch someone use it, hear what they struggle with
- Your database tells you what people actually do (vs. what they say they'd do)
- The courage to delete and rebuild — Claude makes starting over cheap
- Version discipline: what's deployed, what changed, how to roll back

---

## Part 6: Where This Is Going

### 6.1 — AI as Abstraction Layer

- We're watching the creation of a new abstraction layer in technology
- This has happened before: machine code → assembly → C → Python. Each layer let more people build more things with less specialized knowledge. Each layer was met with skepticism from the people who mastered the previous one.
- But this layer is different. Previous abstractions required learning the abstraction. This one understands natural language. The interface is... talking.
- What this means: the barrier to building software dropped from "years of training" to "clarity of thought"

### 6.2 — The Coming Specialization

- Right now we're in the "everyone is a generalist" phase. One person + Claude can do a bit of everything.
- What's coming: practitioners who are 10-50x more effective because AI handles everything outside their core expertise
  - A designer who ships production code
  - A researcher who builds analysis tools on the fly
  - A product manager who prototypes before writing specs
  - A domain expert (doctor, teacher, analyst) who builds tools no engineer would think to build because they don't have the domain knowledge
- The people who master AI-assisted workflows *within their domain* will be extraordinarily productive

### 6.3 — The 50-Person Team We Haven't Seen Yet

- Most AI usage in organizations today is individual: one person with Copilot, one person with Claude. The *collaborative* patterns haven't been invented yet.
- We haven't seen what "good" looks like from a full team — 50 people, all fluent, working together with AI at every level
- Anthropic might be the closest example: a company building AI with AI. But even they are still inventing the meta-workflow.
- What happens when a team of 50 operates at 10-50x current capacity? We don't know. The tools, processes, and org structures all need to be reinvented.
- This isn't something to fear. It's an opportunity to be early in defining how it works.

### 6.4 — Beyond Web

- The same workflow extends everywhere: Xcode + SwiftUI for iOS, Android Studio + Kotlin, Electron/Tauri for desktop, browser extensions
- The mental model doesn't change: dream → describe → build → react → refine. The implementation details change; Claude handles those.
- Your Cloudflare backend serves all platforms — one brain, many interfaces

### 6.5 — The Invitation

- The people who learn this workflow now have a real head start — not because the tools won't improve (they will), but because the *thinking* compounds: how to direct AI, how to architect products, how to iterate on ideas
- The only prerequisites are imagination and curiosity
- This article is a starting point. The repo is a scaffold. What you build on them is yours.

---

## Appendices

### A — The Starter Kit (Open Source Repo)

**What's included:**
- Pre-configured Cloudflare Workers project (Hono, DaisyUI, HTMX)
- CLAUDE.md tailored for this workflow
- MCP server configuration files
- Custom "AI Dev Intro" Claude Skill
- Example prototype with all core patterns
- D1 database schema templates
- Deployment scripts
- Setup README

**Getting started:**
```
git clone [repo]
cd fullstack-ai-starter
claude
```

### B — The "AI Dev Intro" Skill

A custom Claude Skill purpose-built for this article and starter kit. This is the reader's primary guide — not the article itself. The article provides context and mental models. The skill does the actual work.

**What it does:**
- **Environment detection:** checks OS, installed tools, existing configurations. Builds a picture of "where you are" before suggesting next steps.
- **Guided installation:** walks through each missing tool in order, with plain-English explanations of what's being installed and why. Handles Node.js (nvm), Git, Wrangler, MCP servers.
- **Account connection:** guides the reader through creating/connecting Cloudflare, GitHub, and Figma accounts. Knows which steps require the human (sign-up, payment) and which Claude can handle (configuration, verification).
- **Project scaffolding:** creates a first project from the starter template, pre-configured with CLAUDE.md, D1 schema, R2 bindings, and a working example feature.
- **First deploy:** walks through local dev → production deployment → visiting the live URL.
- **Contextual help:** if the reader gets stuck at any point, the skill provides targeted troubleshooting based on the specific error or state.
- **Progressive:** doesn't dump everything at once. Detects what's done and picks up where you left off. Safe to run repeatedly.

**Design principles for the skill:**
- Never assume terminal familiarity — explain what's happening at each step
- Make it interruptible — the reader can stop and resume later
- Make it idempotent — running it again doesn't break anything, just skips completed steps
- Keep it honest — if something requires manual action, say so clearly

### C — Glossary

Plain-English definitions of every technical term, organized by topic.

### D — Common Issues

Symptom-based troubleshooting from real experience.

---

## Production Notes

**Estimated length:** ~8,000–10,000 words

**Structure:** Single long-form piece or 6-part series

**Media needs:**
- Screenshots of Claude Code in Ghostty
- Figma → code workflow
- Simple architecture diagrams
- Toolkit matrix as designed graphic
- Screen recordings of the build loop

**What makes this different:**
1. Written from real, sustained experience — not a weekend experiment
2. Prescriptive: specific tools, specific recommendations, with reasoning
3. Truly accessible — doesn't assume terminal familiarity
4. Full stack — not just "make a landing page"
5. Honest about costs, limits, and breakage
6. Actionable — clone the repo, start today
7. Zero hype — just what it is and how to do it
