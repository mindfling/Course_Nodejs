// import { copyFile } from "./modules/copyFileCallback.js";
import { copyFileSync, copyTextFileSync, readDir } from './modules/copyFileSync.js';

const handleCopyError = err => {
  console.log('\nhello handle');
  console.error('МОЙ ОБРАБОТЧИК ОШИБОК:');
  console.log(
    'handleCopyError',
    err.errno,
    err.code,
    err.syscall,
    'at PATH',
    err.path,
  );
  // throw new Error('ОБРАБОТЧИК ОШИБКИ ПРИ КОПИРОВАНИИ')
  console.log();
};

const App = () => {
  console.log('hello');

  const fromPath = './files/tex.txt';
  const toPath = './files/tex.bak';
  
  try {
    console.log('\nbefore await');
    readDir('files');
    copyTextFileSync(fromPath, toPath);
    console.log('after await\n');
  } catch (error) {
    console.log('error: ', error);
  }
}

// * test *
App();
