import fs from 'node:fs';

// * !! синхронное копирорвание !!

const copyFileSync = (sourse, target) => {

  try {
    const result = fs.readFileSync(sourse, 'utf8');
    console.log('прочитали файл');
    fs.writeFileSync(target, result);
    console.log('записли файл');

  } catch (error) {
    console.log("Ошибка при копировани");    
  }

  console.log('Скопировано без ошибок');
}
