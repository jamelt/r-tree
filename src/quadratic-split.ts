import { Entry } from './entry';
import { nodeRegion, Node } from './node';
import { regionArea, regionEnlarge } from './region';
import { Seeds, seedsCreate, Split, SplitAlgorithm, SplitAssignment, splitAssignmentCreate } from './split';

export function quadraticSplitAlgorithm(): SplitAlgorithm {
  function pickSeeds(remaining: Entry[]): Seeds {
    let seeds = seedsCreate();
    let worst = Number.NEGATIVE_INFINITY;

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
    let growth = Number.NEGATIVE_INFINITY;
    let nodes = split.toArray();

    remaining.forEach(entry => {
      nodes.forEach(node => {
        const region = nodeRegion(node);
        const combined = regionEnlarge(region, entry.region);
        const diff = regionArea(combined) - regionArea(region);

        if (diff > growth) {
          assignment.entry = entry;
          assignment.node = node;
          growth = diff;
        } else if (diff === growth) {
          assignment.node = tieBreaker(split);
        }
      });
    });

    return assignment;
  }

  function tieBreaker({ left, right }: Split): Node {
    const leftArea = regionArea(nodeRegion(left));
    const rightArea = regionArea(nodeRegion(right));
    if (leftArea === rightArea) {
      return left.entries.length < right.entries.length ? left : right;
    } else {
      return leftArea < rightArea ? left : right;
    }
  }

  return {
    pickSeeds,
    pickNext
  };
}
