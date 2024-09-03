// * Module Worker for createWorker from person

import { DateTime, Interval } from "luxon";

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


// using Luxon Time npm Library https://moment.github.io/luxon/api-docs/index.html
const calculateAge = (dateBirth) => {
  const birth = DateTime.fromFormat(dateBirth, "dd.MM.yyyy", {zone: 'UTC'})
  const curr = DateTime.now();
  const age = Interval.fromDateTimes(birth, curr).toDuration("years").years;
  return Math.trunc(age);
};


// all letters to Upper
const upperize = (str) => str.toUpperCase();

// all letters to Lower
const lowerize = (str) => str.toLowerCase();

// only first letter Big
const capitalize = (str) =>
  `${str.charAt(0).toUpperCase()}${str.substring(1).toLowerCase()}`;

const capitalizeWords = (words) => words.map(capitalize);


export const createWorker = (person) => {
  const personNames = capitalizeWords(person.name.split(" "));
  const worker = {
    id: getRandomId(),
    firstName: personNames[0],
    lastName: personNames[personNames.length - 1],
    dateBirth: person.dateBirth,
    age: calculateAge(person.dateBirth),
    purpose: capitalize(person.purpose),
  };
  return worker;
};
