import { BranchEntry, LeafEntry } from './entry';
import { Node } from './node';
import { RegionData } from './region-data';

export function chooseLeaf(node: Node, entry: LeafEntry): Node {
  if (node.leaf) return node;
  else {
    const entry = leastEnlargement(node.entries, entry);
  }

}

function leastEnlargement(entries: BranchEntry[], entry: LeafEntry) {

}

function enlarge(regionX: RegionData, regionY: RegionData): RegionData {

}



function chooseLeafRecursive