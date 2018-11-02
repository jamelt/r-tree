import { Id } from './data-types';
import { Entry } from './entry/entry';
import { LeafEntry } from './entry/leaf-entry';
import { LeafNode } from './node/leaf-node';
import { Node } from './node/node';
import { region_overlaps, Region } from './region';

export function search_subtree(node: Node, region: Region): Id[] {
  return [...search_recursive(node, region)];
}

function search_recursive(node: Node, region: Region): Id[] {
  if (node.leaf) return [...find_ids_overlapping_region(<LeafNode>node, region)];

  const children = find_children_overlapping_region(node, region);
  const results = children.map(node => search_recursive(node, region));
  return [...results];
}

function find_children_overlapping_region(node: Node, region: Region): Node[] {
  return node_entries_overlapping_region<Entry>(node, region).map(entry => entry.child);
}

function find_ids_overlapping_region(leaf: Node, region: Region): Id[] {
  return node_entries_overlapping_region<LeafEntry>(leaf, region).map(entry => entry.id);
}

function node_entries_overlapping_region<T extends Entry>(
  node: Node,
  region: Region
): T[] {
  const entries = <T[]>node.entries;
  return entries.filter(entry => region_overlaps(entry.region, region));
}
