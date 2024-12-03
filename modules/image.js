import sharp from 'sharp';
import { read } from './read.js';
import { error, log } from 'node:console';

export const resizeImage = async (inputPath, outputPath) => {
  console.log('from inputPath: ', inputPath, 'to:', outputPath);

  const imgBuff = await read(inputPath);
  console.log('imgBuff: ', imgBuff);

  // callback вариант
  sharp(imgBuff)
    .resize(400, 400)
    .toFormat('jpeg')
    .toFile(outputPath, (err, info) => {
      if (err) {
        error(`Была ошибка обработки файла изображения ${err.message}`);
        return; // todo
      }
      log(`Файл: "${inputPath}" успешно преобразован в файл: "${outputPath}" resized`);
      log({info})
    });
    
    log();
    return true; // todo
  };
  
  
  // 
  export const greyBlurImage = async (inputPath, outputPath) => {
    console.log('from inputPath: ', inputPath, 'to:', outputPath);

  const imgBuff = await read(inputPath);
  // console.log('imgBuff: ', imgBuff);
  
  // callback вариант
  sharp(imgBuff)
  .greyscale()
  .blur(5)
  .toFormat('avif')
  .toFile(outputPath, (err, info) => {
    if (err) {
      error(`Была ошибка обработки файла изображения ${err.message}`);
      return; // todo
    }
    log(`Файл: "${inputPath}" успешно преобразован в файл: "${outputPath}" размытие и чернобелый`);
    log({info})
  });
  
  // todo toBuffer writeFile

  return true; // todo
};
