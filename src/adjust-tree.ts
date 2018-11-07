import { Entry, entryCreate, NULL_ENTRY } from './entry';
import { Node, nodeAdd, nodeEntriesAvailable, nodeRegion, NULL_NODE } from './node';
import { Path } from './path';
import { regionEnlarge } from './region-create';
import { Specification } from './specification';
import { splitNode } from './split';

interface RootAdjustment {}

interface Parent {
  entry: Entry;
  node: Node;
}

function parentCreateNull(): Parent {
  return { entry: NULL_ENTRY, node: NULL_NODE };
}

function parentEnlarge(parent: Parent, node: Node): void {
  if (parent.entry === undefined) return;
  parent.entry.region = regionEnlarge(parent.entry.region, nodeRegion(node));
}

export function adjustTree(
  specification: Specification,
  path: Path,
  node: Node,
  split?: Node
): RootAdjustment {

  function propagateSplit() {
    if (split === undefined) return;

    if (nodeEntriesAvailable(specification, parent.node))
      nodeAdd(parent.node, entryCreate(split, nodeRegion(split)));

    else
      splitNode(specification, parent.node, )

  }

  let parent: Parent = parentCreateNull();

  while (!path.isRoot(node)) {
    parent.entry = <Entry>path.pop();
    parent.node = <Node>path.pop();

    parentEnlarge(parent, node);
    split = propagateSplit();
  }
}
