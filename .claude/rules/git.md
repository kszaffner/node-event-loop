---
description: Branching, commit, and language rules for everything written into this repository.
paths:
  - "**/*"
---

# Git and project text

WHAT must be true.

## Never push directly to main

Always work on a feature branch and open a PR, even from an isolated
worktree session. This is enforced mechanically by
`.claude/hooks/protect-main-branch.sh` — don't try to work around it with
`--no-verify` or by disabling the hook.

## English only

All project text is English: code, comments, log messages, docs, commit
messages, PR descriptions. The conversation with the user may be in
another language, but everything written into the codebase is English.

## Commits

Prefer small, focused commits. Only commit when the user asks for it —
see the repo-wide agent instructions on git safety.
