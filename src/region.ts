import { assert } from './utils';

export interface Region {
  min: number[];
  max: number[];
}

export function region_assert_same_dimensions(x: Region, y?: Region): number {
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

export function region_area(region: Region): number {
  let area = 1.0;
  for (let i = 0; i < region_dimensions(region); i++)
    area *= region.max[i] - region.min[i];
  return area;
}

export function region_dimensions(region: Region) {
  region_assert_same_dimensions(region);
  return region.min.length;
}

export function region_overlaps(x: Region, y: Region): boolean {
  const dimensions = region_assert_same_dimensions(x, y);
  for (let i = 0; i < dimensions; i++)
    if (x.min[i] > y.max[i] || x.max[i] < y.min[i]) return false;
  return true;
}e

export function region_create() {
  return { min: [], max: [] };
}

export function region_enlarge(x: Region, y: Region): Region {
  const dimensions = region_assert_same_dimensions(x, y);
  let enlargement: Region = region_create();
  for (let i = 0; i < dimensions; i++) {
    enlargement.min.push(Math.min(x.min[i], y.min[i]));
    enlargement.max.push(Math.max(x.max[i], y.max[i]));
  }
  return enlargement;
}

export function region_create_empty(): Region {
  return { min: [], max: [] };
}
