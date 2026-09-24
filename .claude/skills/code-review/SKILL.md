---
name: code-review
description: Review the current diff against this project's Rules (logging format, scenario scope, git/language rules). Use after implementing a change and before considering it done.
disable-model-invocation: true
---

# Code Review

Runs inline (has access to the current task context, implementation, and
conversation) — this repo is small enough that forking a review would add
overhead without benefit.

## Procedure

1. Get the actual diff — start narrow, expand only if needed:

   ```text
   !git status --short
   !git diff --stat
   ```

   Then read the full diff for files that actually changed:

   ```text
   !git diff -- <changed-file>
   ```

2. Read changed files in full (not just diff hunks) when the diff alone
   doesn't give enough context to judge correctness.

3. Load `.claude/skills/code-review/checklist.md` and walk through it
   against the actual code. Apply `.claude/rules/logging.md`,
   `.claude/rules/scenarios.md`, and `.claude/rules/git.md` as the review
   criteria. If a changed file is under `scenarios/`, also consider
   invoking the `scenario-reviewer` agent for a deeper pass on log-format
   and phase-label correctness — this checklist is the quick pass, that
   agent is the deep dive (see `.claude/agents/README.md`).

4. Check verification status — run the relevant scenario(s):

   ```text
   !npm run scenario:NN
   ```

   Note whether the output was actually read and matches expected
   behavior, not just that the command exited 0.

5. Report findings using this format:

   ```text
   CRITICAL
   <finding>

   HIGH
   <finding>

   MEDIUM
   <finding>

   LOW
   <finding>
   ```

   Each finding needs: location (file:line), the problem, why it matters,
   and a recommended fix.

   If there are no actionable findings:

   ```text
   Code Review — No actionable findings.

   Verification:
   ✓ ...
   ```

   Do NOT produce a numeric score, percentage, or overall
   winner/loser-style conclusion. Findings are the output, not a grade.

6. Review actual code, not just the developer's description of what they
   did — the diff is the source of truth.

## After review

If there are actionable findings, fix them, re-verify, and review again —
repeat until clean or the developer stops the loop. See `examples.md` for
what a finding and a clean-pass report look like end to end.
