export const isText = (str) => isNaN(parseInt(str));

export const isNumber = (str) => !isNaN(parseInt(str));

export const argsParse = ([, , ...argv], words = [], commands = {}) => {
  const args = {};

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
      // если ТЕКСТ
      if (isText(argv[1])) {
        const textList = [];
        // собираем все оставшиеся аргументы в текстовую строку
        for (let i = 1; i < argv.length; i++) {
          textList.push(argv[i])
        }
        // если НЕчисло то это слово или несколько слов text: title или status
        args.text = textList.join(' ');

      } else {
        // если ЧИСЛО то это id
        // console.log('1й параметр число');
        // args['id'] = argv[1];
        args.id = parseInt(argv[1])
        // если за id числом есть еще текст
        if (argv[2] && isText(argv[2])) {
          const textList = [];
          // то собираем все оставшиеся аргументы в текстовую строку
          for (let i = 2; i < argv.length; i++) {
            textList.push(argv[i])
          }
          // если НЕчисло то это слово или несколько слов text: title или status
          args.text = textList.join(' ');
        }
      }
    }
  }


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
