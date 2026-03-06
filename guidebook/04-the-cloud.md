# The Cloud — Where Your App Lives

Your project is running on your machine. You can see it in the browser at `localhost`. That's great for building, but nobody else can reach it. Your laptop isn't a server — it sleeps when you close it, it's behind your home network, and it has one job: being your computer.

For your app to exist in the world — for someone in Tokyo or São Paulo to type a URL and see what you built — it needs to live somewhere else. That somewhere is the cloud. And the specific cloud we're using is Cloudflare.

---

## Why Cloudflare

There are dozens of places to host a web application. AWS is the behemoth — enormously powerful, enormously complex, built for engineering teams with dedicated infrastructure people. Vercel is polished and developer-friendly, particularly for React-based projects. Netlify, Railway, Fly.io — all solid, all with tradeoffs.

This guide uses Cloudflare, and it's a deliberate choice.

Cloudflare puts everything under one roof. Compute, storage, database, AI models, DNS, security — one account, one dashboard, one set of tools. That matters more than it sounds like it should. Every time your stack spans multiple providers, you're managing multiple accounts, multiple billing pages, multiple sets of credentials, and multiple points where things can break. With Cloudflare, when Claude needs to set up a database, it's right there. When it needs file storage, same account. When it needs to deploy your code, one command. The surface area for confusion shrinks dramatically.

Cloudflare has a free tier, and it's enough to get started. But the $5/month Workers Paid plan is what I recommend from day one. It's not about needing the capacity right away — it's about removing friction. The free tier has real limits: 10ms CPU per request, daily caps that reset at midnight, and no access to some features you'll want (like longer-running Workers and higher AI quotas). The paid plan lifts all of that — unlimited requests, 30-second CPU time, higher storage and database limits, and full access to Workers AI and AI Gateway. Five dollars a month for that is genuinely remarkable. Think of it as turning on the lights in the workshop instead of working by flashlight.

Deployments take seconds. Not minutes, not "building..." spinners that make you wonder if something broke. You run a command, and within ten seconds, your code is live on servers around the world. That speed changes how you build — you deploy constantly, after every meaningful change, because there's no penalty for it.

Personal context: I spent four years building on Vercel. It's an excellent platform. But when I moved to Cloudflare, something clicked. Less ceremony. Fewer configuration files. More direct. The whole stack is integrated in a way that makes AI-assisted development dramatically smoother, because there are fewer seams where things can go wrong. Claude knows Cloudflare extremely well, and the two work together like they were designed to — which, in a sense, they were. Cloudflare has invested heavily in AI developer tooling.

---

## Your First Deploy

If the setup skill ran successfully, Wrangler is already installed and your Cloudflare account is connected. Your starter project has a `wrangler.toml` file — that's the configuration that tells Cloudflare about your project: what it's called, what services it uses, how it should be deployed.

Tell Claude:

*"Deploy my project to Cloudflare."*

Claude runs `wrangler deploy`. A few seconds pass. Then it hands you a URL — something like `https://your-project-name.your-subdomain.workers.dev`. Click it. Your app is live. On the actual internet. Anyone with that URL can see it.

That moment is worth pausing on. You ran three commands to set up your environment. You let a skill configure everything. And now there's a URL that works from any device, anywhere in the world, serving something you built. The distance from "I've never opened a terminal" to "I have a live web app" is shorter than it has ever been.

From here on, deploying is something you'll do constantly. Made a change? Deploy. Fixed a bug? Deploy. Tried something new and want to see it live? Deploy. It's not a ceremony — it's a habit, like saving a document.

### Custom Domains

Your app starts on a `.workers.dev` URL. That's fine for development and testing. When you're ready for a real domain — `yourproject.com` or whatever you choose — Cloudflare handles that too. You buy the domain through Cloudflare (they sell them at cost, no markup), and Claude can wire it up to your project. DNS, SSL certificates, routing — all handled. What used to take a weekend of confused Googling takes Claude about thirty seconds.

