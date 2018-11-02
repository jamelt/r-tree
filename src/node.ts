import { Entry, LeafEntry } from './entry';
import { Specification } from './specification';

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

export function leafNodeCreate(): LeafNode {
  return {
    entries: [],
    leaf: true
  };
}

export function nodeCreate(template?: Node): Node {
  if (template && template.leaf) {
    return leafNodeCreate();
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

export function nodeAddEntry(node: Node, entry: Entry): void {
  node.entries.push(entry);
}

export function nodeDeficit(node: Node, specification: Specification) {
  return specification.minEntries - node.entries.length;
}

export function nodeClear(node: Node) {
  node.entries.splice(0);
}