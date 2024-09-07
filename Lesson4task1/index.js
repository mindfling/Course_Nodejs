import { EventEmitter } from 'node:events';

console.log('Hello Event Emmiter');


// settings
var count = 0;
const timeout = 500;
const tick = 'tick';
const MAX_TICK = 10;


// my event emmiter
class EE extends EventEmitter {}

const ee = new EE();

ee.once(tick, () => {
  count++;  
  console.log(` tick - ${count}`);
  if (count >= MAX_TICK) {
    ee.removeAllListeners(tick);
    clearInterval(tickTimer);
  }
});


// * test
const tickTimer = setInterval(() => {
  // emit 1 tick event every 1s
  ee.emit(tick);
}, timeout);
