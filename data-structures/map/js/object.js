'use strict';

/**
 * Tasks:
 * - implement map with class
 * - implement Map polyfill with 2 arrays: for keys and for values
 * - implement Iterable interface in polyfill, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 */

class Dictionary {
    #keys;
    #values;

    constructor() {
        // Objects could have only string keys
        // and use Map to implement map sounds weird
        this.#keys = [];
        this.#values = [];
    }

    set(key, value) {
        this.#keys.push(key);
        this.#values.push(value);

        return this;
    }

    get(key) {
        const index = this.#keys.indexOf(key);

        return this.#values[index];
    }

    has(key) {
        return this.#keys.includes(key);
    }

    delete(key) {
        const index = this.#keys.indexOf(key);

        if (index === -1) return false;

        this.#keys.splice(index, 1);
        this.#values.splice(index, 1);

        return true;
    }

    clear() {
        this.#keys = [];
        this.#values = [];
    }
    // TODO: iterator MDN
    keys() {
        return this.#keys.slice();
    }

    values() {
        return this.#values.slice();
    }

    get size() {
        return this.#keys.length;
    }

    static from(iterable) {
        const instance = new Dictionary();

        for (const [key, value] of iterable) {
            instance.set(key, value);
        }

        return instance;
    }

    /**
     * Implementation iterable protocol
     * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
     */
    [Symbol.iterator]() {
        let index = 0;

        return {
            next: () => {
                if (index >= this.#keys.length) {
                    return {
                        done: true,
                    };
                }

                const resp = {
                    done: false,
                    value: [this.#keys[index], this.#values[index]],
                };

                index++;

                return resp;
            },
        };
    }
}

module.exports = { Dictionary };
