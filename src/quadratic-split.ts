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
        const area = regionArea(region);
        const combined = regionEnlarge(region, entry.region);
        const diff = regionArea(combined) - area;

        if (diff > growth) {
          assignment.entry = entry;
          assignment.node = node;
          growth = diff;
        } else if (diff === growth) {
          assignment.entry = entry;
          assignment.node = tieBreaker(split, node, area);
        }
      });
    });

    return assignment;
  }

  function tieBreaker(split: Split, current: Node, currentArea: number): Node {
    const other = current === split.left ? split.right : split.left;
    const otherArea = regionArea(nodeRegion(other));
    if (currentArea === otherArea) {
      return current.entries.length < other.entries.length ? current : other;
    } else {
      return currentArea < otherArea ? current : other;
    }
  }

  return {
    pickSeeds,
    pickNext
  };
}
