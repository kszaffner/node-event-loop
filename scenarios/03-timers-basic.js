'use strict';

// Pokazuje fazę Timers: setTimeout wykonują się w kolejności opóźnienia
// (delay), a nie w kolejności zapisania w kodzie. setInterval tyka co
// zadany czas, aż go zatrzymamy.
//
// Oczekiwana kolejność setTimeout: 0ms, 50ms, 100ms — mimo że w kodzie
// są zapisane jako 100, 0, 50.

const { log } = require('../lib/logger');

log('SYNC', 'Start skryptu — planujemy 3 timeouty w kolejności 100ms, 0ms, 50ms');

setTimeout(() => log('TIMERS', 'setTimeout(100ms) callback'), 100);
setTimeout(() => log('TIMERS', 'setTimeout(0ms) callback'), 0);
setTimeout(() => log('TIMERS', 'setTimeout(50ms) callback'), 50);

let tick = 0;
const interval = setInterval(() => {
  tick += 1;
  log('TIMERS', `setInterval tick #${tick}`);
  if (tick >= 3) {
    clearInterval(interval);
    log('TIMERS', 'setInterval zatrzymany po 3 tickach');
  }
}, 30);
