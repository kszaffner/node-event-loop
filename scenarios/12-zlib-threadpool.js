'use strict';

// zlib (async gzip) to kolejna operacja wykonywana na thread poolu.
// Ten sam trick co w scenariuszu 11: tykamy interwałem podczas kompresji
// dużego bufora, żeby pokazać że główny wątek jest wolny mimo trwającej
// pracy CPU-bound w tle.

const zlib = require('node:zlib');
const { log } = require('../lib/logger');

const buffer = Buffer.alloc(50 * 1024 * 1024, 'a');

let ticks = 0;
const interval = setInterval(() => {
  ticks += 1;
  log('SYNC', `tyknięcie interwału #${ticks} (główny wątek wolny mimo trwającej kompresji)`);
}, 20);

log('SYNC', 'Start zlib.gzip (async, thread pool) na 50MB bufora...');

zlib.gzip(buffer, (err, compressed) => {
  if (err) throw err;
  clearInterval(interval);
  log('THREADPOOL', `Kompresja zakończona: ${buffer.length} -> ${compressed.length} bajtów`);
});
