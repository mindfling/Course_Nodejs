import { copyFile } from "./modules/copyFileCallback.js";

const handleCopyError = (err) => {
  console.log('\nhello handle');
  console.error('МОЙ ОБРАБОТЧИК ОШИБОК:')
  console.log('handleCopyError', err.errno, err.code, err.syscall, 'at PATH', err.path);
  // throw new Error('ОБРАБОТЧИК ОШИБКИ ПРИ КОПИРОВАНИИ')
  console.log();
}


const App =  () => {
  console.log('hello');

  try {
    console.log('\nbefore await');
    copyFile('./1files/tex.txt', './files/copy.txt', handleCopyError);
    console.log('after await\n');

  } catch (error) {
    console.log('error: ', error);
    console.log('11 there occure error, while coping file', error);
  }
}

// * test *
App();
