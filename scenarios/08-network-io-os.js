'use strict';

// Shows that network I/O (TCP) does NOT use libuv's thread pool — it's
// handled directly by OS mechanisms (epoll/kqueue/IOCP), which scale to
// thousands of concurrent connections instead of being limited to the
// thread pool size (default 4). We open 8 parallel connections to a
// local server and show that they all finish at roughly the same time —
// no queueing effect like the one we'll see in scenario 14 for thread
// pool operations.

const net = require('node:net');
const { log } = require('../lib/logger');

const CONNECTIONS = 8;

const server = net.createServer((socket) => {
  socket.end('ok');
});

server.listen(0, () => {
  const { port } = server.address();
  log('SYNC', `Server listening on port ${port}, opening ${CONNECTIONS} connections at once`);

  let done = 0;
  for (let i = 1; i <= CONNECTIONS; i += 1) {
    const client = net.connect(port);
    client.on('data', () => {
      log('POLL', `Connection #${i} finished (OS async I/O, not thread pool)`);
      done += 1;
      if (done === CONNECTIONS) {
        server.close();
      }
    });
  }
});
