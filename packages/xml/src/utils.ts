import { ASTAttrs, ASTNode, traverseUpdateTree } from '@saucerjs/core';
import { js2xml, Element as XMLElement } from 'xml-js';

/**
 * Get node attrs
 */
function getNodeAttrs(node: ASTNode): ASTAttrs {
  const attributes: ASTAttrs = {};
  for (const key in node.attrs) {
    if (Object.prototype.hasOwnProperty.call(node.attrs, key)) {
      const element = node.attrs[key];
      if (!key.startsWith('_')) {
        // Ignore key which start with _
        attributes[key] = element;
      }
    }
  }

  return attributes;
}

/**
 * Get children elements
 * Try to return in node.children > node.attrs['_xml!childrenText'] > []
 */
function getNodeChildren(node: ASTNode): XMLElement[] {
  if (!node) {
    return [];
  }

  if ('children' in node) {
    return node.children;
  } else if (typeof node.attrs._childrenText === 'string') {
    // hardcode: 支持抽取属性中的文本转化成xml的子节点
    return [{ type: 'text', text: node.attrs._childrenText }];
  } else {
    return [];
  }
}

export function transformToXMLAST(ast: ASTNode): XMLElement {
  const res = traverseUpdateTree<XMLElement>(ast, (node) => {
    return {
      type: 'element',
      name: node.cupName,
      attributes: getNodeAttrs(node),
      elements: getNodeChildren(node),
    };
  });

  return res;
}

/**
 * Transform saucer ast to XML
 */
export function serializeToXML(ast: ASTNode): string {
  const xml = js2xml(transformToXMLAST(ast));

  return xml;
}
