"use strict";

/**
 * WeakSet
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
 *
 * Главная особенность:
 * - Значениями могут быть только объекты
 * - Ссылки на объекты в WeakSet являются слабыми: если на объект, хранимый в WeakSet нет ни одной внешней ссылки,
 *   то сборщик мусора удалит этот объект. Также это означает, что WeakSet не итерируем, так как нет
 *   возможности получить список текущих хранимых в WeakSet объектов.
 */

const cities = new Set([
  { name: "Beijing" },
  { name: "Kiev" },
  { name: "London" },
  { name: "Baghdad" },
]);

const list = new WeakSet();

for (const city of cities) {
  console.log("Add city", city, "to WeakSet");
  list.add(city);
}

console.log({ cities, list });

const iterator = cities.values();

const beijing = iterator.next().value;
console.log("select", beijing);

iterator.next();

const london = iterator.next().value;
console.log("select", london);

cities.delete(london);
console.log("remove", london, "from Set");


/**
 * После удаление из Set ссылки на Пекин,
 * он удалится и из WeakMap. Но это никак не проверить,
 * так как любая проверка приводит к сохранению ссылки от GarbageCollector
*/
list.delete(beijing);
console.log("remove", beijing, "from WeakSet");

for (const city of cities) {
  console.log("City", city, "in WeakSet", list.has(city));
}
