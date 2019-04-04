import * as Benchmark from 'benchmark';
import * as RBush from 'rbush';
import RTree from '../r-tree';
import { DataEntry, generateDataEntry } from './data';
import { rbushEntry, RBushEntry } from './types';
import Flatbush = require('flatbush');

const stressCount: number = 100000;
const range = stressCount * 2;
const dataEntries: DataEntry[] = [];
const rbushEntries: RBushEntry[] = [];

let rtree = RTree();
let rbush = RBush();
let flatbush = new Flatbush(1);

function populate() {
  dataEntries.slice(0);
  rbushEntries.slice(0);
  for (let i = 0; i < stressCount; i++) {
    const entryRTree = generateDataEntry(2, range);
    const entryRBush = rbushEntry(entryRTree);
    dataEntries.push(entryRTree);
    rbushEntries.push(entryRBush);
  }
}

populate();

const createRTree = () => (rtree = RTree({ minEntries: 6, maxEntries: 16 }));
const createRBush = () => (rbush = RBush(16));
const createFlatbush = () => (flatbush = new Flatbush(stressCount));
const logResult = (event: any) => console.log(String(event.target));

const suite = new Benchmark.Suite();

suite.add('rbush > insert', {
  onStart: () => {
    populate();
    createRBush();
  },
  fn: () => rbush.insert(<any>rbushEntries.pop())
});
suite.add('rbush > search', {
  onStart() {
    populate();
    createRBush();
    rbushEntries.forEach((entry) => rbush.insert(entry));
  },
  fn: () => rbush.search({ minX: 0, minY: 0, maxX: range, maxY: range })
});

suite.add('r-tree > insert', {
  onStart: () => {
    populate();
    createRTree();
  },
  fn: () => {
    const entry = <DataEntry>dataEntries.shift();
    return rtree.insert(entry.id, entry.region);
  }
});
suite.add('r-tree > search', {
  onStart() {
    populate();
    createRTree();
    dataEntries.forEach((entry) => rtree.insert(entry.id, entry.region));
  },
  fn() {
    rtree.search({
      minX: 0,
      minY: 0,
      maxX: range,
      maxY: range
    });
  }
});

suite.add('flatbush > insert', {
  onStart: () => {
    populate();
    createFlatbush();
  },
  fn() {
    const entry = <RBushEntry>rbushEntries.shift();
    flatbush.add(entry.minX, entry.minY, entry.maxX, entry.maxY);
  },
  onComplete: () => flatbush.finish()
});
suite.add('flatbush > search', {
  onStart() {
    populate();
    createFlatbush();
    rbushEntries.forEach((entry) => {
      flatbush.add(entry.minX, entry.minY, entry.maxX, entry.maxY);
    });
    flatbush.finish();
  },
  fn: () => flatbush.search(0, 0, range, range)
});

suite.on('cycle', logResult);
// @ts-ignore
suite.on('complete', () =>
  console.log(
    `Winner ${suite
      .filter('fastest')
      .map((n: any) => n.name)
      .join(', ')}`
  )
);

suite.run({ async: true });
