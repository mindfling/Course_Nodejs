import { Logger } from "./modules/LoggerSync.js";


console.log('Hello index logger');

// todo test Logger see task2
const logger = new Logger('log.txt', 1000);

logger.on('messageLogged', message => {
  console.log();
  console.log('LISTENER: Записано сообщение: "' + message + '"');
  console.log();
});

// logger.log('Первое сообщение ');
console.log('logger: ', logger);

logger.log('Самое первое сообщение в очереди');
logger.log('Три три три сообщения и три три три раза...');
logger.log('Loggger');
logger.log('Log message');
logger.log('Log message one ');
logger.log('Log message one two');

