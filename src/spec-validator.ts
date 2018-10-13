import { Spec } from './spec';
import { isNil, error } from './utils';

export class SpecValidator {
  validate(spec: Spec) {
    if (isNil(spec.maximumEntriesPerNode))
      error('Undefined maximumEntriesPerNode');
    if (isNil(spec.minimumEntriesPerNode))
      error('Undefined minimumEntriesPerNode');
    if (spec.maximumEntriesPerNode > spec.maximumEntriesPerNode / 2)
      error('minimumEntriesPerNode must be <= to maximumEntriesPerNode');
  }
}

