'use strict';

// Pokazuje fazę "Close callbacks" — wykonuje się na samym końcu iteracji
// pętli, po zniszczeniu uchwytu (np. socketu). Dodatkowo pokazuje
// process.on('exit'), który odpala się dopiero gdy event loop nie ma
// już nic do zrobienia.

const net = require('node:net');
const { log } = require('../lib/logger');

process.on('exit', () => {
  log('EXIT', "process.on('exit') — ostatnia rzecz, jaka się wykona");
});

const server = net.createServer((socket) => {
  log('POLL', 'Serwer: klient połączony');
  socket.destroy();
});

server.listen(0, () => {
  const { port } = server.address();
  log('SYNC', `Serwer nasłuchuje na porcie ${port}, łączymy klienta...`);

  const client = net.connect(port, () => {
    log('POLL', 'Klient: połączono z serwerem');
  });

  client.on('close', () => {
    log('CLOSE', "socket.on('close') — faza Close callbacks");
    server.close();
  });
});
