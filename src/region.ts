export interface Region {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export function regionCopy(region: Region): Region {
  // TODO Remove after testing
  if (!region) throw new Error('no region');
  return regionSet(<Region>{}, region);
}

export function regionArea(region: Region): number {
  return (region.maxX - region.minX) * (region.maxY - region.minY);
}

export function regionOverlaps(a: Region, b: Region): boolean {
  return (
    b.minX <= a.maxX && b.minY <= a.maxY && b.maxX >= a.minX && b.maxY >= a.minY
  );
}

export function regionCreate(minX = 0, minY = 0, maxX = 0, maxY = 0): Region {
  return { minX, minY, maxX, maxY };
}

export function regionEnlarge(a: Region, b?: Region): Region {
  if (b === undefined || b === null) return a;
  if (isNaN(a.minX) || isNaN(a.minY) || isNaN(a.maxX) || isNaN(a.maxY)) {
    return regionCopy(b);
  } else {
    return {
      minX: Math.min(a.minX, b.minX),
      minY: Math.min(a.minY, b.minY),
      maxX: Math.max(a.maxX, b.maxX),
      maxY: Math.max(a.maxY, b.maxY)
    };
  }
}

export function regionEnlargeAndSet<T extends Region>(a: T, b?: Region): T {
  if (b === undefined || b === null) return a;
  if (isNaN(a.minX) || isNaN(a.minY) || isNaN(a.maxX) || isNaN(a.maxY)) {
    regionSet(a, b);
  } else {
    a.minX = Math.min(a.minX, b.minX);
    a.minY = Math.min(a.minY, b.minY);
    a.maxX = Math.max(a.maxX, b.maxX);
    a.maxY = Math.max(a.maxY, b.maxY);
  }
  return a;
}

export function regionSet(a: Region, b: Region): Region {
  a.minX = b.minX;
  a.minY = b.minY;
  a.maxX = b.maxX;
  a.maxY = b.maxY;
  return a;
}

export function regionClear(region: Region) {
  regionSet(region, undefinedRegion);
}

export const undefinedRegion: Region = Object.freeze({
  minX: NaN,
  minY: NaN,
  maxX: NaN,
  maxY: NaN
});
