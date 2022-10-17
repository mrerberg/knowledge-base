'use strict';

const symbol = Symbol('name');
console.log('typeof', typeof symbol); // "symbol"

// const symbol = new Symbol(); // TypeError
// Почему? MDN говорит, что это сделано для того, чтобы удержать
// разработчиков от создания явных объектных оберток вместо символьного значения.
// Однако, это возможно для других примитивов (new Boolean, new String, new Number)

// Если нужна объектная обертка, то есть данный способ:
const symbolObj = Object(symbol);
console.log('symbolObj', symbolObj); // [Symbol: Symbol(name)]
console.log('typeof', typeof symbolObj); // "object"
