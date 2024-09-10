import {EventEmitter} from 'node:events';


// * try module export class EventEmitter
export class MyEventEmitter extends EventEmitter { }


export class User extends MyEventEmitter {
  #username;

  constructor(username) {
    super();
    this.#username = username;
    console.log('constructed: ', this.username);
  }

  get username() {
    return this.#username;
  }

  // событие 'msg' отправляем сообщение
  sendMessage(message) {
    this.emit('msg', {
      username: this.#username,
      message,
    });
  }

  // обработчик получения сообщения
  receiveMessage(msg) {
    console.log(`${msg.username}: "${msg.message}"`);
  }


  on(eventName, listener) {
    // подписывает слушателя на событие
    super.on('msg', this.receiveMessage);
  }

}
