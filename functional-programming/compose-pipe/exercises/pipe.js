'use strict';

// https://github.com/HowProgrammingWorks/Composition/blob/master/Exercises.ru.md

const pipe =
    (...args) => {
        const areInvalidArgs = args.some((arg) => typeof arg !== 'function');

        if (areInvalidArgs) {
            throw new Error('Not valid arg was provided. Use only functions');
        }

         return (value) => args.reduce((store, fn) => fn(store), value);

    }

module.exports = { pipe }
