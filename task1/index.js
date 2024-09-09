import { EventEmitter } from "node:events";

// * just simple dummy procedure style
class EE extends EventEmitter {
}

const ee = new EE();


let count = 0;

const tickHandle = (x) => {
  console.log(` Tick - ${++count} <= ${x}`);

  if (count > 10) {
    clearInterval(tickTimer);
    ee.removeAllListeners('tick');
    console.log('timer stoped');
  }
}

ee.on('tick', tickHandle);


// * test ticks in 1000ms
const tickTimer = setInterval(() => {
  ee.emit('tick', count)
}, 1000);


// * emegency stop timer
setTimeout(() => {
  clearInterval(tickTimer);
}, 25000);
