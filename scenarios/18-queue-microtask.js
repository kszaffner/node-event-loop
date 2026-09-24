'use strict';

// queueMicrotask() shares the exact same microtask queue as Promise.then
// — this confirms it's not a separate priority level, just another way
// to schedule a microtask.
//
// Expected order: NEXTTICK (always fully drained first), then the
// MICROTASK entries in the order they were scheduled (queueMicrotask and
// Promise.then interleaved exactly as written below).

const { log } = require('../lib/logger');

process.nextTick(() => log('NEXTTICK', 'process.nextTick (always first)'));
queueMicrotask(() => log('MICROTASK', 'queueMicrotask #1'));
Promise.resolve().then(() => log('MICROTASK', 'Promise.then #1'));
queueMicrotask(() => log('MICROTASK', 'queueMicrotask #2'));
Promise.resolve().then(() => log('MICROTASK', 'Promise.then #2'));
