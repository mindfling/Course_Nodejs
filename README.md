# node-template-project

## Стартовый шаблон node.js by Leskin Quper24

initial node template for `Lesson06`:

- [Lesson06](https://github.com/mindfling/Course_Nodejs/tree/lesson05)
  - [Lesson06 Task1](https://github.com/mindfling/Course_Nodejs/tree/lesson06task1)
  - [Lesson06 Task2](https://github.com/mindfling/Course_Nodejs/tree/lesson06task2)
  - [Lesson06 Task3](https://github.com/mindfling/Course_Nodejs/tree/lesson06task3)

### Задание #2

Напишите функцию для чтения каталога, поиска всех текстовых файлов с расширением `.txt` и объединения их в один файл с использованием `streams`.

Функция должна принимать два параметра путь до каталога и название выходного файла
Создайте `Writable` поток для записи данных в файл
Файл располагается рядом с каталогом *(не внутри)*
Функция должна прочитать каталог и найти все файлы с расширением `txt`
Для каждого найденного текстового файла с расширением `.txt`.
Добавьте `Readable` поток и подключите его к `Writeble` потоку, чтобы данные последовательно записывались в выходной файл.
Перед данными каждого текстового файла должно быть название этого файла в квадратных скобках

#### пример:

```text
3 txt файла
test/test1.txt (Привет мир!)
test/test2.txt (Hello world!)
test/qqq.txt (Stream Ready Steady Go)
```

#### Файл который будет создан

```txt
[test1]
Привет мир!
[test2]
Hello world!
[qqq]
Stream Ready Steady Go
```
