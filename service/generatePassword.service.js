import { shuffle } from "../util/shuffle.util.js"; // ?

export const getPasswordLength = (charset = ' ', length = 8) => {
  // password from charset
  let password = '';
  // генерируем пароль точной длины
  for (let i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * charset.length);
    password += charset[index];
  }
  // возвращаем наш пароль
  return password;
}

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


  return getPasswordLength(charset, option.length);
};
