/* eslint-disable no-inner-declarations */
'use strict';

// Конструктор по умолчанию: Rabbit.prototype = { constructor: Rabbit }
// В дальнейшем конструктор в шаблоне прототипа изменять можно
function Rabbit() {}

console.log(Rabbit.prototype.constructor === Rabbit); // true

const rabbit = new Rabbit();

console.log(rabbit.constructor === Rabbit); // true

// Перезапись/затирание конструктора
{
    function Rabbit() {}
    Rabbit.prototype = {
        jumps: true,
    };

    const rabbit = new Rabbit();
    console.log(rabbit.constructor === Rabbit); // false

    // Поэтому прототип либо насыщают данными, либо не забывают
    // указать конструктор вручную
    Rabbit.prototype = {
        jumps: true,
        constructor: Rabbit,
    };
    const rabbit2 = new Rabbit();
    console.log(rabbit2.constructor === Rabbit); // true
}


