import { shuffle } from "../util/shuffle.util.js";
import { getPasswordCharsetLength } from "../util/generate.util.js";

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
    // можно добавить еще ?
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


  return getPasswordCharsetLength(charset, option.length);
};
