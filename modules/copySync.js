import { log } from 'node:console';
import fs from 'node:fs';
import path from 'node:path';
// * !! синхронное копирорвание !!


export const copyFileSync = (source, target) => {
  // console.log('copy source: ', source);
  // console.log('copy target: ', target);
  try {
    // читаем файл
    const result = fs.readFileSync(source);

    // записываем файл
    fs.writeFileSync(target, result);
  } catch (error) {
    console.error('copyFileSync Ошибка при копировани at', error.sourceDir);
    error.msg = 'Ошибка при копировани at copyFileSync module';
    throw error;
  }

  console.log('Файл скопирован без ошибок\n');
};


export const copyTextFileSync = (source, target) => {
  try {
    // читаем файл
    const result = fs.readFileSync(source, 'utf8');
    console.log('прочитали файл');

    // записываем файл
    fs.writeFileSync(target, result);
    console.log('записали файл');
  } catch (error) {
    console.error('copyFileSync Ошибка при копировани at', error.sourceDir);
    error.msg = 'Ошибка при копировани at copyTextFileSync module';
    throw error;
  }

  console.log('Текстовый файл скопирован без ошибок\n');
};


export const copyDirSync = (sourceDir, targetDir, callback) => {
  // log('sourceDir: ', sourceDir);
  // log('targetDir: ', targetDir);
  console.log('Синхронное рекурсивное копирование папки...');

  fs.mkdirSync(targetDir, {recursive: true});

  const dirlist = fs.readdirSync(sourceDir);

  dirlist.forEach(item => {
    const itemPath = path.join(sourceDir, item);
    const stat = fs.statSync(itemPath);
    // console.log(item, stat.isFile() ? `-f size=${stat.size}` : '--', stat.isDirectory() ? 'd' : '-');

    if (stat.isFile()) {
      try {
        copyFileSync(path.join(sourceDir, item), path.join(targetDir, item));
      } catch (error) {
        console.log('ОШИБКА ПРИ КОПИРОВАНИИ');
      }
    }

    if (stat.isDirectory()) {
      copyDirSync(path.join(sourceDir, item), path.join(targetDir, item), callback); // into recursive
    }
    return;
  });

  callback('THE END') 
};
  