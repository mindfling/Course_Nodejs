#!/usr/bin/env node

import fs from 'node:fs';
import { log, error } from 'node:console';
import path, { dirname, join } from 'node:path';
import URL from 'node:url';
import readline, { createInterface } from 'node:readline/promises';
import process, { stdin as input, stdout as output, stdout } from 'node:process';
import { read } from './modules/read.js';
import { write } from './modules/write.js';

const __filename = URL.fileURLToPath(import.meta.url);
console.log('__filename: ', __filename);
const __dirname = dirname(__filename);
console.log('__dirname: ', __dirname);

const promptUserOptions = async option => {
  // спрашиваем пользователя о параметрах замены
const file = testFile;
const extension = path.extname(file);
const base = path.basename(file);
// basename в начале строки обрезается расширением файла строкой в конце
const name = path.basename(file, '.txt')
// const name = path.basename(file, extension)
log()
console.log('name: ', name);
console.log('base: ', base);
console.log('extension: ', extension);
console.log('file: ', file);


// запуск async IIFE
(async (arg) => {
  log('test', testFile);

  // тест копирования текстового файла потоком
  const rl = createInterface({
    input: createReadStream(testFile),
    output: createWriteStream('./out.txt'),
    crlfDelay: Infinity,
  });

  const findText = 'Привет'
  const replaceText = 'OKEY '
  
  // копирование построчко line rl
  for await (const line of rl) {
    const str = `lines:  ${line}\n`;
    
    rl.output.write(str)
  }
})();




const promptUserOptions = async (option) => {
  const rl = createInterface({ input, output });
  option.dirname =
    (await rl.question('Введите имя папки или файла для замены : ')) ||
    'test.txt';
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
  log('\nname: "\x1b[32m', options.dirname, '\x1b[0m"');
  log('find: "\x1b[32m' + options.find + '\x1b[0m"');
  log('replace: "\x1b[32m' + options.replace + '\x1b[0m"\n');
};

/*
const findReplaceInFile = async (target = 'test.txt', find, replace) => {
  // todo читаем файл test.txt
  const text = (await readFile(target)).toString('utf8');
  const findRexExp = new RegExp(find, 'gi');
  const result = text.replace(findRexExp, replace);
  await writeFile(target, result);
  return;
};
 */

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




/*
  const options = {}; // обкт с настройками
  await promptUserOptions(options);

  checkOptions(options);
  console.log('options: ', options);

  const folder = path.join(__dirname, options.dirname);
  console.log('folder: ', folder);
  const files = fs.readdirSync(options.dirname);
  console.log('files: ', files);

  // try to rename files in folder
  try {
    for (let i = 0; i < files.length; i++) {
      const oldName = path.join(folder, files[i])
      const newName = path.join(folder, `${(Math.random()*1000).toFixed(2)}_${files[i]}`)
      log('oldName: ', oldName, 'to', 'newName: ', newName);
      fs.renameSync(oldName, newName);
    }
  } catch (e) {
    console.error('ОШИБКА ', e.message)
  }
*/






  const textRL = readline.createInterface({
    input: fs.createReadStream('./files/test.txt'),
    output: fs.createWriteStream('files/textresult.txt'),
  });

  let i = 0;
  for await (const line of textRL) {
    console.log(++i);
    textRL.output.write(line);
    textRL.output.write('next line -->')
  }

  console.log('THE END');
  textRL.close();
};

app();

