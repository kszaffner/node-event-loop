'use strict';

// zlib (async gzip) is another operation run on the thread pool. Same
// trick as scenario 11: tick an interval while compressing a large
// buffer, to show the main thread stays free during the CPU-bound work.

const zlib = require('node:zlib');
const { log } = require('../lib/logger');

const buffer = Buffer.alloc(50 * 1024 * 1024, 'a');

let ticks = 0;
const interval = setInterval(() => {
  ticks += 1;
  log('SYNC', `interval tick #${ticks} (main thread free despite compression running)`);
}, 20);

log('SYNC', 'Starting zlib.gzip (async, thread pool) on a 50MB buffer...');

zlib.gzip(buffer, (err, compressed) => {
  if (err) throw err;
  clearInterval(interval);
  log('THREADPOOL', `Compression finished: ${buffer.length} -> ${compressed.length} bytes`);
});
