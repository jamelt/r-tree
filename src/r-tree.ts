import { Id } from './data-types';
import { createLeafNode } from './node/leaf-node';
import { Node } from './node/node';
import { Region } from './region';
import { defaultSpec, Spec } from './spec';
import { isNil, mixinDeep } from './utils';

export default function(userSpec: Spec): RTree {
  let spec: Spec = userSpec;
  let root: Node = createLeafNode();

  isNil(spec) ? defaultSpec() : mixinDeep(defaultSpec(), spec);

  function insert(id: Id, region: Region) {}

  return {
    root,
    insert
  };
}

export interface RTree {
  root: Node;
  insert(id: Id, region: Region): void;
}
