#!/usr/bin/env node

import readline, { createInterface } from 'node:readline/promises';
import { copyFile, readFile, writeFile } from 'node:fs/promises';
import fs, { createReadStream, createWriteStream } from 'node:fs';
import { log, error } from 'node:console';
import path, { dirname, join } from 'node:path';
import URL from 'node:url';
import { read } from './modules/read.js';
import process, { stdin as input, stdout as output } from 'node:process';

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*
const testFile = join(__dirname, './files/test.txt'); // 'files/test.txt';
const filebase = path.parse(testFile).base; //=> "test.txt"
const filename = path.parse(testFile).name; //=> "test"
const fileexts = path.parse(testFile).ext; //=> ".txt"

console.log('__filename: ', __filename);
console.log('__dirname: ', __dirname);
console.log('testFile: ', testFile);
console.log('filebase: ', filebase);
console.log('filename: ', filename);
console.log('fileexts: ', fileexts);

const file = testFile;
const extension = path.extname(file);
const base = path.basename(file);
// basename в начале строки обрезается расширением файла строкой в конце
const name = path.basename(file, '.txt');
// const name = path.basename(file, extension)

(async arg => {

  const rl = createInterface({
    input: createReadStream(testFile),
    output: createWriteStream('./out.txt'),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const str = `lines:  ${line}\n`;
    rl.output.write(str);
  }
})();

// const fileName = './files/test.txt';
// const textFind = 'Приветы'
// const textReplace = 'Как дела'
*/

const promptUserOptions = async option => {
  // спрашиваем пользователя о параметрах замены
  const rl = createInterface({ input, output });
  option.name =
    (await rl.question('Введите имя папки или файла для замены : ')) ||
    './files/test.txt';
  option.find = (await rl.question('Введите Текст для поиска : ')) || ' ';
  if (option.find) {
    // собираем регулярное выражение через Строку поиска
    option.findRexExp = new RegExp(option.find, 'gi');
  }
  option.replace = await rl.question('Введите Текст для замены : ');
  rl.close();
  return option;
};

const app = async () => {
  console.log('Hello text replace');

  const options = {};
  await promptUserOptions(options);
  // проверяем полученные настройки
  log('\nname: "\x1b[32m', options.name, '\x1b[0m"');
  log('find: "\x1b[32m' + options.find + '\x1b[0m"');
  log('replace: "\x1b[32m' + options.replace + '\x1b[0m"\n');

  const filename = options.name;
  /*
  const buff = await read(filename);
  if (!buff) {
    console.error('\x1b[31mОшибка при чтении файла замены');
    process.exit();
  } else {
    const text = buff.toString('utf8')
  log(text)
  }
  */

  const replaceInFile = async (target = 'test.txt', find, replace) => {
    // todo читаем файл test.txt
    log('--------------------------------------------------');
    const text = (await readFile(target)).toString('utf8');
    console.log('text: ', text);
    const findRexExp = new RegExp(find, 'gi');
    console.log('findRexExp: ', findRexExp);
    const result = text.replace(findRexExp, replace);
    log('result: ', result);
    log('--------------------------------------------------')(
      await writeFile(target, result),
    );
    return;
  };

  const tmp = './tmp';
  // поверяем и создаем папку tmp
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


  // todo копируем рез копию файла в test.bak
  copyFile(filename, 'file/test.bak')
    .then((e) => log('скопировано', e))

  // todo записываем результат обратно в test.txt
  const replaced = result.replace(options.findRexExp, options.replace)
  // console.log('replaced: ', replaced);

  // todo записываем результат обратно в test.rep
  // await writeFile('file/text.rep', replaced)
  //   .then(e => log('Записано', e))
  //   .catch(e => log('ОШИБКА при записи', e.message))

  // * нужно подождать завершения программы *
  // process.exit(); // завершам процес программы
};

app();
