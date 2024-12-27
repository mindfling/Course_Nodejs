import { readFile } from 'node:fs/promises';

// Чтение данных из файла
// Возвращает сырой буффер данных
// todo path check
export const read = async path => {
  try {
    const data = await readFile(path);
    console.log(`Файл "${path}" успешно прочитан`);
    return data;
  } catch (err) {
    console.error(`Ошибка чтения файла "${path}" : ${err.message}`);
  }
};


// Читает данные из json файла
// декодирует парсит и возвращает готовый json объект
export const readJsonData = async (path) => {
  return await read(path) // читаем файл в буфер
    .then(buff => buff.toString('utf8')) // перекодируем буфер в строку
    .then(text => JSON.parse(text)) // парсим текстовую строку в json
    .then(json => {
      console.log(`Файл "${path}" успешно прочитан и распарсин`);
      return json; // возвращаем объект json
    })
    .catch(err => {
      console.error(`При чтении и парсинге произошла Ошибка" : ${err.message}`);
    });
};
