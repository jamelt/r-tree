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
  a: { id: 'a', region: { min: [5, 5], max: [7, 7] } },
  b: { id: 'b', region: { min: [70, 10], max: [75, 15] } },
  c: { id: 'c', region: { min: [44, 60], max: [49, 63] } },
  d: { id: 'd', region: { min: [15, 31], max: [25, 74] } },
  e: { id: 'e', region: { min: [75, 50], max: [89, 60] } },
  f: { id: 'f', region: { min: [1, 70], max: [21, 88] } },
  g: { id: 'g', region: { min: [33, 33], max: [66, 66] } },
  h: { id: 'h', region: { min: [60, 41], max: [75, 58] } },
  i: { id: 'i', region: { min: [64, 18], max: [69, 24] } },
  j: { id: 'j', region: { min: [19, 84], max: [29, 91] } }
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
    length: 5
  });
}

export function generateRegion(
  dimensions: number = 2,
  range: number = 100
): Region {
  const region = regionCreate();
  for (let i = 0; i < dimensions; i++) {
    region.min[i] = random(0, range - 2);
    region.max[i] = random(region.min[i] + 1, range);
  }
  return region;
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
