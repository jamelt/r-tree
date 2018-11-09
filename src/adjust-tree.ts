import { entryCreate } from './entry';
import { Node, nodeAdd, nodeEntriesAvailable, nodeRegion } from './node';
import { loadParentFn, Parent } from './parent';
import { Path } from './path';
import { regionEnlarge } from './region-create';
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
  const loadParent = loadParentFn(path);

  function parentEnlarge(): void {
    if (parent.entry === undefined) return;
    parent.entry.region = regionEnlarge(parent.entry.region, nodeRegion(node));
  }

  function propagateSplit(): Node | undefined {
    if (split === undefined) return;

    const splitEntry = entryCreate(split, nodeRegion(split));

    if (nodeEntriesAvailable(specification, parent.node)) {
      nodeAdd(parent.node, splitEntry);
      return undefined;
    } else {
      return splitNode(specification, parent.node, splitEntry).right;
    }
  }

  let parent: Parent = loadParent();
  while (!path.isRoot(node)) {
    parentEnlarge();
    split = propagateSplit();
    node = parent.node;
    parent = loadParent();
  }

  return rootAdjustmentCreate(node, split);
}
