import { Entry } from './entry/entry';
import { LeafEntry } from './entry/leaf-entry';
import { LeafNode } from './node/leaf-node';
import { Node } from './node/node';
import { area, enlarge } from './region';
import { error } from './utils';

export function chooseLeaf(node: Node, ref: LeafEntry): LeafNode {
  if (node.leaf) return <LeafNode>node;

  const entry = leastEnlargement(node.entries, ref);

  if (!entry.child) throw error('entry missing child');

  return chooseLeaf(entry.child, ref);
}

function leastEnlargement(entries: Entry[], ref: LeafEntry): Entry {
  let least = entries[0];
  let growth = Number.MAX_VALUE;

  entries.forEach(entry => {
    let combined = area(enlarge(ref.region, entry.region));
    let diff = area(ref.region) - combined;

    if (diff < growth) {
      growth = diff;
      least = entry;
    } else if (diff === growth) {
      if (combined < area(least.region)) least = entry;
    }
  });

  return least;
}
