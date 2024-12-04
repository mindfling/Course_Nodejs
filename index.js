import { log, error } from 'node:console';
import { read } from './modules/read.js';
import { write } from './modules/write.js';

console.log('Hello Buffer');

const textToBuffer = (text, encode) => {
  return Buffer.from(text, encode);
}

const bufferToText = (buff, encode) => {
  return Buffer.from(buff, encode).toString();
}


// todo Проверка
const text = 'Привет Мир!';
log({text});

const utf8Buff = textToBuffer(text, 'utf8');
log({utf8Buff});

const decodeText = bufferToText(utf8Buff, 'utf8');
log({decodeText});
