'use strict';

// Видео: https://www.youtube.com/watch?v=SzaXTW2qcJE

// Конструктор прототипа
function Point(x, y) {
    // именно тут конструируется инстанс
    this.x = x;
    this.y = y;
}

// Статический метод прототипа
Point.from = function({ x, y }) {
    return new Point(x, y);
};

// Насыщение прототипа
// Данная конструкция подразумевает, что мы расширяем прототип, создаваемый
// функцией-конструктором Point
// -----------------------------
// По факту, поле prototype у Point - это еще не прототип, это "шаблон" прототипа.
// Это поле буквально говорит: при создании объекта через new Point запиши ему объект с методом move в [[Prototype]]
// -----------------------------
// Point.prototype используется только в момент вызова new Point()
// -----------------------------
// Не создаётся копия Point.prototype, это всегда один объект, на который ссылается и Point.prototype, и [[Prototype]] объекта-инстанса.
Point.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
};

// Почему мы насыщает prototype, а не записываем в него целый объект?
// Point.prototype = { toString, move }
// см в примере constructor
Point.prototype.toString = function() {
    return `[${this.x}, ${this.y}]`;
};

const point = new Point(10, 20);
point.move(2, 3);

console.log({ point, Point, 'Point.prototype': Point.prototype });

console.log(point.__proto__ === Point.prototype);

console.log(point.__proto__.constructor === Point);
console.log(Point.prototype.constructor === Point);

console.log(point.__proto__.__proto__ === Object.prototype);
console.log(Point.__proto__ === Function.prototype);
console.log(Point.__proto__.constructor === Function);
console.log(Point.prototype.__proto__ === Object.prototype);

