import { LeafEntry } from '../entry';


export interface DataEntry {

}

export interface Data {
  [propertyName: string]: LeafEntry;
}

export const data: Data = {
  a: { id: 'a', region: {min:[5, 5], max:[7,7]}}

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