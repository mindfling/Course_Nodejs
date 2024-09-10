import { EventEmitter } from 'node:events';

class MyEventEmitter extends EventEmitter {}

const ee = new MyEventEmitter();


// * using simple procedure paradigm
const sendMessage = (username, message) => {
  ee.emit('msg', {username, message});
}


const receiveMessage = (msg) => {
  console.log(`${msg.username}: "${msg.message}"`);
}


ee.on('msg', receiveMessage);


// * test
sendMessage('DIm', 'hello everyone!');
sendMessage('Denn', 'Hallo, how are you?');
sendMessage('dim', 'fine)) and you?')
sendMessage('Ben', 'The weather is wonderfull today');