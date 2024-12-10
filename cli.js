#!/usr/bin/env node

import { argsParse } from './util/argsParse.js';


const app = () => {
  console.log('hello');

  const args = process.argv;
  // console.log('process.argv: ', process.argv);
  console.log(argsParse(args));

};

app();
