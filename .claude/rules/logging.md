---
description: The log line format every scenario must produce, and what the phase labels mean.
paths:
  - "lib/**/*.js"
  - "scenarios/**/*.js"
---

# Logging

WHAT must be true. See `lib/logger.js` for the implementation.

## Format

Every log line follows:

```text
[+<ms>ms] [<PHASE>] <message>
```

- `+<ms>ms` — elapsed time since script start, in milliseconds.
- `<PHASE>` — one of: `SYNC`, `NEXTTICK`, `MICROTASK`, `TIMERS`, `PENDING`,
  `POLL`, `CHECK`, `THREADPOOL`, `OS-IO`, `CLOSE`, `EXIT`, `WORKER`.
- `<message>` — short, plain-English description of what ran.

Do not introduce a different format, add extra fields, or change phase
label names without checking with the user first — scenarios are meant
to be read and compared side by side, so consistency matters more than
any single scenario's convenience.

## Phase labels are annotations, not measurements

Node does not expose "which libuv phase is this callback running in" to
JS at runtime. The phase labels are our own didactic annotation, based on
documented libuv/Node behavior, applied by the scenario code itself (by
calling `log()` with the right label at the right point). Never write
code or comments that imply the logger measures or detects the phase
automatically — it doesn't.

## Language

Log messages are English, like all other project text (see
`.claude/rules/git.md`).
