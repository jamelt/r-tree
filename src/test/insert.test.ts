import RTree from '../r-tree';
import { createDebugFn } from '../debug';
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
  const rtree = RTree({ minEntries: 1, maxEntries: 4 });
  const debug = createDebugFn(() => rtree.inspect(), '*');
  const count = 15;
  const range = 100;
  const debugCount = 15;

  let entry;
  for (let i = 0; i < count; i++) {
    entry = generateDataEntry(2, range);
    rtree.insert(entry.id, entry.region);
    if (i % (count / debugCount) === 0) debug();
  }
});
