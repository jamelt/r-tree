import { Id } from './data-types';
import { Region } from './region';

export interface Entry extends Region {
  id: Id;
  [propertyName: string]: any;
}
