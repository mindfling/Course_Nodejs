const isText = (str) => isNaN(parseInt(str));

const isNumber = (str) => !isNaN(parseInt(str));

export const argsParse = ([, , ...argv], words = [], commands = {}) => {
  // убираем превые два символа через рест
  // console.log('parse argv: ', argv);
  // console.log('parse words: ', words);

  const args = {};
  // console.log('parse args: ', args);

  const command = argv[0];
  // console.log('parse command: ', command);

  for (const word of words) {
    // выставляем все опции в значения поумолчанию false
    args[word] = false;
  }

  // проверяем есть ли 0й параметр команда???
  if (words.includes(argv[0])) {
    // здесь проверяем только 1й параметр
    // ПРЕДПОЛАГАЕМ что
    args[argv[0]] = true; // 0й - это комманда

    if (argv[1]) {
      // если есть 1й параметр
      if (isText(argv[1])) {
        // 1й - если НЕчисло то это text: title или status
        args['text'] = argv[1];
        console.log('1й параметр текст');
      } else {
        // 1й - если ЧИСЛО то это id
        console.log('1й параметр число');
        args['id'] = argv[1];
      }
    }

    if (argv[2] && isNaN(parseInt(argv[2]))) {
      // если есть 2й параметр
      args['text'] = argv[2]; // title OR status; // 2й - это
    }
  }
  console.log();


  // проходим все параметры по циклу
  for (let i = 0; i < argv.length; i++) {
    // const current = argv[i];

    if (argv[i][0] !== '-') {
      // игнорируем значения т.е. строки без "-"
      continue;
    }

    if (argv[i].startsWith('-no-')) {
      args[argv[i].substring(4)] = false;
      continue;
    }

    if (argv[i].startsWith('--')) {
      if (argv[i].includes('=')) {
        const [key, value] = argv[i].split('=');
        args[key.substring(2)] = value;
      } else {
        args[argv[i].substring(2)] = true;
      }
      continue;
    }

    if (argv[i + 1] && argv[i + 1][0] !== '-') {
      // т.е. е следщ параметр это значение

      if (argv[i].startsWith('--')) {
        // т.е. обрез два символа "--"
        args[argv[i].substring(2)] = argv[i + 1];
      } else {
        // т.е. обрез первый символ "-"
        args[argv[i].substring(1)] = argv[i + 1];
      }
      continue;
    }

    // т.е. без первых символов  "-" и "--"
    args[argv[i].substring(1)] = true;
  }

  return args;
};
