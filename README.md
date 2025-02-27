# Course_Nodejs

## Lesson08 Lets make CLI node js Application

## Homework lesson08

Ans: <https://github.com/mindfling/Course_Nodejs/tree/lesson08>

for **Workout 8**

пишем CLI приложение генератор паролей практика [здесь](https://github.com/mindfling/Course_Nodejs/blob/lesson08/cli.js)

Полезные ссылки:
> [!TIP]
>
> - посмотреть в уроке 8

### To-Do CLI

> Домашнее Задание

> [!NOTE]
>
> - Напишите CLI-приложение для управления задачами **To-Do List**
> - Приложение должно позволять пользователю создавать, просматривать, обновлять  и удалять задачи.

Требования:
> [!IMPORTANT]
>
> Приложение должно быть запускаемым из командной строки и принимать команды от пользователя.

Приложение должно поддерживать следующие команды:

> [!IMPORTANT]
>
> - `add <task>`: добавить новую задачу
> - `list`: вывести список всех задач
> - `get <id>`: вывести информацию о задаче с указанным идентификаторо
> - `update <id> <newTask>`: обновить задачу с указанным идентификатором
> - `status <id> <newStatus>`: обновить статус задачи с указанным идентификатором
> - `delete <id>`: удалить задачу с указанным идентификатором
>
>> Задачи должны сохраняться в файле (лучше `.json`), чтобы они могли быть доступными между разными запусками приложения.
>
>> Приложение должно использовать модульную структуру для разделения функциональности, например, модули для работы с задачами, обработки команд и взаимодействия с файловой системой
>


<!-- image -->
![Tux, how to use To-Do CLI](https://github.com/mindfling/Course_Nodejs_Workout/blob/lesson_eight/img/taskscreen.jpg)

Ans: <https://github.com/mindfling/Course_Nodejs/tree/lesson08>

> [!TIP]
>
> How to us [MarkDown syntax](https://www.markdownguide.org/basic-syntax/)
>
> <https://www.markdownguide.org/basic-syntax/>

```bash
#!/usr/bin/env node
```

```bash
chmod +x index.js
```

using bash:

```sh
node cli --help
```

```sh
node cli -h --help
node cli -a --ask
node cli --length=12 -l 12
node cli --uppercase --upper -u
node cli --numbers --number -n
node cli --specials --special --spec -s
```

## colorized console.log()

```js
Reset = "\x1b[0m"

Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"   BgBlack = "\x1b[40m"
FgRed = "\x1b[31m"     BgRed = "\x1b[41m"
FgGreen = "\x1b[32m"   BgGreen = "\x1b[42m"
FgYellow = "\x1b[33m"  BgYellow = "\x1b[43m"
FgBlue = "\x1b[34m"    BgBlue = "\x1b[44m"
FgMagenta = "\x1b[35m" BgMagenta = "\x1b[45m"
FgCyan = "\x1b[36m"    BgCyan = "\x1b[46m"
FgWhite = "\x1b[37m"   BgWhite = "\x1b[47m"
FgGray = "\x1b[90m"    BgGray = "\x1b[100m"
```

[how-to-change-node-jss-console-font-color](https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color)

// instead of this you may use colorize or chalk or other libs
