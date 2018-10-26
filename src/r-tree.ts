import { chooseLeaf } from './choose-leaf';
import { Id } from './data-types';
import { leafNode } from './leaf-node';
import { Node } from './node';
import { Region } from './region';
import { defaultSpec, Spec } from './spec';
import { isNil, mixinDeep } from './utils';

export default function(spec: Spec) {
  return new RTree(
    isNil(spec) ? defaultSpec() : mixinDeep(defaultSpec(), spec)
  );
}

export class RTree {
  root: Node;

  constructor(spec: Spec) {
    this.root = leafNode();
    this.root.root = true;
  }

  insert(id: Id, region: Region) {
    const leaf = chooseLeaf(this.root, { id, region });
  }
}
