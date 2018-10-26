import { BranchEntry } from './branch-entry';
import { Node } from './node';

export interface BranchNode extends Node {
  entries: BranchEntry[];
  branch: true;
  leaf: false;
}