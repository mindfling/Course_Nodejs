import { error } from 'node:console';
import { readFile } from 'node:fs/promises';
import path, { dirname, join, basename, extname } from 'node:path';
import URL from 'node:url';
import readline from 'node:readline/promises';


const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = join(__dirname, 'game/question.json');
const resultDir = dirname(file);
const newFile = join(resultDir, basename(file, extname(file)) + '.txt');


const loadQuiz = async (path) => {
  return await readFile(path) // читаем файл в буфер
    .then(buff => buff.toString('utf8')) // перекодируем буфер в строку
    .then(text => JSON.parse(text)) // парсим текстовую строку в json
    .then(json => {
      console.log(`Файл "${path}" успешно прочитан и распарсин`);
      return json; // возвращаем объект json
    })
    .catch(err => {
      console.error(`При чтении произошла файла "${path} Ошибка" : ${err.message}`);
    });
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
    console.log('Вопрос', i, `из ${quiz.length}:`);
    console.log(`Вопрос ${i}: "${qu.question}"` + 
      `Варианты ответов:\n` + 
      `${qu.options.map((opt, j) => `${j + 1}. ${opt}`).join('\n')}\n`);

    const userAns = await ask.question(`Ваш ответ: `);

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
  return name;
}

const app = async () => {
  const name = await init();

  const quiz = await loadQuiz(file);
  if (!quiz) {
    error('Невозможно загрузить вопросы квиза');
    return;
  }
  console.log(`Загружено ${quiz.length} вопросов Квиза`);

  await gameCycle(quiz);
  console.log(`Поздравляем вас, ${name},\nВы прошли тест`);
};

app();
