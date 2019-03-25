import { Id } from './data-types';
import { Entry, LeafEntry } from './entry';
import { Node, NULL_NODE } from './node';
import { Region, regionOverlaps } from './region';
import { flatten } from './utils';

export function search(node: Node, region: Region): Id[] {
  const found = find(node, region);
  const results = found.children.map(node => search(node, region));
  return [...found.ids, ...flatten(results)];
}

interface Found {
  children: Node[];
  ids: Id[];
}

function foundCreate(): Found {
  return { children: [], ids: [] };
}

function find(node: Node, region: Region): Found {
  const overlapping = entries<Entry>(node, region);

  return overlapping.reduce((findResult, entry) => {
    const id: Id = (<LeafEntry>entry).id;
    const child: Node = entry.child;

    if (id !== undefined) {
      findResult.ids.push(id);
    } else if (child !== NULL_NODE && child !== undefined) {
      findResult.children.push(child);
    } else {
      throw new Error('unaccounted find use case');
    }

    return findResult;
  }, foundCreate());
}

function entries<T extends Entry>(node: Node, region: Region): T[] {
  const entries = <T[]>node.entries;
  return entries.filter(entry => regionOverlaps(entry.region, region));
}
