export function error(message: string): Error {
  return new Error(message);
}

export function assert(condition: boolean, message?: string): void | never {
  if (condition) return;
  if (!message) message = 'Assertion failed';
  throw error(message);
}

export function mixin_deep(target: any, ...rest: any[]): any {
  for (let obj of rest) {
    if (is_object(obj)) {
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
  if (is_object(val) && is_object(obj)) {
    mixin_deep(obj, val);
  } else {
    target[key] = val;
  }
}

export function is_object(val: any): boolean {
  return (
    typeof val === 'function' ||
    (typeof val === 'object' && val !== null && !Array.isArray(val))
  );
}
