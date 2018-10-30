import { Entry } from './entry';
import { Region } from './region';
import { Node } from './node';

export interface Entry {
  parent: Node;
  region: Region;
}
