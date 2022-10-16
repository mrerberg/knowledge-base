/* eslint-disable no-inner-declarations */
'use strict';

{
    function Rabbit() {}
    Rabbit.prototype = {
        eats: true,
    };

    const rabbit = new Rabbit();

    Rabbit.prototype = {};

    // Будет true
    // потому что ссылка на исходный Rabbit.prototype все еще жива в [[Prototype]] у rabbit
    console.log('1', rabbit.eats);

    // Будет undefined
    // потому что в пустом объекте прототипе нет такого свойства
    const rabbit2 = new Rabbit();
    console.log('2', rabbit2.eats);
}

{
    function Rabbit() {}
    Rabbit.prototype = {
        eats: true,
    };

    const rabbit = new Rabbit();

    Rabbit.prototype.eats = false;

    // Будет false, потому как мы меняем
    // свойства исходного объекта
    console.log('3', rabbit.eats);
}

{
    function Rabbit() {}
    Rabbit.prototype = {
        eats: true,
    };

    const rabbit = new Rabbit();

    delete rabbit.eats;

    console.log('4', rabbit.eats);
}

{
    function Rabbit() {}
    Rabbit.prototype = {
        eats: true,
    };

    const rabbit = new Rabbit();

    delete Rabbit.prototype.eats;

    // Будет undefined, так как мы удалили свойство из объекта прототипа
    console.log(rabbit.eats);
}