You don't need a custom domain to follow this guide. But knowing the path is there makes the whole thing feel more real.

---

## The Building Blocks

Cloudflare isn't one thing. It's a set of services that work together. You don't need to understand all of them right now — Claude manages the details — but knowing what they are helps you have better conversations with Claude about what you're building.

### Workers — The Compute

When someone visits your URL, a Worker responds. It's a small program that runs on Cloudflare's servers — not in one data center, but distributed across hundreds of locations worldwide. The person visiting from London gets a response from a server near London. The person in Sydney hits a server near Sydney. This happens automatically.

Your Worker receives the request ("someone is visiting the homepage"), does whatever logic is needed (look up data, process a form, generate a response), and sends back what the user sees. It's the engine of your application.

Think of it like a restaurant. The Worker is the kitchen. Orders come in, meals go out. Everything else — the pantry, the freezer, the recipe book — connects to the kitchen but serves a different purpose.

### D1 — The Database

D1 is where your app remembers things. User accounts, form submissions, content, settings — any structured data your application needs to store and retrieve.

If you've used a spreadsheet, you already understand the concept. A database is a collection of tables. Each table has columns (name, email, date_created) and rows (one per entry). The difference is that your code can query it — "give me all users who signed up this week" or "find the entry with this ID" — and get answers in milliseconds.

D1 is built on SQLite, which is the most widely deployed database engine in the world. It runs on your phone, in your browser, inside countless applications you use every day. It's small, fast, and remarkably capable.

**Why D1 over Turso?** You might encounter Turso in other guides — it's another SQLite database that works at the edge. It's a good product. But D1 is Cloudflare-native, which means one fewer account, one fewer set of credentials, and tighter integration with everything else in your stack. Claude can create, query, and manage D1 databases without leaving the Cloudflare ecosystem. If your needs eventually outgrow D1 — say you need your database accessible from multiple cloud providers — Turso is the natural next step. But for everything in this guide, D1 is simpler and sufficient.

### R2 — File Storage

R2 is your hard drive in the cloud. Images, PDFs, fonts, user uploads, audio files — anything that isn't structured data goes here.

When your app needs to store a profile photo or serve a static file, it reads from and writes to R2. The free tier gives you ten gigabytes, which is more than enough to get started. And unlike some cloud storage services, R2 doesn't charge for reading files — only for storing them and writing new ones. That's unusually generous and means you don't have to worry about traffic spikes making your bill spike too.

### Workers AI — Intelligence on Demand

Cloudflare runs AI models directly on their network. Text generation, image analysis, embeddings, classification — all available without a separate API account or additional credentials.

This is useful for features like: summarizing content, generating recommendations, analyzing images users upload, or creating smart search that understands meaning rather than just matching keywords. You'll use Claude Code (powered by Anthropic's models) for building your app, and Workers AI for features *inside* your app that your users interact with.

The distinction matters: Claude is your building partner. Workers AI is a tool your app uses at runtime, when real users are interacting with it.

### KV — Fast Key-Value Storage

KV (Key-Value) is the simplest storage option. It's a dictionary: you store a value under a key, and you can retrieve it instantly from anywhere in the world.

Feature flags, user preferences, cached API responses, configuration settings — anything where you need to look up a single value very fast. It's not a replacement for a database (it can't do complex queries), but for simple lookups, nothing is faster.

### Vectorize — Smart Search and Matching

Vectorize is Cloudflare's vector database. If that sounds abstract, think of it this way: a regular database finds things by exact matches — "show me all users named Sarah." A vector database finds things by *meaning* — "show me products similar to this one" or "find articles related to this question."

This is the technology behind RAG (retrieval-augmented generation), which is how you give AI models access to your own data. Instead of the AI relying only on its training, it searches your content first, finds the most relevant pieces, and uses those to generate a grounded response. Many services charge a premium for RAG features. With Vectorize and Workers AI, you can build your own — and the Cloudflare MCP server helps Claude set up highly optimized vector stores directly from your conversation.

