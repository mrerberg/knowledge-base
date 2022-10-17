'use strict';

console.log('iterator in Symbol', 'iterator' in Symbol); // true

const generateNumbersObject = { start: 1, end: 10 };

{
    generateNumbersObject[Symbol.iterator] = function() {
        let value = this.start;

        return {
            next: () => ({
                value,
                done: value++ === this.end + 1,
            }),
        };
    }

    console.log(generateNumbersObject);
}

{
    // Hide iterator symbol
    Object.defineProperty(generateNumbersObject, Symbol.iterator, {
        enumerable: false, // for...in loop
        configurable: false, // can be changed
    });

    console.log('generateNumbersObject', generateNumbersObject);
    console.log('getOwnPropertySymbols', Object.getOwnPropertySymbols(generateNumbersObject));
}

{
    // Use iterator protocol
    for (const number of generateNumbersObject) {
        console.log(number);
    }

    const useIterable = (...iterableObjects) => iterableObjects.reduce((prev, cur) => prev + cur);

    const sum = useIterable(...generateNumbersObject);
    console.log('sum', sum);
}


