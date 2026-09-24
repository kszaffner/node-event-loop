'use strict';

// Shows the "Pending callbacks" phase — a lesser-known event loop phase
// that runs callbacks for certain I/O errors deferred from the previous
// loop iteration (e.g. ECONNREFUSED when trying to open a TCP connection
// to a port nobody is listening on).
//
// NOTE: Node.js does not expose "which phase are we in right now" to JS.
// The PENDING label below is our own didactic annotation based on
// documented libuv behavior, not something measured at runtime. This
// applies to every phase label in this project: the logger logs what WE
// know we scheduled (setTimeout -> Timers, setImmediate -> Check, etc.),
// it does not read libuv's internal state.

const net = require('node:net');
const { log } = require('../lib/logger');

log('SYNC', 'Trying to connect to a port nobody is listening on...');

const socket = net.connect({ port: 9, host: '127.0.0.1' });

socket.on('error', (err) => {
  log('PENDING', `connection error deferred to the Pending callbacks phase: ${err.code}`);
});
