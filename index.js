import { tickEmitter } from "./modules/tickTimer.js";


const emitter = new tickEmitter(5);
emitter.sayHello('Timer')

let c = 0;

const tickHandle = (count) => {
  console.log(` Tick - ${++c} - ${count}`);

  if (count > emitter._maxCount) {
    clearInterval(emitter.tickTimer);
    console.log('timer stoped');
    emitter.removeAllListeners('tick');
    console.log('all listeners removed');
  }
}

emitter.on('tick', tickHandle);


// * test timer
emitter.startTimer();


// * emegency stop timer
setTimeout(() => {
  emitter.stopTimer();
}, 25000);
