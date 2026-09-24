---
description: Constraints on what a scenario file is and how new ones get added.
paths:
  - "scenarios/**/*.js"
---

# Scenarios

WHAT must be true.

## Scope

A scenario is a small, self-contained, runnable Node.js script that
demonstrates one specific event-loop or thread-pool behavior and logs its
execution using the format in `.claude/rules/logging.md`. It is didactic
code, not application code — readability of the log output and of the
script itself takes priority over performance or abstraction.

## No frameworks, no unnecessary dependencies

Scenarios use plain Node.js built-ins only (`timers`, `fs`, `dns`,
`crypto`, `zlib`, `worker_threads`, etc.). Do not add Express, Next.js, a
test framework, or any other dependency to demonstrate runtime behavior
that plain Node.js already shows on its own.

## New scenarios require agreement first

Don't invent or add a new scenario file ad hoc. Architecture/scenario
changes are decided together with the user in a planning session (see
root `CLAUDE.md`). If asked to "add a scenario for X," confirm the exact
behavior it should demonstrate and where it fits in the existing
A/B/C/D/E section plan before writing any code.

## Numbering and wiring

- File names follow `NN-short-description.js`, numbered in the order of
  the plan's sections (A/B/C/D/E).
- Every scenario file needs a matching `scenario:NN` script entry in
  `package.json` (`node scenarios/NN-short-description.js`).
- Keep the `## Status` section in root `CLAUDE.md` in sync when a new
  section or scenario is added.
