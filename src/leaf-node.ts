import { LeafEntry } from './leaf-entry';
import { Node } from './node';

export interface LeafNode extends Node {
  entries: LeafEntry[];
  leaf: true;
  branch: false;
}

export function leafNode(): LeafNode {
  return {
    entries: Array<LeafEntry>(),
    leaf: true,
    branch: false,
    root: false
  };
}
