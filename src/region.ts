import { assert } from './utils';

export interface Region {
  min: {
    x: number;
    y: number;
  },
  max: {
    x: number;
    y: number;
  }
}

export function regionArea(region: Region): number {
  return (max.x-min.x)*(max.y-min.y);
}


export function regionOverlaps(a: Region, b: Region): boolean {
  return b.min.x <= a.max.x &&
         b.min.y <= a.max.y &&
         b.max.x >= a.min.x &&
         b.max.y >= a.min.y;
}

export function regionCreate(): Region {
  return {
    min: {
      x: null,
      y: null,
    },
    max: {
      x: null,
      y: null
    }
  }
}

export function regionEnlarge(a: Region, b?: Region): Region {
  if (b == null) return a;
  a.min.x = Math.min(a.min.x, b.min.x);
  a.min.y = Math.min(a.min.y, b.min.y);
  a.max.x = Math.max(a.max.x, b.max.x);
  a.max.y = Math.max(a.max.y, b.max.y);
  return a;
}
