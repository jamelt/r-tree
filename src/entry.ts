import { Data, Id } from './r-tree-interface';
import { Region } from './region';
import { Node } from './node';
import { Entry } from './entry';

export interface Entry {
  region: Region;
}

export interface LeafEntry extends Entry {
  id: Id;
  // data: Data; // TODO Do I need this?
}

export interface BranchEntry extends Entry {
  child: Node;
}

// Number of entries must always between min and max.
// Smallest region to enclose object
