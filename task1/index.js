import { EventEmitter } from "node:events";

// * just simple dummy procedure paradigme
class EE extends EventEmitter {
}

const ee = new EE();

// settings
const timeout = 1000;
const MAX_TICK = 10;
let count = 0;

const tickHandle = () => {
  ++count;
  console.log(` Tick - ${count}`);
  if (count > MAX_TICK) {
    clearInterval(tickTimer);
    ee.removeAllListeners('tick');
  }
}

ee.on('tick', tickHandle);


// * test ticks in 1000ms
const tickTimer = setInterval(() => {
  ee.emit('tick', count)
}, timeout);


// * emegency stop timer
setTimeout(() => {
  clearInterval(tickTimer);
}, 20000);
