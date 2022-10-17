'use strict';

const { describe, it, expect } = require('@jest/globals');
const { pipe } = require('./pipe');

describe('pipe()', () => {
    const inc = (x) => ++x;
    const twice = (x) => x * 2;
    const cube = (x) => x ** 3;

    const testCases = [
        [[inc, twice, cube], 5, 1728],
        [[inc, inc], 7, 9],
    ];

    it.each(testCases)(
        'should use piped functions %p to value %d and return %d ',
        (functions, value, expected) => {
            const piped = pipe(...functions);

            expect(piped(value)).toBe(expected);
        }
    );

    it('should throw error if not functional argument was provided', () => {
        expect(() => pipe(inc, 7, cube)).toThrow('Not valid arg was provided. Use only functions');
    });
});
