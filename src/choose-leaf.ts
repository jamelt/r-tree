import { Entry, LeafEntry } from './entry';
import { LeafNode, Node } from './node';
import { Path } from './path';
import { regionArea, regionEnlarge } from './region';
import { error } from './utils';

export function chooseLeaf(path: Path, node: Node, ref: LeafEntry): LeafNode {
  path.push(node);

  if (node.leaf) return <LeafNode>node;

  const entry = leastEnlargement(node.entries, ref);

  path.push(entry);

  if (!entry.child) throw error('entry missing child');

  return chooseLeaf(path, entry.child, ref);
}

function leastEnlargement(entries: Entry[], ref: LeafEntry): Entry {
  let least = entries[0];
  let growth = Number.POSITIVE_INFINITY;

  entries.forEach((entry) => {
    const combined = regionArea(regionEnlarge(ref.region, entry.region));
    const diff = regionArea(ref.region) - combined;

    if (diff < growth) {
      growth = diff;
      least = entry;
    } else if (diff === growth) {
      if (combined < regionArea(least.region)) least = entry;
    }
  });

  return least;
}
