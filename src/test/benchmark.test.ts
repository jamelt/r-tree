import RTree from '../r-tree';
import { DataEntry, generateDataEntry } from './data';
import * as RBush from 'rbush';
// @ts-ignore
import Flatbush = require('flatbush');

interface RBushEntry {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  [property: string]: any;
}

function rBushEntry(entry: DataEntry): RBushEntry {
  return {
    minX: entry.region.min[0],
    minY: entry.region.min[1],
    maxX: entry.region.max[0],
    maxY: entry.region.max[1],
    ...entry
  };
}

const stressCount: number = 10000;
const range = stressCount * 10;
const dataEntries: DataEntry[] = [];
const rBushEntries: RBushEntry[] = [];

let rtree = RTree();
let rbush = RBush();
let flatbush = new Flatbush(1);

describe(`benchmark (${stressCount} items)`, () => {
  beforeAll(() => {
    for (let i = 0; i < stressCount; i++) {
      const entryRTree = generateDataEntry(2, range);
      const entryRBush = rBushEntry(entryRTree);
      dataEntries.push(entryRTree);
      rBushEntries.push(entryRBush);
    }

    rtree = RTree({ minEntries: 25, maxEntries: 50 });
    rbush = RBush(50);
    flatbush = new Flatbush(stressCount);
  });

  test('r-tree > insert', () => {
    dataEntries.forEach((entry) => rtree.insert(entry.id, entry.region));
  });

  test('r-tree > search', () => {
    const results = rtree.search({ min: [0, 0], max: [range, range] });
    expect(results).toHaveLength(stressCount);
  });

  test('rbush > insert', () => {
    rBushEntries.forEach((entry) => rbush.insert(entry));
  });

  test('rbush > search', () => {
    const results = rbush.search({
      minX: 0,
      minY: 0,
      maxX: range,
      maxY: range
    });
    expect(results).toHaveLength(stressCount);
  });

  test('flatbush > insert', () => {
    for (const entry of rBushEntries)
      flatbush.add(entry.minX, entry.minY, entry.maxX, entry.maxY);
    flatbush.finish();
  });

  test('flatbush > search', () => {
    const results = flatbush.search(0, 0, range, range);
    expect(results).toHaveLength(stressCount);
  });
});
