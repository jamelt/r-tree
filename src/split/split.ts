import { node_create, Node } from '../node/node';

export interface Split {
  left: Node;
  right: Node;
  to_array(): Node[];
}

export function split_create(template: Node, split?: Node): Split {
  const left = split ? template : node_create(template);
  const right = split ? split : node_create(template);
  return {
    left: left,
    right: right,
    to_array: () => [left, right]
  };
}
