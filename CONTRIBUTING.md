# Contributing to AI Primer

Thanks for wanting to help. This project aims to make AI-assisted product development accessible to non-engineers, so every contribution — from fixing a typo to adding a chapter — makes a real difference.

## Quick Contributions

**Found a typo or broken link?** Open a PR directly. No issue needed.

**Have a suggestion?** Open an issue describing what you'd change and why.

## Guidebook Structure

The guidebook lives in `guidebook/` as flat markdown files, one per chapter:

```
guidebook/
├── README.md                    # Table of contents
├── 00-tldr.md                   # TL;DR Fast Track
├── 01-about-the-author.md
├── 02-the-landscape.md
├── 03-setting-up.md
├── 04-the-cloud.md
├── 05-building.md
├── 06-daily-practice.md
├── 07-where-this-is-going.md
└── 08-appendices.md
```

Each file is a self-contained chapter. If you're editing content, that's the only place you need to look.

## Writing Style

This guidebook has a specific voice. Before writing or editing, keep these in mind:

- **Audience is non-technical.** Never assume terminal familiarity. If a concept needs explaining, explain it.
- **Practical and grounded.** No hype, no breathless futurism. Feels like a friend walking you through how they did it.
- **Prescriptive and opinionated.** We recommend specific tools with specific reasoning. "Use X because Y" not "you could use X or Y or Z."
- **Honest about limits.** Things break. Things cost money. We say so.
- **Minimal formatting.** Prose over bullet points. Headers only when they help navigation. Bold sparingly.

## What Goes Where

| Content | Location |
|---------|----------|
| Readable chapters | `guidebook/` |
| Claude Code plugin | [a-primer-skills](https://github.com/ammonhaggerty/a-primer-skills) (separate repo) |
| Project template | `starter/` |
| Images and diagrams | `assets/` |
| Editorial notes, outlines, research | `_authoring/` |
| Working plans and progress | `docs/` |

## Editing a Chapter

1. Fork the repo
2. Edit the chapter file in `guidebook/`
3. If you're adding images, put them in `assets/` and reference them with relative paths
4. Open a PR with a clear description of what changed and why

## Adding Content

If you want to add a new section, expand an existing chapter, or contribute a new resource:

1. Open an issue first to discuss the idea
2. Reference the editorial notes in `_authoring/notes/` for context on how the chapter was planned
3. Follow the writing style above
4. Keep chapters self-contained — a reader should be able to understand any chapter without reading the others (though they build on each other)

## Technical Accuracy

The guide teaches a specific stack (Claude Code, Cloudflare, Hono, DaisyUI, etc.). If you're updating technical instructions, please test them. The appendices contain version-specific information (model pricing, free tier limits) that will need periodic updates as things change.

## Code of Conduct

Be kind. This project exists to help people learn. Every question is valid, every contribution is welcome, and everyone started somewhere.
