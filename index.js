#!/usr/bin/env node

import readline, { createInterface } from 'node:readline/promises';
import { copyFile, readFile, writeFile } from 'node:fs/promises';
import fs, { createReadStream, createWriteStream } from 'node:fs';
import { log, error } from 'node:console';
import path, { dirname, join } from 'node:path';
import URL from 'node:url';
import { read } from './modules/read.js';
import { write } from './modules/write.js';
import process, { stdin as input, stdout as output } from 'node:process';

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const promptUserOptions = async option => {
  // спрашиваем пользователя о параметрах замены
  const rl = createInterface({ input, output });
  option.name =
    (await rl.question('Введите имя папки или файла для замены : ')) || 'test.txt';
  option.find = (await rl.question('Введите Текст для поиска : ')) || ' ';
  if (option.find) {
    // собираем регулярное выражение через Строку поиска
    option.findRexExp = new RegExp(option.find, 'gi');
  }
  option.replace = await rl.question('Введите Текст для замены : ');
  rl.close();
  return option;
};

const checkOptions = options => {
  // проверяем полученные настройки
  log('\nname: "\x1b[32m', options.name, '\x1b[0m"');
  log('find: "\x1b[32m' + options.find + '\x1b[0m"');
  log('replace: "\x1b[32m' + options.replace + '\x1b[0m"\n');
};

const findReplaceInFile = async (target = 'test.txt', find, replace) => {
  // todo читаем файл test.txt
  const text = (await readFile(target)).toString('utf8');
  const findRexExp = new RegExp(find, 'gi');
  const result = text.replace(findRexExp, replace);
  await writeFile(target, result);
  return;
};


const app = async () => {
  console.log('Hello text replace\n');

  // поверяем и создаем папку tmp
  /*
  const tmp = './tmp';
  fs.access(tmp, accesserr => {
    if (accesserr) {
      log('папки нету');
      fs.mkdir(tmp, err => {
        if (err) {
          log('ошибка создания папкиtmp');
        } else {
          log('папка tmp успешно создана');
        }
      });
    } else {
      log('папка tmp уже существует');
    }
  });
  */

  const options = {}; // обкт с настройками
  await promptUserOptions(options);

  checkOptions(options);

  const filename = options.name;
  console.log('filename: "', filename, '"');


  const files = fs.readdirSync('./files');
  console.log('files: ', files);
  log()

  for (let i = 0; i < files.length; i++) {
    log(i, files[i])
    fs.renameSync('./files/'+files[i], './files/'+'testta0'+i+'.txt');
  }

  // fs.rename('./files/'+files[1], './files/testtast.txt', (e) => {
  //   log(' переименован ')
  // })

  // files.forEach((file, index) => {
  //   log('file', file);
  //   fs.rename('files\\'+file, 'files\\'+'tst'+index+'.txt', (e) => {
  //     log(e.message, 'rename')
  //   })
  // })

  // await findReplaceInFile(filename, options.find, options.replace);
};

app();
