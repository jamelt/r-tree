import RTree from '../r-tree';
import { data } from './data';

test('insert', () => {
  const rtree = RTree({minEntries: 1, maxEntries: 2});
  const { a, b, c } = data;
  rtree.insert(a.id, a.region);
  rtree.insert(b.id, b.region);
  rtree.insert(c.id, c.region);
  const root = rtree.inspect();
  console.log(root);
});
