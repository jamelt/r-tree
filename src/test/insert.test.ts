import { createDebugFn } from '../debug';
import RTree from '../r-tree';
import { data } from './data';

test('insert', () => {
  const rtree = RTree({ minEntries: 1, maxEntries: 2 });
  const debug = createDebugFn(() => rtree.inspect(), '*');

  Object.keys(data).forEach(key => {
    const entry = data[key];
    rtree.insert(entry.id, entry.region);
    debug();
  });
});
