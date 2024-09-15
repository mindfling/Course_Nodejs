# node-template-project

## Course_Nodejs

## Стартовый шаблон node.js by Leskin Quper24

- [Lesson05](https://github.com/mindfling/Course_Nodejs/tree/lesson05)

- [Lesson05 Task1](https://github.com/mindfling/Course_Nodejs/tree/lesson05task1)

- [Lesson05 Task2](https://github.com/mindfling/Course_Nodejs/tree/lesson05task2)

## Homework lesson05 task1

## Задание №1

> Напишите программу для копирования папки

> [!NOTE]
> Функция принимает 3 параметра:
>
> - `sourceDir` (строка) - путь к исходной директории, содержимое которой нужно скопировать.
> - `targetDir` (строка) - путь к целевой директории, в которую нужно скопировать содержимое исходной директории.
> - `callback` (функция) - функция обратного вызова, которая будет вызвана после завершения копирования.
> Коллбэк должен принимать один аргумент - ошибку (если есть), или `null`, если операция прошла успешно.

Важно:
> [!WARNING]
>
> - Необходимо использовать рекурсивные вызовы для обхода содержимого исходной директории.
> - Если в исходной директории обнаружена поддиректория, создайте соответствующую поддиректорию в целевой директории.
> - Если в исходной директории обнаружен файл, скопируйте его в целевую директорию

Совет
> [!NOTE]
>
> - Для проверки создайте директорию в которой будут пару папок внутри с разными типами и именами файлов
> - Обязательно проверьте копирование для файлов размером **5-10 Мегабайт**
