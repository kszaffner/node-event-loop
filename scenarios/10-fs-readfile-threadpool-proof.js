'use strict';

// Proof that fs.readFile() does its actual work on a thread pool THREAD,
// not on the main JS thread: we start a file read, then immediately
// block the main thread with a synchronous loop for ~200ms. If the file
// read manages to finish in the background during the block (which,
// for a small file, is almost certain), its callback will run almost
// IMMEDIATELY after the loop ends — not 200ms+read_time later. This
// shows the read ran concurrently with the blocking JS code, i.e. on a
// separate thread.

const fs = require('node:fs');
const { log } = require('../lib/logger');

const BLOCK_MS = 200;

log('SYNC', 'Starting fs.readFile (work runs in the background on a thread pool thread)');

fs.readFile(__filename, () => {
  log('THREADPOOL', 'fs.readFile callback — time close to the end of the block => the read ran in the background');
});

log('SYNC', `Blocking the main thread for ${BLOCK_MS}ms with a synchronous loop...`);
const blockUntil = Date.now() + BLOCK_MS;
while (Date.now() < blockUntil) {
  // deliberately hogging the main thread's CPU
}
log('SYNC', 'End of main thread block');
