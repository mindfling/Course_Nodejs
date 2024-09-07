import { EventEmitter } from 'node:events';

console.log('Hello Event Emmiter');


// event emmiter

class MyEventEmitter extends EventEmitter {
  
}

// instance of my event emmiter

const myEventEmmiter = new MyEventEmitter();

myEventEmmiter.addListener('tick', () => {
  console.log('listener tick');
});



// * test

// tick every 1 second
setInterval(() => {
  myEventEmmiter.emit('tick');
}, 1000)
