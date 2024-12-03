import { log } from 'node:console';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyDirSync } from './modules/copySync.js';



const App = () => {
  console.log('hello App\n');
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  log('__filename: ', __filename);
  log('__dirname: ', __dirname);

  const sourcePath = path.join(__dirname, './files');
  const targetPath = path.join(__dirname, './filescopy');


  let count = 0;
  const callbackhandler = (a) => {
    count++;
    console.log('callback handle', a, 'count:', count);
  }

  console.log();
  copyDirSync(sourcePath, targetPath, callbackhandler);

};


try {
  App();
  
} catch (error) {
  console.error(error);
}
