# Part 2 — Revised Approach

## The Idea

Radically simplify the reader's onboarding. Instead of walking through 6+ tools and explaining each one, the article gives you TWO steps:

1. Open your terminal, install Claude Code, log in
2. Install the skill, say "set up my environment"

The skill handles everything else: Node.js, Git, MCP servers, VS Code recommendation, project scaffolding, first deploy. The article then EXPLAINS what happened — after the reader has already experienced it working.

## Flow: What the Reader Does

```
Step 1: Open Terminal (whatever they have — Terminal.app is fine)
Step 2: Install Claude Code
        → Problem: requires Node.js, which requires npm
        → Solution: bootstrap script or Claude Code standalone installer
        → Fallback: two commands (install Node via nvm, then install Claude Code)
Step 3: claude
Step 4: "Install the ai-dev-intro skill from [repo/location]"
Step 5: "Set up my development environment"
Step 6: The skill takes over — detects state, installs what's missing, configures everything
```

## The Chicken-and-Egg Problem

Claude Code is installed via npm, which requires Node.js. So we can't have Claude install Node.js if Claude isn't running yet.

**Options:**

A. **Two-step bootstrap** (simplest, most honest):
   - "Install Node.js" → one curl command for nvm, one command for node
   - "Install Claude Code" → one npm command
   - Then Claude + skill handle everything else
   - Pro: no magic, reader understands the one prerequisite
   - Con: three commands before Claude is running

B. **Bootstrap shell script** (one command):
   - `curl -fsSL https://ai-primer.dev/setup.sh | bash`
   - Script checks for Node, installs if missing, installs Claude Code
   - Pro: truly one step
   - Con: "curl | bash" is a pattern some people are wary of

C. **Standalone Claude Code installer** (if Anthropic provides one):
   - If Claude Code ever ships as a standalone binary (no Node dependency), this becomes trivial
   - As of Feb 2026, this may or may not exist — needs verification

**Recommendation: Option A with great writing.** Three commands isn't a lot. Frame it as "the only things you do by hand — after this, Claude handles everything."

## What the Skill Does

The "ai-dev-intro" skill (or "ammon-skills" bundle) handles:

### Environment Detection
- Check OS (macOS, Windows, Linux)
- Check installed: Node.js, npm, Git, VS Code, Wrangler
- Check Claude Code version
- Check MCP server configuration
- Report what's present and what's missing

### Installation (what's missing)
- Git (via xcode-select on Mac, or platform equivalent)
- Wrangler CLI (npm install -g wrangler)
- MCP servers: context7, Cloudflare, Figma (optional)
- Configure MCP in Claude settings

### Project Setup
- Scaffold a starter project from template
- Create CLAUDE.md pre-configured for the stack
- Initialize Git repo
- Create D1 database
- Configure wrangler.toml

### Verification
- Run local dev server
- Deploy "Hello World" to Cloudflare
- Verify MCP connections work
- Report success/issues

### Progressive & Idempotent
- Detects what's already done, skips completed steps
- Safe to run multiple times
- Can be interrupted and resumed
- Explains what it's doing at each step in plain English

## Article Structure (Revised Part 2)

### Opening: "Two Steps"
- Here's what you do: open terminal, install Claude, install the skill
- Three commands total, then Claude takes the wheel
- Frame: this is the moment you step off the cliff. Claude catches you.

### The Three Commands
1. Install Node.js (the one prerequisite — the engine Claude needs)
2. Install Claude Code
3. Start Claude, install the skill

### "Set Up My Environment"
- What the reader types
- What they see happening (brief narrative of the skill running)
- The feeling: watching Claude check, install, configure, verify — all in conversation

### What Just Happened (Behind the Scenes)
NOW explain the tools — but as a retrospective, not a prerequisite:
- "Claude just installed these MCP servers. Here's what they do..."
- "Claude created a CLAUDE.md file. Here's why that matters..."
- "Your project is now connected to Cloudflare. Here's what that means..."

This inverts the traditional guide structure: instead of "learn, then do," it's "do, then understand." The reader has a working environment BEFORE they understand all the pieces. Understanding follows naturally from having seen it work.

### Ghostty, VS Code, and Other "Nice to Haves"
- Mentioned as upgrades, not requirements
- "Now that you're up and running, here are tools that make the experience better..."
- Ghostty: a nicer terminal
- VS Code: for reading what Claude builds
- These are genuinely optional — Terminal.app works fine

## Skill Packaging Questions

1. **Name:** "ai-dev-intro" vs "ammon-skills" vs something else?
   - "ammon-skills" could be a bundle (environment setup + project patterns + other skills)
   - "ai-dev-intro" is more descriptive and article-specific
   - Could be nested: "ammon-skills" is the package, "ai-dev-intro" is one skill within it

2. **Distribution:** How does the reader install the skill?
   - Option A: Clone the starter repo (skill lives inside it)
   - Option B: Install from a URL/registry
   - Option C: Claude fetches it from GitHub
   - Simplest: skill is in the starter repo, reader clones repo, skill is ready

3. **Scope:** Does the skill ONLY do environment setup, or does it also guide building?
   - Recommendation: split into phases
   - Phase 1: Environment setup (this section)
   - Phase 2: "Build your first feature" (Part 4 of the article)
   - Same skill, different commands
