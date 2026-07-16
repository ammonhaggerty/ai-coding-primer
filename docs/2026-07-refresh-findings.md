# Primer Refresh Findings — July 2026

Audit of the guidebook, starter, and `../a-primer-skills` for outdated models, commands, prices, links, versions, plus clarity. Every external claim was verified against current docs (Cloudflare, Anthropic, Google, npm) in July 2026. Claude model/API facts verified against Anthropic's authoritative model reference.

Status legend: ✅ verified current · ⚠️ needs update · 🟡 optional / judgment call

---

## A. Claude model names (biggest change) ⚠️

The guide is built around **Opus 4.6** and **Sonnet 4.6**. Both superseded:
- Coding flagship is now **Opus 4.8** (4.6 is a legacy model).
- Sonnet 4.6 → **Sonnet 5**.
- Haiku 4.5 — unchanged.

Occurrences to update (~18):
- `guidebook/00-tldr.md:144`
- `guidebook/02-the-landscape.md:13,51`
- `guidebook/03-setting-up.md:17,152`
- `guidebook/08-appendices.md:145,147,153,154,157,171,172,242,246` (recommendation prose + coding-model table + API-pricing table + plans table)
- `README.md:45` ("Claude Code (Opus 4.6)")
- `CLAUDE.md:40` (project constraint "Opus 4.6 recommended")
- `../a-primer-skills/skills/primer-setup/SKILL.md:243,249,251,257` (Step 8 model selection)
- `guidebook/01-about-the-author.md:17` — author's personal narrative ("something changed with the last major Claude release, Opus 4.6"). 🟡 Judgment call: updating to 4.8 changes a first-person anecdote. Recommend author decides; could generalize to "the recent Opus releases."

Also: Pro now defaults to **Sonnet 5** (not "Sonnet 4.6"); `/model` aliases are opus/sonnet/haiku/fable.

## B. Claude API pricing (Appendix B) ⚠️
- Opus (4.8): **$5 / $25** — numbers unchanged, just rename.
- Sonnet (5): **$3 / $15** sticker, but **introductory $2 / $10 through 2026-08-31**. Add the intro note.
- Haiku 4.5: **$1 / $5** — unchanged.
- 🟡 New top tier **Fable 5** ($10/$50, most-capable model). Recommend NOT adding for this beginner audience — it's a premium API tier, not the subscription-coding path, and adds noise. Flag only.

## C. Claude subscription plans ✅ (mostly)
Pro $20, Max $100 / $200, Free = no Claude Code — all confirmed. Pro also has $17/mo annual. Only the embedded model names ("Opus 4.6", "Sonnet 4.6") are stale (covered in A).

## D. Claude Code install method ⚠️
`npm install -g @anthropic-ai/claude-code` still works but is **deprecated since v2.1.15 (Jan 2026)**; npm now needs Node 22+ and won't auto-update. Recommended path is the **native installer**:
- macOS/Linux/WSL: `curl -fsSL https://claude.ai/install.sh | bash`
- Windows: `irm https://claude.ai/install.ps1 | iex`

Affects `00-tldr.md` step 4, `03-setting-up.md` step 3, `08-appendices.md` troubleshooting, and `a-primer-skills` (README install snippet + primer-setup skill). Note: Node is still needed for the *project* tooling (wrangler etc.), so the Node.js step stays — but Claude Code itself no longer needs to be an npm global.

## E. Claude Code slash commands / shortcuts (Appendix A) ⚠️
Commands claimed that do **not** exist as built-ins:
- `/plan` — plan mode is Shift+Tab only (remove the row; keep the Shift+Tab guidance).
- `/rename`, `/todos`, `/theme`, `/stats` — not built-in commands. (`/theme` → set via `/config`; to-dos toggle with Ctrl+T; `/cost` is an alias of `/usage`.)
- `/status` — unverified; treat as unreliable.

Confirmed real: /help, /model, /compact, /clear, /init, /memory, /cost, /usage, /resume, /rewind, /export, /copy, /config, /permissions, /mcp, /doctor, /debug, /tasks.

Worth adding (common, current): **/context**, /branch, /keybindings. (/loop, /schedule, /voice, /desktop exist but are advanced — optional.)

