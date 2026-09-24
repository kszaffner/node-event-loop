# Code Review Checklist

Loaded on demand by `SKILL.md` — not duplicated there. This restates
nothing from `.claude/rules/`; it's a review pass order, not a second copy
of the rules.

## Logging

- [ ] Every log line matches `[+<ms>ms] [<PHASE>] <message>`
- [ ] The phase label used actually matches the documented libuv/Node
      phase the callback runs in — not a guess or copy-paste from a
      similar scenario
- [ ] No code or comment implies the logger detects the phase at runtime

## Scenario scope

- [ ] Only Node.js built-ins used — no new dependency added to
      `package.json` to demonstrate something plain Node.js already shows
- [ ] The scenario demonstrates one specific, identifiable behavior (not
      a grab-bag, unless it's an explicit combined/finale scenario)
- [ ] A new scenario was actually agreed with the user first — not
      invented ad hoc (`.claude/rules/scenarios.md`)

## Wiring and naming

- [ ] File name follows `NN-short-description.js`
- [ ] `package.json` has a matching `scenario:NN` script
- [ ] Root `CLAUDE.md`'s `## Status` section is updated if this adds a
      new scenario or section

## Language and process

- [ ] All code, comments, and log messages are English
- [ ] No direct commit/push to `main` (mechanically enforced by
      `.claude/hooks/protect-main-branch.sh`, but check anyway)

## Regression risk

- [ ] Existing scenarios still behave the same (execution order, log
      output) if shared code (`lib/logger.js`) was touched
- [ ] Nothing outside the stated scope was modified without reason
