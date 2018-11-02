import { Entry } from './entry/entry';
import { Node } from './node/node';
import { region_create_empty } from './region';

export type Id = any;
export type Data = any;

function entry_create_null(): Entry {
  return {
    region: region_create_empty(),
    parent: null_node
  };
}

function node_create_null(): Node {
  return {
    parent: entry_create_null(),
    entries: [],
    branch: false,
    leaf: false
  };
}
export const null_entry: Entry = Object.freeze({
  parent: node_create_null(),
  region: region_create_empty()
});

export const null_node: Node = Object.freeze({
  parent: entry_create_null(),
  leaf: false,
  branch: false,
  entries: []
});
