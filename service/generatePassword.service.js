import { shuffle } from "../util/shuffle.util.js";

// ? не самый универсальный генератор
export const generatePassword = option => {
  // по умолчанию мал лат буквы
  let charset = 'abcdefghijklmnopqrstuvwxyz';
  
  if (option.uppercase) {
    // добав Больш лат буквы
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  
  if (option.number) {
    // добав цифры
    charset += '0123456789';
  }
  
  if (option.special) {
    // добав другие символы
    // можно добавить еще //todo
    charset += '!@#$%^&*()+=';
  }

  // todo добав Кир: cyr and CYR
  if (option.lowercyrus) {
    // добавить мал строчные буквы кириллицы
    charset += 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  }
  
  if (option.uppercyrus) {
    // добавить Большие ЗАГЛАВНЫЕ буквы кириллицы
    charset += 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  }
  
  // const result = shuffle(charset.split(''));
  // // ? Максим в уроке так обрезает лишние символы
  // result.length = option.length;
  return shuffle(charset.split('')).slice(0, option.length).join('');
};
