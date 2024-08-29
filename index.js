/*
// на вход принимает объект такого вида
{
  name: 'иван иванов'
  dateBirth: 10.11.1987,
  purpose: 'карьерный рост'
}
// возвращает
{
  id: 'sdf3234gt4',  // случайны id из 10 символов 
  firstName: 'Иван', // первая буква большая, остальные строчные
  lastName: 'Иванов', // первая буква большая, остальные строчные
  dateBirth: 10.11.1987,
  age: '35', // высчитывается возраст на текущий день
  purpose: 'Карьерный рост',  // первая буква большая, остальные строчные
}
*/

const getRandomInt = (n) => Math.floor(Math.random() * (n + 1));

const getId = (len = 10) => {
  const charset = 'abcdefgijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ1234567890';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += charset.charAt(getRandomInt(charset.length - 1));
  }
  return result;
};

const calculateAge = (dateBirth) => {
  // парсим строку даты
  const date = dateBirth.split('.')[0];
  const month = dateBirth.split('.')[1];
  const year = dateBirth.split('.')[2];
  // проверить  
  const birthTime = (new Date(`${month}-${date}-${year}`)).getTime();
  const currentTime = (new Date()).getTime();
  // вычисляем возраст из разницы милисекунд
  const age = Math.trunc((currentTime - birthTime) / 1000 / 3600 / 24 / 365);
  return age.toString();
}

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.substring(1).toLowerCase()}`;


const createWorker = (person) => {
  const worker = {
    id: getId(10),
    firstName: capitalize(person.name.split(' ')[0]),
    lastName: capitalize(person.name.split(' ')[1]),
    dateBirth: person.dateBirth,
    age: calculateAge(person.dateBirth),
    purpose: capitalize(person.purpose),
  };
  return worker;
}



const personOne = {
  name: 'иван иванов',
  dateBirth: '10.11.1987',
  purpose: 'карьерный рост',
};

const personTwo = {
  name: 'шелдон ли купер',
  dateBirth: '26.02.1980',
  purpose: 'получаю Нобелевскую премию',
};

const workerOne = createWorker(personOne);
console.log('\npersonOne: ', personOne);
console.log('workerOne: ', workerOne);

const workerTwo = createWorker(personTwo);
console.log('\npersonTwo: ', personTwo);
console.log('workerTwo: ', workerTwo);