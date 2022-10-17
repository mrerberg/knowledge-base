'use strict';

const { Dictionary } = require('./object');

describe('Dictionary', () => {
    describe('set()', () => {
        it('should set element to collection', () => {
            const dictionary = new Dictionary();

            dictionary.set('a', 1);

            expect(dictionary.get('a')).toBe(1);
        });
    });

    describe('get()', () => {
        it('should return value from collection by key', () => {
            const dictionary = Dictionary.from([['a', 1]]);

            const value = dictionary.get('a');

            expect(value).toBe(1);
        });

        it('should return nothing from collection by not existing key', () => {
            const dictionary = Dictionary.from([['a', 1]]);

            const value = dictionary.get('b');

            expect(value).toBeUndefined();
        });
    });

    describe('delete()', () => {
        it('should delete element and return true', () => {
            const dictionary = Dictionary.from([['a', 1]]);

            const deleteResult = dictionary.delete('a');

            expect(deleteResult).toBe(true);
        });

        it('should return false because of non existing element in collection', () => {
            const dictionary = Dictionary.from([['a', 1]]);

            const deleteResult = dictionary.delete('b');

            expect(deleteResult).toBe(false);
        });
    });

    describe('size()', () => {
        it('should return actual size of collection', () => {
            const dictionary = Dictionary.from([
                ['a', 1],
                ['b', 2],
            ]);

            expect(dictionary.size).toBe(2);
        });
    });

    describe('clear()', () => {
        it('should delete all keys-values from collections', () => {
            const dictionary = Dictionary.from([['a', 1]]);

            dictionary.clear();

            expect(dictionary.size).toBe(0);
        });
    });

    describe('has()', () => {
        it('should return true if key exists in collection', () => {
            const dictionary = Dictionary.from([['a', 1]]);

            expect(dictionary.has('a')).toBe(true);
        });

        it('should return false if key does not exist in collection', () => {
            const dictionary = Dictionary.from([['a', 1]]);

            expect(dictionary.has('b')).toBe(false);
        });

        it.each([true, false, null, undefined, '', 0, { obj: 'obj' }])(
            'should return true for `%p` key',
            (key) => {
                const dictionary = Dictionary.from([[key, key]]);

                const has = dictionary.has(key);

                expect(has).toBe(true);
            }
        );
    });

    describe('keys()', () => {
        it('should return all collection\'s keys', () => {
            const dictionary = Dictionary.from([
                ['a', 'value'],
                ['b', 'value'],
                ['c', 'value'],
            ]);

            const keys = dictionary.keys();

            expect(keys).toEqual(['a', 'b', 'c']);
        });
    });

    describe('values()', () => {
        it('should return all collection\'s values', () => {
            const dictionary = Dictionary.from([
                ['a', 'value1'],
                ['b', 'value2'],
                ['c', 'value3'],
            ]);

            const values = dictionary.values();

            expect(values).toEqual(['value1', 'value2', 'value3']);
        });
    });

    describe('iterable protocol', () => {
        it('should iterate throw collection', () => {
            const data = [
                ['a', 'value1'],
                ['b', 'value2'],
                ['c', 'value3'],
            ];

            const dictionary = Dictionary.from(data);

            let index = 0;

            for (const entry of dictionary) {
                expect(entry).toEqual(data[index++]);
            }
        });
    });
});
