# Changelog

Updates to the guidebook, starter project, and companion plugin ([a-primer-skills](https://github.com/ammonhaggerty/a-primer-skills)). Newest first. Working notes for each refresh live in [`docs/`](docs/).

---

## October 2026

### The model recommendation changed: Sonnet 5.5 for most coding

The guide used to say "use Opus for everything." It now recommends **Sonnet 5.5** as the everyday coding model, with **Opus 5.5** as the step up.

**Why:** Sonnet 5.5 handles the bulk of day-to-day building (features, fixes, layouts, database work) well, and it's faster and much easier on your plan's usage limits. Opus 5.5 still reasons more deeply and makes fewer mistakes on big multi-file changes and tricky architecture, so it's the right tool for hard problems. If you're on Max, there's enough headroom to use Opus as your everyday model.

**What to do:** Pro defaults to Sonnet at Medium effort, which is the recommended setup. Defaults change, though, so type `/model` in Claude Code and confirm. If you followed the old guidance and switched to Opus, switching back to Sonnet will make your plan last noticeably longer.

**Where it changed:**
- Appendix B, Part 1 (Models for Coding): rewritten around Sonnet 5.5 as the default and Opus 5.5 as the step up.
- Appendix B, Part 3 (Subscription Plans): Pro is now framed as Sonnet-first, and Max as the plan with room for Opus. The old "30–60 minutes of Opus per window" estimate was removed.
- Setting Up Your Workshop: "switch to Opus" became "check your model."
- The TL;DR, The Landscape, and The Daily Practice: model mentions updated. The TL;DR now includes a `/model` check.
- Companion plugin: the `primer-setup` skill's Step 8 is now a model *check* rather than a switch to Opus.
- Starter project's built-in guide assistant: updated to match.

### Claude model and API pricing refresh

| Model | Was | Now (per million tokens, input / output) |
|---|---|---|
| Most capable | Fable 5 | **Fable 5.1**: $10 / $50 |
| Opus | Opus 4.8, $5 / $25 | **Opus 5.5**: $4 / $20 |
| Sonnet | Sonnet 5, $3 / $15 (intro $2 / $10) | **Sonnet 5.5**: $2 / $10 |
| Haiku | Haiku 4.5, $1 / $5 | **Haiku 5.5**: $0.10 / $0.50 (prompts up to 100K tokens) |

The expired Sonnet 5 introductory-pricing note was removed.

### Image generation
- **Google Imagen has been shut down** in the Gemini API. All Imagen recommendations were removed.
- Added **Nano Banana 2.1** (Google's newest image model, ~$0.034–$0.11 per image) as the recommended starting point.
- Gemini 3.1 Flash Image price range corrected (~$0.045–$0.15).
- Workers AI: Stable Diffusion XL is no longer offered. Replaced with Lucid Origin in the text-to-image list.

### Voice, design, and other pricing
- ElevenLabs: paid plans now start at $6/mo. The free tier is 10K credits/mo (about 10K characters).
- Deepgram: per-minute pricing has dropped to ~$0.004–$0.008/min.
- Cartesia: the model is now Sonic 3.6. It has a free tier (20K credits/mo) and paid plans from $5/mo. The latency claim was softened to sub-100ms.
- Figma: $15 → $16/mo.

### Verified unchanged
Claude plan prices (Pro $20, Max $100 / $200), Cloudflare Workers / D1 / R2 / KV / Vectorize limits and pricing, Workers AI Neuron pricing, and major versions of DaisyUI 5, Tailwind 4, HTMX 2, Alpine 3, Hono 4, GSAP 3, and Wrangler 4.

---

## July 2026

A refresh to bring every model, price, command, and version up to date. Full notes: [`docs/2026-07-refresh-findings.md`](docs/2026-07-refresh-findings.md).

- **Models:** moved from Opus 4.6 / Sonnet 4.6 to Opus 4.8 / Sonnet 5. The API pricing appendix added Fable 5 and Sonnet 5's introductory pricing.
- **Install:** Claude Code now installs with the native installer (`curl … | bash` / PowerShell), with npm kept as a fallback.
- **New guidance:** Medium effort for most coding, and `/compact` between major tasks. Added a new "Keeping Sessions Fast and Lean" section to The Daily Practice.
- **Claude Code reference:** corrected the slash-command list (removed `/plan`, `/rename`, `/todos`, `/theme`, `/stats`; added `/context`) and the kill-background-tasks shortcut.
- **Cloudflare:** starter migrated to `wrangler.jsonc` and given a current compatibility date. Refreshed free-tier limits, Workers AI models (Llama 4, FLUX.2), and Vectorize pricing.
- **Third-party:** updated Google image-model and Deepgram / Cartesia pricing.
