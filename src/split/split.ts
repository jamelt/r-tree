import { createNode, Node } from '../node/node';

export interface Split {
  nodeA: Node;
  nodeB: Node;
  toArray(): Node[];
}

export function createSplit(template: Node, split?: Node): Split {
  const nodeA = split ? template : createNode(template);
  const nodeB = split ? split : createNode(template);
  return {
    nodeA: nodeA,
    nodeB: nodeB,
    toArray: () => [nodeA, nodeB]
  };
}
