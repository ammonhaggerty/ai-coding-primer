# Intro to Full-Stack AI Product Development

An open-source guidebook and starter kit for building real products with Claude Code and Cloudflare — written for designers, founders, PMs, researchers, hobbyists, and anyone with ideas who's been blocked by the technical wall.

[![AI Coding Primer Onboarding Video](https://github.com/user-attachments/assets/0a621b86-f898-487f-ac7d-d34a6c6aa3cc)](https://youtu.be/KPAlZ3Oni1A)
*☝️ This video walks through the entire onboarding and sample project*

I want to be clear - what I'm sharing is highly technical and the ideas shared have taken me years to learn and understand. What's changed is Claude, as helper, problem-solver, and guide, allows you to navigate nearly anything that comes your way. I tried to make the onboarding process as simple as I could, but my first dry-run was a complete failure - that said, Claude was able to figure out and correct for every issue. Once you have Claude running, just ask for help at any step. 

---

> ### 🔄 Updated July 2026
>
> The guide was refreshed to keep every model, price, command, and version current. Highlights:
>
> - **Models:** now built around **Claude Opus 4.8** (coding) and **Sonnet 5**; API-pricing appendix adds **Fable 5** and Sonnet 5's introductory pricing.
> - **Install:** Claude Code now uses the **native installer** (`curl … | bash` / PowerShell), with npm kept as a fallback.
> - **New guidance:** set **Medium effort** for most coding (faster, fewer tokens), and use **`/compact` between major tasks** to keep sessions fast and cheap.
> - **Claude Code reference:** corrected the slash-command and keyboard-shortcut lists to match current Claude Code.
> - **Cloudflare:** starter migrated to **`wrangler.jsonc`** (Cloudflare's recommended format); refreshed free-tier limits, Workers AI models (Llama 4, FLUX.2), and Vectorize pricing.
> - **Third-party:** updated Google image-model and Deepgram/Cartesia pricing.
>
> Full change log: [`docs/2026-07-refresh-findings.md`](docs/2026-07-refresh-findings.md).

---

## Start Reading

**[Read the guidebook →](guidebook/)**

Or jump straight to the [TL;DR Fast Track](guidebook/00-tldr.md) if you want to start building now.

## What's Here

```
ai-coding-primer/
├── guidebook/       # The guidebook — one chapter per file, read it like a book
├── starter/         # Starter project template (what you'll clone)
├── assets/          # Images and diagrams
├── docs/            # Working notes and plans (project memory)
└── _authoring/      # Editorial materials (outlines, research, notes)
```

## The Guidebook

| # | Chapter | Description |
|---|---------|-------------|
| 00 | [TL;DR](guidebook/00-tldr.md) | Seven steps to a deployed app |
| 01 | [About the Author](guidebook/01-about-the-author.md) | Who wrote this and why |
| 02 | [The Landscape](guidebook/02-the-landscape.md) | What changed and the mental model |
| 03 | [Setting Up](guidebook/03-setting-up.md) | Installing your workshop |
| 04 | [The Cloud](guidebook/04-the-cloud.md) | Cloudflare and your first deploy |
| 05 | [Building](guidebook/05-building.md) | Your first feature, end to end |
| 06 | [Daily Practice](guidebook/06-daily-practice.md) | The ongoing rhythm of building |
| 07 | [Where This Is Going](guidebook/07-where-this-is-going.md) | What comes next |
| 08 | [Appendices](guidebook/08-appendices.md) | Claude Code features, AI models & pricing, Cloudflare free tier, links, glossary, troubleshooting |

## The Stack

This guide teaches one specific, opinionated stack:

- **Claude Code** (Opus 4.8) — Your AI coding partner, in the terminal
- **Cloudflare Workers** — Where your code runs (free tier gets you far)
- **Hono** — Web framework for the edge
- **Tailwind + DaisyUI** — Styling without writing CSS
- **HTMX + Alpine.js** — Interactivity without a framework
- **D1** — SQLite database, zero config
- **R2** — File storage, zero egress fees
- **Vectorize** — Vector database for smart search and RAG

## Status

The guidebook, the `a-primer-skills` plugin, and the starter template are all live and in active use. Content is kept current as the tools evolve — see `docs/` for recent update notes. Corrections and contributions welcome.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to help — from fixing typos to suggesting new content.

## License

[MIT](LICENSE) — Use it, share it, build on it.
