import fs from 'node:fs/promises';

// Запись любых данных в файл на промисах
export const write = async (path, data) => {
  try {
    // console.log(`Данные: ${data}`);
    await fs.writeFile(path, data);
    // console.log(`записали в файл "${path}"`);
    return true;
  } catch (err) {
    console.error(`Ошибка записи в файл "${path}" : ${err.message}`);
  }
};


// Кодирует и Записывает данные в файл на промисах
export const writeJsonData = async (path, json) => {
  try {
    const text = JSON.stringify(json);
    return await write(path, text);
  } catch (err) {
    console.error(`При обработке json и записи возникла Ошибка : ${err.message}`);
  }
};


// тоже самое с writeFile
// принимает объект, переводит в json, запис в файл как простой текст
export const writeData = async (path, json) => {
  try {
    const text = JSON.stringify(json);
    await fs.writeFile(path, text);
    return true;
  } catch (err) {
    console.error(`При обработке json и записи в файл "${path}" возникли непредвиденные ошибки : ${err.message}`);
  }
}
