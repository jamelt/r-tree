import { Node, nodeAdd, nodeEntriesAvailable } from './node';
import { Path } from './path';
import { regionEnlargeAndSet } from './region';
import { Specification } from './specification';

import { splitNode } from './split';

export interface RootAdjustment {
  root: Node;
  split?: Node;
}

function rootAdjustmentCreate(root: Node, split?: Node) {
  return { root, split };
}

export function adjustTree(specification: Specification, path: Path, node: Node, split?: Node): RootAdjustment {
  function propagateSplit(): Node | undefined {
    if (split === undefined) return;

    if (nodeEntriesAvailable(specification, parent)) {
      nodeAdd(parent, split);
      return undefined;
    } else {
      split = splitNode(specification, parent, split).right;
      regionEnlargeAndSet(parent, node);
      return split;
    }
  }

  let parent: Node;

  while (!path.isRoot(node)) {
    parent = path.pop();
    regionEnlargeAndSet(parent, node);
    split = propagateSplit();
    node = parent;
  }

  return rootAdjustmentCreate(node, split);
}
