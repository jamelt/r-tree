import { Entry } from './entry';
import { Node } from './node';
import { Path } from './path';

export interface Parent {
  entry: Entry;
  node: Node;
}

export function loadParentFn(path: Path) {
  return function (): Parent {
    return { entry: <Entry>path.pop(), node: <Node>path.pop() };
  };
}