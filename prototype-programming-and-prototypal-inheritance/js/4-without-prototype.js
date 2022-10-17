'use strict';

// https://learn.javascript.ru/prototype-methods

const obj = Object.create(null);

const key = '__proto__';
obj[key] = 'some value';

// Таким образом мы можем пользоваться простейшим объектом в виде ассоциативного массива или «чистого словаря»
console.log(obj); // [Object: null prototype]
console.log(obj[key]); // "some value"
