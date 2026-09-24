'use strict';

// Pokazuje fazę "Pending callbacks" — mniej znaną fazę event loopa, która
// wykonuje callbacki niektórych błędów I/O odroczone z poprzedniej iteracji
// pętli (np. ECONNREFUSED przy próbie połączenia TCP na niesłuchający port).
//
// UWAGA: Node.js nie udostępnia z poziomu JS informacji "w jakiej fazie
// właśnie jesteśmy" — etykieta PENDING poniżej to nasza adnotacja dydaktyczna
// oparta na udokumentowanym zachowaniu libuv, a nie coś zmierzone w runtime.
// To dotyczy zresztą wszystkich etykiet faz w tym projekcie: logger loguje
// to, co MY wiemy że zaplanowaliśmy (setTimeout -> Timers, setImmediate ->
// Check, itd.), nie odczytuje stanu libuv.

const net = require('node:net');
const { log } = require('../lib/logger');

log('SYNC', 'Próba połączenia z portem, na którym nikt nie nasłuchuje...');

const socket = net.connect({ port: 9, host: '127.0.0.1' });

socket.on('error', (err) => {
  log('PENDING', `błąd połączenia odroczony do fazy Pending callbacks: ${err.code}`);
});
