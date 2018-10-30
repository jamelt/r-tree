import { Node } from './node';
import { Entry } from './entry';
import { emptyRegion } from './region';

export type Id = any;
export type Data = any;

function nullEntry(): Entry {
  return {
    region: emptyRegion(),
    parent: NullNode
  };
}

function nullNode(): Node {
  return {
    parent: nullEntry(),
    entries: [],
    branch: false,
    leaf: false
  };
}
export const NullEntry: Entry = Object.freeze({
  parent: nullNode(),
  region: emptyRegion()
});

export const NullNode: Node = Object.freeze({
  parent: nullEntry(),
  leaf: false,
  branch: false,
  entries: []
});
