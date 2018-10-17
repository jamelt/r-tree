import { BranchEntry, Entry, LeafEntry } from './entry';

export interface Node {
  entries: Entry[];
  leaf: boolean;
  branch: boolean;
  root: boolean;
}

export interface LeafNode extends Node {
  entries: LeafEntry[];
  leaf: true;
  branch: false;
}

export interface BranchNode extends Node {
  entries: BranchEntry[];
  branch: true;
  leaf: false;
}

// Root node must have at least 2 children unless it is a leaf node.
