'use strict';

// Shows the Poll phase — the event loop waits for an I/O operation to
// finish (here: reading a file) and runs its callback in that phase.
// Also shows that synchronous code always finishes running BEFORE the
// event loop is entered, regardless of the fact that fs.readFile was
// called earlier in the code.

const fs = require('node:fs');
const { log } = require('../lib/logger');

log('SYNC', 'Starting file read (fs.readFile — asynchronous operation)');

fs.readFile(__filename, 'utf8', (err, data) => {
  if (err) throw err;
  log('POLL', `File read, callback ran in the Poll phase (${data.length} chars)`);
});

log('SYNC', 'This runs before the file read, even though fs.readFile came earlier in the code');
