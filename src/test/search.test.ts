import { Id } from '../data-types';
import RTree from '../r-tree';
import { data } from './data';

let results: Id[];
test('search', () => {
  const rtree = RTree({ minEntries: 1, maxEntries: 2 });

  Object.keys(data).forEach(key => {
    const entry = data[key];
    rtree.insert(entry.id, entry.region);
  });

  results = rtree.search({ min: [3, 3], max: [10, 10] });
  expect(results).toContain('a');

  results = rtree.search({ min: [48, 48], max: [52, 52] });
  expect(results).toContain('g');

  results = rtree.search({ min: [0, 0], max: [100, 100] });
  expect(results).toHaveLength(7);

  console.log(results);
});
