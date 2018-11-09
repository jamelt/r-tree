import { Id } from './data-types';
import { LeafNode, Node } from './node';
import { Region, regionOverlaps } from './region-create';
import { isNil } from './utils';

export interface FindLeafResult {
  leaf?: LeafNode;
}

export function findLeaf(
  node: Node,
  id: Id,
  region: Region,
  result: FindLeafResult
): FindLeafResult {
  if (node.leaf) findEntry(<LeafNode>node, id, result);
  else findNode(node, region, id, result);
  return result;
}

function findEntry(leaf: LeafNode, id: Id, result: FindLeafResult) {
  leaf.entries.some(entry => {
    if (id === entry.id) result.leaf = leaf;
    return !isNil(result.leaf);
  });
}

function findNode(node: Node, region: Region, id: Id, result: FindLeafResult) {
  node.entries.some(entry => {
    if (regionOverlaps(entry.region, region))
      findLeaf(entry.child, id, region, result);
    return !isNil(result.leaf);
  });
}
