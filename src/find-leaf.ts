import { Id } from './data-types';
import { LeafNode, Node } from './node';
import { Path } from './path';
import { Region, regionOverlaps } from './region-create';

export interface FindLeafResult {
  leaf?: LeafNode;
}

export function findLeaf(
  path: Path,
  node: Node,
  id: Id,
  region: Region,
  result: FindLeafResult
): FindLeafResult {
  path.push(node);
  if (node.leaf) findEntry(<LeafNode>node, id, result);
  else findNode(path, node, region, id, result);
  return result;
}

function findEntry(leaf: LeafNode, id: Id, result: FindLeafResult) {
  leaf.entries.some(entry => {
    if (id === entry.id) result.leaf = leaf;
    return result.leaf !== undefined;
  });
}

function findNode(
  path: Path,
  node: Node,
  region: Region,
  id: Id,
  result: FindLeafResult
) {
  node.entries.some(entry => {
    if (regionOverlaps(entry.region, region)) {
      path.push(entry);
      findLeaf(path, entry.child, id, region, result);
    }
    return result.leaf !== undefined;
  });
}
