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
}

export function pathCreate(): Path {
  let sequence: Element[] = [];
  let currentIndex = -1;

  const instance = {};

  function push(element: Element): Path {
    // TODO Validate node -> entry -> node -> entry ...
    sequence.push(element);
    currentIndex += 1;
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
    return sequence.length >= 0  && node === sequence[0];
  }

  const length = () => sequence.length;

  return Object.freeze(mixinDeep(instance, { push, pop, value, length, isRoot }));
}
