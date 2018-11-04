import { Entry } from './entry';
import { Seeds, Split, SplitAlgorithm, SplitAssignment } from './split';

export function quadraticSplitAlgorithm(): SplitAlgorithm {

  function pickNext(remaining: Entry[], split: Split): SplitAssignment {
    return undefined;
  }

  function pickSeeds(remaining: Entry[]): Seeds {
    seeds = createSeeds
    remaining.forEach((x, i) => {
      remaining.slice(i+1).forEach(y => {

      });
    });
    return undefined;
  }

  return {
    pickNext, pickSeeds
  };
}
