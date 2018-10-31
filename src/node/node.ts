import { Entry } from '../entry/entry';
import { createLeafNode } from './leaf-node';

export interface Node {
  entries: Entry[];
  leaf: boolean;
}

export function createNode(template: Node): Node {
  if (template.leaf) {
    return createLeafNode();
  } else {
    return {
      entries: [],
      leaf: false
    };
  }
}
