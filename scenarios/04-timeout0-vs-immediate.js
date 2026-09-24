'use strict';

// Pokazuje różnicę między setTimeout(0) a setImmediate() w dwóch kontekstach:
//
// 1) Na top-levelu (poza callbackiem I/O) kolejność NIE jest gwarantowana —
//    zależy od tego, ile czasu zajęło uruchomienie procesu do momentu
//    wejścia w fazę Timers (może być różna między uruchomieniami).
// 2) Wewnątrz callbacku I/O (faza Poll) kolejność JEST gwarantowana —
//    setImmediate() zawsze wygrywa, bo faza Check jest zaraz po Poll,
//    a do fazy Timers event loop wróci dopiero w kolejnej iteracji.

const fs = require('node:fs');
const { log } = require('../lib/logger');

log('SYNC', '--- Kontekst 1: top-level (kolejność niedeterministyczna) ---');

setTimeout(() => log('TIMERS', 'setTimeout(0) na top-levelu'), 0);
setImmediate(() => log('CHECK', 'setImmediate na top-levelu'));

fs.readFile(__filename, () => {
  log('POLL', '--- Kontekst 2: wewnątrz callbacku I/O (kolejność deterministyczna) ---');

  setTimeout(() => log('TIMERS', 'setTimeout(0) wewnątrz I/O'), 0);
  setImmediate(() => log('CHECK', 'setImmediate wewnątrz I/O — zawsze pierwszy'));
});
