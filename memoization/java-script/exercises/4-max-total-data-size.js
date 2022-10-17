'use strict';

// Task: Implement memoize with max total stored data size
// Max stored data in each field implementation

const typeToBytes = {
    string: (string) => string.length * 2,
    number: () => 8,
    boolean: () => 4,
    object: (object) => {
        let bytes = 0;

        for (const key of object) {
            const value = object[key];
            const handler = this[typeof value];

            bytes += handler(value);
        }

        return bytes;
    },
};

function convertSizeToBytes(size) {
    const [value, memoryUnit] = getMemoryValueAndUnit(size);

    const multiplicatorMap = {
        T: 1000,
        G: 1000,
        M: 1000,
        K: 1000,
        B: 1,
    };

    const multiplicator = multiplicatorMap[memoryUnit] || 1;

    return value * multiplicator;
}

function getMemoryValueAndUnit(size) {
    const amount = parseFloat(size, 10);
    const digitsNumber = String(amount).length;
    const memoryUnit = size.slice(digitsNumber, digitsNumber + 1).toUpperCase();

    return [amount, memoryUnit];
}


const argKey = (x) => `${x.toString()}:${typeof x}`;
const generateKey = (args) => args.map(argKey).join('|');

const memoize = (fn, maxCacheSize) => {
    const cache = new Map();

    return (...args) => {
        const key = generateKey(args);

        if (cache.has(key)) {
            const value = cache.get(key);
            console.log('From cache: ', value);

            return value;
        }

        const availableBytes = convertSizeToBytes(maxCacheSize);
        const result = fn(...args);
        console.log('Calculated: ', result);
        const resultSize = typeToBytes[typeof result](result);

        if (resultSize > availableBytes)  {
            console.log(`Size of result more than cache can hold. Result size: ${resultSize}`);
            return;
        }

        cache.set(key, result);
        return result;
    };
};

const sum = (a, b) => a + b;
const memoizedSum = memoize(sum, '20B');

memoizedSum('s', 'qsssss');

memoizedSum(1, 2);
memoizedSum(1, 2);

memoizedSum(true, false);

memoizedSum(2, 4);
memoizedSum(2, 4);
memoizedSum(2, 4);

memoizedSum(3, 4);

memoizedSum('22', 4);

memoizedSum('qqqqq', 'qqqqqqq');
memoizedSum('qqqqq', 'qqqqq');

memoizedSum(4, 4);

memoizedSum('q', 4);

memoizedSum(5, 4);
memoizedSum(5, 4);
