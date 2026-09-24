'use strict';

// Shows that the process.nextTick queue is always fully drained BEFORE
// the Promise microtask queue — these are two separate queues, not one.
//
// Expected order: NEXTTICK #1, NEXTTICK #2, MICROTASK #1, MICROTASK #2
// (not alternating, even though we add them alternately in the code).

const { log } = require('../lib/logger');

process.nextTick(() => log('NEXTTICK', '#1'));
Promise.resolve().then(() => log('MICROTASK', '#1'));
process.nextTick(() => log('NEXTTICK', '#2'));
Promise.resolve().then(() => log('MICROTASK', '#2'));
