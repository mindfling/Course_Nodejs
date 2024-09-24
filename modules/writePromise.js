import fs from 'node:fs/promises';

export const write = async (pathFile, data) => {
  try {
    console.log(`Данные ${data}`);
    await fs.writeFile(pathFile, data);
    console.log(`записали в файл ${pathFile}`);

  } catch (err) {
    console.error(`Ошибка записи в файл ${err.message}`);
  }
};
