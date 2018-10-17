import { Node } from './node';
import { RTreeInterface } from './r-tree-interface';

export type Id = any;
export type Data = any;

export class RTree implements RTreeInterface {
  root: Node;

  constructor() {
    this.root = {
      entries: [],
      leaf: true,
      branch: false,
      root: true
    };
  }
}

export default RTree;
