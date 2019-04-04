import { Id } from '../data-types';
// import { createDebugFn } from '../debug';
import RTree from '../r-tree';
import { data } from './data';

let results: Id[];
test('search', () => {
  const rtree = RTree({ minEntries: 1, maxEntries: 2 });
  // const debug = createDebugFn(() => rtree.inspect(), '*');

  Object.keys(data).forEach(key => {
    const entry = data[key];
    rtree.insert(entry.id, entry.region);
  });

  // debug();

  results = rtree.search({ minX: 3, minY: 3, maxX: 10, maxY: 10 });
  expect(results).toContain('a');

  results = rtree.search({ minX: 48, minY: 48, maxX: 52, maxY: 52 });
  expect(results).toContain('g');

  results = rtree.search({ minX: 0, minY: 0, maxX: 100, maxY: 100 });
  expect(results).toHaveLength(10);
});
