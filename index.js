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
const todoPath = join(__dirname, 'todolist.json'); // путь к файлу БД


const init = async () => {
  const taskList = await readJsonData(todoPath); // ? // todo
  if (taskList) {
    log(chalk.green(`Файл списка задач в текущем каталоге найден... Ok`));
  } else {
    log(chalk.magenta('Не могу прочитать файл списка задач в текущем каталоге... Error'));
    const newTaskList = [{
      title: '',
      status: ''
    }];
    await writeJsonData(todoPath, newTaskList);
  }
}

const app = async () => {
  await init();

  const args = process.argv;

  // список доступных команд array
  const words = ['add', 'list', 'update', 'get', 'delete', 'status', 'help'];

  // todo help

  // список слов комманд in object
  const commands = {
    add: {
      title: '',
      status: 'В работе',
    },
    list: false,
    update: {
      title: '',
      id: NaN,
    },
    get: {
      id: NaN,
    },
    delete: {
      id: NaN,
    },
    help: false,
  };

  // func init();
  const options = argsParse(args, words, commands); //?
  // console.log('РАСПАРСЕРЕННЫЕ options: ', options);

  log('\ntodoPath: ', todoPath, chalk.green('прочитано... Ok'));
  // const taskList = await readJsonData(todoPath); // ? // todo


  // выводит список задач
  const printTaskList = list => {
    log(`\nСписок задач:`);
    list.forEach((task, index) => {
      log(`${chalk.yellow(index + 1)}. [ ${task.status} ] ${task.title}`);
    });
  };

  // todo list
  // list: вывести список всех задач.
  if (options.list) {
    const taskList = await readJsonData(todoPath);
    printTaskList(taskList);
  }


  // todo add
  // add <"task":string>: добавить новую задачу.
  if (options.add) {
    if (options.text) {
      const taskList = await readJsonData(todoPath);
      const id = taskList.push({
        title: options?.text,
        status: 'В РАБОТЕ',
      });
      await writeJsonData(todoPath, taskList);
      log(chalk.greenBright('Задача добавлена с идентефикатором'), id);
    } else {
      log(chalk.magenta('Задача не может быть добавлена, нет описания задачи'));
    }
  }

  // todo update N title
  // update <id:number> <"newTask":string>:
  // обновить задачу с указанным идентификатором.
  // options.update = updatedTask
  // const updatedTask = {
  //   id: 4, //N,
  //   title: 'Обновленный title',
  //   status: 'тот же ejy bhb',
  // };
  // т.е. обновляем title задачи номер id
  if (options.update) {
    // todo validate id
    const taskList = await readJsonData(todoPath);
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
    const taskList = await readJsonData(todoPath);
    const id = options.id;
    taskList[id-1].status = options?.text;
    log(`Статус задачи с идентефикатором ${id} обновлен`);
    await writeJsonData(todoPath, taskList);
  }

  // todo get
  // get <id:number>: вывести информацию о задаче с указанным идентификатором.
  if (options.get) {
    if (options.id) {
      const taskList = await readJsonData(todoPath);
      const id = !isNaN(parseInt(options.id)) ? +options.id : 0;
      const task = taskList[id-1];
      if(task) {
        log(
          `\nЗадача с идентефикатором ${chalk.yellowBright(id)}:\n` +
          `Название: ${task?.title}\n` +
          `Статус: ${task?.status}\n`,
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
      const taskList = await readJsonData(todoPath);
      const id = options.id;
      
      if (taskList[id-1]) {
        taskList.splice(id-1, 1); // удаляем элемент массива
        await writeJsonData(todoPath, taskList); // перезаписываем в файл
        log(chalk.greenBright(`Задача с идентефикатором ${id} удалена`));
      } else {
        log(chalk.redBright('Такая задача отсутствует'));
      }

    } else {
      log(chalk.magentaBright('Задача НЕ может быть удалена, отсутствует id'));
    }
  }
};

app();
