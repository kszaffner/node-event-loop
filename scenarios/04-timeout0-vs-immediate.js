'use strict';

// Shows the difference between setTimeout(0) and setImmediate() in two
// contexts:
//
// 1) At the top level (outside an I/O callback) the order is NOT
//    guaranteed — it depends on how long the process took to start up
//    before entering the Timers phase (can differ between runs).
// 2) Inside an I/O callback (the Poll phase) the order IS guaranteed —
//    setImmediate() always wins, because the Check phase comes right
//    after Poll, while the event loop only gets back to Timers on the
//    next iteration.

const fs = require('node:fs');
const { log } = require('../lib/logger');

log('SYNC', '--- Context 1: top level (non-deterministic order) ---');

setTimeout(() => log('TIMERS', 'setTimeout(0) at top level'), 0);
setImmediate(() => log('CHECK', 'setImmediate at top level'));

fs.readFile(__filename, () => {
  log('POLL', '--- Context 2: inside an I/O callback (deterministic order) ---');

  setTimeout(() => log('TIMERS', 'setTimeout(0) inside I/O'), 0);
  setImmediate(() => log('CHECK', 'setImmediate inside I/O — always first'));
});
