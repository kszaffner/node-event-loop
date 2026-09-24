# node-event-loop

An educational Node.js project showing, step by step, how the **event loop** and **thread pool** (libuv) work — through 19 small, runnable scenarios that log *what* ran, *in which event loop phase/queue*, and *when* (elapsed ms since script start).

## Running a scenario

```
npm run scenario:01
# ...
npm run scenario:19
```

or directly:

```
node scenarios/01-sync-nexttick-promise-macrotask.js
```

Each log line looks like:

```
[+  3.64ms] [SYNC]       End of synchronous code
```

`SYNC`/`NEXTTICK`/`TIMERS`/etc. phase labels are a didactic annotation based on documented libuv/Node behavior, not something read from libuv at runtime — Node doesn't expose "which phase are we in" to JS. See `lib/logger.js` and the comment in `scenarios/05-pending-callbacks.js` for details.

## Scenarios

### A — Fundamentals (call stack & microtask queues)

| # | Scenario | Shows |
|---|----------|-------|
| 01 | `sync-nexttick-promise-macrotask` | Order: sync code → `process.nextTick` → Promise microtasks → event loop (Timers) |
| 02 | `nexttick-vs-promise-priority` | `process.nextTick` queue is fully drained before the Promise microtask queue |

### B — Event loop phases (libuv)

| # | Scenario | Shows |
|---|----------|-------|
| 03 | `timers-basic` | `setTimeout` runs in delay order, not code order; `setInterval` |
| 04 | `timeout0-vs-immediate` | `setTimeout(0)` vs `setImmediate()` — non-deterministic at top level, deterministic inside I/O |
| 05 | `pending-callbacks` | The "Pending callbacks" phase (deferred TCP error callbacks, e.g. `ECONNREFUSED`) |
| 06 | `poll-phase-io` | The Poll phase running an `fs.readFile` callback |
| 07 | `close-callbacks` | The "Close callbacks" phase (`socket.on('close')`) and `process.on('exit')` |

### C — Operations handed directly to the OS by libuv (no thread pool)

| # | Scenario | Shows |
|---|----------|-------|
| 08 | `network-io-os` | TCP networking uses OS async I/O (epoll/kqueue/IOCP), not the thread pool |
| 09 | `dns-resolve-vs-lookup` | `dns.resolve4` (c-ares, no thread pool) vs `dns.lookup` (thread pool) |

### D — Thread pool (libuv worker pool, default size 4)

| # | Scenario | Shows |
|---|----------|-------|
| 10 | `fs-readfile-threadpool-proof` | `fs.readFile` work happens on a background thread while the main thread is blocked |
| 11 | `crypto-pbkdf2-threadpool` | CPU-bound `crypto.pbkdf2` runs on the thread pool, main thread stays free |
| 12 | `zlib-threadpool` | Async `zlib.gzip` runs on the thread pool, same proof |
| 13 | `dns-lookup-threadpool` | `dns.lookup` doesn't block, and shares the pool with fs/crypto/zlib |
| 14 | `threadpool-shared-pool-saturation` | **Key demo:** a saturated pool (4 pbkdf2 jobs) delays an unrelated `fs.readFile`; run with `UV_THREADPOOL_SIZE=8` to see the difference |

### E — Edge cases & the full picture

| # | Scenario | Shows |
|---|----------|-------|
| 15 | `event-loop-starvation` | Recursive `process.nextTick` starves the event loop — a pending timer never fires until it stops |
| 16 | `blocking-the-event-loop` | A synchronous loop delays a due timer — Node.js runs JS on a single thread |
| 17 | `worker-threads-vs-threadpool` | `worker_threads` run on their own OS thread, independent of libuv's thread pool |
| 18 | `queue-microtask` | `queueMicrotask()` shares the same queue as `Promise.then` |
| 19 | `everything-together` | Combined finale weaving together nextTick, microtasks, timers, immediate, I/O and the thread pool in one run |

## Project conventions

See `.claude/CLAUDE.md` for the full set of working rules (English-only code/docs, no direct pushes to `main`, logging format, etc.).
