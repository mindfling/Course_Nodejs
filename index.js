import { copyFile } from "./modules/copyFile.js";


const App = async () => {
  console.log('Hello NPM');

  await copyFile('./files/tex.txt', './files/copy.txt', err => {
    console.error('Where is error');
  })
}


// * test *
App();
