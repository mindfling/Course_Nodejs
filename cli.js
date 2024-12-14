#!/usr/bin/env node

import chalk from 'chalk';
import { argsParse } from './util/argsParse.js';
import { log } from 'console';
import { generatePassword } from './service/generatePassword.service.js';


const isCorrect = (l) => {
  // return true если l не boolean и не NaN
  return !isNaN(parseInt(l));
}

const app = () => {
  const args = argsParse(process.argv);

  const options = {
    length: 8,
    uppercase: false,
    number: false,
    special: false,
  };

  if (args.a || args.ask) {
    log(chalk.greenBright('\nГенерируем пароль по умолчанию'));
    log('default password:\n');
    log(generatePassword({
      length: 8,
      uppercase: true,
      number: true,
      special: false,
    }));
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
    !args.h && !args.help &&
    !args.l && !args.length &&
    !args.u && !args.uppercase &&
    !args.n && !args.number &&
    !args.s && !args.special &&
    !args.a && !args.ask
  ) {
    // подсказка для вызова помощи
    log('\n\x1b[32mFor read cli help use --help or -h flags\x1b[0m');
    return;
  }

  log(chalk.greenBright('\nГенирируем пароль с задаными параметрами'));

  if (isCorrect(args.l) || isCorrect(args.length)) {
    options.length = isCorrect(args.l) ? args.l
      : (isCorrect(args.length)
        ? args.length : options.length);
    log('Количество символов =', +options.length)
  }

  if (args.u || args.upper || args.uppercase) {
    log(`[${chalk.blueBright('x')}] Большие СТРОЧНЫЕ буквы`,
      chalk.blueBright('включены'));
    options.uppercase = args.u || args.uppercase;
  } else {
    log('[ ] Большие СТРОЧНЫЕ буквы');
  }

  if (args.n || args.number || args.numbers) {
    log(`[${chalk.blueBright('x')}] Цифры ${chalk.blueBright('включены')}`);
    options.number = args.n || args.number || args.numbers;
  } else {
    log('[ ] Цифры');
  }

  if (args.s || args.spec || args.special) {
    log(
      '[' + chalk.blueBright('x') + '] Специальные символы',
      chalk.blueBright('включены'),
    );
    options.special = args.s || args.spec || args.special;
  } else {
    log('[ ] Специальные символы');
  }

  const password = generatePassword(options);
  log(chalk.green('\npassword:'), password);
};

app();
