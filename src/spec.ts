import { error, isNil } from './utils';

export interface Spec {
  minEntries: number;
  maxEntries: number;
}

export function defaultSpec(): Spec {
  return {
    minEntries: 2,
    maxEntries: 5
  }
}

export function validateSpec(spec: Spec) {
  if (isNil(spec.maxEntries))
    error('Undefined maxEntries');
  if (isNil(spec.minEntries))
    error('Undefined minEntries');
  if (spec.minEntries> spec.maxEntries / 2)
    error('minEntries must be less than or equal to (<=) half the number of maxEntries ');
}
