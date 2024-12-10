#!/usr/bin/env node

import { argsParse } from './util/argsParse.js';

console.log('Hello CLI');

const app = () => {
  console.log('hello');

  const args = process.argv;
  console.log('args: ', args);

  const arg = process.argv.slice(2);
  console.log('arg: ', arg, arg[0]);
  console.log('Привет ', arg[0]);
};

app();
