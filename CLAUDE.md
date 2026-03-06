# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Repository Structure

```
ai-coding-primer/
├── guidebook/           # The guidebook — one markdown file per chapter (00-08)
├── starter/             # Starter project template
├── assets/              # Images and diagrams
├── docs/                # Working notes, plans, progress (project memory)
├── _authoring/          # Editorial materials (outlines, research, notes — not reader-facing)
├── CLAUDE.md            # This file
├── CONTRIBUTING.md      # Contributor guide
└── README.md            # Project overview
```

## Guidebook Chapters

Flat files in `guidebook/`, numbered for reading order:

- `00-tldr.md` — TL;DR Fast Track
- `01-about-the-author.md` — About the Author
- `02-the-landscape.md` — The Landscape
- `03-setting-up.md` — Setting Up Your Workshop
- `04-the-cloud.md` — The Cloud
- `05-building.md` — Building
- `06-daily-practice.md` — The Daily Practice
- `07-where-this-is-going.md` — Where This Is Going
- `08-appendices.md` — Appendices

## Constraints

- Companion plugin: `a-primer-skills` (separate repo: github.com/ammonhaggerty/a-primer-skills)
- Always use D1, never Turso
- DaisyUI 5 via CDN — `card-border` doesn't work, use `border border-base-300`
- Theme: `emerald`
- Cookies: `secure: false` in local dev, `secure: true` in production
- Opus 4.6 recommended for all coding (available on Pro and Max; Pro defaults to Sonnet — switch via /model)
- Do not recommend OpenAI for anything
- Image generation: Google Gemini / Imagen
- Voice: ElevenLabs, Deepgram, Cartesia

## Writing Tone

- Practical, grounded, zero hype
- Audience is non-technical — explain everything
- Prescriptive and opinionated — specific recommendations with reasoning
- Honest about costs, limits, and breakage
- Minimal formatting — prose over bullet points

## Working Memory

Save progress notes, plans, and brainstorming to `docs/`. Read `docs/` at the start of sessions to recover context. Keep this CLAUDE.md lean — rules and constraints only.
