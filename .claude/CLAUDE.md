# node-event-loop

An educational Node.js project showing, step by step, how the **event loop** and **thread pool** (libuv) work. The goal isn't a production-ready app, just a set of runnable scenarios that log *when* and *in which event loop phase* a given piece of code executes.

## Status

Sections A (nextTick/promise), B (event loop phases), C (OS-level I/O), D (thread pool), and E (starvation, blocking, worker_threads, combined finale) all have implemented scenarios under `scenarios/`. Any further scenarios are decided together with the user in a planning session — don't invent new ones without agreeing on them first.

## Logging convention

Format defined in `lib/logger.js`: `[+<ms>ms] [<PHASE>] <message>` — this answers three questions: *what ran*, *in which event loop phase/queue*, *at what elapsed time (since script start)*. Don't introduce a different format without checking with the user.

Phase labels (SYNC, NEXTTICK, MICROTASK, TIMERS, PENDING, POLL, CHECK, THREADPOOL, OS-IO, CLOSE, EXIT, WORKER) are our own didactic annotation based on documented libuv/Node behavior — Node does not expose "which phase are we in right now" to JS. Don't give the impression the logger measures this at runtime.

## How to run

`npm run scenario:NN` or directly `node scenarios/NN-name.js`. File numbering under `scenarios/` follows the order of the plan's sections (A/B/C/D/E).

## Claude Code workflow in this repo

Detailed, path-scoped rules live under `.claude/rules/` (logging format,
scenario constraints, git/language rules) rather than all in this file.

- Adding a scenario: agree the behavior/section with the user first
  (`.claude/rules/scenarios.md`), then implement per `.claude/rules/`.
- Reviewing a change: `.claude/skills/code-review/SKILL.md`, plus a
  deeper pass from the `scenario-reviewer` agent (`.claude/agents/`) for
  scenario files.
- Broad/unclear repository search: `.claude/skills/explore/SKILL.md`
  (isolated, forked).
- Recording a non-obvious WHY discovered while building a scenario:
  `.claude/skills/knowledge/SKILL.md` / `.claude/knowledge/index.md`.
- `.claude/hooks/` mechanically enforces the "never push directly to
  main" rule, blocks hardcoded secrets, and protects `.env`/
  `package-lock.json`/`.git/` from edits — see `.claude/hooks/README.md`.

## Working rules in this repo

- This is an educational project — readability of logs and code takes priority over performance or abstractions.
- Don't add frameworks (Express, Next.js, etc.) — this demo is meant to show plain Node.js runtime behavior.
- Architecture/scenario changes are agreed on in a planning session, not implemented ad hoc.
- **All project text is in English** — code, comments, log messages, docs, commit messages, PR descriptions. The conversation with the user may be in another language, but everything written into the codebase is English.
- **Never push directly to `main`.** Always work on a feature branch and open a PR, even from an isolated worktree session.
