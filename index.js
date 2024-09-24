// import { copyFile } from "./modules/copyFileCallback.js";
// import { copyFileSync, copyTextFileSync, readDir } from './modules/copyFileSync.js';

import { readText } from "./modules/readPromise.js";
import { write } from "./modules/writePromise.js";


const readWrite = async (target, dest) => {
  console.log('target: ', target);
  console.log('dest: ', dest);

  const data = await readText(target);
  console.log('data: ', data);
  await write(dest, data);
}

const App = () => {
  console.log('hello App');

  const fromPath = './files/tex.txt';
  const toPath = './files/tex.bak';
  
  try {
    console.log('\nbefore await');

    readWrite(fromPath, toPath)

    console.log('after await\n');

  } catch (error) {
    console.log('error: ', error);
  } finally {
    console.log('trying is finished\n\n');
  }
}


// * test *
App();
// * test *