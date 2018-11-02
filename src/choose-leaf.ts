import { Entry, LeafEntry } from './entry';
import { LeafNode, Node } from './node';
import { Path } from './path';
import { regionArea, regionEnlarge } from './region-create';
import { error } from './utils';

export function chooseLeaf(node: Node, ref: LeafEntry, path: Path): LeafNode {
  path.push(node);

  if (node.leaf) return <LeafNode>node;

  const entry = leastEnlargement(node.entries, ref);

  if (!entry.child) throw error('entry missing child');

  path.push(entry.child);

  return chooseLeaf(entry.child, ref, path);
}

function leastEnlargement(entries: Entry[], ref: LeafEntry): Entry {
  let least = entries[0];
  let growth = Number.MAX_VALUE;

  entries.forEach(entry => {
    let combined = regionArea(regionEnlarge(ref.region, entry.region));
    let diff = regionArea(ref.region) - combined;

    if (diff < growth) {
      growth = diff;
      least = entry;
    } else if (diff === growth) {
      if (combined < regionArea(least.region)) least = entry;
    }
  });

  return least;
}
