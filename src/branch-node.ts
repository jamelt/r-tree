import { BranchEntry } from './branch-entry';
import { NullEntry } from './data-types';
import { Node } from './node';

export interface BranchNode extends Node {
  entries: BranchEntry[];
  branch: true;
  leaf: false;
}

export function createBranchNode(): BranchNode {
  return {
    parent: NullEntry,
    branch: true,
    leaf: false,
    entries: []
  }
}