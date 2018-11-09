import { Id } from './data-types';
import { LeafEntry } from './entry';
import { LeafNode, Node, nodeCreateNull } from './node';
import { Region, regionOverlaps } from './region-create';

export function findLeaf(node: Node, id: Id, region: Region): LeafNode {
  let found: LeafNode;
  if (node.leaf) {
    node.entries.forEach(entry => {
      if (found) return;
      if (id == (<LeafEntry>entry).id) found = node;
    });
  } else {
    node.entries.forEach(entry => {
      if (found) return;
      if (!regionOverlaps(entry.region, region)) return;
      found = found || findLeaf(entry.child, id, region);
    });
  }
  return found;
}
