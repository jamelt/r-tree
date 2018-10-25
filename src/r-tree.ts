import { chooseLeaf } from './choose-leaf';
import { Node } from './node';
import { RTreeInterface } from './r-tree-interface';
import { Region } from './region';
import { RegionData } from './region-data';

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

  insert(id: Id, regionData: RegionData) {
    const region = new Region(regionData);
    const leaf = chooseLeaf(this.root, { id, region });


  }
}

export default RTree;
