/*
Исправьте код, чтобы получить правильную считалочку

1 Плыл по морю
2 Чемодан,
3 В чемодане
4 Был диван,
5 На диване
6 Ехал слон.
7 Кто не верит –
8 Выйди вон!
*/

setImmediate(() => {
  console.log("4 Был диван,");
});

setTimeout(() => {
  console.log("8 Выйди вон!");
}, 100);

setImmediate(() => {
  console.log("5 На диване");
});

process.nextTick(() => {
  console.log("2 Чемодан,");
});

setTimeout(() => {
  console.log("7 Кто не верит –");
}, 10);

setImmediate(() => {
  console.log("6 Ехал слон.");
});

process.nextTick(() => {
  console.log("3 В чемодане");
});

console.log("1 Плыл по морю");
