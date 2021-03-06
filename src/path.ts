import { Node } from './node';
import { mixinDeep } from './utils';

export interface Path {
  push(node: Node): Path;
  pop(): Node;
  value(index?: number): Node | undefined;
  isRoot(node: Node): boolean;
  length(): number;
  root(): Node;
}

export function pathCreate(): Path {
  let sequence: Node[] = [];
  let pathRoot: Node | undefined;
  let currentIndex = -1;

  const instance = {};

  function push(node: Node): Path {
    sequence.push(node);
    currentIndex += 1;
    if (currentIndex === 0) pathRoot = node;
    return <Path>instance;
  }

  function pop(): Node | undefined {
    currentIndex -= 1;
    return sequence.pop();
  }

  function value(index?: number): Node | undefined {
    return index === undefined ? sequence[currentIndex] : sequence[index];
  }

  function isRoot(node: Node) {
    return node !== undefined && node === root();
  }

  function root(): Node {
    return <Node>sequence[0] || pathRoot;
  }

  const length = () => sequence.length;

  return Object.freeze(
    mixinDeep(instance, {
      push,
      pop,
      value,
      length,
      isRoot,
      root,
      /* used for debugging, remove before release */ sequence
    })
  );
}
