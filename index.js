import { Logger } from "./modules/LoggerSync.js";


console.log('Hello index logger');

// todo test Logger see task2
const logger = new Logger('log.txt', 102);

logger.on('messageLogged', message => {
  console.log();
  console.log('LISTENER: Записано сообщение: "' + message + '"');
  console.log();
});

// logger.log('Первое сообщение ');
console.log('logger: ', logger);

logger.log('1 сообщение');
console.log('logger: ', logger);
logger.log('22 сообщение');
console.log('logger: ', logger);
logger.log('333 сообщение');
console.log('logger: ', logger);
