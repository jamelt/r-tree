import { Entry } from './entry';
import { nodeRegion } from './node';
import { regionArea, regionEnlarge } from './region-create';
import {
  Seeds,
  seedsCreate,
  Split,
  SplitAlgorithm,
  SplitAssignment,
  splitAssignmentCreate
} from './split';

export function quadraticSplitAlgorithm(): SplitAlgorithm {
  function pickSeeds(remaining: Entry[]): Seeds {
    let seeds = seedsCreate();
    let worst = Number.MIN_VALUE;

    remaining.forEach((x, i) => {
      remaining.slice(i + 1).forEach(y => {
        const combined = regionArea(regionEnlarge(x.region, y.region));
        const diff = combined - regionArea(x.region) - regionArea(y.region);

        if (diff > worst) {
          worst = diff;
          seeds.left = x;
          seeds.right = y;
        }
      });
    });

    return seeds;
  }

  function pickNext(remaining: Entry[], split: Split): SplitAssignment {
    let assignment = splitAssignmentCreate();
    let growth = Number.MIN_VALUE;

    remaining.forEach(entry => {
      split.toArray().forEach(node => {
        const region = nodeRegion(node);
        const combined = regionEnlarge(region, entry.region);
        const diff = regionArea(combined) - regionArea(region);

        if (diff > growth) {
          assignment.entry = entry;
          assignment.node = node;
          growth = diff;
        }
      });
    });

    return assignment;
  }

  return {
    pickSeeds,
    pickNext
  };
}
