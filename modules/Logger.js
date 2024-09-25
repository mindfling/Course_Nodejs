import { EventEmitter } from 'node:events';
import fs from 'node:fs';

// todo Logger class
console.log('hello logger');

export class Logger extends EventEmitter {
  constructor(filename, maxSize) {
    super();

    this._filename = filename; // имя файла лога
    this._maxSize = maxSize; //  максимальный размер файла лога

    this._logQueue = []; // масс очередь сообщений
    this._writing = false; // в данный момент not isWriting

    this._currentFileSize = 0;
  }

  log(message) {
    // отправляет сообщение
    console.log('log message: ', message);
    this._logQueue.push(message); // добавляем сообщение в очередь сверху
    // writingLog();
    this._writing = true;
    // this.emit('messageLogged');
    // this.checkFileSize()

    // читаем файл и добавляем
    fs.readFile(this._filename, { encoding: 'utf-8' }, (readerr, result) => {
      //читаем
      if (readerr) {
        console.log(`Ошибка чтения файла read file error ${this._filename}`);
        return;
      }
      console.log('файл прочитан из', this._filename);
      console.log('result: ', result);

      // дозаписываем в файл
      fs.writeFile(this._filename, result + '\n' + message, err => {
        // перезапись всего файла
        if (err) {
          console.log(`Ошибка записи в файл: ${this._filename}`);

        } else {
          console.log(`Сообщение записано в файл: ${this._filename}`);
        }

        fs.stat(this._filename, ( err, stats ) => {
          if (err) console.log(`Ошибка чтени stat файла`);

          console.log('stat: ', stats.size, 'Байт');
          this._currentFileSize = stats.size;
        });


      });
    });
  }

  /*
  writingLog() { // запис сообщение в файл лог
    // todo
    const nextMessage = this._logQueue.shift(); // достаем сообщение из очереди снизу

    if (this._logQueue.length > 0) { // если в очереди еще есть задания
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
  */
}
