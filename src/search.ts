import { Id } from './data-types';
import { Entry } from './entry';
import { LeafEntry } from './entry';
import { LeafNode } from './node';
import { Node } from './node';
import { regionOverlaps, Region } from './region-create';
import { flatten } from './utils';

export function search(node: Node, region: Region): Id[] {
  if (node.leaf) return findIds(<LeafNode>node, region);

  const children = findChildren(node, region);
  const results = children.map(node => search(node, region));
  return flatten(results);
}

function findChildren(node: Node, region: Region): Node[] {
  return entries<Entry>(node, region).map(entry => entry.child);
}

function findIds(leaf: Node, region: Region): Id[] {
  return entries<LeafEntry>(leaf, region).map(entry => entry.id);
}

function entries<T extends Entry>(node: Node, region: Region): T[] {
  const entries = <T[]>node.entries;
  return entries.filter(entry => regionOverlaps(entry.region, region));
}
