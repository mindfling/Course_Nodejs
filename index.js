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

const init = async () => {
  const buff = await read('./game/question.json');
  // console.log('\nbuff buff:', typeof buff, '=', buff);
  const text = buff.toString('utf8');
  //? Вопрос //test = buff.toJSON() //почему не работает
  // console.log('\ntext:', typeof text, '=', text);
  test = JSON.parse(text);
  // console.log('\ntest:', typeof test, '=', test);
};

const nextQuestion = () => {
  count++; // next count
  if (count >= test.length) {
    log('Это был последний ворпос');
    rl.close();
  }
  console.log('Вопрос', count, ':');
  current = test[count];
  console.log('Текущий вопрос:', current.question);
  console.log('Варианты ответов:');
  current.options.forEach((option, j) => {
    log(`${j + 1}: ${option}`);
  });
  console.log('Ваш ответ: ');
  rl.setPrompt('Ваш вариант ответа: ')
  rl.prompt();
};

const checkAnswer = userAnswer => {
if (userAnswer != 1 || userAnswer != 2 || userAnswer != 3 ) {

} else if (userAnswer === '0') {
    log('Вы ответели 0 ---> команда к завершению игры');
  } 
};

rl.on('line', ans => {
  log(`Вы ответели "${ans}"\n\n`);

  checkAnswer(ans); //todo

  if (ans === 'exit' || ans === '0') {
    log('\n\x1b[1;35mЗакрываем приложение');
    rl.close();
    // ---> process.exit();
    return;

    // } else if (count >= test.length) {
    //   log('Это был последний ворпос');
    //   rl.close();
    //   return;
  }

  nextQuestion();

  // } else if (ans === 'test') {
  //   log(test);
  //   rl.emit('line')

  // } else if (ans === 'time') {
  //   log('now is the time:');
  //   const time = new Date();
  //   log(`time is:
  //     год ${time.getFullYear()} месяц ${time.getMonth()} число ${time.getDate()} день ${time.getDay()}
  //     `)
  //   // rl.emit('line')
  //   nextQuestion();
  // } else {
  //   // продолжаем вопросы
  //   log('\nВаш вариант ответа')
  //   nextQuestion();
  //   rl.prompt();
  // }
});

rl.on('close', () => {
  log('\x1b[1;35mGood bye and Good night');
  // App closed
  process.exit();
});

const app = async () => {
  await init();
  log('Количество вопросов в Квизе:', test.length);

  log('\x1b[35mHello, Давайте поиграем\x1b[0m\n');
  // rl.prompt();
  nextQuestion();
};

app();
