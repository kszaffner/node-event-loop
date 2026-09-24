'use strict';

// dns.lookup() dzieli thread pool z fs/crypto/zlib (patrz scenariusz 09
// po wyjaśnienie różnicy względem dns.resolve*). Tu tym samym trickiem
// co w 11/12 pokazujemy, że dns.lookup nie blokuje głównego wątku —
// a w scenariuszu 14 pokażemy, że MOŻE utknąć w kolejce, jeśli cała pula
// wątków jest zajęta czymś innym (np. crypto.pbkdf2). Wymaga sieci.

const dns = require('node:dns');
const { log } = require('../lib/logger');

let ticks = 0;
const interval = setInterval(() => {
  ticks += 1;
  log('SYNC', `tyknięcie interwału #${ticks} (główny wątek wolny podczas dns.lookup)`);
}, 5);

log('SYNC', 'Start dns.lookup (thread pool)...');

dns.lookup('example.com', (err, address) => {
  clearInterval(interval);
  if (err) return log('THREADPOOL', `dns.lookup błąd: ${err.code}`);
  log('THREADPOOL', `dns.lookup zakończony -> ${address}`);
});
