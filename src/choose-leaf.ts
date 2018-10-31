import { BranchNode } from './node/branch-node';
import { BranchEntry } from './entry/branch-entry';
import { LeafEntry } from './entry/leaf-entry';
import { LeafNode } from './node/leaf-node';
import { Node } from './node/node';
import { area, enlarge } from './region';

export function chooseLeaf(node: Node, ref: LeafEntry): LeafNode {
  if (node.leaf) {
    return <LeafNode>node;
  } else {
    const branch = <BranchNode>node;
    const entry = leastEnlargement(branch.entries, ref);
    return chooseLeaf(entry.child, ref);
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
