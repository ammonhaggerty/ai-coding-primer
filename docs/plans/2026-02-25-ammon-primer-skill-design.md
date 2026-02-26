# Design: ammon-primer-skill Plugin

**Date:** 2026-02-25
**Status:** Approved
**Scope:** Claude Code plugin for the AI Primer guidebook — environment setup, project creation, and workflow education for beginners

---

## Summary

A Claude Code plugin with two skills and one command that together take a complete beginner from "I just installed Claude Code" to "I have a running project I can deploy." The plugin is the hands-on companion to the AI Primer guidebook.

- **`primer-setup` skill** — One-time environment setup (tools, accounts, MCP servers, plugins)
- **`/a-new-project` command** — Repeatable project scaffolding from template
- **`primer-workflow` skill** — Passive workflow guidance (brainstorming, building, Figma, debugging)

---

## Plugin Structure

```
skills/ammon-primer-skill/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── primer-setup/
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── environment-checks.md
│   │       ├── mcp-server-configs.md
│   │       └── troubleshooting.md
│   └── primer-workflow/
│       └── SKILL.md
├── commands/
│   └── a-new-project.md
└── README.md
```

---

## Component 1: `primer-setup` Skill

### Purpose

One-time guided setup of a complete development environment. Designed for people who may have never opened a terminal. Progressive and idempotent — detects what's already done, skips completed steps, safe to re-run.

### Trigger

User says "set up my development environment" or follows the guidebook instruction: *"Use the primer setup skill to set up my development environment."*

### Flow

#### Step 1: Workspace Check

- Detect current working directory.
- If in home directory or somewhere unexpected, explain the `~/Development` convention: a single folder where all projects live, and the place to always launch Claude from.
- Offer to create `~/Development` if it doesn't exist.
- Guide user to `cd ~/Development` before proceeding.

#### Step 2: Environment Detection

- OS detection (macOS, Windows, Linux)
- Node.js: installed? version?
- Git: installed? configured (user.name, user.email)?
- Wrangler: installed?
- Existing MCP server configurations?
- Existing plugin/skill installations?

Present findings in plain English: "Here's what I found on your system..." with a clear list of what's ready and what's missing.

#### Step 3: Tool Installation

Skip anything already present. For each missing tool:
- Explain what it is and why it's needed, in one sentence.
- Ask permission before installing.
- Install using platform-appropriate method:
  - **Node.js:** Homebrew (Mac), winget (Windows), or nodejs.org installer
  - **Git:** Homebrew (Mac), winget (Windows), apt (Linux). Configure user.name and user.email — ask the user for these values.
  - **Wrangler:** `npm install -g wrangler`
- Verify installation succeeded.

#### Step 4: Cloudflare Account Connection

- Run `wrangler whoami` to check existing auth.
- If not authenticated: walk through `wrangler login` (opens browser for OAuth). Explain this is the user doing it manually — Claude can't log in for them.
- Verify connection succeeded.

#### Step 5: MCP Server Configuration

**Required:**
- **context7** — Documentation lookup. Explain: "This lets me pull the latest documentation for any library instead of relying on potentially outdated training data."
- **Cloudflare** — Infrastructure management. Explain: "This lets me search Cloudflare docs and help manage your cloud services directly."
- **Playwright** — Browser automation. Explain: "This lets me open a browser, test your app, and debug issues autonomously — so when something looks wrong, I can see what you see."

**Optional:**
- **Figma** — Ask: "Do you use Figma for design? If so, I can connect to your Figma files and generate code from your designs." Install if yes, skip if no.

For each server: configure the JSON, place in the correct config location for the OS, verify the server responds.

Reference file: `references/mcp-server-configs.md` contains exact JSON configurations and OS-specific config paths.

#### Step 6: Plugin & Skill Installation

Install the following plugins from the marketplace:
- **superpowers** — Provides: brainstorming, systematic-debugging, writing-plans, subagent-driven-development, using-superpowers
- **frontend-design** — UI/UX patterns and component design

Explain: "Skills are playbooks that teach me specific workflows. These make me better at brainstorming ideas, debugging problems, planning features, and building interfaces."

#### Step 7: Completion Summary

Recap everything that was set up in a clear checklist. Then:
- Remind: "You can create your first project by typing `/a-new-project`"
- Suggest optional upgrades: Ghostty (better terminal), VS Code (code viewer) — brief explanation of each, not required

### Design Principles

