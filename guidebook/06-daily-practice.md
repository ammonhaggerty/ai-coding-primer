# Part 5: The Daily Practice

Building a product isn't a single event. It's a practice — something you return to regularly, getting a little better each time. The previous sections covered the setup and the first build. This section is about the ongoing experience: how you think alongside Claude, what to do when things break, and how to develop the instincts that make each session more productive than the last.

---

## How to Think with Claude

The biggest shift isn't learning tools. It's learning to think out loud with a collaborator who can act on what you say.

### Plan Before You Build

This is the single most important habit in the entire workflow. It's more important than any tool, any keyboard shortcut, any configuration. The habit is simple: never let Claude write code until you've reviewed a plan.

When you describe a feature you want, Claude's instinct is to start building immediately. It'll make reasonable assumptions and produce something that works — but those assumptions are *Claude's*, not yours. Maybe you wanted the form on the settings page, not a new page. Maybe you wanted three fields, not five. Maybe you wanted it simple, and Claude built something elaborate. Catching these mismatches in a plan takes seconds. Catching them after the code is written takes real time to undo.

The prompt is: *"Write a plan for this before you build it. Save it to docs/plans/. Don't implement yet."* That last phrase — "don't implement yet" — is the critical guard. Without it, Claude will start coding the moment it thinks the plan is good enough. It's not good enough until you say it is.

Claude writes the plan to a file, not just in the chat. This matters because chat messages scroll away and get lost. A file in `docs/plans/` persists — you can read it, think about it, come back to it later, and point Claude at it when you're ready to build. It also survives context compaction, which means if a long session gets summarized, the plan is still there in full.

For small changes — fix this typo, adjust that spacing, move this button — you don't need a plan. But for anything that involves new pages, new data, new features, or changes to how things work: plan first. Every time. The ten minutes you spend reviewing a plan saves the hour you'd spend undoing a bad assumption.

As you get more comfortable, you'll develop a sense for when to point Claude at existing work: *"Make the settings page feel like the check-in page"* or *"This table should work like the history table."* Referencing what already exists communicates implicit requirements — spacing, style, behavior — without spelling them all out.

### Reading What Claude Builds

You don't need to understand every line of code. But understanding the *shape* of your project pays compounding dividends.

Shape means: how many files exist and what they're for. There's a file that handles routing (URLs), files that define database tables, files that build the HTML pages, a configuration file that tells Cloudflare what to do. Over time, you'll recognize which file Claude is editing and roughly what it's changing — even if the syntax is unfamiliar.

This isn't something you study. It happens naturally. After a few sessions, you'll notice: "Oh, Claude is editing the route file — it's adding a new page." Or: "That's the schema — it's adding a new column to the database." This ambient understanding makes your prompts better, because you start to reference the actual structure: "In the history route, can you also show the average mood?" instead of "Can you add something to the history page?" Both work. The first one is faster.

### Evolving CLAUDE.md

Your project's `CLAUDE.md` file is its rulebook. Claude reads it at the start of every session. But maintaining it well is a skill — and the instinct to keep adding to it forever is actually counterproductive.

Recent research on AI coding agents found something surprising: overstuffed context files hurt more than they help. When Claude is told to follow twenty rules but only three are relevant to the current task, it still tries to honor all twenty — burning effort, adding complexity, and sometimes failing because of instructions that don't apply. The most effective CLAUDE.md files are minimal and focused.

The rule of thumb: **add what Claude gets wrong, remove what Claude gets right.** Deployed to production and hit a cookie issue? Add: "Cookies must use `secure: true` in production, `secure: false` in local dev." Figured out a DaisyUI class doesn't work from the CDN? Add: "`card-border` doesn't work via CDN — use `border border-base-300` instead." These are corrections — things Claude would do wrong without the note.

But if you fixed the underlying bug so the cookie issue can't recur, remove the note. If Claude already follows a convention without being told, don't add a rule for it. And resist the urge to describe what your project is — Claude can read the code and figure that out. CLAUDE.md should contain constraints and decisions, not descriptions.

Periodically — every week or two if you're building actively — scan the file and ask: "Is Claude still getting this wrong without being told?" If the answer is no, the line can go. A lean CLAUDE.md is a fast CLAUDE.md.

So where does all the context that *doesn't* belong in CLAUDE.md go? The `docs/` folder.

### Using the docs/ Folder

CLAUDE.md is the rulebook — lean, always read, focused on constraints. The `docs/` folder is the memory — rich, read on demand, focused on context.

