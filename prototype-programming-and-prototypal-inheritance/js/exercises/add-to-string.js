'use strict';

const dictionary = Object.create(null, {
    // Создаем свойство, используя дескриптор свойств.
    // Когда мы создаём свойство с помощью дескриптора, все флаги по умолчанию имеют значение false.
    toString: {
        value() {
            return Object.keys(this).join();
        },
    },
});

dictionary.apple = 'Apple';
dictionary.__proto__ = 'test'; // здесь __proto__ -- это обычный ключ

// только apple и __proto__ выведены в цикле
for (const key in dictionary) {
    console.log({ key });
}

console.log(dictionary);

// ваш метод toString в действии
// alert(dictionary); // In browser: "apple, __proto__"
