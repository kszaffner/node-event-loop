'use strict';

// crypto.pbkdf2 (async) is a CPU-bound operation run on the thread pool.
// To show this, we tick a setInterval every 20ms while the hash is being
// computed — if ticks keep showing up regularly WHILE it's computing,
// that means the main thread is free and the heavy work is running on a
// pool thread.
//
// For comparison, try swapping in crypto.pbkdf2Sync — then the interval
// ticks won't show up at all until the computation is done, because
// pbkdf2Sync blocks the main thread completely.

const crypto = require('node:crypto');
const { log } = require('../lib/logger');

const ITERATIONS = 300000;

let ticks = 0;
const interval = setInterval(() => {
  ticks += 1;
  log('SYNC', `interval tick #${ticks} (main thread free despite pbkdf2 running)`);
}, 20);

log('SYNC', 'Starting crypto.pbkdf2 (async, thread pool)...');

crypto.pbkdf2('password', 'salt', ITERATIONS, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  clearInterval(interval);
  log('THREADPOOL', `crypto.pbkdf2 finished, key: ${derivedKey.toString('hex').slice(0, 16)}...`);
});
