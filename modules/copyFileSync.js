import fs, { readdirSync } from 'node:fs';

// * !! синхронное копирорвание !!

export const copyFileSync = (sourse, target) => {
  // todo проверка корректроно адреса

  try {
    // читаем файл
    const result = fs.readFileSync(sourse);
    console.log('прочитали файл');

    // записываем файл
    fs.writeFileSync(target, result);
    console.log('записли файл');

  } catch (error) {
    console.error("18 copyFileSync Ошибка при копировани at", error.path);
    error.msg = 'Ошибка при копировани at copyFileSync module';
    throw error;
  }

  console.log('\nСкопировано без ошибок\n');
}


export const copyTextFileSync = (sourse, target) => {
  // todo проверка корректроно адреса

  try {
    // читаем файл
    const result = fs.readFileSync(sourse, 'utf8');
    console.log('прочитали файл');

    // записываем файл
    fs.writeFileSync(target, result);
    console.log('записли файл');

  } catch (error) {
    console.error("40 copyFileSync Ошибка при копировани at", error.path);
    error.msg = 'Ошибка при копировани at copyTextFileSync module';
    throw error;
  }

  console.log('\nСкопировано без ошибок\n');
}


export const readDir = (path) => {
  console.log();
  console.log(`path: ${path}`);
  const result = fs.readdirSync(path);
  console.log('result: ', result);
  
  result.forEach(item => {
    const itemPath = `${path}/${item}`;
    const stat = fs.statSync(itemPath);
    console.log(item, stat.isFile() ? `-f size=${stat.size}` : '--', stat.isDirectory() ? 'd' : '-');

    if (stat.isDirectory()) {
      readDir(itemPath); // into recursive
    }
  })

  console.log();
}

