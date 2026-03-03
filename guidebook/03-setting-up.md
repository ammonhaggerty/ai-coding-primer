# Setting Up Your Workshop

I challenged myself to simplify the setup process to the absolute minimum — three accounts and five steps. After that, Claude takes over using a custom skill I built for this primer and sets up everything else for you. The tools, the connections, the configuration, the project scaffold — Claude handles it, explains what it's doing, and asks permission before each step.

This section starts with the three accounts you'll need, covers the five steps, then walks you through what happens when Claude takes the wheel. After your environment is running, we'll circle back and explain what all the pieces are and why they matter. But you'll already have a working setup by then — and that changes how the explanation feels. Instead of "learn this before you can start," it's "here's what just happened."

---

## Before You Start

Create three accounts. Everything downstream depends on them.

**Claude** — This is your AI partner. Go to [claude.ai](https://claude.ai) and subscribe. This guide recommends the Max plan ($100/mo) with Opus 4.6 — it's the most capable model for coding and handles complex, multi-file projects without breaking a sweat. The Pro plan ($20/mo) works too, but you'll hit usage limits faster and won't have access to the strongest model. Start with whichever fits your budget — you can upgrade anytime.

**Cloudflare** — This is where your app will live on the internet. Sign up at [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up). The free tier is enough to get started — the starter project's AI chat, database, and file storage all work on it. When you're ready to build something beyond a simple demo, the Workers Paid plan ($5/mo) removes the limits that matter — more CPU time per request, significantly more database and storage capacity, and higher AI usage. The free tier caps you at 100,000 requests per day and 10 milliseconds of CPU time per request, which sounds like a lot until your app does anything computationally heavy. You can upgrade anytime from your Cloudflare dashboard.

**GitHub** — This is where your code is backed up and version-tracked. Sign up at [github.com/signup](https://github.com/signup). Free. Remember the email you use — you'll need it during setup to link your code changes to your profile.

That's it. Now the five steps.

---

## The Five Steps

Open your terminal. On a Mac, that's the Terminal app — find it in Applications > Utilities, or search for "Terminal" in Spotlight. On Windows, open Windows Terminal or PowerShell. You'll see a window with a blinking cursor. That's it. That's where this starts.

**A note on hardware:** This guide works best on Apple Silicon Macs (M1 or newer). On Apple Silicon, the setup steps below take a few minutes each. On older Intel Macs, Homebrew and Node.js compile packages from source rather than using pre-built binaries, which can take 30 minutes or more. If you're on an Intel Mac, everything will still work — just be patient with the first two steps.

### 1. Install Homebrew (Mac only)

Homebrew is the standard way to install developer tools on a Mac. Claude will use it throughout this guide to install and manage software for you. If you already have it, skip to step 2.

This is a one-time install. It downloads Apple's command-line developer tools in the background — a few minutes on Apple Silicon, longer on Intel Macs. Let it run, follow any prompts that appear, and wait for it to finish:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

*(Windows users: skip this step.)*

### 2. Install Node.js

Claude Code needs a JavaScript runtime to operate. Node.js is that runtime. You install it once and never think about it again. A couple of minutes on Apple Silicon, potentially much longer on Intel Macs.

**Mac:**
```
brew install node
```

**Windows:**
```
winget install OpenJS.NodeJS.LTS
```

**Or, on any platform:** Download the installer from [nodejs.org](https://nodejs.org) — click the big green "LTS" button, run it, click through the steps. Done.

### 3. Install Claude Code

```
npm install -g @anthropic-ai/claude-code
```

Claude Code is now on your machine.

### 4. Create Your Workspace and Start Claude

Before starting Claude, create a home for your projects. This is the folder where all your work will live — and where you'll launch Claude from. (Tip: when you see multiple commands like below, you can copy/paste them all together - commands run in sequence)

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

This creates a `Development` folder in your home directory. You can name it whatever you want, but the convention is useful: every project you build will live inside this folder, and when you start Claude here, it has access to everything in your workspace.

Now start Claude:

```
claude
```

If this is your first time running Claude Code, it will walk you through a short setup. Choose the defaults for each prompt and say yes when it asks you to trust the folder — this lets Claude read and work with your project files. Then follow the link to sign in with the Claude account you created earlier and authorize the connection. This all happens once.

You're now talking to Claude, in your workspace. Everything from here on out, you can do in this conversation.

**Important:** Always start Claude from your workspace folder. Claude's awareness is rooted in wherever you launch it — if you start Claude in your Downloads folder, it'll be looking at your downloads, not your projects. Make `cd ~/Development` (or `cd %USERPROFILE%\Development` on Windows) a habit before typing `claude`.

---

## 5. Let Claude Set Up Your Environment

Now you'll install a custom skill I built for this primer. It teaches Claude how to set up everything else for you and guides you as you learn. Type these two commands inside Claude — the first adds the skill marketplace, the second installs the plugin:

```
/plugin marketplace add ammonhaggerty/a-primer-skills
```

```
/plugin install a-primer-skills@a-primer
```

When it asks about install scope, choose **"Install for you (user scope)"** — this makes the skills available in all your projects, not just the current folder.

Restart Claude so the new plugin loads. Type `/exit` (or press `Ctrl+C`), then:

```
claude
```

Now tell Claude:

```
Use the primer setup skill to set up my development environment.
```

Watch.

Claude will start by checking your system — what's installed, what's missing, what needs configuration. It will explain what it finds in plain English. Then it will start working through the setup, one step at a time, asking your permission along the way.

**Don't be alarmed by red text.** As Claude explores your system, you'll see red "Error" messages in the output. This is normal — Claude is checking what exists and what doesn't, and missing tools show up as errors during detection. Claude will clearly tell you if something actually needs your attention.

Say yes as Claude installs each tool. It will ask for your **Git Identity** — a name and email to label your work. Use the same email you used for GitHub — this links your code changes to your GitHub profile. Claude will also install the GitHub CLI and connect it to your GitHub account, then connect your Cloudflare account to the terminal. Both connections happen through browser-based sign-in flows that Claude walks you through.

Then Claude will set up MCP servers — connections that let it interact with external services like documentation lookup and Cloudflare. This part is automatic. The Cloudflare connection will activate the first time Claude uses it — a browser window will open asking you to authorize access. You'll see three permission options: Read Only, Workers Full Access, and DNS Full Access. **Click "Workers Full Access"** — Claude needs this to create and manage your Workers, databases, and storage. The default (Read Only) won't let Claude do the work for you.

**The one part that requires you to type.** Near the end, Claude will ask you to type a few slash commands to install plugins. These are interactive prompts that Claude can't run for you — it'll show you exactly what to type. First you'll add the plugin marketplace, then install three plugins from it one at a time, choosing "Install for you (user scope)" when asked. It will look something like this:

```
/plugin marketplace add anthropics/claude-plugins-official
/plugin install playwright@claude-plugins-official
/plugin install frontend-design@claude-plugins-official
/plugin install superpowers@claude-plugins-official
```

After all of them are installed, type **"all done"** or **"all are complete"** to let Claude know it can continue.

Claude will download browser binaries for Playwright (this takes a minute), then present a final checklist of everything that was set up.

**Restart Claude** (`/exit`, then `claude`). This final restart loads all the new MCP servers and plugins. It's like refreshing a browser — Claude picks up everything new when it starts fresh. You may see a note that says "1 MCP server failed" — this is the Cloudflare connection, which activates the first time Claude uses it (not at startup). Nothing is broken.

You'll see this "MCP server failed" message from time to time — services like Cloudflare and Figma use short-lived authorization tokens that expire periodically. When that happens, type `/mcp` and press Enter. You'll see a list of your MCP servers with the ones needing attention marked. Select the one that needs re-authorization, and a browser window will open to reconnect. If it doesn't work the first time, make sure you're signed into the service in your browser (e.g., dash.cloudflare.com) before trying again — signing in and authorizing are separate steps.

That's it. The whole process takes five to ten minutes. When it's done, you have a complete development environment: every tool installed, every connection configured, and all the skills Claude needs to do its best work. From here, you create projects with `/a-new-project` — Claude scaffolds the code, sets up the database and storage, initializes Git and GitHub, and starts the local dev server. You'll have a running app in your browser before you've written a single line of anything.

---

## What Just Happened

Now that you have a working environment, let's unpack what Claude set up and why each piece matters. You don't need to memorize any of this — Claude knows it all. But understanding the shape of your setup makes you a better collaborator.

### Git — Your Undo Button

Git is version control software. Every time Claude makes changes to your project, it saves a snapshot called a "commit." Each commit has a message describing what changed and why. Together, they form a complete history of your project — every addition, every fix, every experiment.

Why this matters: you can always go back. If Claude makes a change that breaks something, you rewind to the last working state. If you want to try an experimental approach, you create a "branch" — a parallel version of your project that doesn't affect the main one. If the experiment works, you merge it in. If it doesn't, you throw it away.

Claude handles all of this for you. You'll see it making commits as it works, and over time you'll start reading the commit messages like a journal of your project's evolution.

### MCP Servers — Claude's Connections to the World

Out of the box, Claude is smart but isolated. MCP (Model Context Protocol) servers are connections that let Claude reach out to external services directly.

**context7** — Documentation lookup. When Claude needs to know how a library works, it pulls the latest documentation instead of relying on training data that might be outdated. This seems small but it matters enormously — libraries change constantly, and outdated documentation produces broken code.

**Cloudflare** — Your cloud infrastructure. Claude can search Cloudflare's documentation, inspect your workers, check your databases, and help manage your deployment directly.

**Playwright** — Browser automation. Claude can open a browser, navigate pages, fill forms, click buttons, and take screenshots. This is invaluable for testing your app and for automating workflows that involve web interfaces.

**Figma** — Your design tool (optional). If you design screens in Figma, Claude can read them and generate matching code — layout, spacing, colors, typography.

Think of MCP servers as Claude's senses. Without them, Claude is working from memory. With them, Claude can see and interact with the real world of your project.

### Skills — Claude's Playbooks

The setup also installed a suite of skills that teach Claude specific workflows. Each one makes Claude better at a particular aspect of building:

- **a-primer-skills** — The environment setup and project patterns for this guide
- **brainstorming** — Structured ideation and exploration
- **writing-skills** — Clear, effective writing for documentation and content
- **writing-plans** — Planning features and projects before building
- **frontend-design** — UI/UX patterns, component design, layout
- **systematic-debugging** — Methodical problem diagnosis when things break
- **subagent-driven-development** — Using parallel Claude instances for complex tasks
- **using-superpowers** — Getting the most from Claude's advanced capabilities

You don't need to invoke these directly — Claude draws on the right skill for the situation. When you ask Claude to help debug a problem, it uses the debugging skill's approach. When you're brainstorming a feature, it uses the brainstorming patterns. They work in the background, making Claude more effective at each part of the workflow.

### CLAUDE.md — Your Project's Rulebook

This is the most important file in your project, and Claude created one for you during setup.

`CLAUDE.md` lives at the root of your project. Claude reads it at the start of every session. It contains the rules and constraints Claude needs to follow — things it would get wrong without being told.

Here's why it matters: Claude doesn't remember previous conversations. Each time you start a new session, Claude is starting fresh. CLAUDE.md is how critical knowledge survives between sessions. But — and this is important — it should stay focused. Recent research on AI coding agents found that bloated context files actually *hurt* performance. When Claude is told to follow rules that don't apply to the current task, it burns effort complying with irrelevant instructions. The sweet spot is minimal and specific.

Think of CLAUDE.md less like a journal and more like a rulebook. It shouldn't describe what your project is (Claude can read the code for that). It should describe what Claude needs to do *differently* than it would by default. Constraints it wouldn't know: "Cookies must use `secure: false` in local dev." Gotchas it would hit: "`card-border` doesn't work from the CDN — use `border border-base-300`." Decisions it should respect: "Always use D1, never Turso."

The starter kit includes a CLAUDE.md pre-configured for our stack. As your project grows, you'll add rules to it — but you'll also prune it. If a gotcha has been properly fixed in the code, remove the note. If Claude already follows a pattern without being told, don't add an instruction for it. Every line should earn its place.

### The Starter Project

Claude created a project scaffold — a clean, well-designed web application with a welcome page, an AI-powered chat, a light/dark theme toggle, and a solid foundation for building anything. It includes:

- **`src/index.ts`** — Your application's entry point. This is where URLs map to responses. When someone visits your site, this file decides what they see.
- **`src/chat.ts`** — An AI chat page powered by Cloudflare Workers AI. A working example of how to add intelligence to your app.
- **`src/layout.ts`** — The shared page layout — navigation, fonts, styling, and the theme toggle. Every page uses this wrapper.
- **`wrangler.toml`** — Configuration for Cloudflare. Tells Cloudflare what your project is called, what services it uses, and how to deploy it.
- **`CLAUDE.md`** — Your project's rulebook, as described above.
- **`docs/`** — A folder for your project's working memory. This is where Claude saves brainstorming notes, plans, progress updates, and design decisions.

You don't need to understand these files yet. Claude will work with them, and you'll learn what they do naturally as you watch Claude modify them.

### The docs/ Folder — Your Project's Long-Term Memory

If CLAUDE.md is the rulebook, the `docs/` folder is the journal.

Here's the problem CLAUDE.md alone can't solve: Claude's conversations have limited context. Long sessions get compacted — Claude summarizes what happened and continues with that summary instead of the full history. If you close a session and start a new one, Claude starts completely fresh. In both cases, the nuance of what you were thinking, what you tried, what you decided and why — that can get lost.

The `docs/` folder fixes this. Claude is instructed to save working notes there as you go: brainstorming sessions, feature plans, progress logs, design rationale, research findings. When Claude starts a new session or recovers from a compaction, it can read the `docs/` folder and pick up the thread.

This is different from CLAUDE.md in an important way. CLAUDE.md is read *automatically* at the start of every interaction — so it needs to stay lean. The `docs/` folder is read *on demand* — when Claude needs to remember what you were working on, it looks there. The size doesn't matter because Claude only pulls in what's relevant.

You don't need to manage the `docs/` folder yourself. Claude creates and updates files there as part of its workflow. But knowing it exists explains why Claude can pick up where you left off even across sessions — it's reading its own notes.

### Wrangler — Cloudflare's Tool

Wrangler is a command-line tool that connects your local project to Cloudflare's cloud infrastructure. When you're ready to deploy, Wrangler is how your code gets from your machine to the internet. Claude manages Wrangler entirely — you'll rarely interact with it directly.

---

## Making It Nicer (Optional)

Everything above works with the default terminal that came with your computer. But if you're going to spend time in this environment — and you will — a few upgrades make the experience noticeably better.

### Ghostty — A Better Terminal

Ghostty is a terminal app for Mac that's fast, clean, and purpose-built for this kind of work. It's free. Download it from [ghostty.org](https://ghostty.org), drag it to Applications, and use it instead of the default Terminal. The difference is subtle but real — faster rendering, better font support, cleaner interface. Once you've used it for a day, you won't go back.

*(Windows users: Windows Terminal is the equivalent upgrade. Linux users: your default terminal is probably already good.)*

### VS Code — Seeing What Claude Builds

VS Code is a code editor. For our purposes, it's a window into your project's files with syntax highlighting that makes code readable. You won't *write* code here, but you'll *read* it — and over time, reading becomes a genuinely useful skill. You start recognizing patterns, understanding how files connect, developing intuition about your project's structure.

Download it from [code.visualstudio.com](https://code.visualstudio.com). Open your project folder in it. Browse around. You'll be surprised how much of the code Claude writes is readable even without programming experience.


---

## Where You Are Now

You ran five steps by hand. Claude did the rest. You now have:

- **Claude Code** — an AI partner in your terminal
- **A workspace** — `~/Development`, where all your projects live
- **Git** — tracking every change to your project
- **MCP servers** — connecting Claude to documentation, Cloudflare, Playwright, and Figma
- **Skills** — teaching Claude your workflows for brainstorming, designing, debugging, writing, and more
- **CLAUDE.md** — your project's rulebook for Claude
- **A docs/ folder** — your project's long-term memory for plans, progress, and decisions
- **A starter project** — with working code, ready to run
- **Wrangler** — connected to Cloudflare, ready to deploy
- **Optionally:** a nicer terminal (Ghostty) and a code viewer (VS Code)

This is your workshop. The next section puts it to use — we'll set up your cloud infrastructure and put your first piece of code on the internet.

---

**Next:** [The Cloud](04-the-cloud.md)
