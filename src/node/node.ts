import { createBranchNode } from './branch-node';
import { Entry } from '../entry/entry';
import { createLeafNode } from './leaf-node';


export interface Node {
  parent: Entry;
  entries: Entry[];
  leaf: boolean;
  branch: boolean;
}

export function createNode(basedOn: Node): Node {
  return basedOn.leaf ? createLeafNode() : createBranchNode();
}
