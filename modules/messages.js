import {EventEmitter} from 'node:events';

// * try module export class EventEmitter
export class User extends EventEmitter {
  #username;

  constructor(username) {
    super();
    this.#username = username;
    console.log('В чате новый пользователь:', this.username);
    // сразу навешиваем слушатель событий
    this.on('msg', this.receiveMessage);
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

  // генерируем сообщения в случайное время
  generateMessage(text) {
    const msg = {
      username: this.#username,
      message: text,
    }
    const timeout = Math.floor(Math.random() * 10000 + 10000);
    console.log('next messag in timeout: ', timeout);
    setTimeout(() => {
      this.emit('msg', msg);
    }, timeout);
  }

  // обработчик получения сообщения
  receiveMessage(msg) {
    console.log(`${msg.username}: "${msg.message}"`);
  }

  on(eventName = 'msg', listener) {
    // подписывает слушателя на событие
    super.on('msg', this.receiveMessage);
  }
}
