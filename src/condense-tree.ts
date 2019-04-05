import { Entry } from './entry';
import { Node, nodeDeficit, nodeRegion, nodeRemove } from './node';
import { Path } from './path';
import { RTree } from './r-tree';
import { Region, regionSet } from './region';
import { Specification } from './specification';
import { removeValue } from './utils';

export function condenseTree(
  rtree: RTree,
  specification: Specification,
  path: Path,
  node: Node
) {
  const orphans: Node[] = [];

  while (!path.isRoot(node)) {
    const parent = path.pop();

    if (nodeDeficit(node, specification)) {
      nodeRemove(parent, node);
      orphans.push(node);
    } else {
      regionSet(parent, <Region>nodeRegion(node));
      node = parent;
    }
  }

  const branchNodes = orphans.slice();

  orphans
    .filter((node) => node.leaf)
    .forEach((node) => {
      removeValue(branchNodes, node);
      const leaf = node;
      leaf.entries.forEach((entry) => {
        rtree.insert(<Entry>entry);
      });
    });

  // TODO Figure out to do with these branch nodes. It's unclear.
}
