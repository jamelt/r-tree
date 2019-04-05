import RTree from '../r-tree';
import { data, DataEntry, generateDataEntry } from './data';

const stressCount: number = 100;
const range = stressCount * 2;
const entries: DataEntry[] = [];

describe('insert', () => {
  let rtree = RTree();

  beforeAll(() => {
    for (let i = 0; i < stressCount; i++)
      entries.push(generateDataEntry(range));
  });

  test('stock', () => {
    rtree = RTree({ minEntries: 3, maxEntries: 6 });

    Object.keys(data).forEach((key) => {
      const entry = data[key];
      rtree.insert(entry);
    });
  });

  test('bulk', () => {
    rtree = RTree({ minEntries: 5, maxEntries: 9 });

    entries.forEach((entry) => rtree.insert(entry));

    let results = rtree.search({ minX: 0, minY: 0, maxX: range, maxY: range });
    expect(results).toHaveLength(stressCount);
  });
});
