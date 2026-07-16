# Appendices

- [Appendix A: Claude Code Features](#appendix-a-claude-code-features) — Commands, keyboard shortcuts, permission modes, and skills
- [Appendix B: AI Models — For Coding and For Your Product](#appendix-b-ai-models--for-coding-and-for-your-product) — Model tiers, pricing, capabilities, and when to use what
- [Appendix C: Cloudflare Free Tier at a Glance](#appendix-c-cloudflare-free-tier-at-a-glance) — What you get without paying
- [Appendix D: Every Link You'll Need](#appendix-d-every-link-youll-need) — All apps, services, dashboards, and docs in one place
- [Appendix E: Glossary](#appendix-e-glossary) — Plain-English definitions of every technical term
- [Appendix F: Common Issues](#appendix-f-common-issues) — Symptom-based troubleshooting

---

## Appendix A: Claude Code Features

Everything you can do inside Claude Code — built-in commands, keyboard shortcuts, and the skills added by this tutorial. Items marked with ★ are the ones you'll use most often.

### Built-In Slash Commands

These come with Claude Code out of the box. Type `/` to see the full list.

**Everyday essentials:**

| Command | What It Does |
|---|---|
| ★ `/help` | Shows all available commands and usage tips |
| ★ `/model` | Switch between Opus, Sonnet, Haiku, and Fable mid-session. Use the left/right arrows to set the effort level — **Medium** is the sweet spot for most coding (faster, fewer tokens) |
| ★ `/compact` | Shrinks your conversation to free up context when sessions get long. Make a habit of running it between major tasks — a leaner conversation is faster and cheaper. Add instructions to focus the summary: `/compact keep the database discussion` |
| ★ `/clear` | Wipes the conversation and starts fresh. Your files aren't touched — just the chat history |
| ★ `/init` | Creates a `CLAUDE.md` file for your project. Run this once at the start of any new project |
| ★ `/memory` | Opens your `CLAUDE.md` for editing. Add rules and constraints — keep it lean (see [The Daily Practice](06-daily-practice.md)) |
| `/context` | Shows how much of the context window you're currently using — a good gauge for when to `/compact` |
| `/cost` | Shows how many tokens you've used in this session |
| `/usage` | Shows your plan limits and rate limit status |

**Session management:**

| Command | What It Does |
|---|---|
| ★ `/resume` | Pick up a previous conversation where you left off. Sessions auto-save |
| `/rewind` | Undo recent conversation turns and/or code changes |
| `/export` | Save the conversation to a file |
| `/copy` | Copy Claude's last response to your clipboard |

**Configuration:**

| Command | What It Does |
|---|---|
| `/config` | Open Claude Code settings |
| `/permissions` | View or change what Claude is allowed to do without asking |
| `/mcp` | Manage MCP server connections |
| `/status` | See your version, model, account, and connection status |
| `/doctor` | Health check — diagnoses problems with your installation |
| `/debug` | Reads session logs to troubleshoot issues |

**Tasks and background work:**

| Command | What It Does |
|---|---|
| `/tasks` | List and manage background tasks Claude is running |

### Keyboard Shortcuts

You don't need to memorize these. Learn the starred ones first; the rest you'll pick up naturally.

**The essentials:**

| Shortcut | What It Does |
|---|---|
| ★ `Shift+Tab` | Cycle between permission modes: normal → auto-accept → plan mode. This is how you toggle plan mode on and off |
| ★ `Ctrl+C` | Stop whatever Claude is currently doing |
| ★ `Tab` | Accept Claude's suggested next step |
| ★ `Esc Esc` (double-tap) | Rewind — undo the last turn or restore code to a previous state |
| `Ctrl+L` | Clear the terminal screen (conversation stays intact) |
| `Up/Down arrows` | Browse your command history |
| `Option+Enter` (Mac) | Start a new line without sending your message |
| `Option+P` (Mac) / `Alt+P` (Win) | Quick model switch |
| `Option+T` (Mac) / `Alt+T` (Win) | Toggle extended thinking mode |
| `Ctrl+T` | Show/hide the task list |

**Useful but not urgent:**

| Shortcut | What It Does |
|---|---|
| `Ctrl+G` | Open your message in a text editor (for long, complex prompts) |
| `Ctrl+R` | Search your command history |
| `Ctrl+B` | Send a running task to the background |
| `Ctrl+X` `Ctrl+K` | Kill all background tasks/agents |
| `Ctrl+V` / `Cmd+V` | Paste an image from your clipboard into the conversation |
| `!` (at start) | Run a bash command directly and add the output to your conversation |
| `@` | Autocomplete a file path — mention files for Claude to look at |

### Permission Modes

Claude Code has three modes that control how much autonomy Claude has. Cycle through them with `Shift+Tab`.

**Normal mode** (default) — Claude asks permission before running commands, editing files, or taking actions. You approve each step. This is the right mode when you're learning or working on something sensitive.

**Plan mode** — Claude plans but doesn't execute. It shows you what it *would* do, and you approve the plan before anything happens. Use this for complex features where you want to review the approach first.

**Auto-accept mode** — Claude runs commands and edits files without asking. Use this when you're in a flow and trust what Claude is doing — like iterating on styling or running tests repeatedly. Switch back to normal mode when the task changes.

### Skills Added by This Tutorial

When you install the `a-primer-skills` plugin, these skills become available. They work in two ways: some are slash commands (like `/a-new-project`), and others are instruction sets that Claude draws on automatically when relevant. You can also invoke skills explicitly: *"Use the brainstorming skill to help me think through this feature."*

| Skill | What It Does |
|---|---|
| ★ **a-primer-skills** (`/a-new-project`) | The core skill for this guide. The `/a-new-project` slash command scaffolds a new project with the full stack, CLAUDE.md, docs/ folder, and configuration. Also handles environment setup, tool installation, and project patterns |
| ★ **brainstorming** | Structured ideation. When you're exploring ideas — feature concepts, product directions, creative approaches — this skill gives Claude a framework for helping you think expansively before narrowing down |
| ★ **frontend-design** | UI and UX patterns. Claude uses this when building interfaces — component layout, responsive behavior, visual hierarchy, interaction patterns. Makes Claude better at producing good-looking, usable pages |
| ★ **systematic-debugging** | Methodical problem diagnosis. When something breaks, this skill gives Claude a structured approach: reproduce, isolate, diagnose, fix, verify. Prevents the "let me try random things" anti-pattern |
| **writing-skills** | Clear, effective writing. Claude uses this when generating documentation, content, or copy for your app. Focuses on concision, clarity, and appropriate tone |
| **writing-plans** | Planning features and projects before building. Structures Claude's thinking into phases: understand the goal, identify the pieces, sequence the work, flag risks. Pairs well with plan mode |
| **subagent-driven-development** | Using parallel Claude instances for complex tasks. When a job has independent parts, Claude can spawn background agents that work simultaneously — one building the UI while another sets up the database. Advanced but powerful |
| **using-superpowers** | Getting the most from Claude's advanced capabilities — extended thinking, multi-file edits, complex reasoning, context management. A meta-skill that makes Claude better at being Claude |

### Quick Reference: The Commands You'll Actually Use

If you remember nothing else from this appendix:

| Situation | What to Do |
|---|---|
| Starting a new project | `/a-new-project` to scaffold everything, or `/init` for just CLAUDE.md |
| Want Claude to plan first | `Shift+Tab` to cycle into plan mode |
| Conversation getting long | `/compact` to free up space |
| Want to try a different model | `/model` or `Option+P` |
| Need to undo something | `Esc Esc` to rewind |
| Picking up where you left off | `/resume` — Claude checks `docs/` for progress notes |
| Something broke | Paste the error to Claude. It handles the rest |
| Curious about usage | `/cost` for this session, `/usage` for your plan |

---

## Appendix B: AI Models — For Coding and For Your Product

There are two completely different contexts where AI models matter in this workflow, and confusing them is one of the most common mistakes. Let's be clear about each.

### Part 1: Models for Coding (Claude Code)

This is the AI you talk to in the terminal — your building partner. It reads your project, writes code, debugs issues, plans features, and deploys your app.

**The recommendation: use Opus 4.8 for everything.**

Opus 4.8 is dramatically better at coding than any other model. It understands context deeper, catches edge cases other models miss, reasons through architecture more carefully, and gets things right on the first pass far more often. When you're learning, the quality of the model isn't a nice-to-have — it's the difference between a smooth experience and a frustrating one. Opus is available on both the Pro plan ($20/mo) and the Max plan ($100/mo) — but Pro defaults to Sonnet, so you'll want to switch. Use `/model` in Claude Code and select Opus 4.8. If you find yourself running out of usage regularly, Max gives you significantly more capacity.

Claude comes in three model tiers — Opus, Sonnet, and Haiku — but for coding with Claude Code, Opus is the one to use:

| Model | Role in Coding | When to Use |
|---|---|---|
| **Opus 4.8** | The best. Deep reasoning, catches edge cases, handles complexity | Always — this is your default |
| **Sonnet 5** | Capable, faster, cheaper usage | Only if you're hitting usage limits on Max and need to conserve |
| **Haiku 4.5** | Fast but shallow | Not recommended for coding — too many misses on anything non-trivial |

**How to set your model:** Use `/model` in Claude Code and select Opus 4.8. It will remember your preference.

**A note on effort.** The same `/model` screen lets you set an *effort level* with the left/right arrow keys — how hard the model works before it answers. For most coding, **Medium** is the sweet spot: it's faster and uses fewer tokens than the higher settings, so your usage stretches further — and Opus at Medium still outclasses the lighter models at their best. Step it up to High for a genuinely hard problem (a stubborn bug, a large multi-file change), then drop back to Medium for routine work. This one setting is one of the easiest ways to make a Pro or Max plan last longer.

### Part 2: Models for Your Product (In-App AI)

This is different. These are the AI models that run *inside* your application — the ones your users interact with. Here, cost, speed, and capability all matter because you're paying per request and your users are waiting for responses.

#### Claude Models (via Anthropic API)

If you want Claude's intelligence inside your app, you use the API. This is separate from your subscription — it's pay-per-token through the Anthropic Console.

*Prices per million tokens. A token ≈ ¾ of a word.*

| Model | Input | Output | Speed | Best For |
|---|---|---|---|---|
| **Fable 5** | $10.00 | $50.00 | Slowest | The most capable model — hardest reasoning and long, autonomous tasks. Rarely needed for everyday app features |
| **Opus 4.8** | $5.00 | $25.00 | Slow | Complex reasoning, deep analysis — when quality justifies the cost |
| **Sonnet 5** | $3.00 | $15.00 | Fast | Best all-rounder. Chat, content generation, analysis, recommendations |
| **Haiku 4.5** | $1.00 | $5.00 | Fastest | Classification, extraction, simple Q&A, high-volume tasks |

*Sonnet 5 is at introductory pricing of $2.00 input / $10.00 output per million tokens through August 31, 2026.*

**Capabilities all Claude models share:**

| Capability | Details |
|---|---|
| **Text generation** | Conversation, content creation, summarization, analysis |
| **Vision / image input** | Analyze images, read screenshots, describe photos, extract text from images |
| **Streaming** | Responses stream token-by-token — users see text appear in real time, not after a delay |
| **Tool use** | Models can call functions you define — search databases, fetch data, take actions |
| **Structured output** | Generate valid JSON matching a schema you specify |
| **Extended thinking** | Opus and Sonnet can "think" step-by-step before responding, improving complex reasoning |
| **Multilingual** | Strong performance across dozens of languages |

**Batch API** gives 50% off all models for non-urgent workloads processed within 24 hours. Good for bulk content generation, data processing, or overnight analysis.

**What Claude models don't do:** generate images, generate audio/speech, or generate video. For those, you need other services (see below).

#### Cloudflare Workers AI

Workers AI runs models directly on Cloudflare's network — no separate API account, no additional credentials. It's built into your stack.

| What | Models | Cost |
|---|---|---|
| **Text generation** | Llama 4 Scout, gpt-oss-120b, GLM-4.7-Flash, others | Free: 10,000 Neurons/day. Then $0.011/1K Neurons |
| **Image understanding** | Llama 4 Scout (vision) | Same Neuron pricing |
| **Text-to-image** | FLUX.2, Leonardo Phoenix, Stable Diffusion XL | Same Neuron pricing |
| **Speech-to-text** | Whisper | Same Neuron pricing |
| **Text-to-speech** | Deepgram models | Same Neuron pricing |
| **Embeddings** | bge-base, bge-large | Same Neuron pricing |
| **Classification** | Various | Same Neuron pricing |

Workers AI is best for: features where you need decent quality at minimal cost and zero configuration. It won't match Claude or Gemini for text quality, but for classification, embeddings, image understanding, and simple generation, it's excellent — and the free tier covers most development and light production use.

#### Image Generation

Claude doesn't generate images. For AI image generation in your products, **Google's Gemini and Imagen models** are the strongest options.

| Model | Cost Per Image | Resolution | Notes |
|---|---|---|---|
| **Gemini 3.1 Flash Lite Image** (Google) | ~$0.034 | Up to 1024×1024 | Cheapest option, fast, good quality |
| **Gemini 3.1 Flash Image** | ~$0.05–$0.15 | Up to ~2048×2048 | Balanced quality and price, strong text understanding |
| **Gemini 3 Pro Image** | ~$0.13–$0.24 | Up to 4096×4096 | Highest quality, 4K resolution |
| **Workers AI** (FLUX/Leonardo) | Free tier, then Neurons | Varies | Built into Cloudflare, simplest setup |

*Gemini Batch API gives 50% off for non-real-time generation.*

For most projects in this guide, Workers AI's built-in image generation models are the simplest starting point — no extra accounts. When you need higher quality or more control, Gemini's API is the recommended step up. Google offers a generous free tier for experimentation.

**Gemini API:** [ai.google.dev](https://ai.google.dev) — sign up with a Google account, get an API key, and start generating.

#### Voice & Speech

For voice features — text-to-speech, speech-to-text, real-time conversation — several strong options exist:

| Service | What It Does | Starting Cost | Standout Feature |
|---|---|---|---|
| **ElevenLabs** | Text-to-speech, voice cloning, conversational AI | Free tier (10K chars/mo), then $5/mo | Most natural-sounding voices, 70+ languages |
| **Deepgram** | Speech-to-text and text-to-speech | $200 free credit, then ~$0.008–0.015/min | Fastest transcription, real-time streaming |
| **Cartesia** | Ultra-low-latency text-to-speech (Sonic 3) | Pay-as-you-go (free credits to start) | ~40ms latency — best for real-time voice agents |
| **Workers AI** (Whisper/Deepgram) | Speech-to-text, text-to-speech | Free tier, then Neurons | Built into Cloudflare, zero extra setup |

For basic speech-to-text, Workers AI's Whisper model is free and built in. For high-quality text-to-speech voices, ElevenLabs is the current leader. For real-time voice applications (like voice agents or live conversation), Deepgram and Cartesia specialize in low-latency streaming.

### Part 3: Subscription Plans

| Plan | Cost | What You Get | Who It's For |
|---|---|---|---|
| **Free** | $0 | Limited Claude access, no Claude Code | Exploring what Claude can do |
| **Pro** | $20/mo | Claude Code + all models (incl. Opus 4.8), limited usage | Getting started, learning, small projects |
| **Max (5×)** | $100/mo | 5× Pro usage — sustained Opus coding | Active daily building — **recommended** |
| **Max (20×)** | $200/mo | 20× Pro usage — all-day Opus | Power users in constant build mode |

**Start with Pro ($20/mo)** if you're exploring. You get access to all models including Opus 4.8 — it's not locked behind Max. But Opus is significantly more token-hungry than Sonnet (20-30% more per interaction), and Pro's usage window is tight. Expect roughly 30-60 minutes of active Opus coding per 5-hour window before hitting your limit. You can stretch this by using Sonnet for simpler tasks and saving Opus for complex work — use `/model` to switch. This is enough to learn the workflow, build small features, and experience the difference between models firsthand.

**Move to Max ($100/mo)** when you start building seriously. Max gives you 5× the Pro allowance — several hours of sustained Opus coding per session. This is where the 80→99% promise becomes your daily reality, because you're not constantly managing a usage budget. The difference isn't just more tokens — it's uninterrupted flow. When you're deep in a build and hit a wall on Pro, the momentum breaks. Max removes that wall.

**Max at $200/mo** is for people building all day. Some power users run two or three $200 accounts to maintain uninterrupted workflow across multiple projects. Monitor your usage and upgrade when limits start slowing you down.

**The API** (for in-app AI) is billed separately — pay-per-token through the Anthropic Console. You add prepaid credits and pay only for what you use. This is for AI features inside your product, not for coding with Claude Code.

---

## Appendix C: Cloudflare Free Tier at a Glance

The $5/month Workers Paid plan is strongly recommended. The free tier works for initial exploration, but the paid plan removes limits that will slow you down quickly — especially CPU time per request, daily request caps, and restricted access to Workers AI features. For five dollars, the upgrade is significant.

| Service | Free Tier | Workers Paid ($5/mo) |
|---|---|---|
| **Workers** (compute) | 100,000 requests/day, 10ms CPU/request | 10M requests/mo included (then $0.30/M), up to 5 min CPU/request |
| **D1** (database) | 5 GB total storage (500 MB/database), 5M rows read/day, 100K rows written/day | 10 GB/database, 25B rows read/mo, 50M rows written/mo |
| **R2** (file storage) | 10 GB storage, 10M reads/mo, 1M writes/mo, **zero egress** | $0.015/GB storage, same zero egress |
| **KV** (key-value) | 1 GB storage, 100K reads/day, 1K writes/day | Unlimited storage, 10M reads/mo, 1M writes/mo |
| **Vectorize** (vector DB) | 5M stored + 30M queried vector *dimensions*/mo | $0.05/100M stored dimensions, $0.01/M queried dimensions |
| **Workers AI** | 10,000 Neurons/day | $0.011 per 1,000 Neurons above free, plus AI Gateway access |

Zero egress on R2 means you're never charged for people *reading* your files — only for storing them. This is unusually generous in the cloud storage world and means traffic spikes don't spike your bill.

---

## Appendix D: Every Link You'll Need

All the apps, services, dashboards, and documentation referenced in this guide, in one place.

### Claude & Anthropic

| What | URL |
|---|---|
| Claude (chat interface) | [claude.ai](https://claude.ai) |
| Claude Code (web) | [claude.ai/code](https://claude.ai/code) |
| Plans & pricing | [claude.com/pricing](https://claude.com/pricing) |
| Your subscription & billing | [claude.ai/settings/billing](https://claude.ai/settings/billing) |
| Anthropic Console (developer/API) | [console.anthropic.com](https://console.anthropic.com) |
| API keys | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| API billing & credits | [console.anthropic.com/settings/billing](https://console.anthropic.com/settings/billing) |
| API usage dashboard | [console.anthropic.com/settings/usage](https://console.anthropic.com/settings/usage) |
| API pricing (per model) | [platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing) |
| Models overview | [platform.claude.com/docs/en/about-claude/models/overview](https://platform.claude.com/docs/en/about-claude/models/overview) |
| Claude Code docs | [code.claude.com/docs](https://code.claude.com/docs) |
| Claude Code model config | [code.claude.com/docs/en/model-config](https://code.claude.com/docs/en/model-config) |
| Help center | [support.claude.com](https://support.claude.com) |

### Cloudflare

| What | URL |
|---|---|
| Sign up | [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up) |
| Dashboard | [dash.cloudflare.com](https://dash.cloudflare.com) |
| Workers & Pages | [dash.cloudflare.com → Workers & Pages](https://dash.cloudflare.com) |
| D1 databases | [dash.cloudflare.com → Storage & Databases → D1](https://dash.cloudflare.com) |
| R2 storage | [dash.cloudflare.com → Storage & Databases → R2](https://dash.cloudflare.com) |
| Workers AI | [dash.cloudflare.com → AI → Workers AI](https://dash.cloudflare.com) |
| Domain registration | [dash.cloudflare.com → Domain Registration](https://dash.cloudflare.com) |
| Workers pricing | [developers.cloudflare.com/workers/platform/pricing](https://developers.cloudflare.com/workers/platform/pricing/) |
| D1 pricing | [developers.cloudflare.com/d1/platform/pricing](https://developers.cloudflare.com/d1/platform/pricing/) |
| R2 pricing | [developers.cloudflare.com/r2/pricing](https://developers.cloudflare.com/r2/pricing/) |
| Workers AI pricing | [developers.cloudflare.com/workers-ai/platform/pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/) |
| Wrangler CLI docs | [developers.cloudflare.com/workers/wrangler](https://developers.cloudflare.com/workers/wrangler/) |

### Development Tools

| What | URL |
|---|---|
| Node.js (download) | [nodejs.org](https://nodejs.org) |
| Ghostty (terminal, Mac) | [ghostty.org](https://ghostty.org) |
| VS Code (editor) | [code.visualstudio.com](https://code.visualstudio.com) |
| Git (download) | [git-scm.com](https://git-scm.com) |
| GitHub | [github.com](https://github.com) |
| Homebrew (Mac package manager) | [brew.sh](https://brew.sh) |

### Design & Frameworks

| What | URL |
|---|---|
| Figma | [figma.com](https://www.figma.com) |
| Hono (web framework) | [hono.dev](https://hono.dev) |
| Tailwind CSS | [tailwindcss.com](https://tailwindcss.com) |
| DaisyUI (components) | [daisyui.com](https://daisyui.com) |
| HTMX | [htmx.org](https://htmx.org) |
| Alpine.js | [alpinejs.dev](https://alpinejs.dev) |

### MCP Servers

| What | URL |
|---|---|
| context7 | [github.com/upstash/context7](https://github.com/upstash/context7) |
| Cloudflare MCP | [github.com/cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare) |
| Playwright MCP | [github.com/anthropics/anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts) |
| Figma MCP | [github.com/nichochar/figma-mcp](https://github.com/nichochar/figma-mcp) |

---

## Appendix E: Glossary

Plain-English definitions of every technical term in this guide.

**API (Application Programming Interface)** — A way for programs to talk to each other. When your app asks D1 for data or calls Workers AI for a response, it's using an API.

**CLI (Command-Line Interface)** — A program you interact with by typing commands in the terminal, rather than clicking buttons in a window. Wrangler and Claude Code are CLIs.

**Commit** — A saved snapshot of your project at a specific point in time. Like a save point in a game — you can always go back to it.

**CRUD** — Create, Read, Update, Delete. The four basic operations every database supports. Every app feature is some combination of these.

**Deploy** — Sending your code from your computer to Cloudflare's servers so it's live on the internet.

**Edge** — Servers distributed around the world, close to users. When your Worker runs "at the edge," it runs on whichever server is nearest to the person making the request.

**Environment variable** — A value stored outside your code (like an API key) that your app can access at runtime. Keeps secrets out of your codebase.

**Git** — Version control software that tracks every change to your project. Your undo button and backup system.

**GitHub** — A website that hosts Git repositories online. Your project's backup and collaboration hub.

**Hono** — A lightweight web framework for edge computing. The skeleton that connects URLs to your app's responses.

**HTMX** — A library that makes web pages interactive using HTML attributes instead of JavaScript. Forms submit, content loads, pages update — all from HTML.

**MCP (Model Context Protocol)** — A standard that lets AI tools like Claude connect to external services. MCP servers are plugins that give Claude new capabilities.

**Node.js** — A JavaScript runtime. The engine Claude Code and your project's tooling need to operate.

**Repository (repo)** — A project folder tracked by Git. Contains all your code, history, and configuration.

**Route** — A URL path mapped to a piece of code. When someone visits `/history`, the route tells your app what to show them.

**Schema** — The structure of your database — what tables exist, what columns each table has, what type of data each column holds.

**SQL (Structured Query Language)** — The language used to talk to databases. `SELECT * FROM users` means "get everything from the users table."

**SQLite** — A lightweight database engine. D1 is built on SQLite.

**System prompt** — Instructions given to an AI model that shape how it behaves in your app. Defines personality, boundaries, and format.

**Terminal** — The application where you type commands. Also called the command line, shell, or console.

**Token** — A unit of text that AI models process. Roughly ¾ of a word. Used for pricing API calls.

**Worker** — A Cloudflare Worker. A small program that runs on Cloudflare's servers and responds to web requests.

**Wrangler** — Cloudflare's CLI tool. Connects your local project to Cloudflare for deployment and management.

---

## Appendix F: Common Issues

Symptom-based troubleshooting from real experience. When something goes wrong, find your symptom below.

### "command not found: claude"

**Cause:** Claude Code isn't installed, or its install directory isn't on your PATH.
**Fix:** Re-run the native installer — Mac: `curl -fsSL https://claude.ai/install.sh | bash`; Windows (PowerShell): `irm https://claude.ai/install.ps1 | iex`. Then restart your terminal so it picks up the new command. (If you installed via npm instead, run `npm install -g @anthropic-ai/claude-code`, and install Node.js first if `npm` isn't found either.)

### "command not found: npm"

**Cause:** Node.js isn't installed.
**Fix:** Install from [nodejs.org](https://nodejs.org) or via `brew install node` (Mac) / `winget install OpenJS.NodeJS.LTS` (Windows).

### Claude says "I don't have access to..." or can't find your files

**Cause:** You started Claude from the wrong directory.
**Fix:** Exit Claude, `cd ~/Development/your-project`, then `claude` again. Claude's awareness is rooted in the directory where you launch it.

### "Authentication failed" or login loops

**Cause:** Your Claude session expired, or you're not logged in.
**Fix:** Run `claude` again and follow the authentication link. If it keeps looping, try `claude logout` then `claude` to start fresh.

### Deploy fails with "No account ID found"

**Cause:** Wrangler isn't connected to your Cloudflare account.
**Fix:** Run `wrangler login` and follow the browser auth flow. Then try deploying again.

### "No such table" errors

**Cause:** Your database schema hasn't been applied. The code expects tables that don't exist yet.
**Fix:** Ask Claude: "The database tables don't exist yet. Can you run the schema?" Claude will apply `schema.sql` to your D1 database.

### Page shows but looks broken (no styles)

**Cause:** DaisyUI or Tailwind CSS CDN links are missing or incorrect in your HTML.
**Fix:** Check that your HTML `<head>` includes the DaisyUI and Tailwind CDN links. Ask Claude: "The page has no styling. Can you check the CDN links?"

### "Error: Too many requests" or rate limiting

**Cause:** You've hit your Claude usage limit (on Pro) or Cloudflare free tier limits.
**Fix for Claude:** Wait for your limit to reset, or upgrade to Max. Check usage at [claude.ai/settings/billing](https://claude.ai/settings/billing).
**Fix for Cloudflare:** Free tier resets daily at midnight UTC. For sustained usage, upgrade to Workers Paid ($5/mo).

### Changes work locally but not when deployed

**Cause:** You made changes but didn't deploy them.
**Fix:** Run `wrangler deploy` (or ask Claude to deploy). Also check that any new environment variables/secrets have been pushed to Cloudflare.

### "Cookies not working" — login state doesn't persist

**Cause:** Cookie `secure` flag mismatch. Local dev needs `secure: false`, production needs `secure: true`.
**Fix:** Ask Claude: "My login isn't persisting. Can you check the cookie configuration?"

### MCP server not connecting

**Cause:** MCP configuration file is missing or has a typo.
**Fix:** Ask Claude: "Can you check my MCP server configuration?" Claude will inspect the config file and fix any issues.

### Git says "nothing to commit" but you made changes

**Cause:** Changes haven't been staged (added to Git's tracking).
**Fix:** Ask Claude to commit your changes — it handles staging and committing together. Or run `git add .` then `git commit`.
