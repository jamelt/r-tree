import { LeafEntry } from '../entry/leaf-entry';
import { Node } from './node';

export interface LeafNode extends Node {
  entries: LeafEntry[];
  leaf: true;
}

export function createLeafNode(): LeafNode {
  return {
    entries: [],
    leaf: true,
  };
}
