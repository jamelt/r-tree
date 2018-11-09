import { loadParentFn } from './parent';
import { LeafNode, Node, nodeDeficit, nodeRegion, nodeRemove } from './node';
import { Path } from './path';
import { RTree } from './r-tree';
import { Specification } from './specification';
import { removeValue } from './utils';

export function condenseTree(
  rtree: RTree,
  specification: Specification,
  path: Path,
  node: Node
) {
  const orphans: Node[] = [];
  const loadParent = loadParentFn(path);

  while (!path.isRoot(node)) {
    const parent = loadParent();

    if (nodeDeficit(node, specification)) {
      nodeRemove(parent.node, parent.entry);
      orphans.push(node);
    } else {
      parent.entry.region = nodeRegion(node);
      node = parent.node;
    }
  }

  const branchNodes = orphans.slice();

  orphans.filter(node => node.leaf).forEach(node => {
    removeValue(branchNodes, node);
    const leaf = <LeafNode>node;
    leaf.entries.forEach(entry => {
      rtree.insert(entry.id, entry.region);
    });
  });

  // TODO Figure out to do with these branch nodes. It's unclear.
}
