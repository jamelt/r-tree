import { Id } from './data-types';
import { entryCreateLeaf } from './entry';
import { insert as _insert } from './insert';
import { leafNodeCreate, Node } from './node';
import { Region } from './region-create';
import { search as _search } from './search';
import { Specification, specificationCreate } from './specification';

export interface RTree {
  insert(id: Id, region: Region): void;
  search(region: Region): Id[];
}

function Rtree(userSpecification?: Specification): RTree {
  let specification: Specification;
  let root: Node;

  initialize();

  function initialize() {
    specification = specificationCreate(userSpecification);
    root = leafNodeCreate();
  }

  function insert(id: Id, region: Region) {
    let split = _insert(specification, root, entryCreateLeaf(id, region));
    if (split === undefined) return;
    root = split;
  }

  return {
    insert,
    search: (region: Region): Id[] => {
      return _search(root, region);
    }
  };
}

export default Rtree;
