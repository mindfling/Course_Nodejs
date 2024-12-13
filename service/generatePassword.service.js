import { shuffle } from "../util/shuffle.util.js";
import { log, error, warn } from 'console';

export const generatePassword = option => {
  log('in generate password', {option});
  
  let charset = 'abcdefghijklmnopqrstuvwxyz';

  if (option.uppercase) {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  if (option.number) {
    charset += '0123456789';
  }

  if (option.special) {
    charset += '!@#$%^&*()+=';
  }

  const result = shuffle(charset.split(''));
  // result.length = option.length; // ??? //
  const res = result.slice(0, option.length);

  // return res.substring(0, option.length);
  return res.join('');
};
