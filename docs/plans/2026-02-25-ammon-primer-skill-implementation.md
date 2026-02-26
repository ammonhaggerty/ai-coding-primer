# ammon-primer-skill Plugin — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Claude Code plugin with two skills and one command that guide beginners from environment setup through project creation and ongoing development workflow.

**Architecture:** A plugin with `primer-setup` (one-time environment config), `primer-workflow` (passive guidance), and `/a-new-project` (repeatable project scaffolding). Reference files keep SKILL.md files lean via progressive disclosure. No scripts or assets needed — all instruction-driven.

**Tech Stack:** Claude Code plugin system (plugin.json, SKILL.md, command .md files), Markdown with YAML frontmatter

**Design doc:** `docs/plans/2026-02-25-ammon-primer-skill-design.md`

---

### Task 1: Create Plugin Directory Structure and Manifest

**Files:**
- Create: `skills/ammon-primer-skill/.claude-plugin/plugin.json`

**Step 1: Create directory structure**

```bash
mkdir -p skills/ammon-primer-skill/.claude-plugin
mkdir -p skills/ammon-primer-skill/skills/primer-setup/references
mkdir -p skills/ammon-primer-skill/skills/primer-workflow
mkdir -p skills/ammon-primer-skill/commands
```

**Step 2: Write plugin.json**

```json
{
  "name": "ammon-primer-skill",
  "version": "0.1.0",
  "description": "Companion plugin for the AI Primer guidebook — environment setup, project creation, and workflow guidance for beginners building full-stack AI products",
  "author": {
    "name": "Ammon Haggerty"
  },
  "repository": "https://github.com/ammon/ai-primer",
  "license": "MIT",
  "keywords": ["beginner", "setup", "cloudflare", "full-stack", "ai-primer", "workflow"]
}
```

**Step 3: Commit**

```bash
git add skills/ammon-primer-skill/.claude-plugin/plugin.json
git commit -m "feat: initialize ammon-primer-skill plugin structure"
```

---

### Task 2: Create primer-setup Reference Files

These go first because SKILL.md references them. Three reference files containing detailed information that would bloat the skill body.

**Files:**
- Create: `skills/ammon-primer-skill/skills/primer-setup/references/environment-checks.md`
- Create: `skills/ammon-primer-skill/skills/primer-setup/references/mcp-server-configs.md`
- Create: `skills/ammon-primer-skill/skills/primer-setup/references/troubleshooting.md`

**Step 1: Write environment-checks.md**

Cross-platform detection commands for every tool the setup skill needs to check. Include:
- OS detection: `uname -s` (Mac/Linux), `$env:OS` (Windows)
- Node.js: `node --version` (minimum v18), detection of nvm/fnm
- Git: `git --version`, `git config user.name`, `git config user.email`
- Wrangler: `wrangler --version`
- Homebrew (Mac): `brew --version`, PATH check for `/opt/homebrew/bin`
- MCP config location: `~/.claude/` (Mac/Linux)
- Plugin installation check commands
- Minimum version requirements for each tool
- Common false negatives (tool installed but not in PATH)

**Step 2: Write mcp-server-configs.md**

Exact JSON configurations for each MCP server. Include:
- **context7:** npx-based stdio config (`@upstash/context7-mcp@latest`)
- **Cloudflare:** npx-based stdio config (`@anthropic-ai/mcp-remote` pointing to Cloudflare MCP endpoint) — note: requires Cloudflare OAuth
- **Playwright:** npx-based stdio config (`@anthropic-ai/mcp-remote` pointing to Playwright MCP endpoint, or local `@playwright/mcp`)
- **Figma (optional):** npx-based stdio config (Figma MCP)
- Config file location: `~/.claude/` on Mac/Linux
- JSON structure showing where each server entry goes in the MCP config
- Verification steps: how to confirm each server responds after configuration

Consult the user's existing MCP configuration patterns for accuracy. Use the currently installed MCP server configs as reference for the correct JSON format.

**Step 3: Write troubleshooting.md**

