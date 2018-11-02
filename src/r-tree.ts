import { Id } from './data-types';
import { leafNodeCreate } from './node';
import { Node } from './node';
import { Region } from './region-create';
import { search } from './search';
import { specificationCreate, Specification } from './specification';

export interface RTree {
  insert(id: Id, region: Region): void;
  search(region: Region): Id[];
}

function Rtree(userSpecification?: Specification): RTree {
  // @ts-ignore
  let specification: Specification;
  let root: Node;

  initialize();

  function initialize() {
    specification = specificationCreate(userSpecification);
    root = leafNodeCreate();
  }

  function insert(id: Id, region: Region) {}

  return {
    insert,
    search: (region: Region): Id[] => {
      return search(root, region);
    }
  };
}

export default Rtree;
