'use strict';

/**
 * Композиция функций слева-направо
*/
const pipe =
    (...functions) =>
    (value) =>
        functions.reduce((store, fn) => fn(store), value);

module.exports = { pipe };
