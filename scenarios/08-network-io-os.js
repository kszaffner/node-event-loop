'use strict';

// Pokazuje, że I/O sieciowe (TCP) NIE korzysta z thread poola libuv —
// jest obsługiwane bezpośrednio przez mechanizmy systemu operacyjnego
// (epoll/kqueue/IOCP), które skalują się do tysięcy jednoczesnych
// połączeń, a nie tylko do rozmiaru puli wątków (domyślnie 4).
// Odpalamy 8 równoległych połączeń do lokalnego serwera i pokazujemy,
// że wszystkie kończą się mniej więcej w tym samym czasie — bez efektu
// kolejkowania, jaki zobaczymy w scenariuszu 14 dla operacji na thread poolu.

const net = require('node:net');
const { log } = require('../lib/logger');

const CONNECTIONS = 8;

const server = net.createServer((socket) => {
  socket.end('ok');
});

server.listen(0, () => {
  const { port } = server.address();
  log('SYNC', `Serwer nasłuchuje na porcie ${port}, otwieramy ${CONNECTIONS} połączeń naraz`);

  let done = 0;
  for (let i = 1; i <= CONNECTIONS; i += 1) {
    const client = net.connect(port);
    client.on('data', () => {
      log('POLL', `Połączenie #${i} zakończone (OS async I/O, nie thread pool)`);
      done += 1;
      if (done === CONNECTIONS) {
        server.close();
      }
    });
  }
});
