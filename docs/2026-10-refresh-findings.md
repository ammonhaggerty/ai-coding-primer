# Primer Refresh Findings — October 2026

Inventory of every specific technology recommendation in the guidebook, starter, README, CLAUDE.md, and `../a-primer-skills`, checked against current sources on 2026-10-12. Follows `2026-07-refresh-findings.md`.

Status legend: ✅ verified current · ⚠️ needs update · 🟡 judgment call

---

## A. Coding-model recommendation change (author decision) ⚠️

New stance: **Sonnet 5.5 for most coding; Opus 5.5 as the step up, especially on Max.** This is a reframe, not a rename — the guide currently argues Opus-for-everything in several places.

- `08-appendices.md` Appendix B Part 1 (~141–155): "use Opus 4.8 for everything", coding table (Opus = default, Sonnet = only when hitting limits), effort paragraph ("Opus at Medium still outclasses…"). Full rewrite.
- `03-setting-up.md:17,160,162`: "Pro defaults to Sonnet… switch to Opus" + "One important setting: your model" paragraph. Likely simplifies (no switch needed if Pro default is Sonnet 5.5 — verify in `/model`).
- `08-appendices.md` Part 3 (243–251): plans framed around Opus usage ("sustained Opus coding", "30–60 min of Opus", "20–30% more token-hungry"). Reframe: Pro = Sonnet coding, Max = room for Opus. Soften the minutes estimate rather than invent a Sonnet number.
- `06-daily-practice.md:71`, `03-setting-up.md:162`: effort paragraphs name Opus. Medium advice still holds; note Opus 5.5 defaults to Medium, Sonnet 5.5 defaults to High (levels recalibrated).
- 🟡 Narrative "step change" claims: `02-the-landscape.md:13`, `00-tldr.md:152`, `01-about-the-author.md:17` (first-person), `starter/src/system-prompt.ts:36`. Suggest: keep 4.8 as history, generalize present tense to "today's Claude models".
- Renames: `02-the-landscape.md:51`, `README.md:16` (new Oct banner), `README.md:62` ("Claude Code (Opus 4.8)"), `CLAUDE.md:40` (project rule).
- `../a-primer-skills/skills/primer-setup/SKILL.md:243–263`: Step 8 walks users to Opus 4.8. Rewrite to match.

## B. Claude API pricing (Appendix B, lines 169–174) ⚠️

| Model | Input $/M | Output $/M |
|---|---|---|
| Fable 5.1 | 10.00 | 50.00 |
| Opus 5.5 | 4.00 | 20.00 |
| Sonnet 5.5 | 2.00 | 10.00 |
| Haiku 5.5 | 0.10 | 0.50 (prompts ≤100K; $0.50/$2.50 beyond) |

Remove the expired "Sonnet 5 introductory pricing through Aug 31, 2026" note. Haiku 5.5 at 1/10th the old price is worth highlighting for in-app classification/extraction. Coding table: Haiku still "not recommended for coding" (🟡 keep).

## C. Claude plans ✅
Pro $20 ($17 annual), Max 5× $100, Max 20× $200, Free has no Claude Code. Unchanged.

## D. Cloudflare ✅ / ⚠️
- Workers, D1, R2, KV limits and prices: all ✅ unchanged.
- Workers AI Neurons (10k/day free, $0.011/1k): ✅.
- Workers AI text models (Llama 4 Scout, gpt-oss-120b, GLM-4.7-Flash): ✅ still listed. Newer options exist (GLM-5.x, Kimi K2.x, DeepSeek V4, Gemma 4) — optional mention.
- ⚠️ Workers AI image: **Stable Diffusion XL no longer listed** (`08-appendices.md:200`). Replace with Lucid Origin or drop.
- ✅ Vectorize: free tier confirmed (5M stored / 30M queried dimensions). Cloudflare FAQ: "the Workers free tier will always include the ability to prototype and experiment with Vectorize for free." The earlier "paid plan only" reading was wrong — no change.
- ⚠️ Starter default chat model "Llama 3.2 3B" (`a-primer-skills/commands/a-new-project.md:451,637`; also check `starter/src`): still works but dated. Suggest `glm-4.7-flash`. (Carried over unfixed from July audit.)

## E. Image generation ⚠️
- **Imagen shut down in the Gemini API** — Google points to Nano Banana / Gemini image models. Remove from `CLAUDE.md:43`, `08-appendices.md:210`, `starter/src/system-prompt.ts:15`.
- New: **Nano Banana 2.1** (`gemini-nano-banana-2.1`): $0.034 (1K) / $0.050 (2K) / $0.113 (4K). Strong candidate for the default recommendation.
- Gemini 3.1 Flash Image: $0.045–$0.151 (guide says $0.05–$0.15; fine-tune).
- Gemini 3.1 Flash Lite Image ~$0.034 ✅; Gemini 3 Pro Image $0.134–$0.24 ✅.

## F. Voice ⚠️
- ElevenLabs: Starter now **$6/mo**; **74 languages** (`08:231`). Free 10k credits ✅.
- Deepgram: $200 credit ✅; per-minute now ~$0.0043 (pre-recorded) – $0.0077 (streaming). Guide's ~$0.008–0.015 is high.
- Cartesia: now **Sonic-3.6**; ~40ms is the turbo figure (general claim ~sub-90ms); plans from free (20K credits/mo) and Pro $5/mo rather than pure pay-as-you-go (`08:233`).

## G. Frontend / tooling ✅
DaisyUI 5, Tailwind 4, HTMX 2, Alpine 3, Hono 4, GSAP 3 (100% free), wrangler 4 — no new majors.

## H. Figma ⚠️
- Full seat **$16/mo** (guide says $15: `02-the-landscape.md:53`, `starter/src/system-prompt.ts:109`). Dev seat $12/mo.
- Figma MCP server now works on the free Starter plan (20 tool calls/mo). Worth mentioning as a try-before-you-buy.

## I. Other
- `starter/src/system-prompt.ts:108`: "Cloudflare Workers Paid: $5/mo (recommended from day one)" — conflicts with the guide's settled "free tier to start" stance (July finding K1). Also `08-appendices.md:259` ("strongly recommended") — check consistency.

---

## Status (2026-10-12)

Applied: A (all items; author anecdote kept as history), B, E, F, H price, README banner, new CHANGELOG.md, CLAUDE.md rules, a-primer-skills primer-setup Step 8.

Open:
- Starter chat model `@cf/meta/llama-3.2-3b-instruct` (`starter/src/modules/chat.ts:111`, mirrored in `a-new-project.md:451,637`). Swapping to glm-4.7-flash needs a test run — response shape may differ from Llama's `{ response }`.
- Figma MCP free tier (20 calls/mo) not yet mentioned in the guide.
- Workers Paid "recommended from day one" (`starter/src/system-prompt.ts`, Appendix C intro) still conflicts with the free-tier-first stance (July finding K1).
