import { Entry } from './entry';
import { Node } from './node';
import { mixinDeep } from './utils';

export type PathElement = PathNode | PathEntry;
export type Element = Node | Entry;

interface Path {
  push(element: Element): Path;
  pop(): Element;
  value(index?: number): Element | undefined;
  length(): number;
}

interface PathEntry {
  value: Entry;
  next(): PathNode;
  prev(): PathNode;
  push(node: Node): PathNode;
}

interface PathNode {
  value: Node;
  next(): PathEntry;
  prev(): PathEntry;
  push(entry: Entry): PathEntry;
}

export function pathCreate(): Path {
  let current: PathElement;
  let count = 0;

  const instance: Partial<Path> = {};

  function push(element: Element): Path {
    current = (<any>element).region
      ? pathEntryCreate(<Entry>element, <PathNode>current)
      : pathNodeCreate(<Node>element, <PathEntry>current);
    count += 1;
    return <Path>instance;
  }

  function pop(): Element {
    const value = current.value;
    current = current.prev();
    count -= 1;
    return value;
  }

  function value(index?: number): Element | undefined {
    if (!current) return;
    if (index !== undefined) {
      let scan = current;
      for (let i = count - index; i >= 0; i--) scan = current.prev();
      return scan.value;
    }
    return current.value;
  }
  const length = () => count;

  return Object.freeze(mixinDeep(instance, { push, pop, value, length }));
}

export function pathNodeCreate(node: Node, parent?: PathEntry): PathNode {
  let forward: PathEntry;

  const instance: Partial<PathNode> = {};
  const next = () => forward;
  const prev = () => parent;
  const push = (entry: Entry): PathEntry => {
    return (forward = pathEntryCreate(entry, <PathNode>instance));
  };

  return Object.freeze(
    mixinDeep(instance, {
      value: node,
      next,
      prev,
      push
    })
  );
}

function pathEntryCreate(entry: Entry, parent: PathNode): PathEntry {
  let forward: PathNode;

  const instance: Partial<PathEntry> = {};
  const next = () => forward;
  const prev = () => parent;

  const push = (node: Node): PathNode => {
    return (forward = pathNodeCreate(node, <PathEntry>instance));
  };

  return Object.freeze(
    mixinDeep(instance, {
      value: entry,
      next,
      prev,
      push
    })
  );
}
