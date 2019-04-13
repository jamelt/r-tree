import { Entry } from './entry';
import { Node } from './node';
import { Path } from './path';
import { regionArea, regionEnlarge } from './region';

export function chooseLeaf(path: Path, subtree: Node, ref: Entry): Node {
  const processQueue: Node[] = [subtree];

  let node: Node | undefined;
  let child: Node;

  while ((node = processQueue.shift())) {
    path.push(node);

    if (node.leaf) return node;

    child = leastEnlargement(node.entries, ref);

    processQueue.push(child);
  }

  throw new Error('unable to choose suitable leaf');
}

function leastEnlargement(entries: (Node | Entry)[], ref: Entry): Node {
  let least = entries[0];
  let growth = Infinity;

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const combined = regionArea(regionEnlarge(ref, entry));
    const diff = regionArea(ref) - combined;

    if (diff < growth) {
      growth = diff;
      least = entry;
    } else if (diff === growth) {
      if (combined < regionArea(least)) {
        least = entry;
      }
    }
  }

  return <Node> least;
}
