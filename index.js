import { error } from 'node:console';
import { readFile, writeFile } from 'node:fs/promises';
import path, { dirname, join, basename, extname, resolve } from 'node:path';
import URL from 'node:url';

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('__filename: ', __filename);
console.log('__dirname: ', __dirname);
console.log();

const file = join(__dirname, 'game/question.json');
console.log('file: ', file);
const resultDir = dirname(file);
const newFile = join(resultDir, basename(file, extname(file)) + '.txt');
console.log('newFile: ', newFile);

const loadQuiz = async path => {
  let quiz = []; //todo
  await readFile(path)
    .then(buff => buff.toString('utf8'))
    .then(text => JSON.parse(text))
    .then(json => {
      console.log(`файл "${path}" успешно прочитан и распарсин`);
      quiz = json;
    })
    .catch(err => {
      console.error(`Ошибка чтения файла "${path}" : ${err.message}`);
    });
  
  console.log(`Загружено ${quiz.length} вопросов Квиза`);
  return quiz;
};

const gameCycle = quiz => {
  let current = {};
  let count = 0;
  let rightAns = 0;
  console.log();

  quiz.forEach((qu, i) =>
    console.log(
`Вопрос ${i}:
question ${i} > "${qu.question}"
${qu.options.map((opt, j) => `opt${j}: ${opt}`).join('\n')}
ans=${qu.correctIndex} > right: "${qu.options[qu.correctIndex]}"
`
    ),
  );
  console.log();
};

const app = async () => {

  // hello();
  // init();

  const quiz = await loadQuiz(file);
  // console.log('quiz app: ', quiz);
  if (!quiz) {
    error('Невозможно загрузить вопросы квиза');
    return;
  }

  gameCycle(quiz);
};

app();
