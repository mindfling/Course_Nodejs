#!/usr/bin/env node

import { argsParse } from './util/argsParse.js';
import { log, error, warn } from 'console';
import { generate } from './util/passGenerate.js';
import { generatePassword } from './service/generatePassword.service.js';


const app = () => {
  const args = argsParse(process.argv);
  console.log('\nin application args: ', args);


  const helpText = `
this is my DIm CLI Application help:
-h --help      | print this help
-l --length    | length of password
-u --uppercase | include uppercase
-n --number    | include numbers
-s --special   | include spec symbols
-a --ask       | ask for smth ignore
-g --generate  | generate pass with length of -l
`;

  if (args.h || args.help) {
    // параметр на help
    log('\npass gen app', helpText);
  }

  if (args.g || args.generate) {
    log('\nlets generate pass with length of', args.l || args.length, 'Bytes\n');
    if (isNaN(parseInt(args.length))) {
      args.length = (isNaN(parseInt(args.l)) ? 8 : args.l);
    }
    if (!args.uppercase) {
      args.uppercase = !!args.u;
    }
    if (!args.number) {
      args.number = !!args.n;
    }
    if (!args.special) {
      args.special = !!args.s;
    }

    const password = generatePassword(args);
    console.log('password: ', password);
  }
};

app();
