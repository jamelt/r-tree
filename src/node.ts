import { Entry } from './entry';

export interface Node {
  entries: Entry[];
  leaf: boolean;
  internal: boolean;
  root: boolean;
}

// Root node must have at least 2 children unless it is a leaf node.
