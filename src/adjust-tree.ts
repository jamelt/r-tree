// import { createDebugFn } from './debug';
import { Node, nodeAdd, nodeEntriesAvailable, nodeRegion } from './node';
import { Path } from './path';
import { regionEnlarge } from './region';
import { Specification } from './specification';

import { splitNode } from './split';

export interface RootAdjustment {
  root: Node;
  split?: Node;
}

function rootAdjustmentCreate(root: Node, split?: Node) {
  return { root, split };
}

export function adjustTree(
  specification: Specification,
  path: Path,
  node: Node,
  split?: Node
): RootAdjustment {
  function propagateSplit(): Node | undefined {
    if (split === undefined) return undefined;

    if (nodeEntriesAvailable(specification, parent)) {
      nodeAdd(parent, split);
      return undefined;
    } else {
      split = splitNode(specification, parent, split).right;
      regionEnlarge(parent.region, nodeRegion(node));
      return split;
    }
  }

  // const debug = createDebugFn(() => path.root());

  let parent: Node;

  while (path.length()) {
    parent = path.pop();
    regionEnlarge(parent.region, nodeRegion(node));
    split = propagateSplit();
    node = parent;
    // debug();
  }

  return rootAdjustmentCreate(node, split);
}
