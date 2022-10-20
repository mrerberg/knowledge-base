'use strict';

class Point {
    #x = 0;
    #y = 0;

    constructor(x, y) {
        this.#x = x;
        this.x = x;

        this.#y = y;
        this.y = y;
    }

    move(x, y) {
        this.#x += x;
        this.#y += y;

        this.#log({ x, y });
    }

    toString() {
        return `[${this.#x}, ${this.#y}]`;
    }

    #log({ x,  y }) {
        console.log(`Move to x:${x}, y:${y}`);
    }

    static from({ x, y }) {
        return new Point(x, y);
    }
}

const point = new Point(0, 0);
point.move(2, 3);

// Error: Parsing error: Private field '#x' must be declared in an enclosing class
// console.log(point.#x);
console.log(point.x);

// Error: Parsing error: Private field '#log' must be declared in an enclosing class
// console.log(point.#log());

// Кажется, что классы по итогу разворачиваются в то, что можно написать на прототипах.
// Поэтому классы в JS называют "синтаксическим сахаром".

// НО! Это синтаксический сахар отчасти, так как прототипная реализация
// будет отличаться от классовой.
// https://javascript.info/class#not-just-a-syntactic-sugar

// Классовая реализация:
// 1. Имеет приватные поля (в прототипах такого нет)
// 2. Все классы имеют специальное свойство [[isClassConstructor]] (https://tc39.es/ecma262/#sec-ecmascript-function-objects)
// 3. Методы класса являются неперечислимыми. Определение класса устанавливает флаг enumerable в false для всех методов в "prototype". Можно проверить for..in
// 4. Объявление через класс всегда в strict mode. https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-class-definitions
