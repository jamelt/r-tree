import { error, mixinDeep } from './utils';

export interface Specification {
  minEntries: number;
  maxEntries: number;
}

export function defaultSpec(): Specification {
  return {
    minEntries: 2,
    maxEntries: 5
  };
}

export function createSpecification(
  userSpecification: Specification = defaultSpec()
): Specification {
  return mixinDeep({}, userSpecification);
}

export function validateSpecification(specification: Specification): void {
  if (!specification.maxEntries) throw error('Undefined maxEntries');
  if (!specification.minEntries) throw error('Undefined minEntries');
  if (specification.minEntries > specification.maxEntries / 2)
    throw error(
      'minEntries must be less than or equal to (<=) half the number of maxEntries '
    );
}
