---
name: knowledge
description: Manage the project Knowledge Base — assess, init, status, search, load, update, compress, disable, clear. Use for any /knowledge command, or when a task needs WHY-level context on a non-obvious event-loop/thread-pool detail.
disable-model-invocation: true
---

# Knowledge

Runs inline — Knowledge operations usually require a Yes/No decision from
the developer, so this must stay in the main conversation.

Knowledge is optional. If it has never been initialized or has been
disabled, none of this runs automatically — see "Optional behavior"
below.

Knowledge answers **WHY**, for the non-obvious things that come up while
building scenarios that aren't already covered by `.claude/rules/`: why a
particular behavior turned out to need a specific Node version or flag,
why a scenario's expected output differs across platforms, why a phase
label choice was contested and how it was resolved. It is not a copy of
the code (read the code for WHAT) and not a procedure (see other Skills
for HOW). Do not duplicate Rules or other Skills into Knowledge, and do
not duplicate Knowledge into `CLAUDE.md`.

See `.claude/knowledge/index.md` for the current index.

## Commands

### `/knowledge assess`

Look at the current scenarios and any recent non-obvious findings, and
report briefly whether a Knowledge Base would help right now. **Do not
initialize anything.** The developer decides whether to run `init`.

### `/knowledge init`

Create `.claude/knowledge/decisions/` and/or `.claude/knowledge/features/`
only with real content — do not create empty placeholder files or
directories "just in case." A topic file is named after what it covers
(e.g. `dns-lookup-vs-resolve.md`, `threadpool-default-size.md`).

### `/knowledge status`

Report whether Knowledge is enabled/disabled, and if enabled, a short
summary of what topics exist per `index.md` (not the full content).

### `/knowledge search <query>`

Search `index.md` and file names/headings for the query — index-first, do
not load full file bodies unless one is clearly relevant.

### `/knowledge load <topic>`

Load the specific file(s) for that topic, not the whole Knowledge Base.

### `/knowledge update`

Manually trigger the Knowledge Review flow (below) outside the normal
end-of-task point.

### `/knowledge compress`

Consolidate `.claude/knowledge/`: merge duplicates, drop stale entries,
while preserving the actual WHY that's still relevant. Update `index.md`
to match.

### `/knowledge disable`

Turn off Knowledge loading, questions, and updates (note it in
`index.md`). Existing files are left untouched — only future automatic
behavior stops.

### `/knowledge clear`

**Requires explicit confirmation before proceeding.** Clears the content
of `.claude/knowledge/`. Do not touch other `.claude/` configuration
(rules, skills, agents, hooks).

## Retrieval during a task (index-first)

1. Check `index.md` only — never load full Knowledge files speculatively.
2. If a relevant topic exists, ask using this exact phrasing:

   ```text
   Relevant knowledge found:

   <file(s)>

   Do you want to load the knowledge base for this task?

   [Yes] [No]
   ```

3. **Yes** → load only the relevant file(s). **No** → skip Knowledge for
   this task; don't ask again during the same task.
4. If no relevant Knowledge exists for this task, don't ask at all.

## Knowledge Review (after a completed task)

If Knowledge is enabled and something meaningful about WHY a scenario
behaves the way it does was discovered (not just WHAT changed, which is
already in the diff), ask:

```text
Knowledge base update available:

<file(s)>

Do you want to save the changes to the knowledge base?

[Yes] [No]
```

**Yes** → update the relevant file(s) and `index.md` if a new topic was
added. **No** → do nothing; don't retry within the same task.

## Optional behavior

If `.claude/knowledge/` doesn't exist or Knowledge has been disabled: no
loading, no relevant-knowledge questions, no update prompts. The rest of
the workflow (`code-review`) proceeds exactly as it would otherwise.

## Auto Memory vs. project Knowledge

Different systems — do not conflate them:

- **Auto Memory** (this environment's memory system) is
  developer/user-specific: not Git-versioned, travels with the developer
  across projects.
- **Project Knowledge** (`.claude/knowledge/`) is project-owned,
  Git-versioned, shared with everyone working on this repository.

Never put personal information into project Knowledge.
