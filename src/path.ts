import { Entry } from './entry';
import { Node } from './node';
import { mixinDeep } from './utils';

export type Element = Node | Entry;

export interface Path {
  push(element: Element): Path;
  pop(): Element;
  value(index?: number): Element | undefined;
  isRoot(node: Node): boolean;
  length(): number;
  root(): Node;
}

export function pathCreate(): Path {
  let sequence: Element[] = [];
  let currentIndex = -1;
  let pathRoot: Node | undefined;

  const instance = {};

  function push(element: Element): Path {
    sequence.push(element);
    currentIndex += 1;
    if (currentIndex === 0) pathRoot = <Node>element;
    return <Path>instance;
  }

  function pop(): Element | undefined {
    currentIndex -= 1;
    return sequence.pop();
  }

  function value(index?: number): Element | undefined {
    if (index === undefined) return sequence[currentIndex];
    return sequence[index];
  }

  function isRoot(node: Node) {
    return node !== undefined && node === root();
  }

  function root(): Node {
    return <Node>sequence[0] || pathRoot;
  }

  const length = () => sequence.length;

  return Object.freeze(
    mixinDeep(instance, { push, pop, value, length, isRoot, root,
    /* used for debugging, remove before release */ sequence })
  );
}
