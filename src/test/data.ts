import { Id } from '../data-types';
import { Region, regionCreate } from '../region';
import { random } from 'lodash';
import * as randomString from 'randomstring';

export interface DataEntry {
  id: Id;
  region: Region;
}

export interface Data {
  [propertyName: string]: DataEntry;
}

export const data: Data = {
  a: { id: 'a', region: { minX: 5, minY: 5, maxX: 7, maxY: 7 } },
  b: { id: 'b', region: { minX: 70, minY: 10, maxX: 75, maxY: 15 } },
  c: { id: 'c', region: { minX: 44, minY: 60, maxX: 49, maxY: 63 } },
  d: { id: 'd', region: { minX: 15, minY: 31, maxX: 25, maxY: 74 } },
  e: { id: 'e', region: { minX: 75, minY: 50, maxX: 89, maxY: 60 } },
  f: { id: 'f', region: { minX: 1, minY: 70, maxX: 21, maxY: 88 } },
  g: { id: 'g', region: { minX: 33, minY: 33, maxX: 66, maxY: 66 } },
  h: { id: 'h', region: { minX: 60, minY: 41, maxX: 75, maxY: 58 } },
  i: { id: 'i', region: { minX: 64, minY: 18, maxX: 69, maxY: 24 } },
  j: { id: 'j', region: { minX: 19, minY: 84, maxX: 29, maxY: 91 } }
};

export function generateDataEntry(
  dimensions: number = 2,
  range: number = 100
): DataEntry {
  return { id: generateId(), region: generateRegion(dimensions, range) };
}

export function generateId(): Id {
  return randomString.generate({
    charset: 'alphabetic',
    capitalization: 'lowercase',
    length: 7
  });
}

export function generateRegion(
  dimensions: number = 2,
  range: number = 100
): Region {
  const minX = random(0, range - 2);
  const maxX = random(minX + 1, range);
  const minY = random(0, range - 2);
  const maxY = random(minY + 1, range);
  return regionCreate(minX, minY, maxX, maxY);
}
/*

 Sample data 2-dimensional space.

 0 ----------------------------------------------- 100
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
 |                                                  |
100 ---------------------------------------------- 100

 */
