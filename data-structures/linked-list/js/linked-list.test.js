'use strict';

const { describe, it, expect } = require('@jest/globals');
const { DoubleLinkedList } = require('./double-linked-list-class');

describe('DoubleLinkedList class', () => {
    describe('fromArray()', () => {
        it('should create list elements from array elements', () => {
            const list = new DoubleLinkedList();
            const elements = ['Element 1', 'Element 2'];

            list.fromArray(elements);

            expect(list.size).toBe(elements.length);
        });
    });

    describe('prepend()', () => {
        it('should prepend element in empty list', () => {
            const list = new DoubleLinkedList();
            const value = 'Element 1';

            list.prepend(value);

            expect(list.size).toBe(1);
            expect(list.first).toEqual(list.last);
            expect(list.first).toEqual({
                value,
                next: null,
                prev: null,
            });
        });

        it('should prepend element in not empty list', () => {
            const list = new DoubleLinkedList();
            const firstValue = 'Element 1';
            const secondValue = 'Element 2';

            list.prepend(firstValue);
            list.prepend(secondValue);

            expect(list.size).toBe(2);
            expect(list.first).toEqual({
                value: secondValue,
                next: list.last,
                prev: null,
            });
        });
    });

    describe('append()', () => {
        it('should append element in empty list', () => {
            const list = new DoubleLinkedList();
            const value = 'Element 1';

            list.append(value);

            expect(list.size).toBe(1);
            expect(list.first).toEqual(list.last);
            expect(list.last).toEqual({
                value,
                next: null,
                prev: null,
            });
        });

        it('should append element in not empty list', () => {
            const list = new DoubleLinkedList();
            const firstValue = 'Element 1';
            const secondValue = 'Element 2';

            list.append(firstValue);
            list.append(secondValue);

            expect(list.size).toBe(2);
            expect(list.last).toEqual({
                value: secondValue,
                next: null,
                prev: list.first,
            });
        });
    });

    describe('reverse()', () => {
        it('should reverse list items', () => {
            const list = new DoubleLinkedList();
            const elements = ['Element 1', 'Element 2'];

            list.fromArray(elements);
            list.reverse();

            expect(list.first).toEqual({
                value: elements[1],
                next: list.last,
                prev: null,
            });
            expect(list.last).toEqual({
                value: elements[0],
                next: null,
                prev: list.first,
            });
        });
    });

    describe('isEmpty()', () => {
        it('should return true for empty list', () => {
            const list = new DoubleLinkedList();

            expect(list.isEmpty()).toBe(true);
        });

        it('should return false for empty list', () => {
            const list = new DoubleLinkedList();

            list.fromArray(['Element 1']);

            expect(list.isEmpty()).toBe(false);
        });
    });

    describe('deleteFirst()', () => {
        it('should delete first element', () => {
            const list = new DoubleLinkedList();

            list.fromArray(['Element 1']);
            const deletedNode = list.deleteFirst();

            expect(list.size).toBe(0);
            expect(deletedNode).toEqual({
                value: 'Element 1',
                next: null,
                prev: null,
            });
        });

        it('should delete first element from full list', () => {
            const list = new DoubleLinkedList();

            list.fromArray(['Element 1', 'Element 2', 'Element 3']);
            list.deleteFirst();

            expect(list.size).toBe(2);
            expect(list.first.value).toBe('Element 2');
            expect(list.last.value).toBe('Element 3');
        });
    });

    describe('deleteLast()', () => {
        it('should delete last element', () => {
            const list = new DoubleLinkedList();

            list.fromArray(['Element 1']);
            const deletedNode = list.deleteLast();

            expect(list.size).toBe(0);
            expect(deletedNode).toEqual({
                value: 'Element 1',
                next: null,
                prev: null,
            });
        });

        it('should delete last element from full list', () => {
            const list = new DoubleLinkedList();

            list.fromArray(['Element 1', 'Element 2', 'Element 3']);
            list.deleteLast();

            expect(list.size).toBe(2);
            expect(list.first.value).toBe('Element 1');
            expect(list.last.value).toBe('Element 2');
        });
    });

    describe('clone()', () => {
        it('should clone list', () => {
            const list = new DoubleLinkedList();
            list.fromArray(['Element 1', 'Element 2', 'Element 3']);

            const clonedList = list.clone();

            expect(clonedList.size).toBe(list.size);

            expect(clonedList.first).toEqual(list.first);
            expect(clonedList.first === list.first).toBe(false);

            expect(clonedList.last).toEqual(list.last);
            expect(clonedList.last === list.last).toBe(false);
        });
    });

    describe('iterator', () => {
        it('should iterate by list values', () => {
            const list = new DoubleLinkedList();
            const elements = ['Element 1', 'Element 2', 'Element 3'];
            list.fromArray(elements);

            let index = 0;

            for (const value of list) {
                expect(elements[index]).toEqual(value);
                index++;
            }
        });
    });
});
