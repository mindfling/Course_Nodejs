console.warn("hello world\n");

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
*/

setImmediate(() => {
  console.log("4 Был диван,"); //*4
});

setTimeout(() => {
  console.log("8 Выйди вон!");
}, 100);

setImmediate(() => {
  console.log("5 На диване"); //*5
});

process.nextTick(() => {
  console.log("2 Чемодан,"); //*2
});

setTimeout(() => {
  console.log("7 Кто не верит –"); // 7
}, 10);

setImmediate(() => {
  console.log("6 Ехал слон."); // 6
});

process.nextTick(() => {
  console.log("3 В чемодане"); //*3
});

console.log("1 Плыл по морю"); //**1


setTimeout(() => {
  console.log('');
  console.error('Bye bye')
}, 500)
