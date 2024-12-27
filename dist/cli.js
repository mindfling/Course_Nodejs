#!/usr/bin/env node
// BUILD
// билд собран в ручную с некоторыми правками

import { log } from 'node:console';

const c = {
  red(str) {
    return `\x1b[31m${str}\x1b[0m`;
  },
  green(str) {
    return `\x1b[32m${str}\x1b[0m`;
  },
  yellow(str) {
    return `\x1b[33m${str}\x1b[0m`;
  },
  blue(str) {
    return `\x1b[34m${str}\x1b[0m`;
  },
  magenta(str) {
    return `\x1b[35m${str}\x1b[0m`;
  },
  cyan(str) {
    return `\x1b[36m${str}\x1b[0m`;
  },
  while(str) {
    return `\x1b[37m${str}\x1b[0m`;
  },
  grey(str) {
    return `\x1b[90m${str}\x1b[0m`;
  },
};

const shuffle = arr => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const argsParse = ([, , ...argv], words = []) => {
  // убираем превые два символа через рест
  const args = {};

  for (const key of words) {
    args[key] = false;
  }

  if (words.includes(argv[0])) {
    args[argv[0]] = true;
  }

  // проходим все параметры по циклу
  for (let i = 0; i < argv.length; i++) {
    const current = argv[i];

    if (argv[i][0] !== '-') {
      // игнорируем значения т.е. строки без "-"
      continue;
    }

    if (argv[i].startsWith('-no-')) {
      args[argv[i].substring(4)] = false;
      continue;
    }

    if (argv[i].startsWith('--')) {
      if (argv[i].includes('=')) {
        const [key, value] = argv[i].split('=');
        args[key.substring(2)] = value;
      } else {
        args[argv[i].substring(2)] = true;
      }
      continue;
    }

    if (argv[i + 1] && argv[i + 1][0] !== '-') {
      // т.е. е следщ параметр это значение

      if (argv[i].startsWith('--')) {
        // т.е. обрез два символа "--"
        args[argv[i].substring(2)] = argv[i + 1];
      } else {
        // т.е. обрез первый символ "-"
        args[argv[i].substring(1)] = argv[i + 1];
      }
      continue;
    }

    // т.е. без первых символов  "-" и "--"
    args[argv[i].substring(1)] = true;
  }

  return args;
};

const generatePassword = option => {
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

  //todo добав Кир Cyr

  const result = shuffle(charset.split(''));
  result.length = option.length; // ?
  return result.join('');

  return shuffle(charset.split('')).slice(0, option.length).join('');
};

const isCorrect = l => {
  // return true если l не boolean и не NaN
  return !isNaN(parseInt(l));
};

const app = () => {
  const args = argsParse(process.argv);

  const options = {
    length: 8,
    uppercase: false,
    number: false,
    special: false,
  };

  if (args.a || args.ask) {
    log('\nГенерируем пароль по умолчанию');
    log('default password:\n');
    log(generatePassword(options));
    return;
  }

  const helpText = `
This is cli application for generating passwords:
Usage: \x1b[33mnode cli options:[-u|-n|-s] [-l <Bytes>]\x1b[0m
Options:
-h --help      | print this help
-l --length    | length of password (by default length=8)
-u --uppercase | include uppercase
-n --number    | include numbers
-s --special   | include spec symbols
-a --ask       | ask for ignore all other params
-g --generate  | generate pass demo`;

  if (args.h || args.help) {
    // параметр на help
    log('\n\x1b[32mRead this cli --help or -h flags for the help\x1b[0m');
    log(helpText);
    return;
  }

  if (
    !args.h && !args.help && !args.l && !args.length &&
    !args.u && !args.uppercase && !args.n && !args.number && !args.s && !args.special && !args.a && !args.ask
  ) {
    // подсказка для вызова помощи
    log('\n\x1b[32mFor read cli help use --help or -h flags\x1b[0m');
    return;
  }

  log(c.green('\nГенирируем пароль с задаными параметрами:'));

  if (isCorrect(args.l) || isCorrect(args.length)) {
    options.length = isCorrect(args.l)
      ? args.l
      : isCorrect(args.length)
        ? args.length
        : options.length;
    log('Количество символов =', +options.length);
  }

  if (args.u || args.upper || args.uppercase) {
    log(`[${c.magenta('x')}] Большие СТРОЧНЫЕ буквы`, c.magenta('включены'));
    options.uppercase = args.u || args.upper || args.uppercase;
  } else {
    log('[ ] большие СТРОЧНЫЕ буквы');
  }

  if (args.n || args.number || args.numbers) {
    log(`[${c.magenta('x')}] Цифры`, c.magenta('включены'));
    options.number = args.n || args.number || args.numbers;
  } else {
    log('[ ] цифры');
  }

  if (args.s || args.spec || args.special || args.specials) {
    log(`[${c.magenta('x')}] Специальные символы`, c.magenta('включены'));
    options.special = args.s || args.spec || args.special;
  } else {
    log('[ ] специальные символы');
  }


  const password = generatePassword(options);
  log('\n\x1b[32mpassword:\x1b[0m', password);
};

app();
