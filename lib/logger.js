'use strict';

const start = process.hrtime.bigint();

const PHASE_WIDTH = 10;

function elapsedMs() {
  const diffNs = process.hrtime.bigint() - start;
  return Number(diffNs) / 1e6;
}

function log(phase, message) {
  const ms = elapsedMs().toFixed(2).padStart(8, ' ');
  const phaseLabel = `[${phase}]`.padEnd(PHASE_WIDTH + 2, ' ');
  console.log(`[+${ms}ms] ${phaseLabel} ${message}`);
}

module.exports = { log };
