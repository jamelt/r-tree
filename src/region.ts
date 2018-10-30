import { assert } from './utils';

export interface Region {
  min: number[];
  max: number[];
}

export function assertSameDimensions(x: Region, y?: Region): number {
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

export function area(region: Region): number {
  let area = 1.0;
  for (let i = 0; i < dimensions(region); i++)
    area *= region.max[i] - region.min[i];
  return area;
}

export function dimensions(region: Region) {
  assertSameDimensions(region);
  return region.min.length;
}

export function overlaps(x: Region, y: Region): boolean {
  const dimensions = assertSameDimensions(x, y);
  for (let i = 0; i < dimensions; i++)
    if (x.min[i] > y.max[i] || x.max[i] < y.min[i]) return false;
  return true;
}

export function region() {
  return { min: [], max: [] };
}

export function enlarge(x: Region, y: Region): Region {
  const dimensions = assertSameDimensions(x, y);
  let enlargement: Region = region();
  for (let i = 0; i < dimensions; i++) {
    enlargement.min.push(Math.min(x.min[i], y.min[i]));
    enlargement.max.push(Math.max(x.max[i], y.max[i]));
  }
  return enlargement;
}

export function emptyRegion(): Region {
  return { min: [], max: [] };
}
