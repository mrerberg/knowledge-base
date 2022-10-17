'use strict';

/**
 * Композиция функций справа-налево
 */
const compose =
    (...args) =>
    (value) =>
        args.reduceRight((store, fn) => fn(store), value);

module.exports = { compose };
