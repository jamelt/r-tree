import { Id } from './data-types';
import { Node, nodeCreateNull, NULL_NODE } from './node';
import { Region, regionCreate } from './region-create';

export interface Entry {
  child: Node;
  region: Region;
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


export function entryCreateLeaf(id: Id, region: Region): LeafEntry {
  return { id, region, child: NULL_NODE };
}

export function entryCreate(child:Node, region: Region): Entry {
  return { child, region };
}

