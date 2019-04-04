import { Id } from './data-types';
import { insert as _insert } from './insert';
import { Node, nodeCreate } from './node';
import { Region } from './region';
import { remove as _remove } from './remove';
import { search as _search } from './search';
import { Specification, specificationCreate } from './specification';
import { mixinDeep } from './utils';

export interface RTree {
  insert(id: Id, region: Region): void;
  search(region: Region): Id[];
  remove(id: Id, region: Region): void;
  condense(): void;
  inspect(): Node;
}

function Rtree(userSpecification?: Partial<Specification>): RTree {
  let specification: Specification;
  let root: Node;

  const instance = initialize();

  function initialize(): any {
    specification = specificationCreate(userSpecification);
    return {};
  }

  function insert(id: Id, region: Region) {
    root = _insert(specification, root, nodeCreate(region, id)) || root;
  }

  function condense() {
    if (!root.leaf && root.entries.length === 1) root = root.entries[0];
  }

  function remove(id: Id, region: Region) {
    _remove(instance, specification, root, id, region);
  }

  return Object.freeze(
    mixinDeep(instance, {
      insert,
      search: (region: Region): Id[] => _search(root, region),
      remove,
      condense,
      inspect: () => root
    })
  );
}

export default Rtree;
