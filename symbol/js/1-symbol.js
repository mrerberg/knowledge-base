'use strict';

{
    const symbol = Symbol(); // Symbol()
    const symbol2 = Symbol();

    console.log({ symbol, typeof: typeof symbol });
    console.log('JSON.stringify', JSON.stringify(symbol));

    const areSymbolsEqual = symbol === symbol2;
    console.log('Symbol() === Symbol()', areSymbolsEqual);
}

{
    const symbol = Symbol('name'); // Symbol(name)
    const symbol2 = Symbol('name');

    console.log({ symbol });

    const areSymbolsEqual = symbol === symbol2;
    console.log('Symbol(\'name\') === Symbol(\'name\'):', areSymbolsEqual);
}


