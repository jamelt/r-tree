import { Id } from './r-tree';
import { Region } from './region';
import { Node } from './node';
import { Entry } from './entry';

export interface Entry {
  region: Region;
}

export interface LeafEntry extends Entry {
  id: Id;
}

export interface BranchEntry extends Entry {
  child: Node;
}

// Number of entries must always between min and max.
// Smallest region to enclose object
