export type ASTType = 'leaf' | 'container';

export type ASTAttrs = Record<string, any>;

export interface ASTBaseNode {
  id: string;
  type: ASTType;
  cupName: string;
  attrs: ASTAttrs;
}

export interface ASTLeafNode extends ASTBaseNode {
  type: 'leaf';
}

export interface ASTContainerNode extends ASTBaseNode {
  type: 'container';
  children: ASTNode[];
}

export type ASTNode = ASTLeafNode | ASTContainerNode;
