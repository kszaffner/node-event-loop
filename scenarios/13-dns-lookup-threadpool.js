'use strict';

// dns.lookup() shares the thread pool with fs/crypto/zlib (see scenario
// 09 for the difference vs dns.resolve*). Here, using the same trick as
// 11/12, we show that dns.lookup doesn't block the main thread — and in
// scenario 14 we'll show it CAN get stuck in a queue if the whole pool
// is busy with something else (e.g. crypto.pbkdf2). Requires network
// access.

const dns = require('node:dns');
const { log } = require('../lib/logger');

let ticks = 0;
const interval = setInterval(() => {
  ticks += 1;
  log('SYNC', `interval tick #${ticks} (main thread free during dns.lookup)`);
}, 5);

log('SYNC', 'Starting dns.lookup (thread pool)...');

dns.lookup('example.com', (err, address) => {
  clearInterval(interval);
  if (err) return log('THREADPOOL', `dns.lookup error: ${err.code}`);
  log('THREADPOOL', `dns.lookup finished -> ${address}`);
});
