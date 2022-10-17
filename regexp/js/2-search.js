'use strict';

{
    const rx = /def/g;
    const str = 'abcdefgabc';
    const res = str.search(rx);
    console.log(res); // 3
}

{
    const rx = /cba/g;
    const str = 'abcdefgabc';
    const res = str.search(rx);

    // Почему -1? Услышал интересный тезис, что функции
    // должны стараться выдерживать консистентность типов, в данном случае
    // возвращаемых типов.
    console.log(res); // -1
}
