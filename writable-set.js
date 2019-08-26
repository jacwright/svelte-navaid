import { writable } from 'svelte/store';

export default function writableSet() {
  const set = new Set();
  const writableSet = writable(new Set());
  const api = { subscribe: writableSet.subscribe, has: set.has.bind(set) };

  ['add', 'delete', 'clear'].forEach(method => {
    api[method] = function() {
      set[method].apply(set, arguments);
      writableSet.set(set);
    };
  });

  return api;
}
