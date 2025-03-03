#!/usr/bin/env node
import chalk from 'chalk';
import { log } from 'node:console';
import os from 'node:os';
import { dirname, join } from 'node:path';
import URL from 'node:url';
import { read, readJsonData } from './modules/read.js';
import { writeJsonData } from './modules/write.js';
import { argsParse, isNumber } from './util/argsParse.js';

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const homedir = os.homedir(); // создавать файл в папке пользователя
const user = os.userInfo().username; // использовать имя пользователя
const FILENAME = `${user}.todolist.json`;
// путь к файлу БД
const todoPath = join(homedir, FILENAME);


const init = async () => {
  // инициализируем файл списока задач и проверяем его существование
  const taskList = await readJsonData(todoPath);
  if (taskList) {
    // log(chalk.green(`Файл списка задач в каталоге ${todoPath} найден...`),  chalk.blueBright(`Ok`));
    return taskList;
  } else {
    log(chalk.magenta('Не могу прочитать файл списка задач в текущем каталоге...'), chalk.red('Error'));
    const result = await writeJsonData(todoPath, []); // создаем пустой файл todolist
    if (result) {
      log(chalk.whiteBright('В текущем каталоге создан пустой файл списка задач...\n'), chalk.red('Перезапустите приложение'));
    }
    process.exit();
    return;
  }
}


const printHelpList = (words = []) => {
  // вывести справку
  log('Приложение для работой с todo листом');
  log(chalk.yellow('node todo <commands> [options] <id> <title> <status>'))
  log('\nhelp Список доступных команд:');
  log(chalk.greenBright(words.join(', ')));
  log();
  log(`${chalk.green('help')} - вывести эту справку.`);
  log(`${chalk.green('list')} - вывести список всех задач.`);
  log(`${chalk.green('add <newTask: строка в кавычках>')} - добавить новую задачу.`);
  log(`${chalk.green('get <id:number>')} - вывести информацию о задаче с указанным идентификатором.`);
  log(`${chalk.green('update <id:number> <newTask: строка>')} - обновить задачу с указанным идентификатором.`);
  log(`${chalk.green('delete <id:number>')} - удалить задачу с указанным идентификатором.`);
  log(`${chalk.green('status <id:number> <newStatus: строка>')} - обновить статус задачи с указанным идентификатором.`);
}


const printTodoList = list => {
  // выводит список задач
  log(chalk.green(`\nСписок задач:`));
  log(`${chalk.yellow('#')}. [ status ] ${chalk.whiteBright('<task title>')}\n`);
  list.forEach((task, index) => {
    if (task) {
      log(`${chalk.yellow(index + 1)}. [ ${task?.status} ] ${chalk.whiteBright(task?.title)}`);
    } else {
      log('НЕТ ЗАДАЧИ')
    }
  });
};


