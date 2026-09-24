'use strict';

// Pokazuje, że kolejka process.nextTick jest zawsze w pełni opróżniana
// PRZED kolejką mikrozadań Promise — to dwie osobne kolejki, nie jedna.
//
// Oczekiwana kolejność: NEXTTICK #1, NEXTTICK #2, MICROTASK #1, MICROTASK #2
// (a nie na przemian, mimo że dodajemy je na przemian w kodzie).

const { log } = require('../lib/logger');

process.nextTick(() => log('NEXTTICK', '#1'));
Promise.resolve().then(() => log('MICROTASK', '#1'));
process.nextTick(() => log('NEXTTICK', '#2'));
Promise.resolve().then(() => log('MICROTASK', '#2'));