- **Never assume terminal familiarity.** Explain every concept in plain English.
- **One step at a time.** Don't dump a wall of actions. Proceed sequentially, confirming as you go.
- **Idempotent.** Re-running detects completed steps and skips them. Fixes broken steps.
- **Honest.** Clearly distinguish "Claude does this" from "you need to do this manually."
- **Platform-aware.** Mac-first instructions with Windows/Linux alternatives noted.

### Reference Files

**`references/environment-checks.md`**
Detailed commands for detecting tools across Mac/Windows/Linux. Version requirements (minimum Node.js version, etc.). Common detection failure modes and fixes (e.g., Homebrew not in PATH after install).

**`references/mcp-server-configs.md`**
Exact JSON configuration for each MCP server (context7, Cloudflare, Playwright, Figma). Config file locations per OS (`~/.claude/` on Mac/Linux, equivalent on Windows). Verification commands for each server.

**`references/troubleshooting.md`**
Common issues and fixes:
- Homebrew not in PATH after installation
- Node.js version too old
- `npm install -g` permission errors
- Wrangler auth expired or failed
- MCP server not responding
- Port conflicts (8787 already in use)
- Git config not set (commits fail)

---

## Component 2: `/a-new-project` Command

### Purpose

Scaffold a new project from the starter template, configure Cloudflare services, initialize version control, and get the local dev server running. Designed to be run multiple times as the user creates new projects.

### Trigger

User types `/a-new-project`.

### Flow

#### Step 1: Workspace Check

