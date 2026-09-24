'use strict';

// Demonstrates blocking the event loop: a synchronous loop that takes
// ~300ms keeps the main thread busy, so a setTimeout scheduled for 10ms
// only fires AFTER the synchronous work finishes — not on time. Node.js
// runs JS on a single thread: nothing can interrupt a running
// synchronous block, no matter how urgent a pending timer is.

const { log } = require('../lib/logger');

const BLOCK_MS = 300;
const TIMER_MS = 10;

log('SYNC', `Scheduling a setTimeout for ${TIMER_MS}ms...`);
setTimeout(() => {
  log('TIMERS', `setTimeout(${TIMER_MS}ms) callback finally ran — look how late it is vs the requested delay`);
}, TIMER_MS);

log('SYNC', `Now blocking the main thread synchronously for ~${BLOCK_MS}ms...`);
const blockUntil = Date.now() + BLOCK_MS;
while (Date.now() < blockUntil) {
  // deliberately hogging the main thread's CPU
}
log('SYNC', 'End of synchronous block — only now can the event loop check timers');
