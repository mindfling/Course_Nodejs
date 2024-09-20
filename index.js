import { Logger } from "./modules/Logger.js";

console.log('Hello index logger');

// todo test Logger see task2
const logger = new Logger('log.txt', 1024);

logger.on('messageLogged', message => {
  console.log('Записано сообщение:', message);
});

logger.log('Первое сообщение');
logger.log('Второе сообщение');

