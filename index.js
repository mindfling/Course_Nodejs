import { DateTime, Interval, Duration } from "luxon";


const getRandomInt = (n) => Math.floor(Math.random() * (n + 1));

const getRandomId = (len = 10) => {
  const charset =
    "abcdefgijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ1234567890";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += charset.charAt(getRandomInt(charset.length - 1));
  }
  return result;
};

const calculateAge = (dateBirth) => {
  const [date, month, year] = dateBirth.split(".").map((n) => parseInt(n));
  // using Luxon
  const birth = DateTime.local(year, month, date); // ? проверить дата рождения
  const curr = DateTime.now(); // ? проверить текущая дата
  const age = Interval.fromDateTimes(birth, curr).toDuration("years").years;
  return Math.trunc(age);
};

const capitalize = (str) =>
  `${str.charAt(0).toUpperCase()}${str.substring(1).toLowerCase()}`;

const upperize = (str) => str.toUpperCase();
   

const createWorker = (person) => {
  const [firstName, lastName] = person.name.split(' ').map(capitalize);
  
  const worker = {
    id: getRandomId(),
    firstName,
    lastName,
    dateBirth: person.dateBirth,
    age: calculateAge(person.dateBirth),
    purpose: capitalize(person.purpose),
  };
  return worker;
};


const personOne = {
  name: "иван иванов",
  dateBirth: "10.11.1987",
  purpose: "карьерный рост",
};

const personTwo = {
  name: 'шелдон ли купер',
  dateBirth: '26.02.1980',
  purpose: 'получаю Нобелевскую премию',
};

const workerOne = createWorker(personOne);
console.log("", {personOne});
console.log({workerOne});

const workerTwo = createWorker(personTwo);
console.log('\npersonTwo: ', personTwo);
console.log('workerTwo: ', workerTwo);