Symptom-based troubleshooting. Format each as: symptom → cause → fix. Include:
- "Homebrew not found" after installation → not in PATH → add to shell profile
- "node: command not found" → not installed or not in PATH → install/fix PATH
- `npm install -g` permission errors → missing write access → fix npm prefix or use sudo
- "Wrangler not authenticated" → token expired → `wrangler login`
- MCP server not responding → config JSON syntax error → validate JSON
- Port 8787 already in use → another process on port → `lsof -i :8787` to find and kill
- Git commits fail with "Please tell me who you are" → name/email not configured → `git config`
- `wrangler deploy` fails with "No account found" → not logged in → `wrangler login`
- D1 database creation fails → Cloudflare account not on correct plan or not authenticated
- Template clone fails → git not installed or no internet → check connectivity and git

**Step 4: Commit**

```bash
git add skills/ammon-primer-skill/skills/primer-setup/references/
git commit -m "feat: add primer-setup reference files (env checks, MCP configs, troubleshooting)"
```

---

### Task 3: Create primer-setup SKILL.md

The core setup skill. Must be lean (~2,000 words), imperative form, third-person description. References the three files from Task 2.

**Files:**
- Create: `skills/ammon-primer-skill/skills/primer-setup/SKILL.md`

**Step 1: Write SKILL.md**

Frontmatter:
```yaml
---
name: primer-setup
description: "This skill should be used when the user asks to \"set up my development environment\", \"configure my tools\", \"install development tools\", \"set up for the AI Primer\", \"get started with the primer\", or mentions needing to set up Node.js, Git, Wrangler, MCP servers, or Cloudflare for the first time. Guides complete beginners through one-time environment setup."
---
```

Body structure (imperative form throughout):
1. **Overview** — Purpose: one-time environment setup for the AI Primer workflow. Designed for users who may have never opened a terminal. Progressive and idempotent.
2. **Design Principles** — Never assume terminal familiarity. One step at a time. Idempotent. Honest about manual vs automated steps. Platform-aware (Mac-first, Windows/Linux alternatives).
3. **Setup Flow** — Seven steps in order, each with clear instructions:
   - Step 1: Workspace Check — detect cwd, explain ~/Development convention, offer to create, guide cd
   - Step 2: Environment Detection — run checks from `references/environment-checks.md`, present findings in plain English
   - Step 3: Tool Installation — Node.js, Git (with name/email config), Wrangler. Skip present tools. Ask permission. Verify.
   - Step 4: Cloudflare Account — `wrangler whoami`, guide `wrangler login` if needed (manual OAuth)
   - Step 5: MCP Servers — required: context7, Cloudflare, Playwright. Optional: Figma. Use configs from `references/mcp-server-configs.md`
   - Step 6: Plugins & Skills — install superpowers and frontend-design from marketplace. Explain what skills are.
   - Step 7: Completion — recap checklist, remind about `/a-new-project`, suggest Ghostty and VS Code as optional upgrades
4. **Troubleshooting** — Point to `references/troubleshooting.md` for common issues
5. **Reference Files** — list all three references with descriptions

Target: ~1,800 words body. Move all specific commands, configs, and error details to references.

**Step 2: Commit**

```bash
git add skills/ammon-primer-skill/skills/primer-setup/SKILL.md
git commit -m "feat: add primer-setup skill with progressive environment setup flow"
```

---

### Task 4: Create primer-workflow SKILL.md

Passive workflow guidance skill. No reference files needed — the content is concise tips, not detailed documentation.

**Files:**
- Create: `skills/ammon-primer-skill/skills/primer-workflow/SKILL.md`

**Step 1: Write SKILL.md**

Frontmatter:
```yaml
---
name: primer-workflow
description: "This skill should be used when the user is brainstorming ideas, planning features, building with Claude, working with Figma designs, debugging errors, troubleshooting issues, or expressing confusion or frustration during development. Provides beginner-friendly workflow guidance for AI-assisted product development."
---
```

Body structure (imperative form throughout):
1. **Overview** — Passive guidance for beginner developers working with Claude. Surface relevant tips when recognizing workflow patterns. Do not dump all advice at once — share the relevant section based on what the user is doing.
2. **Brainstorming & Planning** — Plan before building. Write a brief. Specificity beats length. Review Claude's plan before executing. The 10-minute rule.
3. **Guiding Feature Development** — The build loop (dream, describe, build, react, refine, ship). Describe the what not the how. Include edge cases in prompts. Iterate in small bites. Reference project structure. Ship early.
4. **Using Figma with Claude** — Simple wireframes are enough. Claude reads structure not polish. Use auto-layout. Name layers meaningfully. Share specific frame links. DaisyUI maps well to Figma components. The prompt pattern for Figma-to-code.
5. **Debugging & Troubleshooting** — Just tell Claude what happened. Three things to say (expected, actual, visible). Error messages are helpful — paste them. Ask Claude to explain, investigate, step back. Common culprits list. Nothing is catastrophic — git rollback. Don't suffer in silence.

