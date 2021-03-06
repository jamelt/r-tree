import * as RBush from 'rbush';
import RTree from '../r-tree';
import { DataEntry, generateDataEntry } from './data';
import { rbushEntry, RBushEntry } from './types';
// @ts-ignore
import Flatbush = require('flatbush');


const stressCount: number = 100000;
const range = stressCount * 5;
const dataEntries: DataEntry[] = [];
const rbushEntries: RBushEntry[] = [];

let rtree = RTree();
let rbush = RBush();
let flatbush = new Flatbush(1);

describe(`stress (${stressCount} items)`, () => {
  beforeAll(() => {
    for (let i = 0; i < stressCount; i++) {
      const entryRTree = generateDataEntry(range);
      const entryRBush = rbushEntry(entryRTree);
      dataEntries.push(entryRTree);
      rbushEntries.push(entryRBush);
    }

    rtree = RTree();
    rbush = RBush();
    flatbush = new Flatbush(stressCount);
  });

  test('flatbush > insert', () => {
    for (const entry of rbushEntries)
      flatbush.add(entry.minX, entry.minY, entry.maxX, entry.maxY);
    flatbush.finish();
  });

  test('flatbush > search', () => {
    const results = flatbush.search(0, 0, range, range);
    expect(results).toHaveLength(stressCount);
  });

  test('rbush > insert', () => {
    rbushEntries.forEach((entry) => rbush.insert(entry));
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

  test('r-tree > insert', () => {
    dataEntries.forEach((entry) => rtree.insert(entry));
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
});
