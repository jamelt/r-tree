import { createBranchNode } from './branch-node';
import { createLeafNode } from './leaf-node';
import { Entry } from './entry';

export interface Node {
  parent: Entry;
  entries: Entry[];
  leaf: boolean;
  branch: boolean;
}

export function createNode(basedOn: Node): Node {
  return basedOn.leaf ? createLeafNode() : createBranchNode();
}