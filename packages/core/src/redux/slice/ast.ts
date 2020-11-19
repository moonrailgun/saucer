import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  ASTAttrs,
  ASTContainerNode,
  ASTNode,
  ASTType,
} from '../../ast/types';
import _get from 'lodash/get';
import { createASTNode } from '../../ast';

export type ASTState = ASTContainerNode;

export const astInitialState: ASTContainerNode = {
  type: 'container',
  cupName: 'root',
  attrs: {},
  childrens: [],
};

export const astSlice = createSlice({
  name: 'ast',
  initialState: astInitialState,
  reducers: {
    /**
     * 在目标元素之前插入
     */
    insertBefore(
      state,
      action: PayloadAction<{
        targetPath: string; // For example: 0.1.0 => root.childrens[0].childrens[1].childrens[0]
        type: ASTType;
        cupName: string;
        attrs?: ASTAttrs;
      }>
    ) {
      const { targetPath, type, cupName, attrs = {} } = action.payload;

      const pathIndexs = targetPath.split('.').map(Number);
      if (pathIndexs.length === 0) {
        console.error('Path is Empty');
        return;
      }
      const targetIndex = pathIndexs.pop()!;
      const containerPath = pathIndexs.join('.childrens.');

      const parent: ASTNode = _get(state.childrens, containerPath, state);
      if (parent.type !== 'container') {
        console.error('Parent is not a container');
        return;
      }
      const target = _get(parent, 'childrens.' + targetIndex);
      const newNode = createASTNode(type, cupName, attrs);
      if (!target) {
        // cannot find target
        (parent as ASTContainerNode).childrens.push(newNode);
      } else {
        (parent as ASTContainerNode).childrens.splice(targetIndex, 0, newNode);
      }
    },
  },
});

export const { insertBefore } = astSlice.actions;
