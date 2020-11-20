import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  ASTAttrs,
  ASTContainerNode,
  ASTNode,
  ASTType,
} from '../../ast/types';

import _get from 'lodash/get';
import {
  createASTNode,
  findTargetNodeByPath,
  isContainerNode,
} from '../../ast';

export type ASTState = ASTContainerNode;

export const astInitialState: ASTContainerNode = {
  id: 'root',
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
     * Insert before ast node
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

      const findRes = findTargetNodeByPath(state, targetPath);
      if (findRes === false) {
        return;
      }

      const { target, parent, targetIndex } = findRes;
      const newNode = createASTNode(type, cupName, attrs);
      if (!target) {
        // cannot find target
        parent.childrens.push(newNode);
      } else {
        parent.childrens.splice(targetIndex, 0, newNode);
      }
    },
    /**
     * Insert after ast node
     */
    insertAfter(
      state,
      action: PayloadAction<{
        targetPath: string; // For example: 0.1.0 => root.childrens[0].childrens[1].childrens[0]
        type: ASTType;
        cupName: string;
        attrs?: ASTAttrs;
      }>
    ) {
      const { targetPath, type, cupName, attrs = {} } = action.payload;

      const findRes = findTargetNodeByPath(state, targetPath);
      if (findRes === false) {
        return;
      }

      const { target, parent, targetIndex } = findRes;
      const newNode = createASTNode(type, cupName, attrs);

      if (!target) {
        // cannot find target
        parent.childrens.push(newNode);
      } else {
        parent.childrens.splice(targetIndex + 1, 0, newNode);
      }
    },

    appendChildren(
      state,
      action: PayloadAction<{
        targetPath: string; // For example: 0.1.0 => root.childrens[0].childrens[1].childrens[0]
        type: ASTType;
        cupName: string;
        attrs?: ASTAttrs;
      }>
    ) {
      const { targetPath, type, cupName, attrs = {} } = action.payload;

      const findRes = findTargetNodeByPath(state, targetPath);
      if (findRes === false) {
        return;
      }

      const { parent } = findRes;
      const newNode = createASTNode(type, cupName, attrs);

      if (isContainerNode(parent)) {
        parent.childrens.push(newNode);
      } else {
        console.error('Target should be a container node');
        return;
      }
    },
  },
});

export const { insertBefore, insertAfter, appendChildren } = astSlice.actions;
