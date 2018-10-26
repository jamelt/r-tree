import { Entry } from './entry';

export interface Node {
  entries: Entry[];
  leaf: boolean;
  branch: boolean;
  root: boolean;
}
