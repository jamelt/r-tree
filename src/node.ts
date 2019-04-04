import { Id } from './data-types';
import { Entry, LeafEntry } from './entry';
import { Region, regionCreate, regionEnlarge } from './region';
import { Specification } from './specification';
import { removeValue } from './utils';

export const NULL_NODE: Node = Object.freeze({
  entries: [],
  leaf: false
});

export interface Node {
  entries: Entry[];
  leaf: boolean;
}

export interface LeafNode extends Node {
  entries: LeafEntry[];
  leaf: true;
}

export function nodeCreateLeaf(): LeafNode {
  return {
    entries: [],
    leaf: true
  };
}

export function nodeCreate(template?: Node): Node {
  if (template && template.leaf) {
    return nodeCreateLeaf();
  } else {
    return {
      entries: [],
      leaf: false
    };
  }
}

export function nodeCreateNull(): Node {
  return {
    entries: [],
    leaf: false
  };
}

export function nodeEntriesAvailable(specification: Specification, node: Node) {
  return node.entries.length < specification.maxEntries;
}

export function nodeAdd(node: Node, entry: Entry): Entry {
  node.entries.push(entry);
  return entry;
}

export function nodeRemove(node: Node, entry: Entry): Entry {
  removeValue(node.entries, entry);
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

export function nodeFind(node: LeafNode, id: Id): LeafEntry | undefined {
  for (let i = 0; i < node.entries.length; i++)
    if (node.entries[i].id === id) return node.entries[i];
  return undefined;
}
