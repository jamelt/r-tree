import { Id } from '../data-types';
import { Region } from '../region';

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
  g: { id: 'g', region: { min: [33, 33], max: [66, 66] } }
};

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
