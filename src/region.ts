import { RegionData } from './region-data';
import { assert } from './utils';

export class Region implements RegionData {
  min: number[];
  max: number[];

  constructor(regionData: RegionData) {
    this.max = regionData.max;
    this.min = regionData.min;
  }

  static assertSameDimensions(x: RegionData, y: RegionData): void {
    assert(
      x.min.length === y.min.length &&
        x.min.length === x.max.length &&
        y.min.length === y.max.length,
      'Regions must have same dimensions.'
    );
  }

  overlaps(region: RegionData): boolean {
    Region.assertSameDimensions(this, region);
    for (let i = 0; i < this.min.length; i++)
      if (this.min[i] > region.max[i] || this.max[i] < region.min[i])
        return false;
    return true;
  }

  enlarge(region: RegionData): RegionData {
    min
  }
}
