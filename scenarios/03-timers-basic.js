'use strict';

// Shows the Timers phase: setTimeout callbacks run in delay order, not
// in the order they were written in the code. setInterval ticks every
// given interval until we stop it.
//
// Expected setTimeout order: 0ms, 50ms, 100ms — even though in the code
// they're written as 100, 0, 50.

const { log } = require('../lib/logger');

log('SYNC', 'Script start — scheduling 3 timeouts in the order 100ms, 0ms, 50ms');

setTimeout(() => log('TIMERS', 'setTimeout(100ms) callback'), 100);
setTimeout(() => log('TIMERS', 'setTimeout(0ms) callback'), 0);
setTimeout(() => log('TIMERS', 'setTimeout(50ms) callback'), 50);

let tick = 0;
const interval = setInterval(() => {
  tick += 1;
  log('TIMERS', `setInterval tick #${tick}`);
  if (tick >= 3) {
    clearInterval(interval);
    log('TIMERS', 'setInterval stopped after 3 ticks');
  }
}, 30);
