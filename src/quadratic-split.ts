import { Entry } from './entry';
import { Node, nodeRegion } from './node';
import { Region, regionArea, regionEnlarge } from './region';
import { Seeds, Split, SplitAlgorithm, SplitAssignment } from './split';

export function quadraticSplitAlgorithm(): SplitAlgorithm {
  function pickSeeds<T extends Node | Entry>(remaining: T[]): Seeds {
    let seeds: Partial<Seeds> = {};
    let worst = -Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const x = remaining[i];

      for (let j = i + 1; j < remaining.length; j++) {
        const y = remaining[j];

        const combined = regionArea(regionEnlarge(x, y));
        const diff = combined - regionArea(x) - regionArea(y);

        if (diff > worst) {
          worst = diff;
          seeds.left = x;
          seeds.right = y;
        }
      }
    }

    seeds.array = <Entry[] | Node[]>[seeds.left, seeds.right];
    return <Seeds>seeds;
  }

  function pickNext<T extends Node | Entry>(
    remaining: T[],
    split: Split
  ): SplitAssignment {
    const assignment: Partial<SplitAssignment> = {};
    const nodes = split.array;
    const other = (node: Node) => (node === nodes[0] ? nodes[1] : nodes[0]);

    let growth = -Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const entry = remaining[i];

      for (let j = 0; j < nodes.length; j++) {
        const node = nodes[j];

        const region = <Region>nodeRegion(node);
        const area = regionArea(region);
        const combined = regionEnlarge(region, entry);
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

    return <SplitAssignment>assignment;
  }

  function tieBreaker(node: Node, nodeArea: number, other: Node): Node {
    const otherArea = regionArea(<Region>nodeRegion(other));
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
