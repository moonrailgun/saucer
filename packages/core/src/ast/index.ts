import type {
  ASTAttrs,
  ASTContainerNode,
  ASTLeafNode,
  ASTNode,
  ASTType,
} from './types';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _cloneDeep from 'lodash/cloneDeep';
import _isNil from 'lodash/isNil';

export function createASTNode(
  type: ASTType,
  id: string,
  cupName: string,
  attrs: ASTAttrs = {}
): ASTNode {
  if (type === 'container') {
    return {
      id,
      type,
      cupName,
      attrs,
      children: [],
    } as ASTContainerNode;
  } else if (type === 'leaf') {
    return {
      id,
      type,
      cupName,
      attrs,
    } as ASTLeafNode;
  } else {
    return {
      id,
      type,
      cupName,
      attrs,
    } as ASTNode;
  }
}

/**
 * Find node in ast by path like '0.1'
 */
export function findTargetNodeByPath(
  root: ASTContainerNode,
  path: string
): { parent: ASTContainerNode; target: ASTNode; targetIndex: number } | false {
  if (path === '') {
    // hardcode
    return { parent: root, target: root, targetIndex: 0 };
  }

  const pathIndexs = path
    .split('.')
    .filter((s) => typeof s === 'string')
    .map(Number);
  if (pathIndexs.length === 0) {
    console.error('Path is Empty');
    return false;
  }
  const targetIndex = pathIndexs.pop()!;
  const containerPath = pathIndexs.join('.children.');

  const parent: ASTNode = _get(root.children, containerPath, root);
  if (parent.type !== 'container') {
    console.error('Parent is not a container');
    return false;
  }
  const target = _get(parent, 'children.' + targetIndex);

  if (_isNil(target)) {
    return false;
  }

  return { parent, target, targetIndex };
}

/**
 * Find node by id in a tree which include more info
 * @param root tree root
 * @param nodeId find node id
 */
export function findTargetNodeById(
  root: ASTContainerNode,
  nodeId: string
): { parent: ASTContainerNode; target: ASTNode; targetIndex: number } | false {
  if (typeof nodeId !== 'string') {
    return false;
  }

  if (root.type !== 'container') {
    return false;
  }

  const findIndex = root.children.findIndex((item) => item.id === nodeId);
  if (findIndex >= 0) {
    return {
      parent: root,
      target: root.children[findIndex],
      targetIndex: findIndex,
    };
  } else {
    // Not found, try iteration.
    for (const sub of root.children) {
      if (sub.type === 'container') {
        const r = findTargetNodeById(sub, nodeId);
        if (r !== false) {
          return r;
        }
      }
    }
  }

  return false;
}

/**
 * Get AST Tree Path by node id
 */
export function getNodePathById(
  root: ASTContainerNode,
  nodeId: string,
  currentPathArr: number[] = []
): string | false {
  if (typeof nodeId !== 'string') {
    return false;
  }

  if (root.type !== 'container') {
    return false;
  }

  const findIndex = root.children.findIndex((item) => item.id === nodeId);
  if (findIndex >= 0) {
    return [...currentPathArr, findIndex].join('.');
  } else {
    // Not found, try iteration.
    const children = root.children;
    for (let i = 0; i < children.length; i++) {
      const sub = children[i];
      if (sub.type === 'container') {
        const r = getNodePathById(sub, nodeId, [...currentPathArr, i]);
        if (r !== false) {
          return r;
        }
      }
    }
  }

  return false;
}

/**
 * Whether a node is container
 */
export function isContainerNode(node: ASTNode): node is ASTContainerNode {
  return node.type === 'container' && _has(node, 'children');
}

/**
 * Traverse Tree and find node by node id
 * @param root tree root node
 * @param id node id
 */
export function findNodeById(root: ASTNode, id: string): ASTNode | null {
  if (!isContainerNode(root)) {
    return null;
  }

  for (const node of root.children) {
    if (node.id === id) {
      return node;
    } else if (isContainerNode(node)) {
      const res = findNodeById(node, id);
      if (res !== null) {
        return res;
      }
    }
  }

  return null;
}

/**
 * Move node by path
 * @param root
 * @param fromPath
 * @param toPath
 */
