'use strict';

// https://github.com/HowProgrammingWorks/Composition/blob/master/Exercises.ru.md

const compose = (...args) => {
    const handlers = [];

    const composed = (value) => {
        try {
            return args.reduceRight((store, fn) => fn(store), value);
        } catch (error) {
            for (const handler of handlers) {
                handler(error);
            }
        }
    };

    composed.on = (event, cb) => {
        if (event === 'error') {
            handlers.push(cb);
        }
    };

    return composed;
};

module.exports = { compose };
