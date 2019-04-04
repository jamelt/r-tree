import { adjustTree, RootAdjustment } from './adjust-tree';
import { chooseLeaf } from './choose-leaf';
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
  entry: Node
): Node | void {
  if (node === undefined) return entry;

  const path = pathCreate();
  const leaf = chooseLeaf(path, node, entry);

  let adjustment: RootAdjustment;

  if (nodeEntriesAvailable(specification, leaf)) {
    nodeAdd(leaf, entry);
    adjustment = adjustTree(specification, path, leaf);
  } else {
    const { left, right } = splitNode(specification, leaf, entry);
    adjustment = adjustTree(specification, path, left, right);
  }

  return growTree(adjustment);
}

function growTree(adjustment: RootAdjustment): Node | void {
  if (adjustment.split === undefined) return;
  const root = nodeCreate();
  nodeAdd(root, adjustment.root);
  nodeAdd(root, adjustment.split);
  root.region = nodeRegion(root);
  return root;
}
