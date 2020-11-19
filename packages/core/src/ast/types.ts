export type ASTType = 'leaf' | 'container';

export interface ASTAttrs {
  [key: string]: any;
}

export interface ASTBaseNode {
  id: string;
  type: ASTType;
  cupName: string;
  attrs: { [key: string]: ASTAttrs };
}

export interface ASTLeafNode extends ASTBaseNode {
  type: 'leaf';
}

export interface ASTContainerNode extends ASTBaseNode {
  type: 'container';
  childrens: ASTNode[];
}

export type ASTNode = ASTLeafNode | ASTContainerNode;
