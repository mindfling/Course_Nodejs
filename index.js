#!/usr/bin/env node

import { argsParse } from './util/argsParse.js';
import { generate as charset } from './util/charsets.js';

const app = () => {
  console.log('hello, show me all char sets you use:');
  charset({});
};

app();

