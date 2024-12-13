import { shuffle } from "../util/shuffle.util.js";


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

  // todo добав Кир Cyr

  const result = shuffle(charset.split(''));
  // result.length = option.length; // ? Максим в уроке так обрезает лишние символы
  return result.slice(0, option.length).join('');
};
