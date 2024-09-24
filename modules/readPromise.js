import { readFile } from 'node:fs/promises';

export const readText = async filePath => {
  // todo проверить filePath

  try {
    const result = await readFile(filePath, 'utf8');
    console.log(result);
    return result;
  
  } catch (err) {
    console.error(`Ошибка чтения текстового файла ${err.message}`);
  }
};


export const read = async (filePath) => {
  // todo filePath check

  try {
    const result = await readFile(filePath);
    console.log('read result: ', result);
    return result;
    
  } catch (err) {
    console.error(`Ошибка чтения файла ${err.message}`);
  }
}
