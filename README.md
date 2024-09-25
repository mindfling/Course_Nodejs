# node-template-project

## Course_Nodejs

## Стартовый шаблон node.js by Leskin Quper24

- [Lesson05](https://github.com/mindfling/Course_Nodejs/tree/lesson05)
- [Lesson05 Task1](https://github.com/mindfling/Course_Nodejs/tree/lesson05task1)
- [Lesson05 Task2](https://github.com/mindfling/Course_Nodejs/tree/lesson05task2)

## Урок 5 Задание №2

Напишите `class Logger { }` для логирования

Создайте класс `Logger`, который будет расширять `EventEmitter`.

`constructor(filename, maxSize)`: Конструктор класса, Принимает два аргумента:
`filename` (`строка`) - имя файла лога, в который будут записываться сообщения.
`maxSize` (`число`) - максимальный размер файла лога в Байтах.

Логи записываются в начало и обрезаются с конца, когда файл превышает `maxSize`.

В конструктор инициализируем поля объекта:

имя файла (`filename`)
максимальный размер (`maxSize`)
очередь логов (`logQueue` - `array`)
флаг записи (`writing` - `boolean`)

Определите методы:

`log(message)`: добавляет сообщение в начало `logQueue` и вызывает метод `writeLog()`, если запись в файл в данный момент не выполняется, устанавливает флаг `writing` в значение `true`.

`writeLog()`: Записывает файл лога из массива `logQueue` и очищает его. Генерирует событие `messageLogged`. Вызывает метод проверки размера файла `checkFileSize()`.

Если в массиве `logQueue` есть еще сообщения лога, рекурсивно вызывает метод `writeLog()`.

Если в массиве `logQueue` больше нет сообщений лога, устанавливает флаг `writing` в значение `false`.
`getFileSize()`: с помощью `fs.stat` получает информацию о размере файла и возвращает его размер в Байтах. Если возникает ошибка при получении информации о файле, возвращает `0`.

`checkFileSize()`: Если текущий размер файла превышает максимальный размер, вызывает метод `rotateLog()` для выполнения ротации лога.

`rotateLog()`: Создает резервную копию файла с расширением `.bak` (копируя текущий log-файл), затем обрезает текущий log-файл с помощью метода `fs.truncate()` с конца

Проверка работы

```js
const logger = new Logger('log.txt', 1024);

logger.on('messageLogged', message => {

  console.log('Записано сообщение:', message);

});

logger.log('Первое сообщение');

logger.log('Второе сообщение');
```
