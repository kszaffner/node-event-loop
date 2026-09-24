# Hooks

Hooks here run deterministic shell commands in response to tool-use
events, configured in `.claude/settings.json`. They exist for rules that
have one correct outcome and shouldn't depend on the assistant
remembering them turn after turn.

## What ships here

- `protect-main-branch.sh` (`PreToolUse`, `Bash`) — blocks `git commit`
  and `git push` while on `main`/`master`. Enforces the "never push
  directly to main" rule in `.claude/rules/git.md` and root `CLAUDE.md`
  mechanically instead of relying on it being remembered every session.
- `secret-guard.py` (`PreToolUse`, `Write|Edit|NotebookEdit`) — blocks
  writes that look like they'd introduce a hardcoded credential.
- `protect-files.sh` (`PreToolUse`, `Write|Edit`) — blocks edits to
  protected paths (`.env`, `package-lock.json`, `.git/`).

## What doesn't ship here, on purpose

No lint-on-save hook: this project has no linter/formatter configured, so
there's nothing for it to run. Add one only if a linter is actually
introduced — don't wire a hook to a tool that doesn't exist yet.

## Strategy: deterministic only

Hooks are the right place for things with one correct outcome (blocking a
credential, blocking a protected-path edit, blocking a direct push to
main). They are **not** the right place for subjective judgment — "is
this phase label correct," "does this scenario duplicate an existing
one." That judgment belongs to the `scenario-reviewer` agent and the
`code-review` skill.
