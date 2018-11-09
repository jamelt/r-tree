export function isNil(obj: any) {
  return obj == null;
}

export function error(message: string): Error {
  return new Error(message);
}

export function assert(condition: boolean, message?: string): void | never {
  if (condition) return;
  if (!message) message = 'Assertion failed';
  throw error(message);
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

export function flatten<T>(array: T[]): T[] {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected value to be an array');
  }

  return flattenFrom(array);
}

function flattenFrom<T>(array: T[]): T[] {
  return flattenDown(array, []);
}

export function flattenDepth<T>(array: T[], depth: number) {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected value to be an array');
  }

  return flattenFromDepth(array, depth);
}

function flattenFromDepth<T>(array: T[], depth: number): T[] {
  if (typeof depth !== 'number') {
    throw new TypeError('Expected the depth to be a number');
  }

  return flattenDownDepth(array, [], depth);
}

function flattenDown<T>(array: T[], result: T[]): T[] {
  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    if (Array.isArray(value)) {
      flattenDown(value, result);
    } else {
      result.push(value);
    }
  }

  return result;
}

function flattenDownDepth<T>(array: T[], result: T[], depth: number): T[] {
  depth--;

  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    if (depth > -1 && Array.isArray(value)) {
      flattenDownDepth(value, result, depth);
    } else {
      result.push(value);
    }
  }

  return result;
}

export function removeValue<T>(array: T[], value: T, count?: number): T[] {
  let index;
  let i = 0;

  while ((!count || i++ < count) && ~(index = array.indexOf(value)))
    array.splice(index, 1);

  return array;
}
