import { log } from 'node:console';

export const generate = param => {
  // параметры для вывода всех символов

  // const {
  //   length,
  //   uppercase,
  //   number,
  //   special,
  // } = param;

  const abc = 'abcdefghijklmnopqrstuvwxyz';
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbs = '0123456789';
  const spec = '!@#$%^&*(){}[]_-+=';
  const cyr = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
  const CYR = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const greek = 'αβγδεζηθικλμνξοπρςστυφχψω';
  const GREEK = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΣΤΥΦΧΨΩ';

  log('abc: ', abc);
  log('ABC: ', ABC);
  log('numbs: ', numbs);
  log('spec: ', spec);
  log('cyr: ', cyr);
  log('CYR: ', CYR);
  log('greek: ', greek);
  log('GREEK: ', GREEK);


  // вывести все доступные цифры
  let allNumbs = '';
  for (let decstr = '', i = 0; i < 10; i++) {
    decstr += i;
    allNumbs = decstr;
  }
  log({allNumbs})

  // вывести все доступные буквы
  let allLetters = '';
  for (let code = 'a'.charCodeAt(0); String.fromCharCode(code) <= 'z'; code++) {
    let ch = String.fromCharCode(code);
    // log(ch, '=', code);
    allLetters += ch;
  }
  log({allLetters}); // прописные малые буквы

  allLetters = allLetters.toUpperCase();
  log({allLetters}); // большие СТРОЧНЫЕ буквы

  // вывести ВСЕ кирилические буквы
  let allCyr = '';
  for (let code = 'а'.charCodeAt(0); String.fromCharCode(code) <= 'я'; code++) {
    let ch = String.fromCharCode(code);
    // log(ch, '=', code);
    allCyr += ch;
  }
  log({allCyr}); // прописные малые буквы

  allCyr = allCyr.toUpperCase();
  log({allCyr}); // большие СТРОЧНЫЕ буквы

  return;
}
