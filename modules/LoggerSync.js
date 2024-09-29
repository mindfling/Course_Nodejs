import EventEmitter from 'node:events';
import fs from 'node:fs';


export class Logger extends EventEmitter {

  constructor(filename, maxSize = 1024) {
    // проверка адреса todo
    super();
    this._filename = filename; // имя файла лога
    this._maxSize = maxSize; //  максимальный размер файла лога
    this._logQueue = ['Привет', 'как дела', 'Все ок']; // масс очередь сообщений
    this._writing = false; // в данный момент not isWriting
    this._currentFileSize = 0;
  }


  log(message) {
    // проверка на строку
    this._logQueue.push(message); // пушим сообщение в очередь
    console.log('this is log');

    if (!this._writing) {
      this._writing = true;
      this.writeLog(); //?
    }
  }


  writeLog() {
    console.log('Запись в лог');

    while (this._logQueue.length > 0) {
      const message = this._logQueue.shift();

      console.log('сначала прочитаем из файла', this._filename);
      let data = fs.readFileSync(this._filename, {encoding: 'utf8'});

      console.log('запишем в файл в начало', this._filename);
      fs.writeFileSync(this._filename, `${message}\n${data}`);

      this.emit('messageLogged', message);
    }

    if (this._logQueue <= 0) {
      this._writing = false;
      console.log("сообщений нет");
    }
  }

}