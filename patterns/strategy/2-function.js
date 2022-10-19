'use strict';

const renderers = {
    abstract: () => console.error('Not implemented'),

    console: (data) => console.table(data),

    web: (data) => {
        const keys = Object.keys(data[0]);

        const headers = keys.map((key) => `<th>${key}</th>`).join('');

        const line = (data) =>
            Object.keys(data)
                .map((key) => `<td>${data[key]}</td>`)
                .join('');
        const rows = data.map((row) => `<tr>${line(row)}</tr>`).join('');

        const output = ['<table>', `<tr>${headers}</tr>`, rows, '</table>'];

        console.log(output.join(''));
    },

    markdown: (data) => {
        const keys = Object.keys(data[0]);

        const headers = keys.map((key) => String(key)).join('|');

        const line = (data) =>
            '|' +
            Object.keys(data)
                .map((key) => String(data[key]))
                .join('|') +
            '|\n';

        const output = [
            '|',
            headers,
            '|\n',
            '|',
            keys.map(() => '---').join('|'),
            '|\n',
            data.map(line).join(''),
        ];

        console.log(output.join(''));
    },
};

const rendererContext = (renderName) => {
    const render = renderers[renderName] || renderers.abstract;

    return render;
}


const persons = [
    { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
    { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
    { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
    { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
    { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 },
];

// Usage
const non = rendererContext('abstract');
const con = rendererContext('console');
const web = rendererContext('web');
const mkd = rendererContext('markdown');

console.group('Abstract Strategy:');
non(persons);
console.groupEnd();

console.group('\nConsoleRenderer:');
con(persons);
console.groupEnd();

console.group('\nWebRenderer:');
web(persons);
console.groupEnd();

console.group('\nMarkdownRenderer');
mkd(persons);
console.groupEnd();
