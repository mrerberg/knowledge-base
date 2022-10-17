'use strict';

const symbol = Symbol.for('name'); // Symbol(name)
const symbol2 = Symbol.for('name');

{
    // Symbols with identical description from global registry list are equal
    console.log('Symbol.for(\'name\') === Symbol.for(\'name\')', symbol === symbol2); // true
}

{
    console.log('Symbol.for("name")', Symbol.for('name'));
    console.log('Symbol("name")', Symbol('name'));
}

{
    console.log(Symbol('name') === Symbol.for('name')); // false
    // eslint-disable-next-line no-self-compare
    console.log(Symbol.for('name') === Symbol.for('name')); // true
}

{
    const symbol3 = Symbol('name2');
    console.log('key for symbol from global registry list:', Symbol.keyFor(symbol)); // name
    console.log('key for symbol which isn\'t in global registry list:', Symbol.keyFor(symbol3)); // undefined
}


// TODO: Убрать отсюда
console.log(symbol[Symbol.toPrimitive]());
