import { Id } from './data-types';
import { Entry } from './entry';
import { Region, regionClear, regionCopy, regionEnlargeAndSet, regionSet, undefinedRegion } from './region';
import { Specification } from './specification';
import { removeValue } from './utils';

export interface Node extends Region {
  entries: (Node | Entry)[];
  leaf?: boolean;
}

export function nodeCreate(leaf?: boolean): Node {
  if (leaf) {
    return {
      entries: [],
      leaf: true,
      ...undefinedRegion
    };
  } else {
    return {
      entries: [],
      ...undefinedRegion
    };
  }
}

export function nodeCreateBranch(region?: Region): Node {
  if (!region) {
    return nodeCreate();
  }
  return {
    entries: [],
    minX: region.minX,
    minY: region.minY,
    maxX: region.maxX,
    maxY: region.maxY
  };
}

export function nodeCreateLeaf(region?: Region): Node {
  if (!region) {
    return nodeCreate(true);
  }
  return {
    entries: [],
    minX: region.minX,
    minY: region.minY,
    maxX: region.maxX,
    maxY: region.maxY,
    leaf: true
  };
}

export function nodeEntriesAvailable(specification: Specification, node: Node) {
  return node.entries.length < specification.maxEntries;
}

export function nodeAdd<T extends Node | Entry>(node: Node, element: T): T {
  node.entries.push(element);
  regionEnlargeAndSet(node, element);
  return element;
}

export function nodeRemove<T extends Node | Entry>(node: Node, entry: T): T {
  removeValue<Node | Entry>(node.entries, node);
  regionSet(node, nodeRegion(node));
  return entry;
}

export function nodeDeficit(node: Node, specification: Specification) {
  return specification.minEntries - node.entries.length;
}

export function nodeClear(node: Node): Node {
  node.entries.splice(0);
  regionClear(node);
  return node;
}

export function nodeRegion(node: Node): Region {
  if (!node.entries.length) throw new Error('no entries to get region of');

  let region = regionCopy(node.entries[0]);

  for (let i = 1; i < node.entries.length; i++)
    regionEnlargeAndSet(region, node.entries[i]);

  return region;
}

export function nodeFind(node: Node, id: Id): Node | undefined {
  // TODO
  // for (let i = 0; i < node.entries.length; i++)
  // if (node.entries[i].id === id) return node.entries[i];
  return undefined;
}
