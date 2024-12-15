export const generate = (param) => {
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
  console.log('abc: ', abc);
  console.log('ABC: ', ABC);
  console.log('numbs: ', numbs);
  console.log('spec: ', spec);
  console.log('cyr: ', cyr);
  console.log('CYR: ', CYR);


  // вывести все доступные цифры
  let allNumbs = '';
  for (let decstr = '', i = 0; i < 10; i++) {
    decstr += i;
    allNumbs = decstr;
  }
  console.log({allNumbs})

  // вывести все доступные буквы
  let allLetters = '';
  for (let code = 'a'.charCodeAt(0); String.fromCharCode(code) <= 'z'; code++) {
    let ch = String.fromCharCode(code);
    // console.console.log(ch, '=', code);
    allLetters += ch;
  }
  console.log({allLetters}); // прописные малые буквы
  
  allLetters = allLetters.toUpperCase();
  console.log({allLetters}); // большие СТРОЧНЫЕ буквы

  // вывести ВСЕ кирилические буквы
  let allCyr = '';
  for (let code = 'а'.charCodeAt(0); String.fromCharCode(code) <= 'я'; code++) {
    let ch = String.fromCharCode(code);
    // console.console.log(ch, '=', code);
    allCyr += ch;
  }
  console.log({allCyr}); // прописные малые буквы
  
  allCyr = allCyr.toUpperCase();
  console.log({allCyr}); // большие СТРОЧНЫЕ буквы

  return;
}