const app = async () => {
  const taskList = await init();

  const args = process.argv;

  // список доступных команд array
  const words = [
    'help',
    'list',
    'add',
    'get',
    'update',
    'delete',
    'status',
  ];

  const commands = {};
  const options = argsParse(args, words, commands);


  // * todo help вывести справку.
  // help - вывести эту справку
  if (options.help) {
    printHelpList();
    process.exit();
  }


  // * todo list
  // list - вывести список всех задач.
  if (options.list) {
    // const taskList = await readJsonData(todoPath);
    printTodoList(taskList);
    log();
    if (options.id) {
      log(chalk.magenta('Использованы лишние числовые аргументы команды. Используйте просто'));
      log(`use it: ${chalk.green('todo list')} - вывести список всех задач.`);
    }
    if (options.text) {
      log(chalk.magenta('Использованы лишние текстовые аргументы команды. Используйте просто'));
      log(`use it: ${chalk.green('todo list')} - вывести список всех задач.`);
    }
    process.exit();
  }


  // todo add
  // add <task:string>: добавить новую задачу.
  if (options.add) {
    if (options.text) {
      // const taskList = await readJsonData(todoPath);
      const id = taskList.push({
        title: options?.text,
        status: 'В РАБОТЕ',
      });
      await writeJsonData(todoPath, taskList);
      log(chalk.greenBright('\nЗадача добавлена с идентефикатором'), id);
    } else {
      log(chalk.magenta('\nЗадача не может быть добавлена, нет описания задачи'));
      log(`use it: ${chalk.green('todo add <newTask>')} - добавить новую задачу.`);
    }
    process.exit();
  }


  // todo get
  // get <id:number>: вывести информацию о задаче с указанным идентификатором.
  if (options.get) {
    if (options.id) {
      // const id = !isNaN(parseInt(options.id)) ? +options.id : 0;
      const id = isNumber(options.id) ? +options.id : 0;
      const task = taskList[id-1];
      if(task) {
        log(
          `\n${chalk.green('Задача с идентефикатором')} ${chalk.yellowBright(id)}:\n` +
          `Название: ${chalk.whiteBright(task?.title)}\n` +
          `Статус:   ${chalk.whiteBright(task?.status)}\n`,
        );
      } else {
        // log(chalk.redBright('Такая задача отсутствует'));
        log(`\n${chalk.green('Задача с идентефикатором')} ${chalk.yellowBright(id)}: ${chalk.redBright('Задача отсутствует')}`);
      }
    } else {
      log(chalk.magenta('\nЗадача не может быть получена, отсутствует id'));
      log(`use it: ${chalk.green('get <id:number>')} - вывести информацию о задаче с указанным идентификатором.`);
    }
    process.exit();
  }


  // todo update N title
  // update <id:number> <"newTask":string>: обновить задачу с указанным идентификатором.
  // т.е. обновляем title задачи номер id
  if (options.update) {
    console.log('options: ', options);
    // const taskList = await readJsonData(todoPath);

    if (taskList[options.id-1]) {
      //todo

    } else {
      // todo
    }

    if (options.id) {
      //todo
      log('есть id')

    } else {
      log(chalk.magenta('\nЗадача не может обновлена, отсутствует id'));
      log(`${chalk.green('update <id:number> <newTask: строка>')} - обновить текст задачи с указанным идентификатором id.`);
      process.exit();
    }

    if (options.text) {
      //todo

    } else {
      // todo
    }

    const id = options.id;

    taskList[id-1] = {
      title: options?.text,
      status: taskList[id-1]?.status,
    };
    // todo use Object.assing(objold, objnew)
    log(`Задача с идентефикатором ${id} обновлена`);
    await writeJsonData(todoPath, taskList);

    // todo
    // else
    // log('use it:')

    process.exit();
  }


  // todo delete
  // delete <id:number>: удалить задачу с указанным идентификатором.
  if (options.delete) {
    if (options.id) {
      const id = options.id;
      if (taskList[id-1]) {
        taskList.splice(id-1, 1); // удаляем элемент массива
        await writeJsonData(todoPath, taskList); // перезаписываем в файл
        log(chalk.greenBright(`Удалена задача с идентефикатором`), +id);
      } else {
        log(chalk.magenta('\nЗадача не может быть удалена ') + chalk.redBright('Отсутствует задача с id'), +id);
        log(`use it: ${chalk.green('delete <id:number>')} - удалить задачу с указанным идентификатором.`);
      }
    } else {
      log(chalk.magentaBright('Задача НЕ может быть удалена, отсутствует id'));
      log(`use it: ${chalk.green('delete <id:number>')} - удалить задачу с указанным идентификатором.`);
    }
    process.exit();
  }


  // todo status N
  // status <id:number> <"newStatus":string>: обновить статус задачи с указанным идентификатором.
  if (options.status) {
    if (options.id) {
      const id = options.id;
      const task = taskList[id-1];
      if(task) {
        taskList[id-1].status = options.text ? options.text : 'Undone';
        await writeJsonData(todoPath, taskList);
        log(`Статус задачи с идентефикатором ${id} обновлен на ${chalk.greenBright(taskList[id-1].status)}`);
      } else {
        log(chalk.magenta('\nСтатус задачи не может быть обновлен ') + chalk.redBright('Отсутствует задача с id'), +id);
      }
    } else {
      log(chalk.magenta('\nСтатус задачи не может быть обновлен, отсутствует id'));
      log(`use it: ${chalk.green('status <id:number> <newStatus>')} - обновить статус задачи с указанным идентификатором.`);
    }
    process.exit();
  }


  // если ни одна из опций не сработала
  if (
    !options.help || !options.list ||
    !options.add || !options.update ||
    !options.status || !options.get ||
    !options.delete
  ) {
    log('todo\nПриложение для работы с todo листом');
    log('\nИспользуйте команду help чтобы получить список доступных команд');
    log(`${chalk.green('todo help')} - вывести справку.`);
  }


  // *** user cheatcodes --database ***
  if (options.database) {
    // `cat '~/user.todolist.json'`
    log('Read database file:')
    const rawfile = await read(todoPath);
    const textfile = rawfile.toString('utf-8')
    // log('rawfile:\n', rawfile);
    log('textfile:\n', textfile);
  }

  // *** user cheatcodes --path ***
  if (options.path) {
    log()
    // `echo ~`
    // `echo pwd`
    log(`user folder: ${os.homedir}`)
    log(`current folder: ${__dirname}`)
    log()
    // `echo '~/user.todolist.json'`
    // `echo './todo.js'`
    log(`database path: ${todoPath}`)
    log(`this path: ${__filename}`)
  }
}

app();
