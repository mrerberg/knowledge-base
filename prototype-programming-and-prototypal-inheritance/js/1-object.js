// Видео: https://www.youtube.com/watch?v=SzaXTW2qcJE

'use strict';

// Так как объект создан с помощью литерала объекта, то
// его __prototype__ равен Object.prototype
const pointMethods = {
    move(x, y) {
        this.x += x;
        this.y += y;
    },

    toString() {
        return `[${this.x}, ${this.y}]`;
    },
};

const point = {
    x: 10,
    y: 20,
};

{
    // DEPRECATED. point.__proto__ = pointMethods;
    Object.setPrototypeOf(point, pointMethods);

    // Возвращает объект [[Prototype]]
    console.log('1', point.__proto__);
    console.log('2', point.__proto__ === pointMethods);
}

point.move(2, 3);
console.log('3', point.toString());

console.log('4', { point });
console.log('5', { pointMethods });

console.log('6', point.__proto__.__proto__ === Object.prototype);
console.log('7', pointMethods.__proto__ === Object.prototype);

// Object.prototype.__proto__  равен null, так как это конец цепочки наследования
console.log('8', point.__proto__.__proto__.__proto__ === null);
