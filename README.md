# node-template-project

## Стартовый шаблон node.js by Leskin Quper24

initial node template for Lesson06:

- [Lesson06](https://github.com/mindfling/Course_Nodejs/tree/lesson05)
- [Lesson06 Task1](https://github.com/mindfling/Course_Nodejs/tree/lesson06task1)
- [Lesson06 Task2](https://github.com/mindfling/Course_Nodejs/tree/lesson06task2)
- [Lesson06 Task3](https://github.com/mindfling/Course_Nodejs/tree/lesson06task3)

### Задание #3 (Усложненное - необязательное)

#### `resizeImage(in, out)`

Напишите функцию для обработки изображений `resizeImage(inputPath, outputPath)`

Функция будет принимать путь к изображению в формате `JPEG` и выполнять следующие операции:

Загружать изображение с указанного пути.

Изменять его размер `(400px x 400px)`

Сохранять преобразованное изображение на диск.

Для выполнения задачи установите плагин `sharp(link)`, импортируйте его

`sharp` использует `stream` поэтому вы можете использовать `process`

Для изменения размера используйте метод `resizesharp().resize(400, 400).toFormat('jpeg')`

#### `grayscaleBlurImage(in, out)`

Для практики работы с `sharp` дополнительно создайте вторую функцию, которая будет преобразовывать изображение в оттенки серого и применять эффект размытия `greyBlurImage(inputPath, outputPath)`
