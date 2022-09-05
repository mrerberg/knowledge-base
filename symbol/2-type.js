'use strict';

const symbol = Symbol('name');
console.log('typeof', typeof symbol); // "symbol"

const obj = {
    name: 'Marcus',
    // eslint-disable-next-line no-dupe-keys
    name: 'Aurelius',
    [Symbol('name')]: 'Marcus',
    [Symbol('name')]: 'Aurelius',
    [Symbol('name')]: Symbol('value'),
};

const key = Symbol('name');
obj[key] = 'Antoninus';

console.log('--------');
console.log(obj);
console.log('obj[key]', obj[key]);
console.log('typeof', typeof obj);
console.log('--------');

console.log({ keys: Object.keys(obj) });
for (const key in obj) {
    console.log({ key, value: obj[key] });
}