Target: ~1,500 words body.

**Step 2: Commit**

```bash
git add skills/ammon-primer-skill/skills/primer-workflow/SKILL.md
git commit -m "feat: add primer-workflow skill with brainstorming, building, Figma, and debugging guidance"
```

---

### Task 5: Create /a-new-project Command

**Files:**
- Create: `skills/ammon-primer-skill/commands/a-new-project.md`

**Step 1: Write a-new-project.md**

Frontmatter:
```yaml
---
name: a-new-project
description: Scaffold a new full-stack project from the AI Primer starter template
---
```

Body — the full command flow:
1. **Workspace Check** — Verify cwd is ~/Development or equivalent. If not, explain project organization convention, offer to cd.
2. **Project Intent** — Ask what they want to build (2-3 sentence description). Ask for project name (suggest kebab-case).
3. **Scaffold** — Primary: copy template from ai-primer `examples/` directory. Fallback: generate from scratch. Stack: Hono, Tailwind/DaisyUI (CDN), HTMX/Alpine.js (CDN), Cloudflare Workers, D1, R2. No build step. Place in `~/Development/project-name/`.
4. **Configure** — Update `wrangler.toml` with project name. Create D1 database and R2 bucket on Cloudflare, bind to project. Generate tailored `CLAUDE.md` with: project description, tech stack, instruction to document in `docs/`, instruction to check `docs/` after compaction. Create `docs/` structure (`docs/plans/`, `docs/log/`, `docs/README.md`).
5. **Version Control** — `git init`, initial commit. Create GitHub repo (handle SSH/token setup if needed). Push.
6. **Run Locally** — `npm install`, `npm run dev`. Tell user to open `localhost:8787`. Explain what they see.
7. **Nudge** — "Your project is running locally. When you're ready to put it on the internet, just ask me to deploy it." Remind about the build loop.

Include the fallback scaffold spec (full file listing for generating from scratch): `package.json` with Hono and Wrangler deps, `wrangler.toml` template, `src/index.ts` with basic Hono routes, HTML layout with CDN links for Tailwind/DaisyUI/HTMX/Alpine, `schema.sql` starter, `.gitignore`, `.dev.vars` example.

**Step 2: Commit**

```bash
git add skills/ammon-primer-skill/commands/a-new-project.md
git commit -m "feat: add /a-new-project command for repeatable project scaffolding"
```

---

### Task 6: Update Plugin README

**Files:**
- Modify: `skills/ammon-primer-skill/README.md`

**Step 1: Rewrite README.md**

Replace the current stub with a description of the plugin:
- What it is (companion to AI Primer guidebook)
- Three components and what each does
- How to install (`/plugin install` or local path)
- How to use: setup skill trigger, `/a-new-project` command, primer-workflow automatic
- Link to design doc and guidebook

**Step 2: Commit**

```bash
git add skills/ammon-primer-skill/README.md
git commit -m "docs: update primer-skill README with plugin overview and usage"
```

---

### Task 7: Validate Plugin Structure

**Step 1: Verify all files exist**

Check that the plugin structure matches the design:
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

**Step 2: Validate SKILL.md frontmatter**

Confirm both skills have valid YAML frontmatter with `name` and `description` fields. Confirm descriptions use third-person and include specific trigger phrases.

**Step 3: Validate command frontmatter**

Confirm command has `name` and `description` in frontmatter.

**Step 4: Validate writing style**

Spot-check that SKILL.md bodies use imperative/infinitive form, not second person.

**Step 5: Check cross-references**

Confirm SKILL.md references to `references/*.md` files point to files that exist.

**Step 6: Verify plugin.json**

Confirm valid JSON with required fields (name, version, description).

---

## Execution Notes

- **Tasks 2, 4, and 5 are independent** and can be parallelized (reference files, workflow skill, and command have no dependencies on each other).
- **Task 3 depends on Task 2** (primer-setup SKILL.md references the reference files).
- **Task 1 must go first** (creates directories).
- **Task 6 and 7 go last** (README and validation after all content exists).
- No TDD — these are instruction documents, not executable code. Validation in Task 7 serves as the quality check.
