import { Entry } from '../entry/entry';
import { Seeds } from './seeds';
import { Split } from './split';
import { SplitAssignment } from './split-assignment';

export interface SplitAlgorithm {
  pick_next(remaining: Entry[], split: Split): SplitAssignment;
  pick_seeds(remaining: Entry[]): Seeds;
}