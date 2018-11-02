import { Entry } from '../entry/entry';
import { leaf_node_create } from './leaf-node';

export interface Node {
  entries: Entry[];
  leaf: boolean;
}

export function node_create(template: Node): Node {
  if (template.leaf) {
    return leaf_node_create();
  } else {
    return {
      entries: [],
      leaf: false
    };
  }
}
