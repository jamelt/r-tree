import RTree from '../r-tree';
import { data } from './data';
import { inspect } from 'util';

test('insert', () => {
  const rtree = RTree({ minEntries: 1, maxEntries: 2 });

  Object.keys(data).forEach(key => {
    const entry = data[key];
    rtree.insert(entry.id, entry.region);
  });

  const root = rtree.inspect();
  const debug = inspect(root, { depth: 25 });
  console.log(debug);
});
