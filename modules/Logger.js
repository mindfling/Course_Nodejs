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
    
    this._writing = true;
    
    

    // читаем файл и добавляем callback api
    fs.readFile(this._filename, { encoding: 'utf-8' }, (readerr, result) => {
      //читаем
      if (readerr) {
        console.log(`Ошибка чтения файла read file error ${this._filename}`);
        return;
      }
      console.log('файл прочитан из', this._filename);
      console.log('result: ', result);

      // дозаписываем в файл callback api
      fs.writeFile(this._filename, (result + '\n' + message), err => {
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

  // todo

}
