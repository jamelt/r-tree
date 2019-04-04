import { Id } from './data-types';
import { Node } from './node';
import { Region, regionOverlaps } from './region';

export function search(subtree: Node, region: Region): Id[] {
  const processQueue: Node[] = [subtree];
  const results: Id[] = [];

  while (processQueue.length > 0) {
    const node = processQueue.shift();
    const entries = node.entries;

    for (let i = 0; i < entries.length; i++) {
      const entry: any = entries[i];

      if (!regionOverlaps(entry.region, region)) continue;

      if (entry.id) {
        results.push(entry.id);
      } else {
        processQueue.push(entry.child);
      }
    }
  }

  return results;
}
