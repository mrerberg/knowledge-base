'use strict';

class Node {
    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class DoubleLinkedList {
    size = 0;

    constructor() {
        this.first = null;
        this.last = null;
    }

    isEmpty() {
        return this.size === 0;
    }

    prepend(data) {
        const node = new Node(data, this.first);

        this.size += 1;

        if (this.first) {
            this.first.prev = node;
        }

        this.first = node;

        if (!this.last) {
            this.last = node;
        }

        return this;
    }

    append(data) {
        const node = new Node(data, null, this.last);

        this.size += 1;

        if (!this.first || !this.last) {
            this.first = node;
            this.last = node;

            return this;
        }

        this.last.next = node;
        this.last = node;

        return this;
    }

    // unshift
    deleteFirst() {
        if (!this.first) {
            return;
        }

        const deletedNode = this.first;

        if (this.first.next) {
            this.first = this.first.next;
            this.first.prev = null;
        } else {
            this.first = null;
            this.last = null;
        }

        this.size -= 1;

        return deletedNode;
    }

    // pop
    deleteLast() {
        if (!this.last) {
            return;
        }

        const deletedNode = this.last;

        if (this.last.prev) {
            this.last = this.last.prev;
            this.last.next = null;
        } else {
            this.first = null;
            this.last = null;
        }

        this.size -= 1;

        return deletedNode;
    }

    reverse() {
        let currentNode = this.first;
        let nextNode = null;
        let prevNode = null;

        while (currentNode) {
            nextNode = currentNode.next;
            prevNode = currentNode.prev;

            currentNode.next = prevNode;
            currentNode.prev = nextNode;

            prevNode = currentNode;
            currentNode = nextNode;
        }

        this.last = this.first;
        this.first = prevNode;

        return this;
    }

    fromArray(values) {
        values.forEach((value) => this.append(value));

        return this;
    }

    clone() {
        const clonedList = new DoubleLinkedList();
        let currentNode = this.first;

        while (currentNode) {
            clonedList.append(currentNode.value);
            currentNode = currentNode.next;
        }

        return clonedList;
    }

    [Symbol.iterator]() {
        return {
            current: this.first,
            next() {
                if (!this.current) {
                    return {
                        value: null,
                        done: true,
                    };
                }

                const obj = {
                    value: this.current.value,
                    done: false,
                };

                this.current = this.current.next;

                return obj;
            },
        };
    }
}

module.exports = { DoubleLinkedList };
