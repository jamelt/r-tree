import { chooseLeaf } from './choose-leaf';
import { LeafEntry } from './entry';
import { Node, nodeAddEntry, nodeEntriesAvailable } from './node';
import { pathCreate } from './path';
import { Specification } from './specification';
import { splitNode } from './split';

export function insert(
  specification: Specification,
  node: Node,
  entry: LeafEntry
): void {
  const path = pathCreate();
  const leaf = chooseLeaf(node, entry, path);

  if (nodeEntriesAvailable(specification, leaf)) {
    nodeAddEntry(leaf, entry);
  } else {
    // @ts-ignore
    const split = splitNode(specification, leaf, entry);
  }
}
