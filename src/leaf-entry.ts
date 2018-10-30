import { Id } from './data-types';
import { Entry } from './entry';

export interface LeafEntry extends Entry {
  id: Id;
}