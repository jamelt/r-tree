import { Id } from './data-types';
import { entryCreateLeaf } from './entry';
import { insert as _insert } from './insert';
import { leafNodeCreate, Node } from './node';
import { Region } from './region';
import { remove as _remove } from './remove';
import { search as _search } from './search';
import { Specification, specificationCreate } from './specification';
import { mixinDeep } from './utils';

export interface RTree {
  insert(id: Id, region: Region): void;
  search(region: Region): Id[];
  condense(): void;
}

function Rtree(userSpecification?: Specification): RTree {
  let specification: Specification;
  let root: Node;

  const instance = initialize();

  function initialize(): any {
    specification = specificationCreate(userSpecification);
    root = leafNodeCreate();
    return {};
  }

  function insert(id: Id, region: Region) {
    root = _insert(specification, root, entryCreateLeaf(id, region)) || root;
  }

  function condense() {
    if (!root.leaf && root.entries.length === 1) root = root.entries[0].child;
  }

  function remove(id: Id, region: Region) {
    _remove(instance, specification, root, id, region);
  }

  return Object.freeze(
    mixinDeep(instance, {
      insert,
      search: (region: Region): Id[] => _search(root, region),
      remove,
      condense
    })
  );
}

export default Rtree;
