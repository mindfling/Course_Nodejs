#!/usr/bin/env node
import readline from 'node:readline/promises';

import { log, error } from 'node:console';

import { dirname, join, basename, extname } from 'node:path';
import URL from 'node:url';

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const testFile = join(__dirname, './files/test.txt');

console.log('__filename: ', __filename);
console.log('__dirname: ', __dirname);
console.log('testFile: ', testFile);


// import fs, { readFile, writeFile } from 'node:fs/promises';
import { read } from './modules/read.js'; // ? указывать ли .js в конце
import process, { stdin as input, stdout as output } from 'node:process';

// const result = text.replace(/string to be replaced/g, 'replacement');
// const result = str.replace("Привет", 'replacement');


const promptUserOptions = async (option) => {
  const rl = readline.createInterface({
    input,
    output,
    prompt: '#',
  });
  option.rl = rl; // передаем настройки через объект аргумент
  option.name = (await rl.question('Введите имя папки : ')) || testFile;
  option.find = await rl.question('Введите Текст для поиска : ');
  if (option.find) {
    console.log(option.find);
    option.findRexExp = new RegExp(option.find, 'gi'); // собираем регулярное выражение через Строку поиска
  }
  console.log('option.findRexExp: ', option.findRexExp);
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


app();
