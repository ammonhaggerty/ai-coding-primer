# Appendix B — The "AI Dev Intro" Skill

## Status: Outlined

The reader's primary hands-on guide. The article provides mental models; the skill does the actual work.

## Capabilities

- **Environment detection** — checks OS, installed tools, existing configs
- **Guided installation** — Node.js/nvm, Git, Wrangler, MCP servers (plain-English explanations)
- **Account connection** — walks through Cloudflare, GitHub, Figma setup (knows what needs human vs. what Claude handles)
- **Project scaffolding** — creates first project from template (CLAUDE.md, D1 schema, R2 bindings, example feature)
- **First deploy** — local dev → production → live URL
- **Contextual help** — targeted troubleshooting based on specific errors/state
- **Progressive** — detects completed steps, picks up where you left off, safe to re-run

## Design Principles

- Never assume terminal familiarity
- Interruptible — stop and resume later
- Idempotent — re-running doesn't break anything
- Honest — says clearly when something needs manual action

## Resources

Drop skill development notes, test results, etc. into `resources/`.
