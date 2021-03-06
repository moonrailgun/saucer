import { ASTNode, traverseUpdateTree } from '@saucerjs/core';
import { js2xml, Element as XMLElement } from 'xml-js';

export function transformToXMLAST(ast: ASTNode): XMLElement {
  const res = traverseUpdateTree(ast, (node) => {
    return {
      type: 'element',
      name: node.cupName,
      attributes: node.attrs,
      elements: node.children ?? [],
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
