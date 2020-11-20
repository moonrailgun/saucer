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
      childrens: [],
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
  const containerPath = pathIndexs.join('.childrens.');

  const parent: ASTNode = _get(root.childrens, containerPath, root);
  if (parent.type !== 'container') {
    console.error('Parent is not a container');
    return false;
  }
  const target = _get(parent, 'childrens.' + targetIndex);

  return { parent, target, targetIndex };
}

/**
 * Whether a node is container
 */
export function isContainerNode(node: ASTNode): node is ASTContainerNode {
  return node.type === 'container' && _has(node, 'childrens');
}
