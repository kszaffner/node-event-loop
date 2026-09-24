'use strict';

// Demonstrates event loop starvation: a recursive process.nextTick call
// re-schedules itself, so the nextTick queue never empties and the event
// loop can NEVER move on to the Timers phase (or anything else) while it
// keeps going. The setTimeout below is scheduled for 0ms but won't fire
// until the recursion stops — proof that microtask-priority queues can
// starve the rest of the event loop. The recursion is capped so this
// scenario actually terminates.

const { log } = require('../lib/logger');

const MAX_ITERATIONS = 100000;
let count = 0;

setTimeout(() => {
  log('TIMERS', 'This setTimeout(0) callback finally ran — the starvation ended');
}, 0);

function starve() {
  count += 1;
  if (count === 1 || count === MAX_ITERATIONS) {
    log('NEXTTICK', `recursive process.nextTick, iteration ${count}`);
  }
  if (count < MAX_ITERATIONS) {
    process.nextTick(starve);
  } else {
    log('NEXTTICK', 'Stopping the recursion — releasing control back to the event loop');
  }
}

log('SYNC', `Starting a recursive process.nextTick chain of ${MAX_ITERATIONS} iterations`);
process.nextTick(starve);
