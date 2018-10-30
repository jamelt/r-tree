import { NullEntry } from './data-types';
import { LeafEntry } from './leaf-entry';
import { Node } from './node';

export interface LeafNode extends Node {
  entries: LeafEntry[];
  leaf: true;
  branch: false;
}

export function createLeafNode(): LeafNode {
  return {
    parent: NullEntry,
    entries: [],
    leaf: true,
    branch: false,
  };
}
