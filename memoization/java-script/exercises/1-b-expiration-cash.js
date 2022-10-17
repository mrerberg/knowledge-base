'use strict';

// Task: implement time expiration cash

const argKey = (x) => `${x.toString()}:${typeof x}`;
const generateKey = (args) => args.map(argKey).join('|');

const memoize = (fn, cacheLifeTime) => {
    const cache = new Map();

    const clearCache = () => setTimeout(() => cache.clear(), cacheLifeTime);
    let timeoutId = clearCache();

    return (...args) => {
        const key = generateKey(args);

        if (cache.has(key)) {
            const value = cache.get(key);
            console.log('From cache: ', value);

            clearTimeout(timeoutId);
            timeoutId = clearCache();

            return value;
        };

        const result = fn(...args);
        cache.set(key, result);
        console.log('Calculated: ', result);
        return result;
    };
};

// Usage

const sum = (a, b) => a + b;
const memoizeSum = memoize(sum, 2000);

memoizeSum(1, 2); // Calculated
memoizeSum(1, 2); // From cache
memoizeSum(1, 2); // From cache

memoizeSum(2, 4); // Calculated
memoizeSum(2, 4); // From cache

setTimeout(() => {
    memoizeSum(1, 2); // Calculated
    memoizeSum(2, 4); // Calculated
}, 4000);

setTimeout(() => {
    memoizeSum(1, 2); // From cache
    memoizeSum(2, 4); // From cache
}, 6000);

setTimeout(() => {
    memoizeSum(1, 2); // Calculated
    memoizeSum(2, 4); // Calculated
}, 10000);
