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
  condense(): void;
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

  function condense() {
    if (!root.leaf && root.entries.length === 1) root = root.entries[0].child;
  }

  return Object.freeze({
    insert,
    search: (region: Region): Id[] => _search(root, region),
    condense
  });
}

export default Rtree;
