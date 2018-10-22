import { RegionData } from './region-data';
import { assert } from './utils';

export class Region implements RegionData {
  min: number[];
  max: number[];

  constructor(regionData: RegionData) {
    this.max = regionData.max;
    this.min = regionData.min;
  }

  static assertSameDimensions(x: RegionData, y: RegionData): number {
    assert(
      x.min.length === y.min.length &&
      x.min.length === x.max.length &&
      y.min.length === y.max.length,
      'Regions must have same dimensions.'
    );
    return x.min.length;
  }

  static area(region: RegionData): number {
    let area = 1.0;
    for (let i = 0; i < Region.dimensions(region); i++)
      area *= region.max[i] - region.min[i];
    return area;
  }

  static dimensions(region: RegionData) {
    return region.min.length;
  }

  overlaps(region: RegionData): boolean {
    Region.assertSameDimensions(this, region);
    for (let i = 0; i < this.min.length; i++)
      if (this.min[i] > region.max[i] || this.max[i] < region.min[i])
        return false;
    return true;
  }

  enlarge(region: RegionData): RegionData {
    const dimensions = Region.assertSameDimensions(this, region);
    let enlargement: RegionData = { min: [], max: [] };
    for (let i = 0; i < dimensions; i++) {
      enlargement.min.push(Math.min(this.min[i], region.min[i]));
      enlargement.max.push(Math.max(this.max[i], region.max[i]));
    }
    return enlargement;
  }
}
