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
  a: { id: 'a', region: {min:[5, 5], max:[7,7]}},
  b: { id: 'b', region: {min:[70, 10], max:[75,15]}},
  c: { id: 'c', region: {min:[44, 60], max: [49, 63]}},
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