import { Id } from './data-types';
import { createLeafNode } from './node/leaf-node';
import { Node } from './node/node';
import { Region } from './region';
import { searchSubtree } from './search-subtree';
import { createSpecification, Specification, Specification } from './specification';


export interface RTree {
  insert(id: Id, region: Region): void;
  search(region: Region): Id[];
}

function Rtree(userSpecification?: Specification): RTree {
  let specification: Specification;
  let root: Node;

  initialize();

  function initialize() {
    specification = createSpecification(userSpecification);
    root = createLeafNode();
  }

  function insert(id: Id, region: Region) {

  }

  function search(region: Region): Id[] {
    return searchSubtree(root, region);
  }

  return {
    insert,
    search
  };
}

export default Rtree;
