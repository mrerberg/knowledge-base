'use strict';

function Renderer() {}

Renderer.prototype.render = function() {
    console.error('Not implemented');
};

function ConsoleRenderer() {}

ConsoleRenderer.prototype.render = function(data) {
    console.table(data);
};

Object.setPrototypeOf(ConsoleRenderer.prototype, Renderer.prototype);

function WebRenderer() {}

WebRenderer.prototype.render = function(data) {
     const keys = Object.keys(data[0]);

     const headers = keys.map((key) => `<th>${key}</th>`).join('');

     const line = (data) =>
         Object.keys(data)
             .map((key) => `<td>${data[key]}</td>`)
             .join('');
     const rows = data.map((row) => `<tr>${line(row)}</tr>`).join('');

     const output = ['<table>', `<tr>${headers}</tr>`, rows, '</table>'];

     console.log(output.join(''));
};

Object.setPrototypeOf(WebRenderer.prototype, Renderer.prototype);


function MarkdownRenderer() {}

MarkdownRenderer.prototype.render = function(data) {
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
};

Object.setPrototypeOf(MarkdownRenderer.prototype, Renderer.prototype);

function Context(renderer) {
    this.renderer = renderer;
}

Context.prototype.process = function(data) {
    this.renderer.render(data);
}

const persons = [
    { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
    { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
    { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
    { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
    { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 },
];

// Usage
const non = new Context(new Renderer());
const con = new Context(new ConsoleRenderer());
const web = new Context(new WebRenderer());
const mkd = new Context(new MarkdownRenderer());

console.group('Abstract Strategy:');
non.process(persons);
console.groupEnd();

console.group('\nConsoleRenderer:');
con.process(persons);
console.groupEnd();

console.group('\nWebRenderer:');
web.process(persons);
console.groupEnd();

console.group('\nMarkdownRenderer');
mkd.process(persons);
console.groupEnd();
