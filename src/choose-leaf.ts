import { BranchEntry, LeafEntry } from './entry';
import { Node } from './node';
import { Region } from './region';
import { RegionData } from './region-data';

export function chooseLeaf(node: Node, entry: LeafEntry): Node {
  if (node.leaf) {
    return node;
  } else {
    let branchEntry = leastEnlargement(node.entries, entry);
    chooseLeaf(branchEntry.child, entry);
  }
}

function leastEnlargement(entries: BranchEntry[], ref: LeafEntry): BranchEntry {
  let least: BranchEntry = entries[0];
  let enlargement = Number.MAX_VALUE

  entries.forEach(entry => {
    let combinedArea = Region.area(ref.region.enlarge(entry.region));
    let enlarged = Region.area(ref.region) - combinedArea;

    if (enlarged < enlargement) {
      enlargement = enlarged;
      least = entry;
    } else if (enlarged === enlargement) {
      if (combinedArea < Region.area(least.region))
        least = entry;
    }
  });

  return least;
}

function enlarge(regionX: RegionData, regionY: RegionData): RegionData {
  const dimensions = Region.assertSameDimensions(regionX, regionY);
  let enlargement: RegionData = { min: [], max: [] };
  for (let i = 0; i < dimensions; i++) {
    enlargement.min.push(Math.min(regionX.min[i], regionY.min[i]));
    enlargement.max.push(Math.max(regionX.max[i], regionY.max[i]));
  }
  return enlargement;
}
