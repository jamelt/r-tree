import { condenseTree } from './condense-tree';
import { Id } from './data-types';
import { LeafEntry } from './entry';
import { findLeaf } from './find-leaf';
import { nodeFind, nodeRemove } from './node';
import { pathCreate } from './path';
import { RTree } from './r-tree';
import { Region } from './region';
import { Specification } from './specification';
import { Node } from './node';

export function remove(
  rtree: RTree,
  specification: Specification,
  node: Node,
  id: Id,
  region: Region
): void {
  const path = pathCreate();
  const { leaf } = findLeaf(path, node, id, region, {});
  if (leaf === undefined) return;
  nodeRemove(node, <LeafEntry>nodeFind(leaf, id));
  condenseTree(rtree, specification, path, leaf);
  rtree.condense();
}
