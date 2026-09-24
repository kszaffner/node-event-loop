'use strict';

// dns.lookup() uses libc's getaddrinfo and goes through libuv's thread
// pool (the same one used by fs/crypto/zlib — see scenarios 10-13) —
// which is why it's limited by the pool size (default 4 threads) and
// consults the local hosts file.
//
// dns.resolve*() (here: resolve4) does NOT use the thread pool — it goes
// through the c-ares library, which has its own async mechanism based on
// network sockets (similar to networking in scenario 08), and does NOT
// consult the hosts file (it asks the DNS server directly).
//
// This mechanism difference can't be observed directly from JS (see the
// note in scenario 05) — it's documented Node.js behavior, not something
// measured here at runtime. Requires network access.

const dns = require('node:dns');
const { log } = require('../lib/logger');

const HOST = 'example.com';

log('SYNC', `Querying ${HOST}: dns.lookup() (thread pool) and dns.resolve4() (c-ares, no thread pool)`);

dns.lookup(HOST, (err, address) => {
  if (err) return log('THREADPOOL', `dns.lookup error: ${err.code}`);
  log('THREADPOOL', `dns.lookup(${HOST}) -> ${address}`);
});

dns.resolve4(HOST, (err, addresses) => {
  if (err) return log('OS-IO', `dns.resolve4 error: ${err.code}`);
  log('OS-IO', `dns.resolve4(${HOST}) -> ${addresses.join(', ')}`);
});
