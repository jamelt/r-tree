import { Entry } from './entry/entry';
import { LeafEntry } from './entry/leaf-entry';
import { LeafNode } from './node/leaf-node';
import { Node } from './node/node';
import { region_area, region_enlarge } from './region';
import { error } from './utils';

export function choose_leaf(node: Node, ref: LeafEntry): LeafNode {
  if (node.leaf) return <LeafNode>node;

  const entry = least_enlargement(node.entries, ref);

  if (!entry.child) throw error('entry missing child');

  return choose_leaf(entry.child, ref);
}

function least_enlargement(entries: Entry[], ref: LeafEntry): Entry {
  let least = entries[0];
  let growth = Number.MAX_VALUE;

  entries.forEach(entry => {
    let combined = region_area(region_enlarge(ref.region, entry.region));
    let diff = region_area(ref.region) - combined;

    if (diff < growth) {
      growth = diff;
      least = entry;
    } else if (diff === growth) {
      if (combined < region_area(least.region)) least = entry;
    }
  });

  return least;
}
