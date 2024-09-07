import { EventEmitter } from 'node:events';

console.log('Hello Event Emmiter');


// settings
var count = 0;
const timeout = 100;
const tick = 'tick';
const MAX_TICK = 10;

const begin = Date.now(); // начало отсчета
const countTime = () => (Date.now() - begin);

// my event emmiter
class EE extends EventEmitter {}

const ee = new EE();


ee.on(tick, () => {
  count++;  
  console.log(` Tick - ${count} <- ${countTime()}`);
  if (count >= MAX_TICK) {
    ee.removeAllListeners(tick);
    clearInterval(tickTimer);
    ee.emit('end', countTime())
  }
});

ee.on('end', (m = '') => {
  console.log(`The end of Day: ${m}`);
})


// * test
const tickTimer = setInterval(() => {
  // emit 1 tick event every 1s
  ee.emit(tick);
}, timeout);
