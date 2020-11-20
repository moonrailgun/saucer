import type {
  ASTAttrs,
  ASTContainerNode,
  ASTLeafNode,
  ASTNode,
  ASTType,
} from './types';
import shortid from 'shortid';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _cloneDeep from 'lodash/cloneDeep';

export function createASTNode(
  type: ASTType,
  name: string,
  attrs: ASTAttrs = {}
): ASTNode {
  const id = shortid();
  if (type === 'container') {
    return {
      id,
      type,
      cupName: name,
      attrs,
      children: [],
    } as ASTContainerNode;
  } else if (type === 'leaf') {
    return {
      id,
      type,
      cupName: name,
      attrs,
    } as ASTLeafNode;
  } else {
    return {
      id,
      type,
      cupName: name,
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

  return { parent, target, targetIndex };
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
 * traverse and update tree, return new tree
 * @param root tree root node
 * @param id node id
 */
export function traverseUpdateTree<T = ASTNode>(
  root: ASTNode,
  updater: (node: ASTNode) => any
): T {
  function loop(node: ASTNode, updater: (node: ASTNode) => any) {
    if (!isContainerNode(node)) {
      return updater(node);
    }

    node.children = node.children.map((node) => loop(node, updater));

    return updater(node);
  }

  const newRoot = loop(_cloneDeep(root), updater);

  return (newRoot as any) as T;
}
