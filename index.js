import { error } from 'node:console';
import { readFile, writeFile } from 'node:fs/promises';
import path, {dirname, join, basename, extname, resolve} from 'node:path';
import URL from 'node:url';


const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('__filename: ', __filename);
console.log('__dirname: ', __dirname);
console.log();

const file = join(__dirname, 'game/question.json');
console.log('file: ', file);
const resultDir = dirname(file)
console.log('resultDir: ', resultDir);

const newFile = join(resultDir, basename(file, extname(file)) + '.txt');
console.log('newFile: ', newFile);


let quiz = [];
let current = {};
let count = 0;
let rightAns = 0;


const loadQuiz = async (path) => {
  try {
    const buff = await readFile(path);
    const text = buff.toString('utf8');
    const json = JSON.parse(text);
    return json;
  } catch(err) {
    console.error(`Ошибка чтения файла "${path}" : ${err.message}`);
  }
}

const app = async () => {
  // hello();
  // init();
  const quiz = await loadQuiz(file);
  console.log('\n quiz: ', typeof quiz);

  const list = quiz.map((qu, i) => `quest ${i}: "${qu.question}" ans=${qu.correctIndex} > right: "${qu.options[qu.correctIndex]}"`)
  console.log('list: ', list);

  let listTextQuick = '';
  list.forEach(value => {
    listTextQuick += `${value}\n`;
  });

  
  try {
    writeFile(newFile, listTextQuick);
    console.log(`Файл "${newFile}" записан`);
  } catch(err) {
    console.error(`Ошибка записи в файл "${newFile}" : ${err.message}`);
  }

  // gameCycle();
}


app();
