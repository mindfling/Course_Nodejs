export const argsParse = ([, , ...argv], words = []) => {
  // убираем превые два символа через рест

  const args = {};

  for (const key of words) {
    args[key] = false;
  }

  if (words.includes(argv[0])) {
    args[argv[0]] = true;
  }

  // проходим все параметры по циклу
  for (let i = 0; i < argv.length; i++) {
    const current = argv[i];

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
