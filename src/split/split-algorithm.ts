import { Entry } from '../entry';
import { Seeds } from './seeds';
import { SplitAssignment } from './split-assignment';

export interface SplitAlgorithm {
  pickNext(remaining: Entry[], groupA: Node, groupB: Node): SplitAssignment;
  pickSeeds(remaining: Entry[]): Seeds;
}