'use strict';

// NAJWAŻNIEJSZY scenariusz sekcji D: pokazuje, że fs, crypto, zlib i
// dns.lookup dzielą JEDNĄ, wspólną pulę wątków (domyślnie 4 — zmienna
// środowiskowa UV_THREADPOOL_SIZE). Wypełniamy całą pulę czterema
// długimi operacjami crypto.pbkdf2, a następnie zlecamy PIĄTĄ operację
// z tej samej puli (fs.readFile) — mimo że sam odczyt pliku jest
// błyskawiczny, musi poczekać w kolejce aż zwolni się jakiś wątek.
//
// Porównaj z uruchomieniem: UV_THREADPOOL_SIZE=8 node scenarios/14-threadpool-shared-pool-saturation.js
// — przy większej puli fs.readFile NIE czeka w kolejce.

const fs = require('node:fs');
const crypto = require('node:crypto');
const { log } = require('../lib/logger');

const ITERATIONS = 300000;
const POOL_JOBS = 4; // domyślny rozmiar thread poola

log('SYNC', `Wypełniamy pulę ${POOL_JOBS} długimi zadaniami crypto.pbkdf2...`);

for (let i = 1; i <= POOL_JOBS; i += 1) {
  crypto.pbkdf2('haslo', `sol-${i}`, ITERATIONS, 64, 'sha512', () => {
    log('THREADPOOL', `pbkdf2 #${i} (wypełnia pulę) zakończone`);
  });
}

log('SYNC', 'Dodatkowo zlecamy szybki fs.readFile — powinien czekać w kolejce na wolny wątek');

fs.readFile(__filename, () => {
  log('THREADPOOL', 'fs.readFile zakończony — porównaj czas z pbkdf2, mimo że sam odczyt jest błyskawiczny');
});
