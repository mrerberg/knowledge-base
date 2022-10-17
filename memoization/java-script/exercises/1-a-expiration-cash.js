'use strict';

// Task: implement time expiration cash

const argKey = (x) => `${x.toString()}:${typeof x}`;
const generateKey = (args) => args.map(argKey).join('|');

const memoize = (fn, cacheLifeTime) => {
    const cache = new Map();

    return (...args) => {
        const key = generateKey(args);
        const timeoutId = setTimeout(() => cache.delete(key), cacheLifeTime);

        if (cache.has(key)) {
            const value = cache.get(key);
            console.log('From cache: ', value.result);

            clearTimeout(value.timeoutId);
            value.timeoutId = timeoutId;

            return value.result;
        };

        const result = fn(...args);
        cache.set(key, { timeoutId, result });
        console.log('Calculated: ', result);
        return result;
    };
};

// Usage

const sum = (a, b) => a + b;
const memoizeSum = memoize(sum, 2000);

memoizeSum(1, 2);
memoizeSum(1, 2);
memoizeSum(1, 2);

memoizeSum(2, 4);
memoizeSum(2, 4);
setTimeout(() => memoizeSum(2, 4), 3000);
setTimeout(() => memoizeSum(2, 4), 5000);
setTimeout(() => memoizeSum(2, 4), 7000);
setTimeout(() => memoizeSum(2, 4), 9000);
setTimeout(() => memoizeSum(2, 4), 12000);
