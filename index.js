console.warn("\nhello world");

/*
Исправьте код, чтобы получить правильную считалочку

Плыл по морю //* 1
Чемодан, //* 2 
В чемодане //* 3
Был диван, //* 4
На диване //* 5
Ехал слон. //* 6
Кто не верит – //* 7
Выйди вон! //* 8

Все функции console.log должны оставаться в том же порядке,
но вы можете менять местами функции
  setTimeout,
  setImmediate и 
  process.nextTick
*/



setTimeout(() => {
  console.log('Был диван,');
}, 100);

setImmediate(() => {
  console.log('Выйди вон!');
});

process.nextTick(() => {
  console.log('На диване');
});

process.nextTick(() => {
  console.log('Чемодан,');
});

setImmediate(() => {
  console.log('Кто не верит –');
});

setTimeout(() => {
  console.log('Ехал слон.');
}, 10);

setImmediate(() => {
  console.log('В чемодане');
});

console.log('Плыл по морю');
