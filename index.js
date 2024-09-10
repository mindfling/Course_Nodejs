import { tickEmitter } from "./modules/tickTimer.js";


const emitter = new tickEmitter(11);
emitter.sayHello('Timer')


const tickHandle = (count) => {
  console.log(` Tick - ${count}`);

  if (count > emitter.maxCount) {
    emitter.removeAllListeners('tick');
    emitter.stopTimer()

    clearTimeout(emegencyTimer)
  }
}

emitter.on('tick', tickHandle);

// * test timer
emitter.startTimer();


// * emegency stop timer
const emegencyTimer = setTimeout(() => {
  emitter.stopTimer();
}, 25000);
