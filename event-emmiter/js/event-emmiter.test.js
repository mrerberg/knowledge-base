'use strict';

const { emitter } = require('./event-emmiter');

jest.useFakeTimers();

describe('emitter', () => {
  describe('on and emit', () => {
    it('should add handler to event and invoke it', () => {
      const ee = emitter();
      const cb = jest.fn((data) => data);
      const args = { msg: 'ok' };

      ee.on('e1', cb);
      ee.emit('e1', args);

      expect(cb).toHaveBeenCalled();
      expect(cb).toHaveBeenCalledWith(args);
    });

    it('should add handler to event and remove it after timeout', () => {
      const ee = emitter();
      const cb = jest.fn();
      const timeout = 1000;

      ee.on('e1', cb, timeout);

      jest.runAllTimers();

      expect(ee.has('e1')).toBe(false);
    });
  });

  describe('has()', () => {
    it('should return true if ee has such event', () => {
      const ee = emitter();
      const cb = jest.fn();

      ee.on('e1', cb);

      expect(ee.has('e1')).toBe(true);
    });

    it('should return false if ee does not have such event', () => {
      const ee = emitter();
      const cb = jest.fn();

      ee.on('e1', cb);

      expect(ee.has('e2')).toBe(false);
    });

    it('should return true if ee has such event handler', () => {
      const ee = emitter();

      const cb = jest.fn();

      ee.on('e1', cb);

      expect(ee.has('e1', cb)).toBe(true);
    });

    it('should return false if ee does not have such event handler', () => {
      const ee = emitter();

      const cb = jest.fn();
      const cb2 = jest.fn();

      ee.on('e1', cb);

      expect(ee.has('e1', cb2)).toBe(false);
    });
  });

  describe('names()', () => {
    it('should return all listening events', () => {
      const ee = emitter();
      const events = ['e1', 'e2', 'e3', 'e4'];

      events.forEach((eventName) => {
        ee.on(eventName, jest.fn());
      });

      const names = ee.names();

      expect(names).toHaveLength(events.length);
      events.forEach((eventName) => expect(names).toContain(eventName));
    });
  });

  describe('listeners()', () => {
    it('should return all events handlers', () => {
      const ee = emitter();

      ee.on('e1', jest.fn());
      ee.on('e1', jest.fn());

      expect(ee.listeners('e1')).toHaveLength(2);
    });
  });

  describe('clear()', () => {
    it('should clear all event handlers', () => {
      const ee = emitter();

      ee.on('e1', jest.fn());
      ee.on('e2', jest.fn());

      ee.clear('e1');

      expect(ee.has('e1')).toBe(false);
    });

    it('should clear all events and all handlers', () => {
      const ee = emitter();

      ee.on('e1', jest.fn());
      ee.on('e2', jest.fn());

      ee.clear();

      expect(ee.names()).toHaveLength(0);
    });
  });

  describe('count()', () => {
    it('should return correct number of event handlers', () => {
      const ee = emitter();

      ee.on('e4', jest.fn());
      ee.on('e4', jest.fn());

      expect(ee.count('e4')).toBe(2);
    });
  });

  describe('once', () => {
    it('should invoke event handler only once', () => {
      const ee = emitter();
      const cb = jest.fn((data) => data);

      ee.once('e1', cb);
      ee.emit('e1', { msg: 'ok' });
      ee.emit('e1', { msg: 'not ok' });

      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith({ msg: 'ok' });
    });
  });

  describe('remove()', () => {
    it('should remove concrete handler', () => {
      const ee = emitter();
      const cb = jest.fn();
      const cb2 = jest.fn();

      ee.on('e1', cb);
      ee.on('e1', cb2);
      ee.remove('e1', cb);

      expect(ee.has('e1', cb)).toBe(false);
    });

    it('should remove event if all it\'s handlers are removed', () => {
      const ee = emitter();
      const cb = jest.fn();

      ee.on('e1', cb);
      ee.remove('e1', cb);

      expect(ee.has('e1')).toBe(false);
    });

    it('should remove event if all it\'s handlers are removed', () => {
      const ee = emitter();
      const cb = jest.fn();

      ee.once('e1', cb);
      ee.remove('e1', cb);

      expect(ee.has('e1')).toBe(false);
    });
  });

  describe('prepend()', () => {
    it('should put handler before all other', () => {
      const ee = emitter();
      const cb = jest.fn();

      ee.on('e1', jest.fn());
      ee.on('e1', jest.fn());
      ee.prepend('e1', cb);

      expect(ee.listeners('e1')[0]).toBe(cb);
    });

    it('should add handler as first if there are no handlers', () => {
      const ee = emitter();
      const cb = jest.fn();

      ee.prepend('e1', cb);

      expect(ee.listeners('e1')[0]).toBe(cb);
    });
  });

  describe('insert()', () => {
    it('should insert handler before another', () => {
      const ee = emitter();
      const cb = jest.fn();
      const cb2 = jest.fn();

      ee.on('e1', jest.fn());
      ee.on('e1', cb2);
      ee.insert('e1', cb, cb2);

      expect(ee.count('e1')).toBe(3);
      const listeners = ee.listeners('e1');

      const indexOfCb = listeners.indexOf(cb);
      const indexOfCb2 = listeners.indexOf(cb2);

      expect(indexOfCb).toBeLessThan(indexOfCb2);
    });
  });
});

