'use strict';

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }

    toString() {
        return `[${this.x}, ${this.y}]`;
    }

    static from({ x, y }) {
        return new Point(x, y);
    }
}


const point = new Point(0, 0);
point.move(2, 3);

{
    // Что такое класс в JavaScript?
    // В JavaScript класс - разновидность функции.
    console.log(typeof Point); // function

    // Конструкция class Point {...} делает следующее:
    // 1. Создастся функция Point. Тело функции возьмется из метода constructor. Если его нет - тело пустое
    // 2. Сохраняет все методы (такие как move и toString) в Point.prototype.

    // Соответственно, как только объект создастся через new Point, то при вызове
    // методов (move, toString) они будут взяты из Point.prototype
}

console.log({ point });
console.log({ Point }); // [class Point]
console.log(point.__proto__ === Point.prototype);
console.log(point.__proto__.constructor === Point);
console.log(point.__proto__.__proto__ === Object.prototype);
console.log(Point.__proto__ === Function.prototype);
console.log(Point.__proto__.constructor === Function);
console.log(Point.prototype.__proto__ === Object.prototype);
console.log(Point.prototype.constructor === Point);
