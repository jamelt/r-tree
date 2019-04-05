import { DataEntry } from './data';

export interface RBushEntry {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  [property: string]: any;
}

export function rbushEntry(entry: DataEntry): RBushEntry {
  return { ...entry };
}
