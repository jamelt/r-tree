import { BranchNode } from './node/branch-node';
import { Id } from './data-types';
import { BranchEntry } from './entry/branch-entry';
import { Entry } from './entry/entry';
import { LeafEntry } from './entry/leaf-entry';
import { LeafNode } from './node/leaf-node';
import { Node } from './node/node';
import { overlaps, Region } from './region';

export function searchSubtree(node: Node, region: Region): Id[] {
  return [...searchRecursive(node, region)];
}

function searchRecursive(node: Node, region: Region): Id[] {
  if (node.branch) {
    const branch = <BranchNode>node;
    const children = findChildrenOverlappingRegion(branch, region);
    const results = children.map(node => searchRecursive(node, region));
    return [...results];
  } else {
    const leaf = <LeafNode>node;
    return [...findIdsOverlappingRegion(leaf, region)];
  }
}

function findChildrenOverlappingRegion(branch: Node, region: Region): Node[] {
  return nodeEntriesOverlapping<BranchEntry>(branch, region).map(
    entry => entry.child
  );
}

function findIdsOverlappingRegion(leaf: Node, region: Region): Id[] {
  return nodeEntriesOverlapping<LeafEntry>(leaf, region).map(
    entry => entry.id
  );
}

function nodeEntriesOverlapping<EntryType extends Entry>(
  node: Node,
  region: Region
): EntryType[] {
  const entries = <EntryType[]>node.entries;
  return entries.filter(entry => overlaps(entry.region, region));
}
