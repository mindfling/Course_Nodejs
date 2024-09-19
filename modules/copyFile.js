import fs from 'node:fs';

export const copyFile = async (fromURI, toURI, errCallBack) => {
  const charset = 'utf-8';

  console.log(`Lets copy file from "${fromURI}" to "${toURI}"`);

  // проверка путей пройдена
  fs.readFile(fromURI, charset, (err, result) => {
    if (err) {
      console.log('read file error');
      throw err;
    }

    console.log('файл прочитан из', fromURI);

    fs.writeFile(toURI, result, err => {
      if (err) {
        console.log('write file error'); 
        throw err;
      }

      console.log('файл успешно скопирован в', toURI);
    });
  });
};
