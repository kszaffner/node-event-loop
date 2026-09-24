# Code Review Output Examples

Loaded on demand — not part of the default `SKILL.md` procedure.

## Example: findings present

```text
CRITICAL
scenarios/20-set-immediate-vs-timeout.js:18 — Logs `[TIMERS]` for the
setImmediate callback. setImmediate callbacks run in the check phase, not
timers — this scenario is meant to teach the distinction, so a wrong
label here defeats its purpose. Change the label to CHECK.

HIGH
scenarios/20-set-immediate-vs-timeout.js:1 — Imports `chalk` to colorize
output. This project uses plain Node.js built-ins only
(`.claude/rules/scenarios.md`); remove the dependency and the import.

MEDIUM
package.json — No `scenario:20` script added for the new file. Add
`"scenario:20": "node scenarios/20-set-immediate-vs-timeout.js"`.

LOW
scenarios/20-set-immediate-vs-timeout.js:9 — Comment is in Polish
("uruchamiane w fazie check"). All project text must be English
(`.claude/rules/git.md`).
```

## Example: no actionable findings

```text
Code Review — No actionable findings.

Verification:
✓ npm run scenario:20 — output matches agreed behavior
✓ scenario-reviewer pass — no findings
```
