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
  // using Luxon Time Lib 
  const birth = DateTime.fromFormat(dateBirth, "dd.MM.yyyy", {zone: 'UTC'})
  const curr = DateTime.now();
  const age = Interval.fromDateTimes(birth, curr).toDuration("years").years;
  return Math.trunc(age);
};


const capitalize = (str) =>
  `${str.charAt(0).toUpperCase()}${str.substring(1).toLowerCase()}`;

const upperize = (str) => str.toUpperCase();

const lowerize = (str) => str.toLowerCase();


const createWorker = (person) => {
  const personNames = person.name.split(" ").map(capitalize);
  const firstName = personNames[0];
  const lastName = personNames[personNames.length - 1];
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


console.log('workerTwo:', createWorker({
  name: "иван иванов",
  dateBirth: "10.11.1987",
  purpose: "карьерный рост",
}));


const workerTwo = createWorker({
  name: "шелдон ли купер",
  dateBirth: "26.02.1980",
  purpose: "получаю Нобелевскую премию",
})

console.log({workerTwo});
