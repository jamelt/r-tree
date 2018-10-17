export function isAssigned(value: any): boolean {
  return !isNil(value);
}

export function isNil(value: any): boolean {
  return value == null;
}

export function error(message: string): never {
  throw new Error(message);
}

export function assert(condition: boolean, message?: string) {
  if (condition) return;
  if (message === undefined) message = 'Assertion failed';
  throw new Error(message);
}
