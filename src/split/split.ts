import { createNode, Node } from '../node/node';

export interface Split {
  left: Node;
  right: Node;
  toArray(): Node[];
}

export function createSplit(template: Node, split?: Node): Split {
  const left = split ? template : createNode(template);
  const right = split ? split : createNode(template);
  return {
    left: left,
    right: right,
    toArray: () => [left, right]
  };
}
