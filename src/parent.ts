import { Entry, NULL_ENTRY } from './entry';
import { Node, NULL_NODE } from './node';
import { Path } from './path';

export interface Parent {
  entry: Entry;
  node: Node;
}

export function loadParentFn(path: Path) {
  return function(): Parent {
    
    if (path.length() % 2 == 1)
      return { entry: NULL_ENTRY, node: <Node>path.pop() };

    if (path.length() > 0) {
      const entry = <Entry>path.pop();
      const node = <Node>path.pop();
      return { entry: entry, node: node };
    }

    return { entry: NULL_ENTRY, node: NULL_NODE };
  };
}
