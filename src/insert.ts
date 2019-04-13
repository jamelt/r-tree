import { adjustTree, RootAdjustment } from './adjust-tree';
import { chooseLeaf } from './r-choose-leaf';
import { Entry } from './entry';
import { Node, nodeAdd, nodeCreateBranch, nodeEntriesAvailable } from './node';
import { pathCreate } from './path';
import { Specification } from './specification';
import { splitNode } from './split';

export function insert(
  specification: Specification,
  node: Node,
  entry: Entry
): Node | void {
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

function growTree({ root, split }: RootAdjustment): Node | void {
  if (split === undefined) return;

  const grow = nodeCreateBranch();
  nodeAdd(grow, root);
  nodeAdd(grow, split);
  return grow;
}
