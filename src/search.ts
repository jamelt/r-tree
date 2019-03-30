import { Id } from './data-types';
import { Entry } from './entry';
import { Node } from './node';
import { Region, regionOverlaps } from './region';

interface SearchState {
  processQueue: Node[];
  results: Id[];
  workRemaining(): boolean;
  next(): Node | undefined;
}

function searchStateCreate(initial?: Node): SearchState {
  const instance = {
    processQueue: initial === undefined ? [] : [initial],
    results: [],
    workRemaining: () => instance.processQueue.length > 0,
    next: () => instance.processQueue.shift()
  };
  return instance;
}

export function search(node: Node, region: Region): Id[] {
  const state = searchStateCreate(node);

  while (state.workRemaining()) {
    find(state, region);
  }

  return state.results;
}

function find(state: SearchState, region: Region): void {
  const node = state.next();
  if (node === undefined) return;
  return overlapping(node, region).forEach((entry) => {
    const id: Id = (<any>entry).id;
    const child: Node = entry.child;

    if (id) {
      state.results.push(id);
    } else {
      state.processQueue.push(child);
    }
  });
}

function overlapping(node: Node, region: Region): Entry[] {
  return node.entries.filter((entry) => regionOverlaps(entry.region, region));
}
