import { Id } from './data-types';
import { Entry } from './entry';
import { insert as _insert } from './insert';
// @ts-ignore
import { Node, nodeAdd, nodeCreateLeaf } from './node';
import { Region } from './region';
import { remove as _remove } from './remove';
import { search as _search } from './search';
import { Specification, specificationCreate } from './specification';
import { mixinDeep } from './utils';

export interface RTree {
  insert(entry: Entry): void;
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

  function insert(entry: Entry) {
    if (root === undefined) {
      nodeAdd((root = nodeCreateLeaf(entry)), entry);
    } else {
      root = _insert(specification, root, entry) || root;
    }
  }

  function condense() {
    if (!root.leaf && root.entries.length === 1) root = <Node>root.entries[0];
  }

  function remove(id: Id, region: Region) {
    _remove(instance, specification, root, id, region);
  }

  function search(region: Region): Id {
    return _search(root, region);
  }

  return Object.freeze(
    mixinDeep(instance, {
      insert,
      search,
      remove,
      condense,
      inspect: () => root
    })
  );
}

export default Rtree;
