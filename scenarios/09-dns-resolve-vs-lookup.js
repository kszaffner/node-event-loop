'use strict';

// dns.lookup() używa getaddrinfo z libc i idzie przez thread pool libuv
// (ten sam, którego używają fs/crypto/zlib — patrz scenariusze 10-13)
// — dlatego jest ograniczony rozmiarem puli (domyślnie 4 wątki) i
// konsultuje lokalny plik hosts.
//
// dns.resolve*() (tu: resolve4) NIE używa thread poola — idzie przez
// bibliotekę c-ares, która ma własny, asynchroniczny mechanizm oparty
// o gniazda sieciowe (podobnie jak sieć w scenariuszu 08), i NIE
// konsultuje pliku hosts (pyta bezpośrednio serwer DNS).
//
// Tej różnicy mechanizmu nie da się bezpośrednio zaobserwować z JS
// (patrz uwaga w scenariuszu 05) — to udokumentowane zachowanie z
// dokumentacji Node.js, nie coś zmierzone tutaj w runtime. Wymaga
// dostępu do sieci.

const dns = require('node:dns');
const { log } = require('../lib/logger');

const HOST = 'example.com';

log('SYNC', `Odpytujemy ${HOST}: dns.lookup() (thread pool) i dns.resolve4() (c-ares, bez thread poola)`);

dns.lookup(HOST, (err, address) => {
  if (err) return log('THREADPOOL', `dns.lookup błąd: ${err.code}`);
  log('THREADPOOL', `dns.lookup(${HOST}) -> ${address}`);
});

dns.resolve4(HOST, (err, addresses) => {
  if (err) return log('OS-IO', `dns.resolve4 błąd: ${err.code}`);
  log('OS-IO', `dns.resolve4(${HOST}) -> ${addresses.join(', ')}`);
});
