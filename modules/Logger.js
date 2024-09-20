import { EventEmitter } from "node:events";

// todo Logger class
console.log('hello logger');


export class Logger extends EventEmitter {

  constructor(filename, maxSize) {
    this._filename = filename;
    this._maxSize = maxSize;

    this._logQueue = [];
    this._writing = false;
  }

  log(message) {
    this._logQueue.push(message);
    writingLog();
  }

  writingLog() {
    // todo
  }

  getFileSize() {
    // todo
  }

  checkFileSize() {
    // todo
  }

  rotateLog() {
    // todo
  }
}


