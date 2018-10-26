export function isAssigned(value: any): boolean {
  return !isNil(value);
}

export function isNil(value: any): boolean {
  return value == null;
}

export function error(message: string): never {
  throw new Error(message);
}

export function assert(condition: boolean, message?: string): void | never {
  if (condition) return;
  if (!message) message = 'Assertion failed';
  error(message);
}

export function mixinDeep(target: any, ...rest: any[]): any {
  for (let obj of rest) {
    if (isObject(obj)) {
      for (let key in obj) {
        if (key !== '__proto__') {
          mixin(target, obj[key], key);
        }
      }
    }
  }
  return target;
}

export function mixin(target: any, val: any, key: string): void {
  let obj = target[key];
  if (isObject(val) && isObject(obj)) {
    mixinDeep(obj, val);
  } else {
    target[key] = val;
  }
}

export function isObject(val: any): boolean {
  return (
    typeof val === 'function' ||
    (typeof val === 'object' && val !== null && !Array.isArray(val))
  );
}
