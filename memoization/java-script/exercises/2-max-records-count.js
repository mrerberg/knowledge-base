'use strict';

// Task: Implement memoize with max records count and removing least used

const argKey = (x) => `${x.toString()}:${typeof x}`;
const generateKey = (args) => args.map(argKey).join('|');

const memoize = (fn, cacheSize) => {
    const cache = new Map();

    return (...args) => {
        const key = generateKey(args);

        if (cache.has(key)) {
            const value = cache.get(key);
            console.log('From cache: ', value.result);
            value.usages += 1;

            return value.result;
        }

        if (cache.size >= cacheSize) {
            const maxValue = {};

            for (const [key, value] of cache.entries()) {
                if (typeof maxValue.value === 'undefined') {
                    maxValue.key = key;
                    maxValue.value = value;
                    continue;
                }

                if (value < maxValue.value) {
                    maxValue.key = key;
                    maxValue.value = value;
                    continue;
                }
            }

            console.log('Deleting from cache: ', maxValue.key);
            console.log('usages: ', maxValue.value.usages);
            cache.delete(maxValue.key);
        }

        const result = fn(...args);
        cache.set(key, { usages: 0, result });
        console.log('Calculated: ', result);
        return result;
    };
};

// Usage

const sum = (a, b) => a + b;
const memoizeSum = memoize(sum, 3);

memoizeSum(1, 2);
memoizeSum(1, 2);

memoizeSum(2, 2);
memoizeSum(2, 2);
memoizeSum(2, 2);

memoizeSum(3, 3);
memoizeSum(3, 3);
memoizeSum(3, 3);
memoizeSum(3, 3);

memoizeSum(4, 4);
