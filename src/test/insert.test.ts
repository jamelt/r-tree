import RTree from '../r-tree';
import { data, DataEntry, generateDataEntry } from './data';

const stressCount: number = 10000;
const range = stressCount * 10;
const entries: DataEntry[] = [];

describe('insert', () => {
  beforeAll(() => {
    for (let i = 0; i < stressCount; i++)
      entries.push(generateDataEntry(2, range));
  });

  test('stock', () => {
    const rtree = RTree({ minEntries: 1, maxEntries: 2 });

    Object.keys(data).forEach((key) => {
      const entry = data[key];
      rtree.insert(entry.id, entry.region);
    });
  });

  test('bulk', () => {
    const rtree = RTree({ minEntries: 5, maxEntries: 9 });

    entries.forEach((entry, i) => {
      rtree.insert(entry.id, entry.region);
    });

    let results = rtree.search({ minX: 0, minY: 0, maxX: range, maxY: range });
    expect(results).toHaveLength(stressCount);
  });
});
