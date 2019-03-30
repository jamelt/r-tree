import { Entry, NULL_ENTRY } from './entry';
import { Node, nodeAdd, nodeClear, nodeCreate, nodeDeficit, NULL_NODE } from './node';
import { Specification } from './specification';
import { removeValue } from './utils';

export interface Split {
  left: Node;
  right: Node;
  toArray(): Node[];
}

export function splitCreate(splitting: Node): Split {
  const left = splitting;
  const right = nodeCreate(splitting);
  nodeClear(left);
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

export function seedsCreate(): Seeds {
  return {
    left: NULL_ENTRY,
    right: NULL_ENTRY
  };
}

export interface SplitAssignment {
  entry: Entry;
  node: Node;
}

export function splitAssignmentCreate(): SplitAssignment {
  return { entry: NULL_ENTRY, node: NULL_NODE };
}

export interface SplitAlgorithm {
  pickNext(remaining: Entry[], split: Split): SplitAssignment;
  pickSeeds(remaining: Entry[]): Seeds;
}

export function splitNode(
  specification: Specification,
  node: Node,
  entry: Entry
): Split {
  function needsRemaining(node: Node): boolean {
    return nodeDeficit(node, specification) >= remaining.length;
  }

  function assignSeeds(): void {
    const seeds = algorithm.pickSeeds(remaining);
    removeValue(remaining, nodeAdd(split.left, seeds.left));
    removeValue(remaining, nodeAdd(split.right, seeds.right));
  }

  function addRemaining(node: Node) {
    remaining.splice(0).forEach(entry => nodeAdd(node, entry));
  }

  function fillRemaining(): boolean {
    return split.toArray().reduce((filled: boolean, node: Node) => {
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
