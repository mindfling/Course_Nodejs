import EventEmitter from 'node:events';
import fs from 'node:fs';


export class Logger extends EventEmitter {

  constructor(filename, maxSize = 1024) {
    // проверка адреса todo
    super();
    this._filename = filename; // имя файла лога
    this._maxSize = maxSize; //  максимальный размер файла лога
    this._logQueue = []; // масс очередь сообщений
    this._writing = false; // в данный момент not isWriting
    // this._currentFileSize = 0;
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
      const message = this._logQueue.shift(); // забираем из начала очереди

      console.log('сначала прочитаем из файла', this._filename);
      let data = '';
      
      try {
        data = fs.readFileSync(this._filename, {encoding: 'utf8'});
      } catch (error) {
        console.log('файл не существует');
      }

      // запишем в файл в начало
      fs.writeFileSync(this._filename, `${message}\n${data}`);

      this.emit('messageLogged', message); // генерируем событие сообщения
    }

    if (this._logQueue <= 0) {
      this._writing = false;
      console.log("сообщений нет");
    }

    this.checkFileSize();
  }


  getFileSize() {
    const stats = fs.statSync(this._filename);
    const fileSize = stats.size; // размер в байтах
    return fileSize;
  }


  checkFileSize() {
    const currentFileSize = this.getFileSize();
    console.log('currentFileSize: ', currentFileSize, 'Bytes');

    if (currentFileSize > 1124) {
      fs.truncateSync(this._filename, 1024);
      console.log('файл транкейтер');
    }
  }


  rotateLog() {
    // create log.bak
  }

}