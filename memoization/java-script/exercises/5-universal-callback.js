'use strict';

const fs = require('fs');

// Task: implement universal memoize compatible with both sync and async function
// Callbacks implementation

const argKey = (x) => `${x.toString()}:${typeof x}`;
const generateKey = (args) => args.map(argKey).join('|');

const memoize = (fn) => {
    const cache = new Map();

    return (...args) => {
        const isAsync = typeof args[args.length - 1] === 'function';

        if (isAsync) {
            // Достаем из аргументов callback, не будем его включать в контрольную сумму
            const callback = args.pop();
            const key = generateKey(args);

            if (cache.has(key)) {
                const value = cache.get(key);
                console.log('From cache');

                return callback(value.error, value.data);
            }

            fn(...args, (err, data) => {
                console.log('Async calculated');
                cache.set(key, { err, data });
                callback(err, data);
            });

            return;
        }


        const key = generateKey(args);

        if (cache.has(key)) {
            const value = cache.get(key);
            console.log('From cache: ', value);

            return value;
        }

        const result = fn(...args);
        console.log('Calculated: ', result);

        cache.set(key, result);
        return result;
    };
};

const memoizeRead = memoize(fs.readFile);

memoizeRead('1-a-expiration-cash.js', 'utf8', (err, data) => {
    console.log('data length:', data.length);

    memoizeRead('1-a-expiration-cash.js', 'utf8', (err, data) => {
        console.log('data length:', data.length);
    });
});
