import {log} from 'node:console';

export const argsParse = ([, , ...argv]) => {
  // убираем превые два символа через рест
  log('lets parse:\n');
  argv.forEach(value => log(value))
  log('')

  const args = {};

  // проходим все параметры по циклу
  for (let i = 0; i < argv.length; i++) {
    const current = argv[i]
    if (argv[i][0] !== '-') {
      // игнорируем значения т.е. строки без "-"
      log('current: ', current, ' ИГНОРИРУЕМ БЕЗ -');
      continue;
    }
    
    if (argv[i + 1] && argv[i + 1][0] !== '-') {
      // т.е. е следщ параметр это значение
      
      if (argv[i].startsWith('--')) {
        log('current: ', current, ' START WITH --');
        // т.е. обрез два символа "--"
        args[argv[i].substring(2)] = argv[i + 1];
      } else {
        log('current: ', current, ' START WITH -');
        // т.е. обрез первый символ "-"
        argv[argv[i].substring(1)] = argv[i + 1];
      }
      continue;
    }

    // т.е. без первых символов  "-" и "--"
    args[argv[i].substring(1)] = true;
  }

  return args;
};
