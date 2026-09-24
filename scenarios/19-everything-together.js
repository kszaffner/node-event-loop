'use strict';

// The "boss level": weaves together pieces from scenarios 01-14 into one
// script, so you can see the full picture of how they interleave in a
// single run. Read the PHASE labels top to bottom and compare with what
// you learned in the individual scenarios. (Starvation, blocking, and
// worker_threads from 15-17 are deliberately left out — they'd distort
// the timing of everything else in this combined run.)

const fs = require('node:fs');
const crypto = require('node:crypto');
const { log } = require('../lib/logger');

process.on('exit', () => {
  log('EXIT', "process.on('exit') — always last");
});

log('SYNC', 'Script start');

setTimeout(() => log('TIMERS', 'setTimeout(0) at top level'), 0);
setImmediate(() => log('CHECK', 'setImmediate at top level'));

process.nextTick(() => log('NEXTTICK', 'process.nextTick #1'));
queueMicrotask(() => log('MICROTASK', 'queueMicrotask #1'));
Promise.resolve().then(() => log('MICROTASK', 'Promise.then #1'));

fs.readFile(__filename, () => {
  log('POLL', 'fs.readFile callback (Poll phase)');
  setTimeout(() => log('TIMERS', 'setTimeout(0) scheduled from inside I/O'), 0);
  setImmediate(() => log('CHECK', 'setImmediate scheduled from inside I/O — always wins here'));
});

crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', () => {
  log('THREADPOOL', 'crypto.pbkdf2 callback (thread pool)');
});

log('SYNC', 'End of synchronous code');
