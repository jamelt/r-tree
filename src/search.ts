import { Id } from './data-types';
import { Entry } from './entry';
import { Node } from './node';
import { Region, regionOverlaps } from './region';

export function search(subtree: Node, region: Region): Id[] {
  const processQueue: Node[] = [subtree];
  const results: Id[] = [];

  let node: Node | undefined;
  let entries: (Node | Entry)[];
  let entry: Node | Entry;

  while ((node = processQueue.shift())) {
    entries = node.entries;

    for (let i = 0; i < entries.length; i++) {
      entry = entries[i];

      if (!regionOverlaps(entry, region)) continue;

      if ((<any>entry).id) {
        results.push(entry);
      } else {
        processQueue.push(<Node>entry);
      }
    }
  }

  return results;
}