As you work, Claude saves progress notes, brainstorming sessions, feature plans, and design rationale to `docs/`. This isn't just documentation for you — it's documentation for *Claude*. When you start a new session, Claude reads the `docs/` folder to understand where things left off. When a long session gets compacted (Claude's context has limits, and long conversations get summarized), the `docs/` folder is how Claude recovers the thread.

This creates a natural two-tier system. CLAUDE.md says: "Here are the rules." The `docs/` folder says: "Here's what we've been working on, what we've tried, and what we're planning next." Together, they solve the memory problem without bloating the file that Claude reads on every single interaction.

You don't need to manage this actively. Claude handles the writing. But you can help by prompting it at natural breakpoints: "Save our progress before we wrap up." Or at the start of a new session: "Check the docs folder for where we left off." Over time, your `docs/` folder becomes a searchable history of your project's evolution — richer than commit messages, more permanent than conversation history.

### Git as a Journal

Every time you commit changes to Git, you write a short message describing what changed. Over time, these messages become a story — the history of your project's evolution. "Added history page," "Fixed date formatting on timeline," "Added mood emoji support," "Deployed v1.2 with AI insights."

Claude writes these commit messages for you, and they're usually good. But glancing at them is worth the habit. They orient you when you come back to a project after a break: "What did I do last time? Oh right, I was working on the insights feature."

Git also gives you the ultimate undo button. If a session goes sideways — Claude introduces a bug, or a new feature breaks something that worked — you can roll back to the last good state. Claude can help with this: "Something broke after the last set of changes. Can you revert to the previous commit?" The safety net is always there.

---

## When Things Break

Things will break. This is not a sign of failure. This is the most normal state of building software. Professional engineers at the most sophisticated companies in the world break things constantly. The skill isn't avoiding breakage — it's recovering from it quickly.

### The Mindset

If you expect everything to work on the first try, every error feels like a crisis. If you expect things to break and plan to fix them, every error is just... the next step. Reframe breakage as feedback. The app is telling you what it needs.

### Describing Problems

When something goes wrong, you need to tell Claude three things:

What you expected to happen: *"When I click Submit, the form should save and show a success message."*

What actually happened: *"When I click Submit, nothing happens. The page doesn't change. No error message appears."*

What you see: *"The browser's URL didn't change. The button doesn't seem to respond to clicks."*

That's the entire skill. You don't need to diagnose the problem. You don't need to understand why it's broken. You describe the gap between expectation and reality, and Claude investigates.

### Error Messages

Error messages look terrifying the first time you see them. A wall of red text with file paths, line numbers, and jargon like `TypeError: Cannot read properties of undefined`. Your instinct will be to panic or shut the terminal.

Don't. Copy the error message and paste it to Claude. Say: *"I'm seeing this error."* Claude translates: "The code is trying to access a property on something that doesn't exist. The issue is on line 47 of history.ts — the database query returned empty results and the code didn't handle that case. Let me fix it."

Over time, you'll start recognizing common patterns. "Oh, that's a null reference — something didn't return data." But even if you never learn to read error messages yourself, it doesn't matter. Claude reads them for you. Your job is to notice them and relay them.

### Screenshots

Sometimes a problem is visual — a button is in the wrong place, a layout is broken, text is overlapping. Describing these in words is slow and imprecise. Instead, take a screenshot and send it to Claude. Claude can see images. A screenshot of a misaligned table communicates the problem faster than three sentences trying to describe it.

This is one of those habits that feels unusual at first — sending a picture to a text-based tool — but it's remarkably effective. Screenshots work especially well for layout issues, styling problems, and "this doesn't look right but I can't explain why" moments. On a Mac, `Cmd+Shift+4` lets you select a region of the screen and saves it to your desktop. Drag it into the terminal or paste it, and Claude sees exactly what you see.

### Browser Developer Tools

Every web browser has a hidden panel called Developer Tools (or "DevTools") that shows what's happening behind the scenes — network requests, error messages, page structure, and more. You don't need to learn DevTools. But you should know it exists, because it's the single most useful debugging surface for web applications.

If you hit a problem that Claude can't diagnose from the code alone — say, the page loads but data isn't showing up — ask Claude: *"Can you walk me through how to open Developer Tools and check for errors?"* Claude will give you step-by-step instructions for your browser. The Console tab shows JavaScript errors. The Network tab shows whether data requests succeeded or failed. Just reading what's there and relaying it to Claude often cracks the problem immediately.

You don't need to understand what DevTools is showing you. Open it, look for red text or failed requests, screenshot it or copy it, and send it to Claude. That's the entire workflow.

### The Common Culprits

Most problems in this workflow fall into a handful of categories:

**Environment variable not set.** You added a new secret but forgot to push it to Cloudflare, or you're running locally and the `.env` file is missing a value. Claude checks for this.

**Cookie misconfiguration.** The `secure` flag is set for production but you're testing locally (or vice versa). The fix is always one line.

**Deployment out of sync.** The code on your machine is newer than what's deployed. You made changes but forgot to deploy. The fix: deploy.

**Schema mismatch.** You changed the database structure in your code but didn't update the actual database. Claude runs the migration.

**Typo in a route.** You're visiting `/histroy` instead of `/history`. It happens.

None of these are deep mysteries. They're the equivalent of checking if the lamp is plugged in before calling an electrician. Claude checks all of them systematically.

### The Recovery Loop

When something breaks, the pattern is always the same:

**Describe** the problem to Claude. What you expected, what happened, what you see.
**Claude investigates.** It reads the relevant files, checks the logs, traces the data flow.
**Claude proposes a fix.** Usually it just fixes it. Sometimes it explains what went wrong and asks for confirmation.
**You verify.** Refresh the page, try the action again, confirm it works.
**Continue building.**

This loop takes minutes, not hours. The time between "something's broken" and "it's fixed" shrinks dramatically when you have a partner who can read every file in your project instantly and understands the entire stack.

But sometimes the fix-it loop isn't working. You've tried two or three things and the problem is getting worse, not better. When that happens, stop patching and revert. Tell Claude: *"Revert everything back to the last working state. Let's try this with a smaller scope."* Then describe a narrower version of what you wanted.

This feels drastic the first time. It's actually the fastest path forward. Narrowing scope after a revert almost always produces better results than incrementally fixing a broken approach. And it's not failure — it's a routine workflow move. Professional developers revert constantly. Git makes it free.

---

## Iterating and Shipping

### Ship Early

The instinct is to wait until everything is polished before sharing. Resist it. Ship the rough version. Get it in front of someone — a friend, a colleague, a potential user. Give them the URL and watch what happens.

You'll learn more from five minutes of watching someone use your app than from five hours of imagining how they'll use it. They'll click things you didn't expect. They'll miss the button you thought was obvious. They'll try to do something you hadn't considered. Every one of those moments is a gift — it's a signal about what to build next.

### Your Database Tells You What People Do

Once your app is live and people are using it, your D1 database becomes a behavioral record. How many people completed the check-in? How many started but didn't finish? What mood did they pick most often? How many came back the next day?

This data is more honest than any survey. People tell you what they think they'd do. Your database tells you what they actually did. Claude can help you write queries to answer these questions: "Show me how many unique users checked in each day this week." The insights that emerge shape your next round of building.

### The Courage to Delete

Sometimes a feature doesn't work. Not technically — technically it's fine. It just doesn't resonate. Nobody uses it, or people use it once and don't come back.

Delete it. Or rebuild it from scratch. Claude makes starting over cheap. The thing that used to take weeks — rewriting a feature from a different angle — now takes an afternoon. This is one of the most profound shifts in AI-assisted building: the cost of experimentation drops so low that you can afford to be bold, try things, and throw away what doesn't work without grief.

### Version Discipline

As you iterate, keep a loose sense of versions. Not formal software versioning — just awareness. "This is the version with the new onboarding flow." "This is before I changed the database schema." Git handles the mechanics. You handle the narrative.

When something goes wrong after a change — and it will — knowing which version was the last good one means Claude can get you back there quickly. "Roll back to before the onboarding changes" is a real prompt that works.

---

## Where You Are Now

You have a practice, not just a project. You know how to plan before building, how to iterate quickly, how to recover from breakage without panic, and how to ship early and learn from real usage. Your CLAUDE.md is sharp and focused. Your commit history is a readable story. Your instincts about what to build next are informed by actual user behavior, not guesses.

The tools are the same ones you set up in Part 2. The infrastructure is the same as Part 3. The building loop is the same as Part 4. What's changed is you — you're more fluent in the rhythm, more confident in the process, more willing to experiment because you know recovery is quick and iteration is cheap.

That's the daily practice. It compounds.

---

**Next:** [Part 6: Where This Is Going](07-where-this-is-going.md)
