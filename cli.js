#!/usr/bin/env node

import { argsParse } from './util/argsParse.js';
import { log, error, warn } from 'console';

const app = () => {
  // console.log('process.argv: ', process.argv);
  // const args = {}
  const args = argsParse(process.argv, [
    'help',
    'demo',
    'go',
    'fly',
    'generate',
  ]);
  console.log('\n in application args: ', args);

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
    log('lets generate pass with length of l', args.l || args.length, 'Bytes');
  }
};

app();
