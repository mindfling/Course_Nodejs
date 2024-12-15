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

  // todo generate
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

  // todo ask
  if (args.a || args.ask) {
    log(chalk.greenBright('\nВводим парамертры пароля вручную'));
    log('Ответьте на вопросы');
    // запускаем промпт и копируем новые параметры в options
    Object.assign(options, {...(await getPasswordOptions())});
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

  // todo help
  if (args.h || args.help) {
    // параметр на help
    log('\n\x1b[32mRead this cli --help or -h flags for the help\x1b[0m');
    log(helpText);
    process.exit();
    return;
  }
  
  if (
    !args.l && !args.length &&
    !args.u && !args.uppercase &&
    !args.n && !args.number &&
    !args.s && !args.special &&
    !args.a && !args.ask
  ) {
    // подсказка для вызова помощи нет правильных параметров
    log(chalk.green('\nFor read cli help use --help or -h flags'));
    process.exit();
    return;
  }

  log(chalk.greenBright('\nГенирируем пароль с задаными параметрами'));


  // * args to options
  
  // todo l -> options.length
  if (isCorrect(args.l) || isCorrect(args.length)) {
    options.length = isCorrect(args.l) ? args.l
      : (isCorrect(args.length)
        ? args.length : options.length);
  }
  
  // todo upper -> options.uppercase
  if (args.u || args.upper || args.uppercase) {
    options.uppercase = (args.u || args.upper || args.uppercase);
  }
  
  // todo numb -> options.number
  if (args.n || args.numb || args.number || args.numbers) {
    options.number = args.n || args.numb || args.number || args.numbers;
  }

  // todo spec -> options.special
  if (args.s || args.spec || args.special) {
    options.special = args.s || args.spec || args.special;
  } 


  // * ВЫВОД НА ЭКРАН
  
  // todo options.length
  if (options.length) {
    log('Количество символов =', +options.length)
  }

  // todo uppercase
  if (options.uppercase) {
    log(`[${chalk.blueBright('x')}] Большие СТРОЧНЫЕ буквы`, chalk.blueBright('включены'));
  } else {
    log('[ ] Большие СТРОЧНЫЕ буквы');
  }

  // todo number
  if (options.number) {
    log(`[${chalk.blueBright('x')}] Цифры ${chalk.blueBright('включены')}`);
  } else {
    log('[ ] Цифры');
  }

  // todo special
  if (options.special) {
    log(
      '[' + chalk.blueBright('x') + '] Специальные символы',
      chalk.blueBright('включены'),
    );
  } else {
    log('[ ] Специальные символы');
  }

  // todo lowercyrus
  if (options.lowercyrus) {
    log(
      '[' + chalk.blueBright('x') + '] Строчные буквы кириллицы',
      chalk.blueBright('включены'),
    );
  } else {
    log('[ ] Строчные буквы кириллицы');
  }

  // todo uppercyrus
  if (options.uppercyrus) {
    log(
      '[' + chalk.blueBright('x') + '] ЗАГЛАВНЫЕ Большие буквы кириллицы',
      chalk.blueBright('включены'),
    );
  } else {
    log('[ ] ЗАГЛАВНЫЕ Большие буквы кириллицы');
  }

  const password = generatePassword(options);
  log(chalk.green('\nPassword:'), password);
};

app();
