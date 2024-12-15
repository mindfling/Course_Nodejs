#!/usr/bin/env node

import chalk from 'chalk';
import { argsParse } from './util/argsParse.js';
import { log } from 'console';
import { generatePassword } from './service/generatePassword.service.js';
import { getPasswordOptions } from './service/getPasswordOptions.service.js';


const isCorrect = (l) => {
  // return true если l не boolean и не NaN
  return !isNaN(parseInt(l));
}

const app = async () => {
  const args = argsParse(process.argv, ['ask']);
  
  const options = {
    length: 8,
    uppercase: false,
    number: false,
    special: false,
  };

  if (args.g || args.gen || args.generate) {
    log(chalk.green('Генерируем пароль по умолчанию'));
    log(chalk.greenBright('Generate default password:\n'));
    log(generatePassword({
      length: 8,
      uppercase: true,
      number: true,
      special: true,
    }));
    return;
  }

  if (args.a || args.ask) {
    log(chalk.greenBright('\nВводим парамертры пароля вручную'));
    log('Ответьте на вопросы')
    const options = await getPasswordOptions();
    log();
    log(generatePassword(options));
    return;
  }

  const helpText = `
This is cli application for generating passwords:
Usage: \x1b[33mnode cli options:[-u|-n|-s] [-l <Bytes>]\x1b[0m
Options:
-h --help      | print this help
-l --length    | length of password (by default [length=8])
-u --uppercase | include uppercase
-n --number    | include numbers
-s --special   | include spec symbols
-a --ask       | ask for promt options (ignore all other params)
-g --generate  | generate pass demo
`;

  if (args.h || args.help) {
    // параметр на help
    log('\n\x1b[32mRead this cli --help or -h flags for the help\x1b[0m');
    log(helpText);
    return;
  }
  
  if (
    !args.l && !args.length &&
    !args.u && !args.uppercase &&
    !args.n && !args.number &&
    !args.s && !args.special &&
    !args.a && !args.ask
  ) {
    // подсказка для вызова помощи
    log(chalk.green('\nFor read cli help use --help or -h flags'));
    return;
  }

  log(chalk.greenBright('\nГенирируем пароль с задаными параметрами'));


// todo ОТДЕЛЬНЫЙ ВЫВОД ПАРАМЕТРОВ

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
