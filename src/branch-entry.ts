import { Entry } from './entry';
import { Node } from './node';

export interface BranchEntry extends Entry {
  child: Node;
}