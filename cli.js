#!/usr/bin/env node

import chalk from 'chalk';
import { argsParse } from './util/argsParse.js';
import { log } from 'console';
import { generatePassword } from './service/generatePassword.service.js';


const isCorrectL = (l) => {
  // return true если l не boolean и не NaN
  return !isNaN(parseInt(l));
}

const app = () => {
  const args = argsParse(process.argv);
  console.log('\nin application args: ', args);

  const options = {
    length: 8,
    uppercase: false,
    number: false,
    special: false,
  };

  if (args.a || args.ask) {
    log('\nAsk for default generate password');
    console.log('default password:', generatePassword(options));
    return;
  }

  const helpText = `
This is cli application for generating passwords:
\x1b[33mUsage: node cli [options]\x1b[0m
Options:
-h --help      | print this help
-l --length    | length of password (by default length=8)
-u --uppercase | include uppercase
-n --number    | include numbers
-s --special   | include spec symbols
-a --ask       | ask for ignore all other params
-g --generate  | generate pass demo
`;

  if (args.h || args.help) {
    // параметр на help
    log('\n\x1b[32mFor read cli help use --help or -h flags\x1b[0m');
    log(helpText);
    return;
  }

  if (
    !args.h && !args.help &&
    !args.l && !args.length &&
    !args.u && !args.uppercase &&
    !args.n && !args.number &&
    !args.s && !args.special &&
    !args.a && !args.ask
  ) {
    // подсказка для вызова помощи
    log('\n\x1b[32mRead this cli --help or -h flags for the help\x1b[0m');
    return;
  }

  if (!isNaN(parseInt(args.l)) || !isNaN(parseInt(args.length))) {
    console.log('args', parseInt(args.l), parseInt(args.length));
    log('Были корректные параметры -l OR --length\n\n');
    options.length = !isNaN(parseInt(args.l)) ? args.l
      : !isNaN(parseInt(args.length))
        ? args.length : options.length;
  }

  if (args.u || args.uppercase) {
    log('[x] Большие СТРОЧНЫЕ буквы', chalk.blueBright('включены'));
    options.uppercase = args.u || args.uppercase;
  } else {
    log('[ ] Большие СТРОЧНЫЕ буквы');
  }

  if (args.n || args.number || args.numbers) {
    log('[x] Цифры', chalk.blueBright('включены'));
    options.number = args.n || args.number || args.numbers;
  } else {
    log('[ ] цифры');
  }

  if (args.s || args.spec || args.special) {
    log('[x] Специальные символы', chalk.blueBright('включены'));
    options.special = args.s || args.spec || args.special;
  } else {
    log('[ ] специальные символы');
  }

  const password = generatePassword(options);
  console.log(chalk.green('\npassword:'), password, password.length);
};

app();
