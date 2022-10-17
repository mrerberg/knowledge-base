'use strict';

const { describe, it, expect } = require('@jest/globals');
const { compose } = require('./compose');

describe('compose()', () => {
    const inc = (x) => ++x;
    const twice = (x) => x * 2;
    const cube = (x) => x ** 3;

    const testCases = [
        [[inc, twice, cube], 5, 251],
        [[inc, inc], 7, 9],
    ];

    it.each(testCases)(
        'should use composed functions %p to value %d and return %d ',
        (functions, value, expected) => {
            const composed = compose(...functions);

            expect(composed(value)).toBe(expected);
        }
    );

    it('should throw error if not functional argument was provided', () => {
        const error = new Error('Kek lol');
        const throwError = () => {
            throw error;
        };
        const composed = compose(inc, throwError, cube);

        // eslint-disable-next-line no-undef
        const errorHandler = jest.fn((error) => error);

        composed.on('error', errorHandler);

        composed(5);

        expect(errorHandler).toHaveBeenCalled();
        expect(errorHandler).toHaveBeenCalledWith(error);
    });
});
