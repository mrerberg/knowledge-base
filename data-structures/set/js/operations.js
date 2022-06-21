"use strict";

/**
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Set
 * 
 * Множества:
 * - union (объединение)
 * - intersection (пересечение)
 * - difference (разница)
 * - complement (обратная разница)
 * - symmetric difference (симметричная разница)?
 */ 

const union = (s1, s2) => new Set([...s1, ...s2]);

const intersection = (s1, s2) => {
  const result = [...s1].filter((element) => s2.has(element));

  return new Set(result);
};

// ['Beijing', 'London', 'Baghdad']
const symmetricDifference = (s1, s2) => {
  const left = [...s1].filter((element) => !s2.has(element));
  const right = [...s2].filter((element) => !s1.has(element));

  return new Set([...left, ...right]);
}

const difference = (s1, s2) => {
  const result = [...s1].filter((element) => !s2.has(element));

  return new Set(result);
};

const complement = (s1, s2) => difference(s2, s1);

const cities1 = new Set(["Beijing", "Kiev"]);
const cities2 = new Set(["Kiev", "London", "Baghdad"]);

const operations = [
  union,
  intersection,
  difference,
  complement,
  symmetricDifference,
];

const results = operations.map((operation) => ({
  [operation.name]: operation(cities1, cities2),
}));

console.log({ cities1, cities2 });
console.table(results);
