export interface Region {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
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
  if (b == null) return a;
  a.minX = Math.min(a.minX, b.minX);
  a.minY = Math.min(a.minY, b.minY);
  a.maxX = Math.max(a.maxX, b.maxX);
  a.maxY = Math.max(a.maxY, b.maxY);
  return a;
}
