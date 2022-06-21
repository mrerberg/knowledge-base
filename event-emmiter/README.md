# EventEmitter

Task for training:

- [x] on(name, f, timeout = 0)
- [x] emit(name, ...data)
- [x] удаление событие через remove созданных через once
- [ ] distinct() - метод переключает emitter в режим уникальных обработчиков
- [x] names() : array of string - возвращаем все имена
- [x] listeners(name): array of function - возвращает копию массива подписок
- [x] clear(name) - очистка данного события
- [x] count(name): number - сколько обработчиков у события
- [x] has(name) : boolean - существуют ли обработчики
- [x] has(name, f): boolean - есть ли функция f в массиве обработчиков
- [x] prepend(name, f) - устанавливает обработчик перед всеми остальными
- [x] insert(name, f, g) - устанавливает обработчик f перед g
