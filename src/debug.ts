import { Node } from './node';
import { inspect } from 'util';

export function createDebugFn(
  rootGetter: () => Node,
  separatorChar = '-'
): Function {
  return () => {
    console.log(
      inspect(rootGetter(), { depth: 25 }) + '\n' + separatorChar.repeat(100)
    );
  };
}
