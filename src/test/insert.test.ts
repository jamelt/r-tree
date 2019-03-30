import RTree from '../r-tree';
// import { createDebugFn } from '../debug';
import { data, generateDataEntry } from './data';

describe('insert', () => {
  test('stock', () => {
    const rtree = RTree({ minEntries: 1, maxEntries: 2 });
    // const debug = createDebugFn(() => rtree.inspect(), '*');
  
    Object.keys(data).forEach(key => {
      const entry = data[key];
      rtree.insert(entry.id, entry.region);
      // debug();
    });
  });
  
  test('stress', () => {
    const rtree = RTree({ minEntries: 5, maxEntries: 9 });
    // const debug = createDebugFn(() => rtree.inspect(), '*');
    const count = 1000;
    const range = count * 10;
    // const debugCount = 2;
  
    let entry;
    for (let i = 0; i < count; i++) {
      entry = generateDataEntry(2, range);
      rtree.insert(entry.id, entry.region);
      // if (i % (count / debugCount) === 0) debug();
    }
    
    const results = rtree.search({ min: [0, 0], max: [ range, range] });
    console.log(results.length);
    expect(results).toHaveLength(count);
  });
});

describe('stress', () => {
  let entries: DataEntry[] = ]\
  
  beforeAll(() => {
    entries.push
  })
  
});