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
