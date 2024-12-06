import { read } from './modules/read.js';
import readline from 'node:readline/promises';
import { log } from 'node:console';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\x1b[32m#: \x1b[0m',
  // prompt: '\x1b[32mYour answer: \x1b[0m',
});

// GLOBALS
let test = [];
let count = 0;
let current = null;
// current.question.length
let rightAnswers = 0;
let questionNumber = 0; // test.length;


const loadQuiz = async (path) => {
  const buff = await read(path);
  console.log('path: ', path);
  const text = buff.toString('utf8');
  //? Вопрос //test = buff.toJSON() //почему не работает
  return JSON.parse(text);
}

const init = async () => {
  test = await loadQuiz('./game/question.json');
  console.log('Вопросы загружены\n');
};

const isValideAnswer = ans => {
  if (isNaN(ans)) {
    return false;
  }
  ans = parseInt(ans);
  return (ans >= 0 && ans <= current.question.length);
};

const nextQuestion = () => {
  count++; // next count
  if (count >= test.length) {
    log('Это был последний ворпос');
    rl.close();
    return;
  }
  console.log('Вопрос', count, 'из', test.length);
  current = test[count];
  console.log('Текущий вопрос:', current.question);
  console.log('Варианты ответов:');
  current.options.forEach((option, j) => {
    log(`${j + 1}: ${option}`);
  });
  console.log('Ваш ответ: ');
  rl.setPrompt('Ваш вариант ответа: ');
  rl.prompt();
};


const checkAnswer = userAnswer => {

  // todo
  if (!isValideAnswer(userAnswer)) {
    log('\x1b[33mЭто не корректный ответ\nпопробуйте еще раз\n');
    nextQuestion();
    return;
  }

  log('here userAnswer-1: ', parseInt(userAnswer)-1);
  log('here correctIndex', parseInt(current.correctIndex));

  if ((parseInt(userAnswer) - 1) == parseInt(current.correctIndex)) {
    rightAnswers++;
    log('\x1b[32mВы ответили правильно\x1b[0m');
    console.log('Правильных ответов: ', rightAnswers);
  } else {
    log('\x1b[31mВы ответили НЕ правильно\x1b[0m!');
  }
  log();
};


// ПРИ ВВОДЕ 
rl.on('line', ans => {

  log(`Вы ответели "${ans}"\n\n`);

  checkAnswer(ans);

  nextQuestion();
});


// ПРИ ЗАКРЫТИИ
rl.on('close', () => {
  log('\x1b[1;35mGood bye');
  // App closed
  process.exit();
});


// приложение
const app = async () => {
  await init();
  log('Количество вопросов в Квизе:', test.length);
  log('\n\x1b[35mHello, Давайте поиграем\x1b[0m\n');
  nextQuestion();
};

app();
