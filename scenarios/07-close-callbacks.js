'use strict';

// Shows the "Close callbacks" phase — runs at the very end of a loop
// iteration, after a handle (e.g. a socket) is destroyed. Also shows
// process.on('exit'), which fires only once the event loop has nothing
// left to do.

const net = require('node:net');
const { log } = require('../lib/logger');

process.on('exit', () => {
  log('EXIT', "process.on('exit') — the very last thing that runs");
});

const server = net.createServer((socket) => {
  log('POLL', 'Server: client connected');
  socket.destroy();
});

server.listen(0, () => {
  const { port } = server.address();
  log('SYNC', `Server listening on port ${port}, connecting a client...`);

  const client = net.connect(port, () => {
    log('POLL', 'Client: connected to server');
  });

  client.on('close', () => {
    log('CLOSE', "socket.on('close') — Close callbacks phase");
    server.close();
  });
});
