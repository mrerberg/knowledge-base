/* eslint-disable no-useless-escape */
'use strict';

const data = `14
Letters to the Editor (Your complete mailing address is required):
letters@thehindu.co.in
Readers' Editor:
readerseditor@thehindu.co.in
Advertisements Queries (Print):
inetads@thehindu.co.in
Advertisements Queries (Online):
digital@thehindu.co.in
Advertisements Queries (International):
international@thehindu.co.in
Subscription Queries:
subs@thehindu.co.in
Comments on the website:
web.thehindu@thehindu.co.in`;

function trim(string) {
    return string.trim()
}

function processData(input) {
     const sentences = input.split(/\n/g).filter(trim);

     const regExp = /(\w+\.){0,}\w+@\w+(\.\w+)+/gim;
     const emails = [];

     for (const sentence of sentences) {
         const matchedEmails = sentence.match(regExp);
         if (matchedEmails) emails.push(...matchedEmails);
     }

     const uniqEmails = Array.from(new Set([...emails])).sort();

     console.log(uniqEmails.join(';'));
     return uniqEmails;
}

processData(data);