Practical uses: semantic search across your content, recommendation engines, finding related items, matching users to resources, Q&A over your own documents, and any feature where "similar to" matters more than "exactly equals." You won't need it on day one, but when you want your app to feel genuinely intelligent, Vectorize is how you get there.

### How They Work Together

Here's the flow for a typical request:

A user visits your app. The request hits a **Worker**, which is your application logic. The Worker might check **KV** for a cached response. If there isn't one, it queries **D1** for data from the database, maybe pulls an image URL from **R2**, and possibly calls **Workers AI** to generate a personalized summary or searches **Vectorize** for semantically related content. Then it assembles all of that into an HTML page and sends it back to the user's browser.

All of this happens in milliseconds, on servers close to the user, within a single platform. Claude orchestrates all of it when building your features. Your job is to describe what should happen — "when someone visits their profile, show their name, their photo, and a summary of their recent activity" — and Claude figures out which building blocks to use.

---

## Security and Secrets

Your app will have sensitive information: API keys, database connection strings, authentication tokens. This section is short but important, because getting this wrong can be genuinely consequential.

### The Rule

Secrets never go in your code. Not in your JavaScript files, not in your configuration files, not in comments, not "just temporarily." Code gets committed to Git, pushed to GitHub, and potentially seen by anyone. A secret in your code is a secret on the internet.

Claude knows this rule and follows it. But understanding *why* makes you a better collaborator — you'll catch the rare edge case where something sensitive is about to end up in the wrong place.

### How It Works

**Environment variables** are values that exist outside your code but are available to your app at runtime. Instead of writing `const API_KEY = "sk-abc123"` in your code, you store that value as an environment variable and your code reads it with `c.env.API_KEY`. The key never appears in any file that gets committed.

**Wrangler secrets** are how you push sensitive values to Cloudflare. Claude runs `wrangler secret put API_KEY`, you paste the value, and it's securely stored on Cloudflare's servers. Your deployed app can read it, but it never exists in your project files.

**Local secrets files** hold secrets for local development. In most projects you'll see this as a `.env` file; in Cloudflare projects like ours, the equivalent is `.dev.vars` — same idea, different name. The file lives on your machine and contains key-value pairs (`API_KEY=sk-abc123`). The critical companion is `.gitignore` — a file that tells Git "never track this file, never commit it, pretend it doesn't exist." Your secrets file stays local. Always.

### When Things Go Wrong

At some point — not if, when — a secret will almost end up in the wrong place. Maybe you'll paste an API key into a file while debugging. Maybe a configuration template will include a placeholder that looks like a real key. Maybe you'll forget to add `.dev.vars` to `.gitignore`.

Claude watches for this. If you're about to commit a file that contains something that looks like a credential, Claude will flag it. If Claude generates a configuration file, it uses environment variable references, never raw values.

But Claude isn't perfect, and neither are you. So there's one more safety net: if a secret does get committed to Git, it can be rotated. You generate a new key from whatever service issued it, update your environment variables, and the old key becomes useless. It's not fun, but it's recoverable. The services you'll use (Cloudflare, Anthropic, etc.) all have dashboards where you can regenerate keys in seconds.

The habit to build: whenever you see a long string of characters that looks like a password or key, ask yourself — "is this in a `.dev.vars` file or an environment variable?" If it's anywhere else, move it.

---

## Where You Are Now

Your app is deployed. You have a URL that works. You understand — at least loosely — what the building blocks do: Workers run your code, D1 stores your data, R2 holds your files, Workers AI adds intelligence, KV handles fast lookups, and Vectorize powers smart search and matching. You know that secrets live in environment variables, not in code.

You haven't had to configure any of this by hand. Claude set up the database, created the storage bucket, configured the secrets, and deployed the code. Your role was to say yes and to understand, at a high level, what was happening.

The next section is where it gets fun. You have an environment. You have infrastructure. Now you build something real.

---

**Next:** [Building](05-building.md)
