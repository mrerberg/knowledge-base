'use strict';

console.log('toPrimitive in Symbol', 'toPrimitive' in Symbol);

const person = { name: 'Mikhail', age: 24 };

person[Symbol.toPrimitive] = function(hint)  {
    console.log({ hint });

    const primitives = {
        number: () => this.age,
        string: () => this.name,
        default: () => JSON.stringify(person),
    };

    return primitives[hint]();
};

// Usage:
console.log('to number', +person);
console.log('to string', `${person}`);
console.log('toString()', person.toString());

// Почему это идет не как string?
console.log('to JSON', person + '');

