import { Id } from './data-types';
import { Node, nodeCreateNull, NULL_NODE } from './node';
import { Region, regionCreate } from './region-create';

export interface Entry {
  region: Region;
  child: Node;
}

export interface LeafEntry extends Entry {
  id: Id;
}

export function entryCreateNull(): Entry {
  return {
    region: regionCreate(),
    child: NULL_NODE
  };
}

export const NULL_ENTRY: Entry = Object.freeze({
  region: regionCreate(),
  child: nodeCreateNull()
});