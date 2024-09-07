import { EventEmitter } from 'node:events';

console.log('Hello Event Emmiter');


// event emmiter

class MyEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.tickCount = 0
  }
  
  increase() {
    this.tickCount++;
  }
}

// instance of my event emmiter

const myEventEmmiter = new MyEventEmitter();

myEventEmmiter.addListener('tick', () => {
  console.log('listener tick', myEventEmmiter.tickCount);
  myEventEmmiter.increase();
  
  if (myEventEmmiter.tickCount > 10) {
    myEventEmmiter.removeAllListeners('tick');
    clearInterval(timerTick);
  }
});



// * test

// tick every 1 second
const timerTick = setInterval(() => {
  myEventEmmiter.emit('tick');
}, 1000)
