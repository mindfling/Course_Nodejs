#!/usr/bin/env node

// import readline from 'node:readline/promises';
import { createInterface } from 'node:readline/promises';
// import fs, { readFile, writeFile } from 'node:fs/promises';
import { log, error } from 'node:console';
import path, { dirname, join, } from 'node:path';
import URL from 'node:url';
import { read } from './modules/read.js';
import process, { stdin as input, stdout as output } from 'node:process';

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const testFile = join(__dirname, './files/test.txt'); // 'files/test.txt';
const filebase = path.parse(testFile).base;  //=> "test.txt"
const filename = path.parse(testFile).name;  //=> "test"
const fileexts = path.parse(testFile).ext;   //=> ".txt"


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
const name = path.basename(file, '.txt')
// const name = path.basename(file, extension)
log()
console.log('name: ', name);
console.log('base: ', base);
console.log('extension: ', extension);
console.log('file: ', file);


const promptUserOptions = async (option) => {
  const rl = createInterface({ input, output });
  option.rl = rl; // передаем настройки через объект аргумент
  option.name = (await rl.question('Введите имя папки : ')) || testFile;
  option.find = await rl.question('Введите Текст для поиска : ');
  if (option.find) {
    option.findRexExp = new RegExp(option.find, 'gi'); // собираем регулярное выражение через Строку поиска
    console.log(option.findRexExp);
  }
  option.replace = await rl.question('Введите Текст для замены : ');
  return option;
}


  // const fileName = './files/testa.txt';
  // const textFind = 'Приветы'
  // const textReplace = 'Как дела'

const app = async () => {
  console.log('Hello text replace');

  const options = {}

  await promptUserOptions(options);

  log('\nname: "\x1b[32m', options.name, '\x1b[0m"');
  log('find: "\x1b[32m' + options.find + '\x1b[0m"');
  log('replace: "\x1b[32m' + options.replace + '\x1b[0m"\n');
  

  const buff = await read(options.name);
  if (!buff) {
    console.error('\x1b[31mОшибка при чтении файла замены');
    options.rl.close();
    process.exit();
  }

  const text = buff.toString('utf8');
  log('- текст до замены ---------------------------------------------------------------------------------------------------')
  console.log(text);
  log('---------------------------------------------------------------------------------------------------------------------')

  // если можно провести замену проводим
  if (options.findRexExp) {
    const modaltext = text.replace(options.findRexExp, options.replace);
    log("\x1b[32m После замены \x1b[0m");
    log('---------------------------------------------------------------------------------------------------------------------')
    log(modaltext);
    log('---------------------------------------------------------------------------------------------------------------------')
    // todo копируем рез копию файла в test.bak
    // todo записываем результат обратно в test.txt
  }
  
  options.rl.close(); // закрываем поток ввода вывода
  process.exit(); // завершам процес программы
}


// app();
