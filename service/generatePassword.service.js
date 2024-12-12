import { shuffle } from "../util/shuffle.util.js";
import { log, error, warn } from 'console';

export const generatePassword = option => {
  log({option});
  let charset = 'abcdefghijklmnopqrstuvwxyz';

  if (option.uppercase) {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  if (option.number) {
    charset += '0123456789';
  }

  if (option.special) {
    charset += '!@#$%^&*(){}[]_-+=';
  }

  const result = shuffle(charset.split('')).join('');

  return result.substring(0, option.length);
};
