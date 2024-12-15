#!/usr/bin/env node
import { argsParse } from './util/argsParse.js';
import { log, time } from 'node:console';
import { readJsonData } from './modules/read.js';
import { writeJsonData } from './modules/write.js';

import { dirname, join, basename, extname } from 'node:path';
import URL from 'node:url';
import chalk from 'chalk';

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FILENAME = 'todolist.json';
const todoPath = join(__dirname, FILENAME); // путь к файлу БД


const init = async () => {
  // читаем файл список задач и проверяем его существование
  const taskList = await readJsonData(todoPath); // ? // todo
  if (taskList) {
    log(chalk.green(`Файл списка задач в текущем каталоге найден... Ok`));
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
  const options = argsParse(args, words, commands); //?

  // выводит список задач
  const printTaskList = list => {
    log(chalk.green(`\nСписок задач:`));
    list.forEach((task, index) => {
      log(`${chalk.yellow(index + 1)}. [ ${task.status} ] ${chalk.whiteBright(task.title)}`);
    });
  };

  // todo HELP
  // help вывести эту справку.
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
  }


  // todo list
  // list: вывести список всех задач.
  if (options.list) {
    // const taskList = await readJsonData(todoPath);
    printTaskList(taskList);
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
  }

  // todo update N title
  // update <id:number> <"newTask":string>: обновить задачу с указанным идентификатором.
  // options.update = updatedTask
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
  }


  // todo status N
  // status <id:number> <"newStatus":string>: обновить статус задачи с указанным идентификатором.
  if (options.status) {
    if (options.id) {
      // const taskList = await readJsonData(todoPath);
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
  }


  // todo get
  // get <id:number>: вывести информацию о задаче с указанным идентификатором.
  if (options.get) {
    if (options.id) {
      // const taskList = await readJsonData(todoPath);
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
  }


  // todo delete
  // delete <id:number>: удалить задачу с указанным идентификатором.
  if (options.delete) {
    if (options.id) {
      // const taskList = await readJsonData(todoPath);
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
  }

};

app();