export function moveNodeByPath(
  root: ASTContainerNode,
  fromPath: string,
  toPath: string
): void {
  const fromTarget = findTargetNodeByPath(root, fromPath);
  let toTarget = findTargetNodeByPath(root, toPath);

  if (fromTarget === false) {
    // Skip if cannot find by from path
    return;
  }

  if (toTarget === false) {
    // For move to end of level
    const parent = findTargetNodeByPath(root, getParentPath(toPath));
    if (parent === false) {
      console.warn('Cannot find parent node in toPath');
      return;
    } else if (!isContainerNode(parent.target)) {
      console.warn('Not a valid parent node');
      return;
    } else {
      fromTarget.parent.children.splice(fromTarget.targetIndex, 1);
      parent.target.children.push(fromTarget.target);
      return;
    }
  }

  if (fromTarget.parent === toTarget.parent) {
    // In same level
    // Keep index of Array is not modify
    if (fromTarget.targetIndex > toTarget.targetIndex) {
      fromTarget.parent.children.splice(fromTarget.targetIndex, 1);
      toTarget.parent.children.splice(
        toTarget.targetIndex,
        0,
        fromTarget.target
      );
    } else if (fromTarget.targetIndex < toTarget.targetIndex) {
      toTarget.parent.children.splice(
        toTarget.targetIndex,
        0,
        fromTarget.target
      );
      fromTarget.parent.children.splice(fromTarget.targetIndex, 1);
    }
  } else {
    fromTarget.parent.children.splice(fromTarget.targetIndex, 1);
    toTarget.parent.children.splice(toTarget.targetIndex, 0, fromTarget.target);
  }
}

/**
 * traverse and update tree, return new tree
 * @param root tree root node
 * @param id node id
 */
type TraverseUpdaterNode = ASTNode &
  Partial<Pick<ASTContainerNode, 'children'>>;
interface TraverseUpdaterInfo {
  path: string;
}
type TraverseUpdater = (
  node: TraverseUpdaterNode,
  info: TraverseUpdaterInfo
) => any;

export function traverseUpdateTree<T = ASTNode>(
  root: ASTNode,
  updater: TraverseUpdater
): T {
  function loop(node: ASTNode, updater: TraverseUpdater, path: string) {
    const info = { path };
    if (!isContainerNode(node)) {
      return updater(node, info);
    } else {
      node.children = node.children.map((subNode, i) => {
        const subPath = path === '' ? String(i) : `${path}.${i}`;
        return loop(subNode, updater, subPath);
      });
      return updater(node, info);
    }
  }

  const newRoot = loop(_cloneDeep(root), updater, '');

  return (newRoot as any) as T;
}

/**
 * Decrease last index of path
 */
export function getPrevPath(originPath: string): string {
  if (originPath === '') {
    return '';
  }

  const indexs = originPath
    .split('.')
    .filter((s) => typeof s === 'string')
    .map(Number);

  if (indexs[indexs.length - 1] > 0) {
    indexs[indexs.length - 1]--;
  }

  return indexs.join('.');
}

/**
 * Increase last index of path
 */
export function getNextPath(originPath: string): string {
  if (originPath === '') {
    return '';
  }

  const indexs = originPath
    .split('.')
    .filter((s) => typeof s === 'string')
    .map(Number);

  indexs[indexs.length - 1]++;

  return indexs.join('.');
}

/**
 * Get first index of path in same level
 */
export function getFirstPath(originPath: string): string {
  if (originPath === '') {
    return '';
  }

  const indexs = originPath
    .split('.')
    .filter((s) => typeof s === 'string')
    .map(Number);

  indexs[indexs.length - 1] = 0;

  return indexs.join('.');
}

/**
 * Get parent path
 */
export function getParentPath(originPath: string): string {
  if (originPath === '') {
    return '';
  }

  const indexs = originPath
    .split('.')
    .filter((s) => typeof s === 'string')
    .map(Number);

  indexs.pop();

  return indexs.join('.');
}

/**
 * resetPathLastIndex
 * @param lastIndex Last index to reset
 */
export function resetPathLastIndex(
  originPath: string,
  lastIndex: number
): string {
  if (originPath === '') {
    return '';
  }

  const indexs = originPath
    .split('.')
    .filter((s) => typeof s === 'string')
    .map(Number);

  indexs[indexs.length - 1] = lastIndex;

  return indexs.join('.');
}
