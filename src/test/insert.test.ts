import RTree from '../r-tree';
import { data } from './data';
import { inspect } from 'util';

test('insert', () => {
  const rtree = RTree({ minEntries: 1, maxEntries: 2 });
  const { a, b, c, d } = data;
  rtree.insert(a.id, a.region);
  rtree.insert(b.id, b.region);
  rtree.insert(c.id, c.region);
  rtree.insert(d.id, d.region);
  const root = rtree.inspect();
  const debug = inspect(root, { depth: 25 });
  console.log(debug);
});
