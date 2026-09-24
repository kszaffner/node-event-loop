# Agents

This project ships a **single, narrow read-only agent**:
`scenario-reviewer`. It exists because getting the log format and phase
labels exactly right is easy to get subtly wrong (see
`.claude/rules/logging.md`), and a fresh, focused read catches that
better than the author's own pass.

## Why only one agent

`node-event-loop` is a small, stable educational project: no build
pipeline, no test suite, no security surface, no module boundaries to
police. A larger review roster (a "security auditor," a "performance
reviewer," ...) modeled after a production app starter would have
nothing real to review here — it would just produce findings for the
sake of having an agent to run. One agent, owning the one thing that
actually needs a dedicated pass (log-format/phase-label correctness), is
proportionate to what this repo is.

`scenario-reviewer` cannot modify code (see its `tools:` frontmatter — no
`Write`/`Edit`). It reports findings; the developer or
`.claude/skills/code-review/SKILL.md` applies fixes.

## How to introduce another agent later

Only if a concrete, recurring need shows up — not speculatively. Give it
a narrow, non-overlapping responsibility, a concise report format, and an
explicit boundary against what `scenario-reviewer` already owns.
