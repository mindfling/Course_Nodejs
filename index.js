console.log('\nhello');
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


const now = new Date();
const getCurrent = () => (new Date() - now);


setImmediate(() => {
  console.log("4 Был диван,", getCurrent());
});

setTimeout(() => {
  console.log("8 Выйди вон!", getCurrent());
}, 100);

setImmediate(() => {
  console.log("5 На диване", getCurrent());
});

process.nextTick(() => {
  console.log("2 Чемодан,", getCurrent());
});

setTimeout(() => {
  console.log("7 Кто не верит –", getCurrent());
}, 10);

setImmediate(() => {
  console.log("6 Ехал слон.", getCurrent());
});

process.nextTick(() => {
  console.log("3 В чемодане", getCurrent());
});

console.log("1 Плыл по морю", getCurrent());
