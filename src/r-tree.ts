import { Id } from './data-types';
import { leaf_node_create } from './node/leaf-node';
import { Node } from './node/node';
import { Region } from './region';
import { search_subtree } from './search-subtree';
import { specification_create, Specification } from './specification';


export interface RTree {
  insert(id: Id, region: Region): void;
  search(region: Region): Id[];
}

function RTree(user_specification?: Specification): RTree {
  let specification: Specification;
  let root: Node;

  initialize();

  function initialize() {
    specification = specification_create(user_specification);
    root = leaf_node_create();
  }

  function insert(id: Id, region: Region) {

  }

  function search(region: Region): Id[] {
    return search_subtree(root, region);
  }

  return {
    insert,
    search
  };
}

export default RTree;
