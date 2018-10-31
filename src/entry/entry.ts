import { Region } from '../region';
import { Entry } from './entry';
import { Node } from '../node/node';

export interface Entry {
  parent: Node;
  region: Region;
}
