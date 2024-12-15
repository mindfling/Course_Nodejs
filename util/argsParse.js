const isText = (str) => isNaN(parseInt(str));

const isNumber = (str) => !isNaN(parseInt(str));

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
      if (isText(argv[1])) {
        // если НЕчисло то это text: title или status
        args['text'] = argv[1];
        // console.log('1й параметр текст');
      } else {
        // если ЧИСЛО то это id
        // console.log('1й параметр число');
        args['id'] = argv[1];
      }
    }

    if (argv[2] && isText(argv[2])) {
      // если есть 2й параметр
      // если текст то это текстовое значение title OR status;
      args['text'] = argv[2];
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
