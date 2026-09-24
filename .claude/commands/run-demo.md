---
description: Runs a chosen event loop / thread pool scenario and explains the execution log
---

Run the scenario given in the argument (`$ARGUMENTS`) with `node`. If the argument is empty, ask the user which scenario to run (list the files under `scenarios/`).

After running it:
1. Show the raw log output.
2. Briefly explain the execution order in terms of event loop phases (microtasks, timers, I/O callbacks, check, close callbacks, thread pool) — based only on what actually appeared in the log, don't guess.
3. Don't modify the scenario's code as part of this command — this command is for observing, not developing.
