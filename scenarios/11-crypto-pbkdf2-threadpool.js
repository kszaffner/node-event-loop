'use strict';

// crypto.pbkdf2 (async) to operacja CPU-bound wykonywana na thread poolu.
// Żeby to pokazać, w trakcie liczenia hasha tykamy setIntervalem co 20ms —
// jeśli tyknięcia pojawiają się regularnie PODCZAS liczenia, to znaczy że
// główny wątek jest wolny, a ciężka praca leci na wątku z puli.
//
// Dla porównania spróbuj podmienić na crypto.pbkdf2Sync — wtedy tyknięcia
// interwału w ogóle się nie pojawią, dopóki liczenie się nie skończy,
// bo pbkdf2Sync blokuje główny wątek całkowicie.

const crypto = require('node:crypto');
const { log } = require('../lib/logger');

const ITERATIONS = 300000;

let ticks = 0;
const interval = setInterval(() => {
  ticks += 1;
  log('SYNC', `tyknięcie interwału #${ticks} (główny wątek wolny mimo trwającego pbkdf2)`);
}, 20);

log('SYNC', 'Start crypto.pbkdf2 (async, thread pool)...');

crypto.pbkdf2('haslo', 'sol', ITERATIONS, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  clearInterval(interval);
  log('THREADPOOL', `crypto.pbkdf2 zakończone, klucz: ${derivedKey.toString('hex').slice(0, 16)}...`);
});
