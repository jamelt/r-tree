import { Entry, LeafEntry } from './entry';
import { LeafNode, Node, NULL_NODE } from './node';
import { Path } from './path';
import { regionArea, regionEnlarge } from './region';
import { error } from './utils';

export function chooseLeaf(
  path: Path,
  subtree: Node,
  ref: LeafEntry
): LeafNode {
  const processQueue: Node[] = [subtree];

  while (processQueue.length > 0) {
    const node = processQueue.shift() || NULL_NODE;

    path.push(node);

    if (node.leaf) return <LeafNode>node;

    const entry = leastEnlargement(node.entries, ref);

    path.push(entry);

    if (!entry.child) throw error('entry missing child');

    processQueue.push(entry.child);
  }

  throw new Error('unable to choose suitable leaf');
}

function leastEnlargement(entries: Entry[], ref: LeafEntry): Entry {
  let least = entries[0];
  let growth = Number.POSITIVE_INFINITY;

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const combined = regionArea(regionEnlarge(ref.region, entry.region));
    const diff = regionArea(ref.region) - combined;

    if (diff < growth) {
      growth = diff;
      least = entry;
    } else if (diff === growth) {
      if (combined < regionArea(least.region)) least = entry;
    }
  }

  return least;
}
