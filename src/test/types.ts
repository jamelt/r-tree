import { DataEntry } from './data';

export interface RBushEntry {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  [property: string]: any;
}

export function rbushEntry(entry: DataEntry): RBushEntry {
  return {
    minX: entry.region.min[0],
    minY: entry.region.min[1],
    maxX: entry.region.max[0],
    maxY: entry.region.max[1]
  };
}
