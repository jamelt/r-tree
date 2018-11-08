import { adjustTree, RootAdjustment } from './adjust-tree';
import { chooseLeaf } from './choose-leaf';
import { entryCreate, LeafEntry } from './entry';
import {
  Node,
  nodeAdd,
  nodeCreate,
  nodeEntriesAvailable,
  nodeRegion
} from './node';
import { pathCreate } from './path';
import { Specification } from './specification';
import { splitNode } from './split';

export function insert(
  specification: Specification,
  node: Node,
  entry: LeafEntry
): Node | void {
  const path = pathCreate();
  const leaf = chooseLeaf(path, node, entry);

  if (nodeEntriesAvailable(specification, leaf)) {
    nodeAdd(leaf, entry);
  } else {
    const split = splitNode(specification, leaf, entry);
    return growTree(adjustTree(specification, path, split.left, split.right));
  }
}

function growTree(adjustment: RootAdjustment): Node | void {
  if (adjustment.split === undefined) return;
  const root = nodeCreate();
  nodeAdd(root, entryCreate(adjustment.root, nodeRegion(adjustment.root)));
  nodeAdd(root, entryCreate(adjustment.split, nodeRegion(adjustment.split)));
  return root;
}
