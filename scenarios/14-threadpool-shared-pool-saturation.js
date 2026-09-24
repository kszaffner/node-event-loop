'use strict';

// THE key scenario of section D: shows that fs, crypto, zlib and
// dns.lookup all share ONE common thread pool (default size 4 — the
// UV_THREADPOOL_SIZE environment variable). We fill the entire pool with
// four long crypto.pbkdf2 jobs, then schedule a FIFTH job from the same
// pool (fs.readFile) — even though the file read itself is instant, it
// has to wait in the queue until a thread frees up.
//
// Compare with running: UV_THREADPOOL_SIZE=8 node scenarios/14-threadpool-shared-pool-saturation.js
// — with a bigger pool, fs.readFile does NOT wait in the queue.

const fs = require('node:fs');
const crypto = require('node:crypto');
const { log } = require('../lib/logger');

const ITERATIONS = 300000;
const POOL_JOBS = 4; // default thread pool size

log('SYNC', `Filling the pool with ${POOL_JOBS} long crypto.pbkdf2 jobs...`);

for (let i = 1; i <= POOL_JOBS; i += 1) {
  crypto.pbkdf2('password', `salt-${i}`, ITERATIONS, 64, 'sha512', () => {
    log('THREADPOOL', `pbkdf2 #${i} (filling the pool) finished`);
  });
}

log('SYNC', 'Also scheduling a quick fs.readFile — it should wait in the queue for a free thread');

fs.readFile(__filename, () => {
  log('THREADPOOL', 'fs.readFile finished — compare the timing with pbkdf2, even though the read itself is instant');
});
