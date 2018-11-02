import { Entry } from './entry';
import { Node, nodeCreate } from './node';

export interface Split {
  left: Node;
  right: Node;
  toArray(): Node[];
}

export function splitCreate(template: Node, split?: Node): Split {
  const left = split ? template : nodeCreate(template);
  const right = split ? split : nodeCreate(template);
  return {
    left: left,
    right: right,
    toArray: () => [left, right]
  };
}

export interface Seeds {
  left: Entry;
  right: Entry;
}

export interface SplitAssignment {
  entry: Entry;
  node: Node;
}

export interface SplitAlgorithm {
  pickNext(remaining: Entry[], split: Split): SplitAssignment;
  pickSeeds(remaining: Entry[]): Seeds;
}

export function splitNode(
  algorithm: SplitAlgorithm,
  node: Node,
  entry: Entry
): Split {
  const remaining = [...node.entries, entry];
  const seeds = algorithm.pickSeeds(remaining);

  while (remaining.length) {

  }
}
