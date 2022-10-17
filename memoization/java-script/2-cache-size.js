'use strict';

// Reference: https://github.com/HowProgrammingWorks/Memoization/blob/master/JavaScript/3-cacheSize.js

const argKey = (x) => `${x.toString()}:${typeof x}`;
const generateKey = (args) => args.map(argKey).join('|');

const memoize = (fn, cacheSize) => {
    const cache = new Map();

    return (...args) => {
        const key = generateKey(args);

        if (cache.has(key)) return cache.get(key);

        const result = fn(...args);

        // Когда кеш переполнен, удаляем ключ с начала
        if (cache.size >= cacheSize) {
            const firstKey = cache.keys().next().value;
            console.log('Delete key:', firstKey);
            cache.delete(firstKey);
        }

        cache.set(key, result);
        return result;
    };
};

// Usage
const max = (a, b) => (a > b ? a : b);
const mMax = memoize(max, 3);

mMax(10, 8);
mMax(10, 8);
mMax(1, 15);
mMax(12, 3);
mMax(15, 2);
mMax(1, 15);
mMax(10, 8);
mMax(0, 0);
mMax(0, 0);
