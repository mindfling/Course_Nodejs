import { DateTime, Interval, Duration } from "luxon";
import { createWorker } from "./modules/worker.mjs";

console.log('halo using ESModule');

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