Shortcut fix: "Ctrl+F (twice) kill all background tasks" is **wrong** — the default is **Ctrl+X Ctrl+K** (`chat:killAgents`). Everything else in the shortcut tables verified correct. Optional: mention `bypassPermissions` mode.

## F. Cloudflare limits & pricing (Appendix C + chapter 04) ⚠️
- **Vectorize (two errors):** unit is **dimensions, not vectors** — free tier is "5M stored *dimensions* / 30M queried *dimensions*/mo". And stored price is **$0.05 per 100M** stored dimensions, not "$0.01/M stored vectors". (Queried $0.01/M is correct.)
- **Workers Paid CPU:** "30s CPU" is only the *default* — configurable up to **5 minutes** per invocation. And requests aren't literally "unlimited": 10M/mo included, then $0.30/M. Reword.
- **D1 free storage:** "500 MB" is the *per-database* cap; total free storage is **5 GB**. Clarify.
- Confirmed unchanged: Workers $5/mo; free 100k req/day + 10ms CPU; D1 rows read/written; R2 10GB + zero egress + $0.015/GB; KV 1GB/100k/1k; Workers AI 10k Neurons/day + $0.011/1k.

## G. Cloudflare Workers AI models (Appendix B) ⚠️
- Text: "Llama 3.2, GLM-4.7-Flash, DeepSeek-R1" — GLM-4.7-Flash still current, but flagship is now **Llama 4 Scout / gpt-oss-120b / Kimi K2**. Refresh the examples.
- Image: "Leonardo Phoenix, Stable Diffusion" still exist, but current flagship is **FLUX.2** (dev/klein). Add FLUX.
- STT Whisper ✅, TTS Deepgram/Aura-2 ✅, embeddings bge-base/large ✅.
- `../a-primer-skills/commands/a-new-project.md:452` generates `AI: Cloudflare Workers AI (Llama 3.2 3B)` — bump the model reference.

## H. Starter config: wrangler.toml → wrangler.jsonc 🟡⚠️
Cloudflare now **recommends `wrangler.jsonc` for new projects** ("some newer Wrangler features will only be available to projects using a JSON config file"). The starter + a-new-project templates use `wrangler.toml`. Also `compatibility_date = "2024-12-01"` is stale — Cloudflare's guidance is "set to today's date"; recommend bumping to a current date (e.g. 2026-07-01). This touches: `starter/wrangler.toml`, `a-new-project.md` (fallback template + placeholder-replacement instructions + CLAUDE.md generation), `04-the-cloud.md:27` and `03-setting-up.md:224` (both reference "wrangler.toml"). Bigger change — confirm before doing.
wrangler CLI: `^4` fine (latest 4.111.x). DaisyUI 5, Tailwind 4, HTMX 2, Alpine 3, Hono 4, GSAP 3 — all ✅ current. GSAP is now fully free incl. commercial ✅.

## I. Third-party AI in Appendix B ⚠️
- **Google image models:** Imagen 4 Fast still $0.02 but **retires Aug 17, 2026**; Gemini 2.5 Flash Image ($0.039) **retires Oct 2, 2026**. Gemini 3 Pro Image ($0.13–0.24) ✅ current. New cheapest is Gemini 3.1 Flash Lite Image (~$0.034). Recommend: swap the two retiring models for current ones, keep it simple.
- **Deepgram:** free tier is a **$200 credit** (not "10 min"); per-minute is now ~**$0.0077–0.0145/min** (guide's $0.01–0.03 is high). Correct.
- ElevenLabs (10k chars free, $5 start, 70+ langs) ✅. Cartesia ✅ (model now Sonic 3, ~40ms).

## J. Links ✅ (one note)
All doc/pricing links resolve. `console.anthropic.com` now **301-redirects to platform.claude.com** — still works; optionally update the canonical Appendix D entry. Everything else confirmed.

## K. Clarity / consistency (non-version) 🟡
1. **Free-vs-paid mixed message:** `04-the-cloud.md:17` recommends the $5 plan "from day one," while `00`, `02:53`, `03:19` say the free tier is enough to start and to upgrade later. Reconcile to one consistent stance (recommend: "free tier to start, $5 when you outgrow it," matching the majority).
2. **README status block** ("active drafting", "skill and starter template are in development") is likely stale now that onboarding video + plugin are shipped. Refresh.
3. Otherwise the prose is clean, consistent, and well-pitched for the audience; no structural clarity problems found.
