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
const ola = new User('Оля');

// todo in constructor
// dim.on('msg', dim.receiveMessage)
// ben.on('msg', dim.receiveMessage)
// kola.on('msg', dim.receiveMessage)

setTimeout(() => {
  dim.sendMessage('Как дела?');
}, 0);

setTimeout(() => {
  ola.sendMessage('Всем приветы :)');
})

dim.sendMessage('Привет');

setTimeout(() => {
  ben.sendMessage('Hello, everything ok');
  ola.sendMessage('Когда на природу?')
}, 5000);

setTimeout(() => {
    kola.sendMessage('Привет, у нас тоже все путем');
    new User("Валя").sendMessage('Главное рюкзачки на природу взять с едой :-р')
}, 3500);

setTimeout(() => {
    dim.sendMessage('отлично рад всех слышать');
}, 7700);

setTimeout(() => {
    kola.sendMessage('Тогда на природу числа 25го как договаривались');
}, 9700);


dim.generateMessage('\nТогда кто идет все плюсики в чат\n')
dim.generateMessage('+')
ola.generateMessage('++')
ben.generateMessage('+')
kola.generateMessage('+++')
