'use strict';

// Pokazuje podstawową kolejność wykonania w Node.js:
// 1. kod synchroniczny (call stack)
// 2. kolejka process.nextTick
// 3. kolejka mikrozadań (Promise)
// 4. dopiero potem event loop (tu: faza Timers)
//
// Oczekiwana kolejność logów: SYNC, SYNC, NEXTTICK, MICROTASK, TIMERS.

const { log } = require('../lib/logger');

log('SYNC', 'Start skryptu');

setTimeout(() => {
  log('TIMERS', 'setTimeout callback (faza Timers, makrozadanie)');
}, 0);

Promise.resolve().then(() => {
  log('MICROTASK', 'Promise.then callback (mikrozadanie)');
});

process.nextTick(() => {
  log('NEXTTICK', 'process.nextTick callback');
});

log('SYNC', 'Koniec kodu synchronicznego');
