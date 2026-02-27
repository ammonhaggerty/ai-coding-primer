# TL;DR — The Fast Track

Skip the philosophy. Get building.

---

### 1. Sign up for Claude

Go to [claude.ai](https://claude.ai) and subscribe. Start with Pro ($20/mo). Upgrade to Max ($100/mo) when you hit usage limits.

### 2. Install Homebrew (Mac only)

Homebrew is the standard way to install developer tools on a Mac. Claude will use it throughout this guide. This is a one-time install that takes 5-10 minutes — it downloads Apple's command-line developer tools in the background. Let it run and follow any prompts:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

*(Windows users: skip this step.)*

### 3. Install Node.js

Node.js is the engine that runs JavaScript outside a browser — Claude Code and most web development tools depend on it. Another 5-10 minutes on a fresh machine.

**Mac:**
```
brew install node
```

**Windows:**
```
winget install OpenJS.NodeJS.LTS
```

**Or, on any platform:** Download from [nodejs.org](https://nodejs.org) — click the green LTS button, run the installer.

### 4. Install Claude Code

```
npm install -g @anthropic-ai/claude-code
```

### 5. Create a workspace and start Claude

**Mac:**
```
mkdir -p ~/Development
cd ~/Development
```

**Windows:**
```
mkdir %USERPROFILE%\Development
cd %USERPROFILE%\Development
```

Now start Claude:
```
claude
```

Sign in when prompted. You do this once.

### 6. Install the primer skill

Exit Claude first (type `/exit` or press `Ctrl+C`), then run:

```
npx -y degit ammonhaggerty/a-primer-skills ~/.claude/plugins/a-primer-skills
```

Restart Claude with the skill loaded:

```
claude --plugin-dir ~/.claude/plugins/a-primer-skills
```

### 7. Let Claude set up everything else

Tell Claude:

*"Use the primer setup skill to set up my development environment."*

Say yes to everything. Claude installs Git, Wrangler, MCP servers, and skills. Five minutes.

### 8. Create your first project

Type: `/a-new-project`

Claude scaffolds a project, sets up a database and storage on Cloudflare, initializes Git and GitHub, and starts a local dev server. You'll see your app in the browser.

### 9. Deploy

Tell Claude: *"Deploy my project to Cloudflare."*

You'll need a Cloudflare account (free to sign up, $5/mo Workers Paid plan recommended) — [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up). Claude walks you through connecting it.

### 10. Build

Tell Claude what you want. Be specific:

*"Add a page where a user answers three questions about their mood and sees a personalized result. Save their response to the database so they can see a history."*

Claude builds it. You look at it. You say what to change. Claude changes it. You deploy. Repeat.

---

That's the whole loop. Everything else in this guide is context — the *why* behind the *what*.

---

## What's in the Rest of the Guide

**[About the Author](01-about-the-author.md)** — Thirty years of building things on screens, from BASIC on an Apple II+ to creative direction at agencies and studios, to the moment AI collapsed the barrier between imagining something and shipping it. Why a designer is writing a guide about full-stack development, and why that's exactly the point.

---

**[Part 1: The Landscape](02-the-landscape.md)** — The barrier to building software was never really about code — it was the iceberg of infrastructure underneath it. AI didn't just help with the code part. It dissolved the iceberg. This section explains what changed (Claude Opus 4.6 is the specific step change), what the mental model looks like (you're the dreamer, AI is the builder), and what the complete toolkit costs. The single most important idea: the skills that matter now are imagination and curiosity, not syntax.

---

**[Part 2: Setting Up](03-setting-up.md)** — Five steps by hand, then Claude takes over. This section walks through the full environment setup — terminal, Claude Code, MCP servers, skills, CLAUDE.md, the docs/ folder, and the starter project. It explains what each piece is *after* you've installed it, so the explanation feels like context rather than homework. Also covers optional upgrades (Ghostty, VS Code) for a nicer experience.

---

**[Part 3: The Cloud](04-the-cloud.md)** — Your app needs to live somewhere other than your laptop. This section covers why Cloudflare (simple, fast, generous free tier), your first deploy, and the building blocks you'll actually use: Workers (runs your code), D1 (database), R2 (file storage), Workers AI (built-in intelligence), and KV (fast key-value store). Also covers secrets and security.

---

**[Part 4: Building](05-building.md)** — From idea to working product. Starts with intent ("what do you want to exist?"), moves through design with Figma and Claude, explains the stack in plain terms (Hono, HTML, Tailwind, DaisyUI, HTMX, Alpine), then walks through building a complete feature end-to-end — including the database, the UI, and adding AI. This is the longest section because it's the core of the experience.

---

**[Part 5: The Daily Practice](06-daily-practice.md)** — The most important chapter for long-term success. The single biggest idea: *always plan before you build* — write the plan to a file, review it, then let Claude execute. Also covers reading what Claude builds (understanding the shape, not every line), evolving your CLAUDE.md (keep it lean), using the docs/ folder for memory across sessions, screenshots and browser DevTools for debugging, the recovery loop when things break, and when to revert and start smaller instead of patching.

---

**[Part 6: Where This Is Going](07-where-this-is-going.md)** — A step back from the practical to trace the trajectory. AI as an abstraction layer (like the shift from assembly to high-level languages), the coming specialization of AI tools, what it feels like to have a 50-person team in one seat, and where this goes beyond the web. Short, forward-looking, meant to leave you thinking.

---

**[Appendices](08-appendices.md)** — The reference section you'll keep coming back to. Claude Code commands and keyboard shortcuts (with the essentials starred), AI model pricing and capabilities (for coding and for your product), the Cloudflare free tier at a glance, every link you'll need (Claude, Cloudflare, tools, frameworks), a glossary of terms, and symptom-based troubleshooting for common issues.

---

The best time to read the full guide is after you've built something. The steps above give you the experience. The chapters below give you the understanding. Both are better with the other.

**Next:** [About the Author](01-about-the-author.md)
