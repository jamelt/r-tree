import { Id } from '../data-types';
import RTree from '../r-tree';
import { data } from './data';

let results: Id[];
test('search', () => {
  const rtree = RTree();

  Object.keys(data).forEach((key) => {
    rtree.insert(data[key]);
  });

  results = rtree.search({ minX: 3, minY: 3, maxX: 10, maxY: 10 });
  expect(results.find((item) => item.id === 'a')).toBeTruthy();

  results = rtree.search({ minX: 48, minY: 48, maxX: 52, maxY: 52 });
  expect(results.find((item) => item.id === 'g')).toBeTruthy();

  results = rtree.search({ minX: 0, minY: 0, maxX: 100, maxY: 100 });
  expect(results).toHaveLength(10);
});
