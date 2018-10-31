import { Id } from './data-types';
import { Entry } from './entry/entry';
import { LeafEntry } from './entry/leaf-entry';
import { LeafNode } from './node/leaf-node';
import { Node } from './node/node';
import { overlaps, Region } from './region';

export function searchSubtree(node: Node, region: Region): Id[] {
  return [...searchRecursive(node, region)];
}

function searchRecursive(node: Node, region: Region): Id[] {
  if (node.leaf) return [...findIdsOverlappingRegion(<LeafNode>node, region)];

  const children = findChildrenOverlappingRegion(node, region);
  const results = children.map(node => searchRecursive(node, region));
  return [...results];
}

function findChildrenOverlappingRegion(node: Node, region: Region): Node[] {
  return nodeEntriesOverlapping<Entry>(node, region).map(entry => entry.child);
}

function findIdsOverlappingRegion(leaf: Node, region: Region): Id[] {
  return nodeEntriesOverlapping<LeafEntry>(leaf, region).map(entry => entry.id);
}

function nodeEntriesOverlapping<T extends Entry>(
  node: Node,
  region: Region
): T[] {
  const entries = <T[]>node.entries;
  return entries.filter(entry => overlaps(entry.region, region));
}
