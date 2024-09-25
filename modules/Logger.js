import { EventEmitter } from "node:events";
import fs from "node:fs";

// todo Logger class
console.log('hello logger');


export class Logger extends EventEmitter {

  constructor(filename, maxSize) {
    super();
    this._filename = filename; // имя файла лога
    this._maxSize = maxSize;  //  максимальный размер файла лога
    this._logQueue = [];  // масс очередь сообщений
    this._writing = false; // в данный момент isWriting

    this.on('messageLogged', () => {
      // todo
      this.log()
      this.writingLog()
      this.rotateLog()
      this.checkFileSize()
      fs.truncate(this._filename)
    })
  }

  log(message) { // отправляет сообщение
    this._logQueue.shift(message); // добавляем сообщение в очередь в начало
    writingLog(); 
    this._writing = true;
    // todo
    this.emit('messageLogged');
    this.checkFileSize()
  }

  writingLog() { // запис сообщение в файл лог
    // todo
    const nextMessage = this._logQueue.pull(); // достаем сообщение из очереди

    if (this._logQueue.length > 0) {
      this.writingLog();
    }
  }

  getFileSize() { // получить текущий размер файла лога в Байтах
    // todo
    const filestat = fs.stat(this._filename);
    const filesize = filestat.size();
    return filesize;
  }

  checkFileSize() { // проверка крайнего размера файла лога
    // todo
    const currentFileSize = this.getFileSize();
    if (currentFileSize > this._maxSize) {
      
    }
  }

  rotateLog() {
    // todo
  }
}


