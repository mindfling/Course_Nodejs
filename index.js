#!/usr/bin/env node

import { argsParse } from './util/argsParse.js';
import { log } from 'node:console';
import { generate as charset } from './util/charsets.js';


import { dirname, join, basename, extname } from 'node:path';
import URL from 'node:url';


import { readTasks } from './modules/read.js';
import { writeTasks } from './modules/write.js';

import { readFile } from 'node:fs/promises';


const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = join(__dirname, 'files/todolist.json');
const resultDir = dirname(file);
const newFile = join(resultDir, basename(file, extname(file)) + '.txt');



const loadTaskList = async (path) => {
  return await readFile(path) // читаем файл в буфер
    .then(buff => buff.toString('utf8')) // перекодируем буфер в строку
    .then(text => JSON.parse(text)) // парсим текстовую строку в json
    .then(json => {
      console.log(`Файл "${path}" успешно прочитан и распарсин`);
      return json; // возвращаем объект json
    })
    .catch(err => {
      console.error(`При чтении произошла файла "${path} Ошибка" : ${err.message}`);
    });
};


const readTasks = async () => {
  const path = './files/tasks.json';
  const buff = await read(path);
  const text = buff.toString('utf8');
  const taskList = JSON.parse(text);
  return taskList;
}

const writeTasks = async (path, json) => {
  const text = JSON.stringify(json);
  await write(path, text);
}


const app = () => {
  const args = process.argv;

  const words = [
    'add',
    'list',
    'update',
    'get',
    'delete',
    // 'test'
  ];

  const options = argsParse([, , ...args], words);

  const taskList = []

  // todo add
  if (options.add) {
    taskList = await readTasks()
    taskList.push({
      id: 1,
      title: 'Купить слона',
      status: 'undone',
    })
    await writeTasks(taskList)
    log('Задача добавлена с идентефикатором', task.id)
  }

  // todo list
  if (options.list) {
    taskList = readTasks()
    log('Список задач:')
    taskList.forEach((task, index) => {
      log(`${task.id}. [${task.status}] ${task.title}`)
    })
  }

  // todo update N title
  if (options.update) {
    log(`Задача с идентефикатором ${task.id} обновлена`)
  }

  // todo status N 
  if (options.status) {
    const id = options.get;
    const task = getTask(id);
    log(`Статус задачи с идентефикатором ${task.id} обновлен`)
  }

  // todo get
  if (options.get) {
    const id = options.get;
    const task = getTask(id);
    log(`задача с идентефикатором ${task.id}:
        Название: ${task.title}
        Статус: ${task.status}
    `);
  }

  // todo delete
  if (options.delete || options.del) {
    taskList.unshift()
    writeTasks(taskList)
    log(`Задача с идентефикатором ${task.id} удалена`)
  }


};

app();
