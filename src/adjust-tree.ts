import { createDebugFn } from './debug';
import { entryCreate, NULL_ENTRY } from './entry';
import { Node, nodeAdd, nodeEntriesAvailable, nodeRegion } from './node';
import { loadParentFn, Parent } from './parent';
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
  const loadParent = loadParentFn(path);

  function parentEnlarge(): void {
    if (parent.entry === undefined || parent.entry === NULL_ENTRY) return;
    parent.entry.region = regionEnlarge(nodeRegion(node), parent.entry.region);
  }

  function propagateSplit(): Node | undefined {
    if (split === undefined) return;

    const splitEntry = entryCreate(split, nodeRegion(split));

    if (nodeEntriesAvailable(specification, parent.node)) {
      nodeAdd(parent.node, splitEntry);
      return undefined;
    } else {
      split = splitNode(specification, parent.node, splitEntry).right;
      parentEnlarge();
      return split;
    }
  }

  const debug = createDebugFn(() => path.root());

  let parent: Parent = loadParent();
  debug();
  while (!path.isRoot(node)) {
    parentEnlarge();
    split = propagateSplit();
    node = parent.node;
    parent = loadParent();
    debug();
  }

  return rootAdjustmentCreate(node, split);
}
