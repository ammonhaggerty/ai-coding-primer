# TL;DR — The Fast Track

Skip the philosophy. Get building.

---

**1. Sign up for Claude** → [claude.ai](https://claude.ai). Start with Pro ($20/mo). Upgrade to Max ($100/mo) when you hit usage limits.

**2. Install Node.js**

Mac: `brew install node` (need Homebrew first? `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`)

Windows: `winget install OpenJS.NodeJS.LTS`

Or download from [nodejs.org](https://nodejs.org) — click the green LTS button.

**3. Install Claude Code**

```
npm install -g @anthropic-ai/claude-code
```

**4. Create a workspace and start Claude**

```
mkdir -p ~/Development
cd ~/Development
claude
```

Sign in when prompted. You do this once.

**5. Install the skill and let Claude set up everything else**

```
npx degit ammonhaggerty/a-primer-skills ~/.claude/plugins/a-primer-skills
claude --plugin-dir ~/.claude/plugins/a-primer-skills
```

Then tell Claude: *"Use the primer setup skill to set up my development environment."*

Say yes to everything. Claude installs Git, Wrangler, MCP servers, and skills. Five minutes.

**6. Create your first project**

Type: `/a-new-project`

Claude scaffolds a project, sets up a database and storage on Cloudflare, initializes Git and GitHub, and starts a local dev server. You'll see your app in the browser.

**7. Deploy**

Tell Claude: *"Deploy my project to Cloudflare."*

You'll need a free Cloudflare account — [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up). Claude walks you through connecting it.

Ten seconds after deploy, you have a live URL.

**8. Build**

Tell Claude what you want to build. Be specific:

*"Add a page where a user answers three questions about their mood and sees a personalized result. Save their response to the database so they can see a history."*

Claude builds it. You look at it. You say what to change. Claude changes it. You deploy. Repeat.

---

That's the whole loop. Everything else in this guide is context — the *why* behind the *what*. Read it when you're curious. For now: build something.

---

**Next:** [About the Author](01-about-the-author.md)
