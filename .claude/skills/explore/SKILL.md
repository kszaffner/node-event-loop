---
name: explore
description: Deep, isolated repository search — finding an existing scenario, pattern, or usage across many files — without bloating the main conversation. Use for broad/unclear searches, not small lookups.
context: fork
agent: Explore
---

# Explore

Runs in an isolated forked context using the built-in `Explore` agent,
unlike every other skill in this project (`code-review`, `knowledge`,
which all run inline and need the developer in the loop).

```text
MAIN CONTEXT
      ↓
Explore subagent (forked, isolated)
      ↓
repository search
      ↓
concise findings returned
      ↓
MAIN CONTEXT
```

## When to use this

- Checking whether a scenario already covers a specific behavior before
  proposing a new one
- Finding every place a logging convention or phase label is used a
  particular way, across many scenario files
- Any search broad enough that reading through it inline would bloat the
  conversation with noise the developer doesn't need to see

## When NOT to use this

- A single-file lookup — just read the file or grep directly. This repo
  is small (`lib/` + `scenarios/`); most lookups don't need a fork.
- Anything the developer needs to see reasoned through live.

## What it returns

The subagent must return a **concise summary**: the relevant
files/patterns found, not the raw search process.
