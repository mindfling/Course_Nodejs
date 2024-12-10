export const argsParse = ([, , ...argv]) => {
  // убираем превые два символа через рест  
  console.log('lets parse');

  const args = {};

  // проходим все параметры по циклу
  for (let i = 0; i < argv.length; i++) {
    if (argv[i][0] !== '-') {
      // убираем значения т.е. строка без "-"
      continue;
    }

    if (argv[i+1] && argv[i+1][0] !== '-') {
      // т.е. е следщ параметр это значение
      args[argv[i].substring(1)] = argv[i+1]
    } else {
      
      // т.е. без первого символа "-"
      args[argv[i].substring(1)] = true;
    }
  }

  return args;
};
