import { BranchEntry, Entry, LeafEntry } from './entry';
import { Node } from './node';
import { Id } from './r-tree';
import { RegionData } from './region-data';

export function search(node: Node, region: RegionData): Id[] {
  return [...searchRecursive(node, region)];
}

function searchRecursive(node: Node, region: RegionData): Id[] {
  if (node.branch) {
    return [
      ...branchesOverlappingChildren(node, region).map(node =>
        searchRecursive(node, region)
      )
    ];
  } else {
    return [...leafsOverlappingIds(node, region)];
  }
}

function branchesOverlappingChildren(branch: Node, region: RegionData): Node[] {
  return overlaps<BranchEntry>(branch, region).map(entry => entry.child);
}

function leafsOverlappingIds(leaf: Node, region: RegionData): Id[] {
  return overlaps<LeafEntry>(leaf, region).map(entry => entry.id);
}

function overlaps<EntryType extends Entry>(
  node: Node,
  region: RegionData
): EntryType[] {
  return (node.entries as EntryType[]).filter(entry =>
    entry.region.overlaps(region)
  );
}
