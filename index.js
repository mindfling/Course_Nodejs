console.warn('hello');


const getRandomInt = (n) => Math.floor(Math.random() * (n + 1));

const getId = (len = 10) => {
  const charset = 'abcdefgijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ1234567890';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += charset.charAt(getRandomInt(charset.length - 1));
  }
  return result;
};

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.substring(1).toLowerCase()}`;




const createWorker = (person) => {
  console.log('person: ', person);
  
  const birth = {
    date: person.dateBirth.split('.')[0],
    month: person.dateBirth.split('.')[1],
    year: person.dateBirth.split('.')[2],
  };
  
  const date = person.dateBirth.split('.')[0];
  const month = person.dateBirth.split('.')[1];
  const year = person.dateBirth.split('.')[2];
  
  const birthTime = (new Date(`${month}-${date}-${year}`)).getTime();
  console.log('birthTime: ', birthTime);
  
  const currentTime = (new Date()).getTime();
  console.log('currentTime: ', currentTime);
  
  // вычисляем возраст из разницы милисекунд
  const age = (currentTime - birthTime) / 1000 / 3600 / 24 / 365;
  console.log('age: ', age);
  
  const worker = {
    id: getId(10),
    dateBirth: person.dateBirth,
    age: ((new Date()).getFullYear() - parseInt(birth.year)),
    firstName: capitalize(person.name.split(' ')[0]),
    lastName: capitalize(person.name.split(' ')[1]),
    purpose: capitalize(person.purpose),
  };
  
  return worker;
}



const personOne = {
  name: 'ваня иванов иванович',
  dateBirth: '10.11.1987',
  purpose: 'вхожу в ИТ',
};

const personTwo = {
  name: 'брюсс беннер',
  dateBirth: '10.11.1963',
  purpose: 'Становлюсь Халком',
};

const workerOne = createWorker(personOne);
console.log('workerOne: ', workerOne);

const workerTwo = createWorker(personTwo);
console.log('workerTwo: ', workerTwo);