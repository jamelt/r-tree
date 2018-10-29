import { Entry } from '../entry';
import { Split } from './split';
import { Node} from '../node';
import { SplitAlgorithm } from './split-algorithm';

export function splitNode(algorithm: SplitAlgorithm, node: Node, entry: Entry): Split {
  const remaining = [...node.entries, entry];
  const seeds = algorithm.pickSeeds(remaining);
  const split = { nodeA: node, nodeB: node };

  while(remaining.length) {


  }


}
