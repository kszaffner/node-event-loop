'use strict';

// Dowód, że fs.readFile() wykonuje faktyczną pracę na WĄTKU z thread poola,
// a nie na głównym wątku JS: startujemy odczyt pliku, a zaraz potem
// blokujemy główny wątek pętlą synchroniczną na ~200ms. Jeśli odczyt
// pliku zdąży się zakończyć W TLE podczas blokady (co przy małym pliku
// jest niemal pewne), to jego callback wykona się niemal NATYCHMIAST
// po zakończeniu pętli — a nie 200ms+czas_odczytu później. To pokazuje,
// że odczyt działał współbieżnie z blokującym kodem JS, czyli na
// osobnym wątku z puli.

const fs = require('node:fs');
const { log } = require('../lib/logger');

const BLOCK_MS = 200;

log('SYNC', 'Start fs.readFile (praca leci w tle na wątku z thread poola)');

fs.readFile(__filename, () => {
  log('THREADPOOL', 'Callback fs.readFile — czas bliski końcowi blokady => odczyt działał w tle');
});

log('SYNC', `Blokujemy główny wątek na ${BLOCK_MS}ms synchroniczną pętlą...`);
const blockUntil = Date.now() + BLOCK_MS;
while (Date.now() < blockUntil) {
  // celowe zajęcie CPU na głównym wątku
}
log('SYNC', 'Koniec blokady głównego wątku');
