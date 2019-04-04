import { Node } from './node';
import { Path } from './path';
import { regionArea, regionEnlarge } from './region';

export function chooseLeaf(path: Path, subtree: Node, ref: Node): Node {
  const processQueue: Node[] = [subtree];
  let node: Node;

  while (processQueue.length > 0) {
    node = processQueue.shift();
    path.push(node);
    if (node.leaf) return node;
    processQueue.push(leastEnlargement(node.entries, ref));
  }

  throw new Error('unable to choose suitable leaf');
}

function leastEnlargement(entries: Node[], ref: Node): Node {
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
