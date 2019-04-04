import { Id } from './data-types';
import { Region, regionCreate, regionEnlarge } from './region';
import { Specification } from './specification';
import { removeValue } from './utils';

export interface Node {
  entries: Node[] | Id[];
  region: Region;
  leaf?: false;
}
export interface LeafNode {
  id: Id;
  region: Region;
  leaf: true;
}

export function nodeCreate(region: Region): Node {
  return {
    entries: [],
    region: region,
  };
}

export function nodeCreateLeaf(id: Id, region: Region): LeafNode {
  return {
    id,
    region,
    leaf: true
  }
}

export function nodeEntriesAvailable(specification: Specification, node: Node) {
  return node.entries.length < specification.maxEntries;
}

export function nodeAdd(node: Node, entry: Node): Node {
  node.entries.push(node);
  return entry;
}

export function nodeRemove(node: Node, entry: Node): Node {
  removeValue(node.entries, node);
  return entry;
}

export function nodeDeficit(node: Node, specification: Specification) {
  return specification.minEntries - node.entries.length;
}

export function nodeClear(node: Node) {
  node.entries.splice(0);
}

export function nodeRegion(node: Node): Region {
  let region: Region = regionCreate();

  for (let i = 0; i < node.entries.length; i++) {
    const entry = node.entries[i];
    if (i === 0) region = entry.region;
    region = regionEnlarge(region, entry.region);
  }

  return region;
}

export function nodeFind(node: Node, id: Id): Node | undefined {
  for (let i = 0; i < node.entries.length; i++)
    if (node.entries[i].id === id) return node.entries[i];
  return undefined;
}
