import { Entry } from './entry';

export interface Node {
  parent?: Entry;
  entries: Entry[];
  leaf: boolean;
  branch: boolean;
  root: boolean;
}
