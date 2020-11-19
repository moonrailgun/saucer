import type {
  ASTAttrs,
  ASTContainerNode,
  ASTLeafNode,
  ASTNode,
  ASTType,
} from './types';
import shortid from 'shortid';

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
