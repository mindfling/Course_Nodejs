import { log, error } from 'node:console';
import { read } from './modules/read.js';
import { write } from './modules/write.js';
import readline from 'node:readline/promises';

log()
console.log('\x1b[36mHello \x1b[0mreadline\n');

// // todo rl readline with bash
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ':> ',
});




console.log('\x1b[33mКакое ваше имя?\n\x1b[32m');
rl.prompt();

// const ans = await rl.question('Какое ваше имя?\n:\\> ');

rl.on('line', (ans) => {

  if (ans === 'exit' || ans == 0) {
    log('\x1b[4;35mGood bye and Good night')
    rl.close(); /// close exit
    return;
  } else {

    log(`\x1b[0mПриветствуем тебя, \x1b[91mо владыка \x1b[0;35mВеликий, \x1b[95m${ans}\x1b[0m!`);
    log('\nСкажи что-нибудь еще...')
    rl.prompt();
  }

});






/*
 * Программа должна использовать консольный ввод и вывод для взаимодействия с пользователем:

- В начале программы, выведите приветственное сообщение и инструкции для пользователя.
  * init() // //todo

- Создайте переменные для отслеживания текущего вопроса и количества правильных ответов. Изначально оба значения должны быть равны 0.
  * currQuestion

- На каждой итерации квиза, выведите текущий вопрос и варианты ответов.
- Пользователь должен будет ввести номер варианта ответа.
- Проверьте, является ли введенный ответ числом и находится ли он в диапазоне допустимых значений.
- Если число валидно, то проводим проверку на правильность, если число невалидно, то задаем вопрос снова.
- Если введенный ответ правильный, увеличьте счетчик правильных ответов.
- После каждого ответа, выведите сообщение о том, правильный ли был выбран ответ.
- Перейдите к следующему вопросу и повторите шаги с 6 по 10 до тех пор, пока не пройдетесь по всем вопросам из массива.
- По окончании квиза, выведите сообщение о завершении и общее количество правильных ответов.
*/

const test = 
[
  {
    question: "Что такое CommonJS?",
    options: [
      "Модульная система для разработки веб-приложений на Node.js",
      "Стандарт для организации модулей в JavaScript",
      "Библиотека для работы с базой данных в Node.js"
    ],
    correctIndex: 1
  },
  {
    "question": "Какие встроенные модули позволяют работать с файловой системой в Node.js?",
    "options": [
      "http и https",
      "crypto и zlib",
      "fs и path"
    ],
    "correctIndex": 2
  },
  {
    "question": "Что такое EventEmitter в Node.js?",
    "options": [
      "Модуль для работы с базой данных",
      "Фреймворк для разработки веб-серверов",
      "Класс, который позволяет генерировать и слушать события"
    ],
    "correctIndex": 2
  }
]


// const quiz = fs.readFileSync('./questions.json'); // todo
// const quiz = test;
// const questionAmount = quiz.length;
// quiz.forEach((curr, index) => {
//   console.log('Спросить пользователя о текущем ворпосе');
//   let userAnswer = prompt();
// });

// let current = quiz[0];
// log('current: ', current);

/*
const currQuestion = current.question;
const currOptions = current.options;
const numberOfOptions = currOptions.length;

const currCorrectIndex = current.correctIndex;
const currCorrectAnswer = currOptions[currCorrectIndex];


const isValidAnswer = (userAns, numberOfOptions) => {
  return (userAns > 1) && (userAns < numberOfOptions);
}
*/

