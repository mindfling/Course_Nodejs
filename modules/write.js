import fs from 'node:fs/promises';

// Запись данных в файл на промисах
// todo возможно нужно проверять пути path
export const write = async (path, data) => {
  try {
    console.log(`Данные: ${data}`);
    await fs.writeFile(path, data);
    console.log(`записали в файл "${path}"`);
    return true;
  } catch (err) {
    console.error(`Ошибка записи в файл "${path}" : ${err.message}`);
  }
};



// Читает данные из json файла
// декодирует парсит и возвращает готовый json объект
export const writeJsonData = async (path, data) => {
  // return await read(path) // читаем файл в буфер
  //   .then(buff => buff.toString('utf8')) // перекодируем буфер в строку
  //   .then(text => JSON.parse(text)) // парсим текстовую строку в json
  //   .then(json => {
  //     console.log(`Файл "${path}" успешно прочитан и распарсин`);
  //     return json; // возвращаем объект json
  //   })
  //   .catch(err => {
  //     console.error(`При чтении произошла файла "${path} Ошибка" : ${err.message}`);
  //   });
  await writeTasks(path, data);
};



const writeTasks = async (path, json) => {
  const text = JSON.stringify(json);
  await write(path, text);
}
