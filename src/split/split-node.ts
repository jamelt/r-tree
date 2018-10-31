import { Entry } from '../entry/entry';
import { Split } from './split';
import { Node} from '../node/node';
import { SplitAlgorithm } from './split-algorithm';

export function splitNode(algorithm: SplitAlgorithm, node: Node, entry: Entry): Split {
  const remaining = [...node.entries, entry];
  const seeds = algorithm.pickSeeds(remaining);



  while(remaining.length) {


  }


}
