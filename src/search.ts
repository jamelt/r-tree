import { Region } from './region';
import { Node } from './node';

import { Id } from './r-tree';
import { BranchEntry } from './branch-entry';
import { Spans } from './spans';
import { LeafEntry } from './leaf-entry';

export function search(node: Node, region: Region): Id[] {
  if (!node.leaf) {
    const internal = node as BranchEntry;
    search(
      overlapping(internal.children)
    )
  }
  
}

export function overlapping<T extends Spans>(spansList: T[], refRegion: Region): T[] {

}