import { LeafEntry } from '../entry/leaf-entry';
import { Node } from './node';

export interface LeafNode extends Node {
  entries: LeafEntry[];
  leaf: true;
}

export function leaf_node_create(): LeafNode {
  return {
    entries: [],
    leaf: true,
  };
}
