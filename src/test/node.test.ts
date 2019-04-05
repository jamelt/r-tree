import { nodeAdd, nodeCreateLeaf, nodeRegion } from '../node';
import { regionCopy, regionSet } from '../region';
import { data } from './data';

test('nodeRegion', () => {
  const node = nodeCreateLeaf();
  nodeAdd(node, data.a);
  nodeAdd(node, data.b);
  nodeAdd(node, data.c);
  regionSet(node, nodeRegion(node));
  expect(regionCopy(node)).toEqual({ minX: 5, minY: 5, maxX: 75, maxY: 63 });
});
