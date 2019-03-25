import { createDebugFn } from '../debug';
import RTree from '../r-tree';
import { data, generateDataEntry } from './data';

test('insert', () => {
  const rtree = RTree({ minEntries: 1, maxEntries: 2 });
  const debug = createDebugFn(() => rtree.inspect(), '*');

  Object.keys(data).forEach(key => {
    const entry = data[key];
    rtree.insert(entry.id, entry.region);
    debug();
  });
});

test('insert-stress', () => {
  const rtree = RTree({ minEntries: 50, maxEntries: 100 });
  const debug = createDebugFn(() => rtree.inspect(), '*');

  let entry;
  for (let i = 0; i < 1000; i++) {
    entry = generateDataEntry(2, 1000);
    rtree.insert(entry.id, entry.region);
    if (i % 100 === 0) debug();
  }
});
