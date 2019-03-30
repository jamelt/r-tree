//
// import { Id } from './data-types';
// import { LeafNode, Node, NULL_NODE } from './node';
// import { Path } from './path';
// import { Region, regionOverlaps } from './region';
//
// export interface FindLeafResult {
//   leaf?: LeafNode;
// }
//
// export function findLeaf(
//   path: Path,
//   subtree: Node,
//   id: Id,
//   region: Region,
//   result: FindLeafResult
// ): FindLeafResult {
//   const processQueue: Node[] = [subtree];
//
//   while(processQueue.length>0) {
//     const node = processQueue.shift() || NULL_NODE;
//     path.push(node);
//     if (node.leaf) {
//
//     }
//   }
//
//   if (node.leaf) findEntry(<LeafNode>node, id, result);
//   else findNode(path, node, region, id, result);
//
//   return result;
// }
//
// function findEntry(leaf: LeafNode, id: Id, result: FindLeafResult) {
//   for (let i = 0; i < leaf.entries.length; i++)
//     if (leaf.entries[i].id === id) return node.entries[i];
//   return undefined;
//   leaf.entries.some((entry) => {
//     if (id === entry.id) result.leaf = leaf;
//     return result.leaf !== undefined;
//   });
// }
//
// function findNode(
//   path: Path,
//   node: Node,
//   region: Region,
//   id: Id,
//   result: FindLeafResult
// ) {
//   node.entries.some((entry) => {
//     if (regionOverlaps(entry.region, region)) {
//       path.push(entry);
//       findLeaf(path, entry.child, id, region, result);
//     }
//     return result.leaf !== undefined;
//   });
// }

import { Id } from './data-types';
import { LeafNode, Node } from './node';
import { Path } from './path';
import { Region, regionOverlaps } from './region';

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
  leaf.entries.some((entry) => {
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
  node.entries.some((entry) => {
    if (regionOverlaps(entry.region, region)) {
      path.push(entry);
      findLeaf(path, entry.child, id, region, result);
    }
    return result.leaf !== undefined;
  });
}
