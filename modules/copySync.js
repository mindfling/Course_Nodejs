import fs from 'node:fs';
// * !! синхронное копирорвание !!

export const copyFileSync = (source, target) => {
  try {
    // читаем файл
    const result = fs.readFileSync(source);
    console.log('прочитали файл');

    // записываем файл
    fs.writeFileSync(target, result);
    console.log('записали файл');
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
  console.log('Синхронное рекурсивное копирование папки');

  const dirlist = fs.readdirSync(sourceDir);
  console.log('read dir result: ', dirlist);

  dirlist.forEach(item => {
    const itemPath = `${sourceDir}/${item}`;
    const stat = fs.statSync(itemPath);
    console.log(
      item,
      stat.isFile() ? `-f size=${stat.size}` : '--',
      stat.isDirectory() ? 'd' : '-',
    );

    if (stat.isDirectory()) {
      readDir(itemPath); // into recursive
    }
  });

  return;
};
