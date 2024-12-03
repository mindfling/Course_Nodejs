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
