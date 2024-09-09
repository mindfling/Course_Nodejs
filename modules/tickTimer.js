import {EventEmitter} from 'node:events';


// * try module export class tickEmitter
export class tickEmitter extends EventEmitter {

  constructor(maxCount) {
    super();
    this.timeout = 1000; // ms
    this.tickCount = 0;
    this._maxCount = maxCount;
    console.log('maxCount: ', maxCount);
  }

  increaseCount() {
    this.tickCount++;
    console.log('increase tickCount: ', this.tickCount);
  }

  sayHello(name = '') {
    console.log(`Hello ${name}`);
  }


  startTimer() {
    this.tickTimer = setInterval(() => {
      this.increaseCount();
      this.emit('tick', this.tickCount);
    }, this.timeout)
  }

  stopTimer() {
    clearInterval(this.tickTimer);
  }
}

