import {EventEmitter} from 'node:events';


// * try module export class tickEmitter
export class tickEmitter extends EventEmitter {
  #timeout = 1000;
  #tickCount;
  #maxCount;

  constructor(maxCount = 10) {
    super();
    this.#timeout = 1000; // ms
    this.#tickCount = 0;
    this.#maxCount = maxCount;
  }


  get timeout() {
    return this.#timeout;
  }

  get tickCount() {
    return this.#tickCount;
  }

  get maxCount() {
    return this.#maxCount;
  }


  increaseCount() {
    this.#tickCount++;
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
    console.log('timer stoped');
  }
}

