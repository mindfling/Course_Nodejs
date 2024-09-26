# node-template-project

## Course_Nodejs

- ...
- [Lesson05](https://github.com/mindfling/Course_Nodejs/tree/lesson05)
  - [Lesson05Task1](https://github.com/mindfling/Course_Nodejs/tree/lesson05task1)
  - [Lesson05Task2](https://github.com/mindfling/Course_Nodejs/tree/lesson05task2)
- ...

## Стартовый шаблон node.js by Leskin Quper24

## Урок 5 Задание №2

Напишите `class Logger { }` для логирования

Создайте класс `Logger`, который будет расширять `EventEmitter`:

```js
  class Logger extends EventEmitter {
    // todo
  }
```

- `constructor(filename, maxSize)`: Конструктор класса, Принимает два аргумента:
  - `filename`: `string` - имя файла лога, в который будут записываться сообщения.
  - `maxSize`: `number` - максимальный размер файла лога в Байтах.

Логи записываются в начало и обрезаются с конца, когда файл превышает `maxSize`

```js
  if (fileSize > maxSize) {
    fs.trancate( )
  }
```

В конструктор инициализируем поля объекта:
  - имя файла `filename: string`
  - максимальный размер `maxSize: nubmer`
  - очередь логов `logQueue: Array<string>`
  - флаг записи `writing: boolean`
Определите методы:

> `log(message)`: добавляет сообщение в начало `logQueue` и вызывает метод `writeLog()`, если запись в файл в данный момент не выполняется, устанавливает флаг `writing` в значение `true`  **???**
>
> `writeLog()`: Записывает файл лога из массива `logQueue` и очищает его. Генерирует событие `messageLogged`. Вызывает метод проверки размера файла `checkFileSize()`.

Если в массиве `logQueue.length > 0` есть еще сообщения лога, рекурсивно вызывает метод `writeLog()`

Если в массиве `logQueue.length <= 0` больше нет сообщений лога, устанавливает флаг `writing` в значение `false`

> `getFileSize()`: с помощью `fs.stat` получает информацию о размере файла и возвращает его размер в Байтах.

Если возникает ошибка при получении информации о файле, возвращает `return 0`

> `checkFileSize()`: Если текущий размер файла превышает максимальный размер, вызывает метод `rotateLog()` для выполнения ротации лога.

> `rotateLog()`: Создает резервную копию файла с расширением `.bak` (копируя текущий log-файл), затем обрезает текущий log-файл с помощью метода `fs.truncate()` с конца


### Проверка работы

```js
const logger = new Logger('log.txt', 1024);

logger.on('messageLogged', message => {
  console.log('Записано сообщение:', message);
});

logger.log('Первое сообщение');
logger.log('Второе сообщение');
// ...
```
