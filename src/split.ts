import { Entry } from './entry';
import { Node, nodeAdd, nodeClear, nodeCreate, nodeDeficit } from './node';
import { regionSet, undefinedRegion } from './region';
import { Specification } from './specification';
import { removeValue } from './utils';

export interface Split {
  left: Node;
  right: Node;
  array: Node[];
}

export interface Seeds {
  left: Node | Entry;
  right: Node | Entry;
  array: (Node | Entry)[];
}

export interface SplitAssignment {
  node: Node;
  entry: Node | Entry;
}

export interface SplitAlgorithm {
  pickNext<T extends Node | Entry>(remaining: T[], split: Split): SplitAssignment;
  pickSeeds<T extends Node | Entry>(remaining: T[]): Seeds;
}

export function splitCreate(splitting: Node): Split {
  const left = nodeClear(splitting);
  regionSet(left, undefinedRegion);
  const right = nodeCreate(Boolean(splitting.leaf));

  return { left, right, array: [left, right] };
}

export function splitNode(specification: Specification, node: Node, entry: Node | Entry): Split {
  function needsRemaining(node: Node): boolean {
    return nodeDeficit(node, specification) >= remaining.length;
  }

  function assignSeeds(): void {
    const seeds = algorithm.pickSeeds(remaining);
    for (let i = 0; i < split.array.length; i++) {
      nodeAdd(split.array[i], seeds.array[i]);
      regionSet(split.array[i], seeds.array[i]);
      removeValue(remaining, seeds.array[i]);
    }
  }

  function addRemaining(node: Node) {
    remaining.splice(0).forEach((entry) => nodeAdd(node, entry));
  }

  function fillRemaining(): boolean {
    return split.array.reduce((filled: boolean, node: Node) => {
      if (filled) return true;
      if (!needsRemaining(node)) return false;
      addRemaining(node);
      return true;
    }, false);
  }

  function assignNext(): void {
    const { node, entry } = algorithm.pickNext(remaining, split);
    removeValue(remaining, nodeAdd(node, entry));
  }

  const { algorithm } = specification;
  const remaining = [...node.entries, entry];
  const split = splitCreate(node);

  assignSeeds();

  while (remaining.length) {
    if (fillRemaining()) continue;
    assignNext();
  }

  return split;
}
