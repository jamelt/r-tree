export function isAssigned(value: any): boolean {
  return !isNil(value);
}

export function isNil(value: any): boolean {
  return value == null;
}

export function error(message: string): never {
  throw new Error(message);
}
