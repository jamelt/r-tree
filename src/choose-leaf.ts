import { BranchEntry } from './branch-entry';
import { BranchNode } from './branch-node';
import { LeafEntry } from './leaf-entry';
import { LeafNode } from './leaf-node';
import { Node } from './node';
import { area, enlarge } from './region';

export function chooseLeaf(node: Node, ref: LeafEntry): LeafNode {
  if (node.leaf) {
    return <LeafNode>node;
  } else {
    const branch = <BranchNode>node;
    const branchEntry = leastEnlargement(branch.entries, ref);
    return chooseLeaf(branchEntry.child, ref);
  }
}

function leastEnlargement(entries: BranchEntry[], ref: LeafEntry): BranchEntry {
  let least: BranchEntry = entries[0];
  let enlargement = Number.MAX_VALUE;

  entries.forEach(entry => {
    let combinedArea = area(enlarge(ref.region, entry.region));
    let enlarged = area(ref.region) - combinedArea;

    if (enlarged < enlargement) {
      enlargement = enlarged;
      least = entry;
    } else if (enlarged === enlargement) {
      if (combinedArea < area(least.region)) least = entry;
    }
  });

  return least;
}
