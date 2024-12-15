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


// todo
// Читает данные из json файла
// декодирует парсит и возвращает готовый json объект
export const writeJsonData = async (path, data) => {
  //     return json; // возвращаем объект json
  //   })
  //   .catch(err => {
  //     console.error(`При чтении произошла файла "${path} Ошибка" : ${err.message}`);
  //   });
  const text = JSON.stringify(data);
  console.log('text: ', text, 'ЗАПИСАНО');
  await write(path, text);
};


const writeTasks = async (path, json) => {
  const text = JSON.stringify(json);
  await write(path, text);
}
