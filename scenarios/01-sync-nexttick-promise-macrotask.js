'use strict';

// Shows the basic execution order in Node.js:
// 1. synchronous code (call stack)
// 2. process.nextTick queue
// 3. microtask queue (Promise)
// 4. only then the event loop (here: the Timers phase)
//
// Expected log order: SYNC, SYNC, NEXTTICK, MICROTASK, TIMERS.

const { log } = require('../lib/logger');

log('SYNC', 'Script start');

setTimeout(() => {
  log('TIMERS', 'setTimeout callback (Timers phase, macrotask)');
}, 0);

Promise.resolve().then(() => {
  log('MICROTASK', 'Promise.then callback (microtask)');
});

process.nextTick(() => {
  log('NEXTTICK', 'process.nextTick callback');
});

log('SYNC', 'End of synchronous code');
