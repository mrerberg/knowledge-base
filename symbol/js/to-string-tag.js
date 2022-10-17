'use strict';

// https://dev.to/cherif_b/using-javascript-tostringtag-for-objects-types-description-15hc

const user = {
    firstName: 'Mikhail',
    lastName: 'Cheremuhin-Rerberg',
    age: 24,

    get [Symbol.toStringTag]() {
        return 'User';
    },

    toString() {
        return `${this.firstName} ${this.lastName}`;
    }
};

console.log('user.toString()', user.toString());
console.log('[Symbol.toStringTag]', user[Symbol.toStringTag]);
