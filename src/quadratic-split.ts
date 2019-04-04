import { Node, nodeRegion } from './node';
import { regionArea, regionEnlarge } from './region';
import { Seeds, seedsCreate, Split, SplitAlgorithm, SplitAssignment, splitAssignmentCreate } from './split';

export function quadraticSplitAlgorithm(): SplitAlgorithm {
  function pickSeeds(remaining: Node[]): Seeds {
    let seeds = seedsCreate();
    let worst = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < remaining.length; i++) {
      const x = remaining[i];

      for (let j = i + 1; j < remaining.length; j++) {
        const y = remaining[j];

        const combined = regionArea(regionEnlarge(x.region, y.region));
        const diff = combined - regionArea(x.region) - regionArea(y.region);

        if (diff > worst) {
          worst = diff;
          seeds.left = x;
          seeds.right = y;
        }
      }
    }

    return seeds;
  }

  function pickNext(remaining: Node[], split: Split): SplitAssignment {
    const assignment = splitAssignmentCreate();
    const nodes = split.toArray();
    const other = (node: Node) => (node === nodes[0] ? nodes[1] : nodes[0]);
    let growth = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < remaining.length; i++) {
      const entry = remaining[i];

      for (let j = 0; j < nodes.length; j++) {
        const node = nodes[j];

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
          assignment.node = tieBreaker(node, area, other(node));
        }
      }
    }

    return assignment;
  }

  function tieBreaker(node: Node, nodeArea: number, other: Node): Node {
    const otherArea = regionArea(nodeRegion(other));
    if (nodeArea === otherArea) {
      return node.entries.length < other.entries.length ? node : other;
    } else {
      return nodeArea < otherArea ? node : other;
    }
  }

  return {
    pickSeeds,
    pickNext
  };
}
