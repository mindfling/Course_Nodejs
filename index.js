import { read } from './modules/read.js';
import readline from 'node:readline/promises';
import { log } from 'node:console';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\x1b[32mYour answer: \x1b[0m',
});

let test = [];
let count = 0;
let current = null;


const nextQuestion = () => {
  current = test[count];
  log('Текущий вопрос:', current.question)
  log('варианты ответа:')
  current.options.forEach((option, j) => {
    log(`${j+1}: ${option}`)
  });
  count++;
  if (test[count >= test.length]) {
    log('that is the end')
    rl.close();
  }
}

const init = () => {
  // test = await read('./game/question.json');
  // console.log('test: ', test);

  /*
  test = [
    {
      "question": "Что такое CommonJS?",
      "options": [
        "Модульная система для разработки веб-приложений на Node.js",
        "Стандарт для организации модулей в JavaScript",
        "Библиотека для работы с базой данных в Node.js"
      ],
      "correctIndex": 1
    },
    {
      "question": "Какие встроенные модули позволяют работать с файловой системой в Node.js?",
      "options": [
        "http и https",
        "crypto и zlib",
        "http и https",
        "crypto и zlib",
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
    },
  ]
  */

  log('\x1b[35mHello, lets play ))\x1b[0m');
  rl.prompt();
};


rl.on('line', ans => {
  log(`Ваш ответ "${ans}"`);
  log(count);

  //todo
  if (count > 5) {
    rl.close();
    return;

  } else if (ans === 'exit' || ans === 'quit' || ans === '0') {
    log('\x1b[1;35mGood bye and Good night')
    rl.close();
    // ---> process.exit();
    return;

  } else if (ans === 'test') {
    log(test);
    rl.emit('line')

  } else if (ans === 'time') {
    log('now is the time:');
    const time = new Date();
    log(`time is:
      год ${time.getFullYear()} месяц ${time.getMonth()} число ${time.getDate()} день ${time.getDay()}
      `)
    // rl.emit('line')
    nextQuestion();

  } else {
    // продолжаем вопросы
    log('\nСкажи что-нибудь еще...')
    nextQuestion();
    log('промпт')
    rl.prompt();
  }
});

rl.on('close', () => {
  console.error('Good Bye! App closed');
  process.exit();
});


const app = async () => {
  // init();

  const buff = await read('./game/question.json')
  console.log('\nbuff buff:', typeof buff, '=', buff);

  const text = buff.toString('utf8');
  console.log('\ntext:', typeof text, '=', text);

  test = JSON.parse(text);
  console.log('\ntest:', typeof test, '=', test);
}

app();
