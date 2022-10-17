'use strict';

const fs = require('fs');

// Task: implement universal memoize compatible with both sync and async function
// Promises implementation

const argKey = (x) => `${x.toString()}:${typeof x}`;
const generateKey = (args) => args.map(argKey).join('|');

const memoize = (fn) => {
    const cache = new Map();

    return (...args) => {
        const isAsync = fn.constructor.name === 'AsyncFunction';

        if (isAsync) {
            const key = generateKey(args);

            if (cache.has(key)) {
                const value = cache.get(key);
                console.log('From cache');

                if (value.error) {
                    return Promise.reject(value.error);
                }

                if (value.data) {
                    return Promise.resolve(value.data);
                }
            }

            return fn(...args)
                .then((data) => {
                    console.log('Async calculated');
                    cache.set(key, { error: null, data });
                    return data;
                })
                .catch((error) => {
                    cache.set(key, { error, data: null });
                    return error;
                });
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

const memoizeRead = memoize(fs.promises.readFile);

memoizeRead('1-a-expiration-cash.js', 'utf8')
    .then((data) => {
        console.log('(1) data length:', data.length);
    })
    .then(() => {
        memoizeRead('1-a-expiration-cash.js', 'utf8').then((data) => {
            console.log('(1-1) data length:', data.length);
        });
    });

const sum = (a, b) => a + b;
const memoizeSum = memoize(sum, 3);

memoizeSum(1, 2);
memoizeSum(1, 2);

memoizeRead('1-a-expiration-cash.js', 'utf8').then((data) => {
    console.log('data length:', data.length);
});

setTimeout(() => {
    memoizeRead('1-a-expiration-cash.js', 'utf8').then((data) => {
        console.log('(setTimeout) data length:', data.length);
    });
}, 1000)
