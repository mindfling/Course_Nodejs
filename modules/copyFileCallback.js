import fs from 'node:fs';

export const copyFile =  (fromURI, toURI, errCallBack) => {
  const charset = 'utf-8';
  console.log('hello copy ');
  console.log(`Lets copy file from "${fromURI}" to "${toURI}"`);

  fs.readFile(fromURI, charset, (err, result) => {
    if (err) {
      console.log('Ошибка чтения файла read file error');
      errCallBack(err);
      // throw new Error(err);
      console.log('Файл не прочитан\n');
      return;
    }
    console.log('файл прочитан из', fromURI);

    fs.writeFile(toURI, result, (err) => {
      if (err) {
        console.log('Ошибка записи в новый файл write file error');
        errCallBack(err)
        // throw new Error(err);
        console.log('Файл не скопирован\n');
        return;
      }
      console.log('файл успешно скопирован в', toURI);

    });
  });
};
