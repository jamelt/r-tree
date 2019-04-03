import * as RBush from 'rbush';
import RTree from '../r-tree';
import { DataEntry, generateDataEntry } from './data';
import { rbushEntry, RBushEntry } from './types';
// @ts-ignore
import Flatbush = require('flatbush');


const stressCount: number = 100000;
const range = stressCount * 2;
const dataEntries: DataEntry[] = [];
const rBushEntries: RBushEntry[] = [];

let rtree = RTree();
let rbush = RBush();
let flatbush = new Flatbush(1);

describe(`stress (${stressCount} items)`, () => {
  beforeAll(() => {
    for (let i = 0; i < stressCount; i++) {
      const entryRTree = generateDataEntry(2, range);
      const entryRBush = rbushEntry(entryRTree);
      dataEntries.push(entryRTree);
      rBushEntries.push(entryRBush);
    }

    rtree = RTree({ minEntries: 0.4 * 16, maxEntries: 16 });
    rbush = RBush(16);
    flatbush = new Flatbush(stressCount);
  });

  test('r-tree > insert', () => {
    dataEntries.forEach((entry) => rtree.insert(entry.id, entry.region));
  });

  test('r-tree > search', () => {
    const results = rtree.search({
      minX: 0,
      minY: 0,
      maxX: range,
      maxY: range
    });
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
