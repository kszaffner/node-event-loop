'use strict';

// Important distinction: libuv's thread pool (used internally by fs,
// crypto, zlib, dns.lookup — see scenarios 10-14) is NOT the same thing
// as worker_threads. worker_threads is a separate, explicit mechanism
// for running YOUR OWN JS code on another thread, each with its own V8
// isolate and event loop. It does not share libuv's thread pool slots.
//
// Here we saturate the thread pool (4 slots) with crypto.pbkdf2 jobs AT
// THE SAME TIME as running a CPU-bound loop on a worker_thread. If the
// worker were competing for the same pool slots, it would have to wait
// behind the pbkdf2 jobs (like fs.readFile did in scenario 14) — but it
// doesn't, because it runs on its own dedicated OS thread.

const crypto = require('node:crypto');
const { Worker, isMainThread, parentPort } = require('node:worker_threads');
const { log } = require('../lib/logger');

if (!isMainThread) {
  // Worker thread body: a simple CPU-bound loop, independent of libuv's pool.
  let total = 0;
  for (let i = 0; i < 6e7; i += 1) {
    total += i % 7;
  }
  parentPort.postMessage(total);
} else {
  const ITERATIONS = 300000;
  const POOL_JOBS = 4;

  log('SYNC', `Saturating the thread pool with ${POOL_JOBS} crypto.pbkdf2 jobs...`);
  for (let i = 1; i <= POOL_JOBS; i += 1) {
    crypto.pbkdf2('password', `salt-${i}`, ITERATIONS, 64, 'sha512', () => {
      log('THREADPOOL', `pbkdf2 #${i} finished`);
    });
  }

  log('SYNC', 'Starting a worker_thread with its own CPU-bound loop, running independently of the pool');
  const worker = new Worker(__filename);
  worker.on('message', (total) => {
    log('WORKER', `worker_thread finished (result: ${total}) — did not queue behind the thread pool`);
  });
}
