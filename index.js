#!/usr/bin/env node
import { log, time } from 'node:console';

import { dirname, join, basename, extname } from 'node:path';
import URL from 'node:url';

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FILENAME = 'todolist.json';


import fs, { readFile, writeFile } from 'node:fs/promises';
import { read } from './modules/read.js'; // ? указывать ли .js в конце



// const result = fileAsString.replace(/string to be replaced/g, 'replacement');


const app = async () => {
  console.log('Hello text replace');

  const fileName = './files/test.txt';
  const textFind = 'Приветы'
  const textReplace = 'Как дела'


  const buff = await read(fileName);
  console.log('buff: ', buff);
  if (!buff) {
    console.error('Ошибка при чтении файла замены');
    process.exit();
    return;
  }
  const str = buff.toString('utf8');
  console.log('str: ', str);

  
}


app();
