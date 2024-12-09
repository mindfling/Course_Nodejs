import { error } from 'node:console';
import { readFile, writeFile } from 'node:fs/promises';
import path, { dirname, join, basename, extname, resolve } from 'node:path';
import URL from 'node:url';
import readline from 'node:readline/promises';


const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log('__filename: ', __filename);
// console.log('__dirname: ', __dirname);
console.log();


const file = join(__dirname, 'game/question.json');
const resultDir = dirname(file);
const newFile = join(resultDir, basename(file, extname(file)) + '.txt');
// console.log('file: ', file);
// console.log('newFile: ', newFile);


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




const gameCycle = async quiz => {
  const ask = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let current = {};
  const allQuestions = quiz.length;
  let count = 0;
  let rightAns = 0;
  console.log();

  let i = 1;
  for (const qu of quiz) {
    console.log('Вопрос', i, ':');
    console.log(
`Вопрос ${i}: "${qu.question}"
Варианты ответов:
${qu.options.map((opt, j) => `${j + 1}. ${opt}`).join('\n')}
`);

    const userAns = await ask.question(`Ваш ответ: `);
    console.log('userAns: ', userAns, '==', qu.correctIndex);
    if (parseInt(userAns) == (parseInt(qu.correctIndex)+1)) {
      console.log(
        `\x1b[32mПравильный ответ!\x1b[0m\n`,
      );
      count++;
    } else {
      console.log('\x1b[31mОтвет неверный\x1b[0m');
      console.log(
        `правильный ответ был: ${qu.correctIndex + 1} > "${qu.options[qu.correctIndex]}"\n`,
      );
    }
    console.log();
    i++;
  };

  ask.close();
  console.log();
  console.log('Количество правильных ответов:', count, 'из', allQuestions);
  if (count === allQuestions) {
    console.log('Невероятно!!!!!');
  }
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
  // await init();

  const quiz = await loadQuiz(file);
  if (!quiz) {
    error('Невозможно загрузить вопросы квиза');
    return;
  }

  await gameCycle(quiz);
};

app();
