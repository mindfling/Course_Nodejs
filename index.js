#!/usr/bin/env node

import { argsParse } from './util/argsParse.js';
import { log } from 'node:console';

import { readJsonData, readTasks } from './modules/read.js';
import { writeTasks } from './modules/write.js';

import { dirname, join, basename, extname } from 'node:path';
import URL from 'node:url';


const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const todoPath = join(__dirname, 'todolist.json');


const app = async () => {
  const args = process.argv;

  // список доступных команд
  const words = [
    'add',
    'list',
    'update',
    'get',
    'delete',
    'help'
  ];

  const options = argsParse(args, words); //?
  let taskList = [];
  taskList = await readJsonData(todoPath);

  const newTask = {
    // id: 1,
    title: 'Помыть слона',
    status: 'Выполнено',
  }


  // todo add
  // add <"task":string>: добавить новую задачу.
  if (options.add) {
    // taskList = readTasks() //
    const id = taskList.push({
      // id: 1, // ! id это просто номер списка
      title: options.add,
      status: 'В работе',
    })
    // writeTasks(taskList)
    log('Задача добавлена с идентефикатором', id)
  }


  // todo list
  // list: вывести список всех задач.
  if (options.list) {
    taskList = readJsonData(todoPath); // здесь читаем todolist.json
    log(`Список задач:`)
    taskList.forEach((task, index) => {
      log(`\x1b[33m${index}. \x1b[0m[${task.status}] ${task.title}`);
    })
  }


  // todo update N title
  // update <id:number> <"newTask":string>:
  // обновить задачу с указанным идентификатором.
  // todo options.update = updatedTask
  updatedTask = {
    id: N,
    title: 'Обновленный title',
    status: 'тот же'
  }
  // т.е. обновляем title задачи номер id
  if (options.update) {

    log(`Задача с идентефикатором ${id} обновлена`)
  }

  // todo status N 
  if (options.status) {
    const id = options.get;
    const task = getTask(id);
    log(`Статус задачи с идентефикатором ${task.id} обновлен`)
  }


  // todo get
  // get <id:number>: вывести информацию о задаче с указанным идентификатором.
  if (options.get) {
    const id = options.get;
    // todo validate id number (id=1..len)
    const task = taskList[id];
    log(`задача с идентефикатором ${id}:` +
        `Название: ${task?.title}` +
        `Статус: ${task?.status}`);
  }


  // todo delete
  if (options.delete || options.del) {
    taskList.unshift()
    writeTasks(taskList)
    log(`Задача с идентефикатором ${task.id} удалена`)
  }


};

app();
