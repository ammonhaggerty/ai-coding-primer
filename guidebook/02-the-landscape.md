# The Landscape

## What Changed (and What Didn't)

The barrier to building software was never really about code. It was about everything around the code. Before you could write a single useful line, you needed to understand environments, dependencies, package managers, build tools, deployment pipelines, DNS, SSL certificates, database configuration, authentication flows, error handling patterns, and a hundred other things that each took weeks or months to internalize. Learning to code was the tip of the iceberg. The iceberg itself was infrastructure.

That barrier is essentially gone now.

Claude Code is an AI that lives in your terminal — which means it can do everything you can do on your machine: read files, write files, run commands, install dependencies, deploy code. It understands the full context of your project and works in a continuous conversation. You describe what you want, it builds, you react, it adjusts. The feedback loop is tight and natural.

If you've tried AI coding tools before — Cursor, Lovable, Bolt, Replit — and walked away frustrated, that's a normal experience. Those tools helped, but they all had the same fundamental problem: you still needed a developer's instincts running in the background. The AI would get you 80% of the way there, and the remaining 20% — edge cases, architecture decisions, platform gotchas — was yours to catch. At 80%, you need a developer in the loop.

Claude Code with Opus 4.8 crosses a different line. That ratio flips to something like 99/1. The model catches the things a developer used to catch. It anticipates edge cases before you mention them. It chooses the right approach for the right reason. It flags its own uncertainty instead of confidently generating something subtly broken. At 99%, you don't need a developer in the loop. You need someone with a clear vision of what to build.

This is not a wrapper or a toy. Think of it as a sports car — serious machinery that can take you anywhere, as fast as you can think. The only limit is your imagination. You can build a web app, a mobile app, an API, a data pipeline, a game. If your computer can do it, Claude Code can help you do it.

What *didn't* change is just as important. AI doesn't dream on your behalf. It doesn't know what problem you should solve, or who your users are, or what the experience should feel like. It doesn't have taste — it has patterns. It doesn't have conviction — it has probability. The clearer you are about what you want, the better it performs.

The bottleneck used to be implementation. Now the bottleneck is vision. The skills that matter most aren't technical — they're imagination and curiosity. The technical barrier used to filter out people who had those in abundance but lacked engineering training. That filter is gone.

---

## You're the Dreamer, AI is the Builder

Building software with AI is like building a house with a master contractor. You don't need to know how to frame a wall — you need to know what house you want to live in. Your job is the what: What should this product do? Who is it for? What should it feel like? Claude's job is the how: the code, the files, the configuration, the deployment. All the infrastructure that used to require years of specialized training.

The collaboration follows a natural loop:

**Dream it** — imagine what you want to exist. Even loosely.

**Describe it** — tell Claude in plain English. Be specific about what matters. Be honest about what you haven't figured out yet.

**Build it** — Claude writes the code, creates the files, sets up the infrastructure. Seconds or minutes, not days.

**React to it** — open it in your browser. Use it. Notice what feels right and what feels wrong.

**Refine it** — describe the adjustments. "The spacing feels too tight." "I want a confirmation after submitting." "Simplify this."

**Ship it** — deploy to a live URL. Share it. Learn from real usage.

Then loop. Each cycle tightens the product. The whole thing — from idea to live URL — can happen in hours.

Where this breaks down is when you skip the dreaming. "Build me an app" produces chaos. "Build me a page where a new user enters their name, picks three interests from a list, and sees a feed matched to those interests" produces something real. AI is an extraordinary builder, but the vision has to come from you.

---

## What It Costs

This is an investment in a new capability. But compared to hiring a developer, taking a bootcamp, or subscribing to a suite of SaaS tools, it's a bargain.

**Getting started: ~$20/month.** Claude Pro gives you access to Claude Code and all models including Opus 4.8. Usage limits mean you'll get 30-60 minutes of active building per session before hitting the cap. That's enough to learn the workflow, build small projects, and decide if this is for you.

**Actively building: ~$105-125/month.** Claude Max ($100/month) gives you several hours of sustained building per session — enough to stay in flow and actually finish things. Add the Cloudflare Workers Paid plan ($5/month) for generous hosting, database, file storage, and AI models under one account. Optionally add Figma ($15/month) if you want to design screens that Claude can read directly. This is the setup I recommend, and it's roughly the cost of a single SaaS subscription.

**Power users: $200+/month.** For people building all day — running multiple Claude sessions simultaneously, dispatching parallel agents, shipping fast. You won't start here, but it's worth knowing the ceiling exists.

Everything else in this guide — the terminal, the code editor, version control, Cloudflare's core services — is free.

A word on Anthropic, the company behind Claude. I've used every major AI coding tool extensively. Claude is the best — not just the model, but the way Anthropic thinks about the developer experience. Claude Code is remarkably well-designed. The company moves fast, communicates openly, and builds tools that feel like they were made by people who actually use them. I'm recommending Claude because it's the best tool for this work, not because it's the only option.

---

## What We're Going to Build

By the end of this guide, you'll have a complete development environment and a live project on the internet. The starter project is small but real — a clean, well-designed web application with an AI-powered chat, a database, file storage, and a live URL anyone in the world can visit. One person. The whole thing.

It's built on Cloudflare, which is the quiet powerhouse of this stack. One account gives you everything: hosting, a database, file storage, AI models, DNS, and deployment — all integrated, all managed through the same tool. No stitching together five different services. No configuration glue. Claude talks directly to Cloudflare, and it all just works.

The starter project is designed to be a foundation. Once it's running, you can take it anywhere — add pages, connect data, build features, change the design. The next section walks through setting up each piece. If it feels like a lot, remember: Claude will be right there helping with every step. Your job is to show up with curiosity.

---

**Next:** [Setting Up Your Workshop](03-setting-up.md)
