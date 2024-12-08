import { error } from 'node:console';
import { readFile, writeFile } from 'node:fs/promises';
import path, { dirname, join, basename, extname, resolve } from 'node:path';
import URL from 'node:url';
import readline from 'node:readline/promises';


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

  quiz.forEach((qu, i) => {
    console.log();
    console.log(
      `Вопрос ${i + 1}: "${qu.question}"
Варианты ответов:
${qu.options.map((opt, j) => `${j + 1}. ${opt}`).join('\n')}
Ваш ответ: `,
    );

    console.log(
      `Правильный ответ! был: ${qu.correctIndex + 1} > "${qu.options[qu.correctIndex]}"`,
    );
    console.log();
  });

  console.log();
};


const init = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('Hello...');
  const name = await rl.question('Как вас зовут?\n');
  console.log('Приветствуем вас', name);
  console.log();
  rl.close();
}


const app = async () => {
  await init();

  const quiz = await loadQuiz(file);
  if (!quiz) {
    error('Невозможно загрузить вопросы квиза');
    return;
  }

  gameCycle(quiz);
};

app();
