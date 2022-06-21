"use strict";

const emitter = () => {
  const events = new Map();
  const wrapped = new Map();

  // TODO: this?
  const ee = {
    on: (name, cb, timeout = 0) => {
      const event = events.get(name);

      if (event) {
        event.push(cb);
        return;
      }

      events.set(name, [cb]);

      if (timeout) {
        setTimeout(() => {
          ee.remove(name, cb)
        }, timeout);
      }
    },

    emit: (name, ...data) => {
      const event = events.get(name);

      if (event) {
        event.forEach((cb) => cb(...data));
      }
    },

    once: (name, cb) => {
      const g = (...args) => {
        ee.remove(name, g);
        cb(...args);
      };

      wrapped.set(cb, g);

      ee.on(name, g);
    },

    remove(name, cb) {
      const event = events.get(name);

      if (!event) return;

      const index = event.indexOf(cb);

      if (index !== -1) {
        event.splice(index, 1);
        if (!event.length) events.delete(name);
        return;
      }

      const g = wrapped.get(cb);

      if (g) {
        const index = event.indexOf(g);
        if (index !== -1) event.splice(index, 1);
        if (!event.length) events.delete(name);
      }
    },

    /**
     * Create new array to guard original data and
     * encapsulate it in function
     */
    names: () => [...events.keys()],

    listeners: (name) => {
      const event = events.get(name);

      return event.slice();
    },

    clear: (name) => {
      if (name) events.delete(name);
      else events.clear();
    },

    count: (name) => {
      const event = events.get(name);

      if (!event) return;

      return event.length ? event.length : 0;
    },

    has: (name, cb) => {
      const event = events.get(name);

      if (cb) {
        return event.includes(cb);
      }

      return Boolean(event);
    },

    prepend: (name, cb) => {
      const event = events.get(name);

      if (!event) {
        events.set(name, [cb]);
        return;
      }

      event.unshift(cb);
    },

    insert: (name, cb, targetCb) => {
      const event = events.get(name);

      if (!event) {
        return;
      }

      const targetCbIndex = event.indexOf(targetCb);

      events.set(name, [
        ...event.slice(0, targetCbIndex),
        cb,
        ...event.slice(targetCbIndex),
      ]);
    },
  };

  return ee;
};

module.exports = { emitter };
