import { Entry } from '../entry/entry';
import { Seeds } from './seeds';
import { Split } from './split';
import { SplitAssignment } from './split-assignment';

export interface SplitAlgorithm {
  pickNext(remaining: Entry[], split: Split): SplitAssignment;
  pickSeeds(remaining: Entry[]): Seeds;
}