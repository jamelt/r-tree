import { assert } from './utils';

export interface Region {
  min: number[];
  max: number[];
}

export function regionAssertSameDimensions(x: Region, y?: Region): number {
  if (y === undefined) {
    assert(
      x.min.length === x.max.length,
      'Region must have same min and max length'
    );
  } else {
    assert(
      x.min.length === x.max.length &&
      x.min.length === y.min.length &&
      x.min.length === x.max.length,
      'Regions must have same dimensions.'
    );
  }
  return x.min.length;
}

export function regionArea(region: Region): number {
  let area = 1.0;
  for (let i = 0; i < regionDimensions(region); i++)
    area *= region.max[i] - region.min[i];
  return area;
}

export function regionDimensions(region: Region) {
  regionAssertSameDimensions(region);
  return region.min.length;
}

export function regionOverlaps(x: Region, y: Region): boolean {
  const dimensions = regionAssertSameDimensions(x, y);
  for (let i = 0; i < dimensions; i++)
    if (x.min[i] > y.max[i] || x.max[i] < y.min[i]) return false;
  return true;
}

export function regionCreate(): Region {
  return { min: [], max: [] };
}

export function regionEnlarge(x: Region, y?: Region): Region {
  if (y == null) return x;
  const dimensions = regionAssertSameDimensions(x, y);
  let enlargement: Region = regionCreate();
  for (let i = 0; i < dimensions; i++) {
    enlargement.min.push(Math.min(x.min[i], y.min[i]));
    enlargement.max.push(Math.max(x.max[i], y.max[i]));
  }
  return enlargement;
}
