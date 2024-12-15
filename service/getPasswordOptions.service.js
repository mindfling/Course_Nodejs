import readline from 'node:readline/promises';
import { log } from 'node:console';
import { stdin, stdout } from 'node:process';

export const getPasswordOptions = async () => {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  const length = parseInt(await rl.question('\nДлина пароля? [8] : ')) || 8;

  const uppercase =
    ((
      await rl.question('Добавить Большие латинские буквы? (y/n) [y] : ')
    ).toLowerCase() || 'y') === 'y';

  const number =
    ((
      await rl.question('Добавить цифры? (y/n) [y] : ')
    ).toLowerCase() || 'y') === 'y';

  const special =
    ((
      await rl.question('Добавить специальные символы? (y/n) [y] : ')
    ).toLowerCase() || 'y') === 'y';

  const lowercyrus =
    ((
      await rl.question('Добавить строчные буквы кириллицы? (y/n) [y] : ')
    ).toLowerCase() || 'y') === 'y';

  const uppercyrus =
    ((
      await rl.question('Добавить Большие ЗАГЛАВНЫЕ буквы кириллицы? (y/n) [y] : ')
    ).toLowerCase() || 'y') === 'y';

  rl.close();

  return {
    length,
    uppercase,
    number,
    special,
    lowercyrus,
    uppercyrus,
  };
};
