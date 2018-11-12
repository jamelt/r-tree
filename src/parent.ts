import { Entry, NULL_ENTRY } from './entry';
import { Node, NULL_NODE } from './node';
import { Path } from './path';

export interface Parent {
  entry: Entry;
  node: Node;
}

export function loadParentFn(path: Path) {
  return function(): Parent {
    if (path.length() < 2) return { entry: NULL_ENTRY, node: NULL_NODE };
    else return { entry: <Entry>path.pop(), node: <Node>path.pop() };
  };
}
