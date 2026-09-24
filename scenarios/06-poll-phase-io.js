'use strict';

// Pokazuje fazę Poll — event loop czeka na zakończenie operacji I/O
// (tu: odczyt pliku) i wykonuje jej callback w tej właśnie fazie.
// Dodatkowo pokazuje, że kod synchroniczny i tak wykona się cały
// PRZED wejściem w event loop, niezależnie od tego, że fs.readFile
// zostało wywołane wcześniej w kodzie.

const fs = require('node:fs');
const { log } = require('../lib/logger');

log('SYNC', 'Start odczytu pliku (fs.readFile — operacja asynchroniczna)');

fs.readFile(__filename, 'utf8', (err, data) => {
  if (err) throw err;
  log('POLL', `Plik odczytany, callback wykonany w fazie Poll (${data.length} znaków)`);
});

log('SYNC', 'To wykona się przed odczytem pliku, mimo że fs.readFile było wcześniej w kodzie');