- Verify current directory is `~/Development` (or the user's established workspace).
- If not: explain why project organization matters ("Keeping all projects in one place makes them easy to find and helps Claude understand your workspace"), offer to `cd ~/Development`.

#### Step 2: Project Intent

- Ask: "What do you want to build? Describe it in a few sentences — who it's for, what it does, what the core experience feels like."
- Ask: "What should the project be called?" Suggest a kebab-case name derived from their description.

#### Step 3: Scaffold

- **Primary path:** Copy the starter template from the ai-primer repo's `examples/` directory.
- **Fallback path:** If template is unavailable, generate the project from scratch using detailed instructions. The generated project follows the same structure and stack:
  - Hono (web framework)
  - Tailwind CSS + DaisyUI (styling, loaded from CDN)
  - HTMX + Alpine.js (interactivity, loaded from CDN)
  - Cloudflare Workers (runtime)
  - D1 (database)
  - R2 (file storage)
  - No build step — CDN-delivered frontend dependencies
- Place project in `~/Development/project-name/`.

#### Step 4: Configure

- Update `wrangler.toml` with the project name and bindings.
- Create a D1 database on Cloudflare, bind it to the project.
- Create an R2 bucket on Cloudflare, bind it to the project.
- Generate a `CLAUDE.md` tailored to the project, including:
  - Project description (from user's brief)
  - Tech stack reference
  - Instruction to document plans and decisions in `docs/`
  - Instruction to check recent `docs/` entries at the start of each session and after context compaction
  - Standard conventions for the stack
- Create `docs/` directory structure:
  - `docs/plans/` — for feature plans and design documents
  - `docs/log/` — for session summaries and decisions
  - `docs/README.md` — explains the convention

#### Step 5: Version Control

- `git init`
- Initial commit with all scaffolded files.
- Create a GitHub repository (handles SSH key or personal access token setup if not already configured).
- Push initial commit.

#### Step 6: Run Locally

- `npm install`
- `npm run dev`
- Tell the user to open `localhost:8787` in their browser.
- Explain what they're seeing: "This is your project running on your machine. Only you can see it right now."

#### Step 7: Nudge

- "Your project is running locally. When you're ready to put it on the internet, just ask me to deploy it."
- Remind them about the build loop: dream it, describe it, build it, react to it, refine it, ship it.

---

## Component 3: `primer-workflow` Skill

### Purpose

Passive workflow guidance that Claude draws on automatically when it recognizes the user is brainstorming, building features, working with Figma, or debugging. The user doesn't invoke this directly — it surfaces the right guidance at the right moment.

### Trigger

Automatically when Claude recognizes relevant workflow patterns: brainstorming sessions, feature building conversations, Figma URL sharing, error messages, debugging loops, or user expressions of confusion/frustration.

### Content Areas

#### Brainstorming & Planning

- Always start in plan mode for anything non-trivial. The prompt: "Plan this before you build it."
- Write a brief first — 2-3 paragraphs describing what you're building, for whom, and what the core experience feels like.
- Specificity beats length: "a page where users answer 5 questions and see a score" is better than "a social app."
- Review Claude's plan before saying "go" — adjust assumptions now, not after 20 minutes of building in the wrong direction.
- The 10-minute rule: 10 minutes of clear thinking saves hours of building in circles.
- For bigger features: "Think through the architecture for this feature. What files need to change? What data do we need? What could go wrong?"

#### Guiding Claude During Feature Development

- The build loop: dream, describe, build, react, refine, ship.
- Describe the *what*, not the *how*: "a timeline of past entries, most recent first" rather than implementation details.
- Include edge cases in prompts: "if there are no entries, show an encouraging empty state."
- Iterate in small bites: one change per message, verify, then next change.
- When something feels wrong but you can't articulate it: describe the gap between what you see and what you imagined.
- Reference project structure when you can: "in the history route" is faster and more precise than "on the history page."
- Ship early, learn from real usage. Don't wait for perfection.

#### Using Figma with Claude

- You don't need to be a designer — simple rectangles, text, and arrows are enough.
- Wireframe-level fidelity works: Claude reads structure (layout, hierarchy, spacing), not polish.
- Use frames to represent pages/screens, auto-layout for structure.
- Name layers meaningfully — "hero-section", "nav-bar", "cta-button" — Claude reads these names.
- For flow diagrams: FigJam works well, or simple boxes-and-arrows in Figma.
- Share a specific frame link, not the whole file — gives Claude focus.
- DaisyUI components map well to Figma: design with the component library in mind.
- The prompt pattern: "Here's my Figma design for the dashboard. Match the layout and spacing. Use DaisyUI components where possible."

#### Debugging & Troubleshooting

- The #1 rule: **just tell Claude what happened.** You don't need to diagnose anything.
- Three things to say when something breaks: (1) what you expected, (2) what actually happened, (3) what you see on screen.
- Error messages look scary — they're actually helpful. Copy and paste the whole thing to Claude. Say "I'm seeing this error." Claude translates.
- **Ask Claude to explain.** "Why did that happen?" and "What does this error mean?" are legitimate, valuable prompts.
- **Ask Claude to investigate.** "Something feels off with the history page — can you check it?" Claude reads the files, traces the data flow, finds the issue.
- The common culprits: environment variable not set, deployment out of sync, database schema mismatch, typo in a route, cookie secure flag mismatch.
- When going in circles: stop and say "We've tried a few things and it's still broken. Can you look at this fresh?"
- **Nothing is catastrophic.** Git means you can always roll back. "Revert to the last working version" is a real prompt.
- **Don't suffer in silence.** If you're confused, frustrated, or stuck — that's the moment to type something. Even "I'm stuck" is useful.

---

## Project Template Conventions

The starter template (in `examples/`) and every project created by `/a-new-project` includes:

### `docs/` Directory

```
docs/
├── README.md       # Explains the convention
├── plans/          # Feature plans and design documents
└── log/            # Session summaries and decisions
```

### `CLAUDE.md` Standards

Every generated `CLAUDE.md` includes:
- Project description and purpose
- Tech stack (Hono, Tailwind/DaisyUI, HTMX/Alpine.js, Cloudflare Workers, D1, R2)
- Instruction: "Document all plans, architectural decisions, and session summaries in `docs/`. Use `docs/plans/` for feature plans and `docs/log/` for session notes and decisions."
- Instruction: "At the start of each session and after context compaction, check recent entries in `docs/log/` and `docs/plans/` to restore context about in-progress work."
- Project-specific conventions as they develop

---

## What This Plugin Does NOT Do

- **Write application code.** The plugin sets up the environment and scaffolds projects. Building features is the user's conversation with Claude, guided passively by the `primer-workflow` skill.
- **Replace the guidebook.** The guidebook provides mental models and context. The plugin provides hands-on automation and in-the-moment guidance.
- **Handle production operations.** Monitoring, scaling, incident response — beyond scope. This is about getting from zero to deployed.

---

## Dependencies

- The starter project template in `examples/` (to be created separately)
- Published plugins: superpowers, frontend-design (installed from marketplace during setup)
- MCP servers: context7, Cloudflare, Playwright, Figma (configured during setup)
- User accounts: Anthropic (Claude Pro/Max), Cloudflare, GitHub (created manually by user)
