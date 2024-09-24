// import { copyFile } from "./modules/copyFileCallback.js";
import { copyFileSync, copyTextFileSync, readDir } from './modules/copyFileSync.js';

const handleCopyError = err => {
  console.log('\nhello handle');
  console.error(`МОЙ ОБРАБОТЧИК ОШИБОК handleCopyError:
    ${err.errno}
    ${err.code}
    ${err.syscall}
    'at PATH' ${err.path}
`);
};

const App = () => {
  console.log('hello');

  const fromPath = './files/tex.txt';
  const toPath = './files/tex.bak';
  
  try {
    console.log('\nbefore await');
    readDir('./files');
    // copyTextFileSync(fromPath, toPath);
    console.log('after await\n');

  } catch (error) {
    console.log('error: ', error);
  } finally {
    console.log('trying is finished');
  }
}


// * test *
App();
// * test *