import { error, mixin_deep } from './utils';

export interface Specification {
  minEntries: number;
  maxEntries: number;
}

export function specification_default(): Specification {
  return {
    minEntries: 2,
    maxEntries: 5
  };
}

export function specification_create(
  userSpecification: Specification = specification_default()
): Specification {
  return mixin_deep({}, userSpecification);
}

export function specification_validate(specification: Specification): void {
  if (!specification.maxEntries) throw error('Undefined maxEntries');
  if (!specification.minEntries) throw error('Undefined minEntries');
  if (specification.minEntries > specification.maxEntries / 2)
    throw error(
      'minEntries must be less than or equal to (<=) half the number of maxEntries '
    );
}
