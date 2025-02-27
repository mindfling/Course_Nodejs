#!/usr/bin/env node
import { argsParse } from './util/argsParse.js';
import { log, time } from 'node:console';
import { readJsonData } from './modules/read.js';
import { writeJsonData } from './modules/write.js';
import os from 'node:os';
import { dirname, join, basename, extname } from 'node:path';
import URL from 'node:url';
import chalk from 'chalk';

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
    // log(chalk.green(`Файл списка задач в текущем каталоге найден... Ok`));
    return taskList;
  } else {
    log(chalk.magenta('Не могу прочитать файл списка задач в текущем каталоге... Error'));
    const result = await writeJsonData(todoPath, []);
    if (result) {
      log(chalk.whiteBright('В текущем каталоге создан пустой файл списка задач...\nПерезапустите приложение'));
    }
    process.exit();
    return;
  }
}


const app = async () => {
  const taskList = await init();

  const args = process.argv;

  // список доступных команд array
  const words = ['add', 'list', 'update', 'get', 'delete', 'status', 'help'];

  const commands = {};
  const options = argsParse(args, words, commands);

  // выводит список задач
  const printTaskList = list => {
    log(chalk.green(`\nСписок задач:`));
    list.forEach((task, index) => {
      log(`${chalk.yellow(index + 1)}. [ ${task.status} ] ${chalk.whiteBright(task.title)}`);
    });
  };

  // todo help вывести эту справку.
  if (options.help) {
    log('\nhelp Список доступных команд:');
    log(chalk.green(words.join(', ')));
    log();
    log(`${chalk.green('help')}  -  вывести эту справку.`);
    log(`${chalk.green('list')}  -  вывести список всех задач.`);
    log(`${chalk.green('add <"newTask">')} - добавить новую задачу.`);
    log(`${chalk.green('get <id:number>')}   - вывести информацию о задаче с указанным идентификатором.`);
    log(`${chalk.green('delete <id:number>')}  - удалить задачу с указанным идентификатором.`);
    log(`${chalk.green('update <id:number> <"newTask">')}   - обновить задачу с указанным идентификатором.`);
    log(`${chalk.green('status <id:number> <"newStatus">')} - обновить статус задачи с указанным идентификатором.`);

    process.exit();
  }


  // todo list
  // list: вывести список всех задач.
  if (options.list) {
    // const taskList = await readJsonData(todoPath);
    printTaskList(taskList);

    process.exit();
  }


  // todo add
  // add <"task":string>: добавить новую задачу.
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
    }

    process.exit();
  }


  // todo update N title
  // update <id:number> <"newTask":string>: обновить задачу с указанным идентификатором.
  // т.е. обновляем title задачи номер id
  if (options.update) {
    // todo validate id
    // const taskList = await readJsonData(todoPath);
    const id = options.id;
    taskList[id-1] = {
      title: options?.text,
      status: taskList[id-1]?.status,
    };
    // todo use Object.assing(objold, objnew)
    log(`Задача с идентефикатором ${id} обновлена`);
    await writeJsonData(todoPath, taskList);

    process.exit();
  }


  // todo status N
  // status <id:number> <"newStatus":string>: обновить статус задачи с указанным идентификатором.
  if (options.status) {
    if (options.id) {
      const id = options.id;
      const task = taskList[id-1];
      if(task) {
        taskList[id-1].status = options?.text;
        log(`Статус задачи с идентефикатором ${id} обновлен`);
        await writeJsonData(todoPath, taskList);
      } else {
        log(chalk.redBright('Отсутствует задача с id'), +id);
      }
    } else {
      log(chalk.magenta('Задача не может быть получена, отсутствует id'));
    }

    process.exit();
  }


  // todo get
  // get <id:number>: вывести информацию о задаче с указанным идентификатором.
  if (options.get) {
    if (options.id) {
      const id = !isNaN(parseInt(options.id)) ? +options.id : 0;
      const task = taskList[id-1];
      if(task) {
        log(
          `\n${chalk.green('Задача с идентефикатором')} ${chalk.yellowBright(id)}:\n` +
          `Название: ${chalk.whiteBright(task?.title)}\n` +
          `Статус:   ${chalk.whiteBright(task?.status)}\n`,
        );
      } else {
        log(chalk.redBright('Такая задача отсутствует'));
      }
    } else {
      log(chalk.magenta('Задача не может быть получена, отсутствует id'));
    }

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
        log(chalk.redBright('Такая задача отсутствует'));
      }
    } else {
      log(chalk.magentaBright('Задача НЕ может быть удалена, отсутствует id'));
    }

    process.exit();
  }


  // если нет других опций
  if (
    !options.help || !options.list ||
    !options.add || !options.update ||
    !options.status || !options.get ||
    !options.delete
  ) {
    log('\nИспользуйте help чтобы получить список доступных команд');
    log(`${chalk.green('help')}  -  вывести эту справку.`);
  }
}

app();
