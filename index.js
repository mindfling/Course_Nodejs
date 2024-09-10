import { User } from "./modules/messages.js";
import { tickEmitter } from "./modules/tickTimer.js";


const emitter = new tickEmitter(30);
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
}, 600000);




const dim = new User('Дим');
const ben = new User('Ben');
const kola = new User('Николай');


dim.on('msg', dim.receiveMessage)
ben.on('msg', dim.receiveMessage)
kola.on('msg', dim.receiveMessage)


dim.sendMessage('Привет');
dim.sendMessage('Как дела?');

setTimeout(() => {
  ben.sendMessage('Hello, everything ok');
}, 5000);

setTimeout(() => {
    kola.sendMessage('Привет, у нас тоже все путем');
}, 1000);

setTimeout(() => {
    dim.sendMessage('ОТлично РАд ВСех слышать');
}, 2000);

