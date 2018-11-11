import { entryCreateLeaf } from '../entry';
import { nodeAdd, nodeCreateLeaf, nodeRegion } from '../node';
import { data } from './data';

test('nodeRegion', () => {
  const node = nodeCreateLeaf();
  nodeAdd(node, entryCreateLeaf(data.a.id, data.a.region));
  nodeAdd(node, entryCreateLeaf(data.b.id, data.b.region));
  nodeAdd(node, entryCreateLeaf(data.c.id, data.c.region));
  const region = nodeRegion(node);
  expect(region.min).toEqual([5, 5]);
  expect(region.max).toEqual([75, 63]);
});
