import { BranchEntry } from './branch-entry';
import { BranchNode } from './branch-node';
import { Id } from './data-types';
import { Entry } from './entry';
import { LeafEntry } from './leaf-entry';
import { LeafNode } from './leaf-node';
import { Node } from './node';
import { Region } from './region';

export function search(node: Node, region: Region): Id[] {
  return [...searchRecursive(node, region)];
}

function searchRecursive(node: Node, region: Region): Id[] {
  if (node.branch) {
    const branch = <BranchNode>node;
    const children = findChildNodesOverlappingRegion(branch, region);
    const searchResults = children.map(node => searchRecursive(node, region));
    return [...searchResults];
  } else {
    const leaf = <LeafNode>node;
    return [...findIdsOverlappingRegion(leaf, region)];
  }
}

function findChildNodesOverlappingRegion(branch: Node, region: Region): Node[] {
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
  return entries.filter(entry => entry.region.overlaps(region));
}
