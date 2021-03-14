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
  findTargetNodeById,
  findTargetNodeByPath,
  isContainerNode,
  moveNodeByPath,
} from '../../ast';

export type ASTState = ASTContainerNode;

export const astInitialState: ASTContainerNode = {
  id: 'root',
  type: 'container',
  cupName: 'root',
  attrs: {},
  children: [],
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
        targetPath: string; // For example: 0.1.0 => root.children[0].children[1].children[0]
        type: ASTType;
        nodeId: string;
        cupName: string;
        attrs?: ASTAttrs;
      }>
    ) {
      const { targetPath, type, nodeId, cupName, attrs = {} } = action.payload;

      const findRes = findTargetNodeByPath(state, targetPath);
      if (findRes === false) {
        return;
      }

      const { target, parent, targetIndex } = findRes;
      const newNode = createASTNode(type, nodeId, cupName, attrs);
      if (!target) {
        // cannot find target
        parent.children.push(newNode);
      } else {
        parent.children.splice(targetIndex, 0, newNode);
      }
    },
    /**
     * Insert after ast node
     */
    insertAfter(
      state,
      action: PayloadAction<{
        targetPath: string; // For example: 0.1.0 => root.children[0].children[1].children[0]
        type: ASTType;
        nodeId: string;
        cupName: string;
        attrs?: ASTAttrs;
      }>
    ) {
      const { targetPath, type, nodeId, cupName, attrs = {} } = action.payload;

      const findRes = findTargetNodeByPath(state, targetPath);
      if (findRes === false) {
        return;
      }

      const { target, parent, targetIndex } = findRes;
      const newNode = createASTNode(type, nodeId, cupName, attrs);

      if (!target) {
        // cannot find target
        parent.children.push(newNode);
      } else {
        parent.children.splice(targetIndex + 1, 0, newNode);
      }
    },

    appendChildren(
      state,
      action: PayloadAction<{
        targetPath: string; // For example: 0.1.0 => root.children[0].children[1].children[0]
        type: ASTType;
        nodeId: string;
        cupName: string;
        attrs?: ASTAttrs;
      }>
    ) {
      const { targetPath, type, nodeId, cupName, attrs = {} } = action.payload;

      const findRes = findTargetNodeByPath(state, targetPath);
      if (findRes === false) {
        return;
      }

      const { target } = findRes;
      const newNode = createASTNode(type, nodeId, cupName, attrs);

      if (isContainerNode(target)) {
        target.children.push(newNode);
      } else {
        console.error('Target should be a container node');
        return;
      }
    },

    /**
     * remove node from tree by id
     */
    removeById(
      state,
      action: PayloadAction<{
        nodeId: string;
      }>
    ) {
      const { nodeId } = action.payload;
      const findRes = findTargetNodeById(state, nodeId);
      if (findRes === false) {
        return;
      }

      const { parent, targetIndex } = findRes;
      parent.children.splice(targetIndex, 1);
    },

    /**
     * Move node by path
     */
    moveByPath(
      state,
      action: PayloadAction<{
        fromPath: string;
        toPath: string;
      }>
    ) {
      const { fromPath, toPath } = action.payload;
      moveNodeByPath(state, fromPath, toPath);
    },

    /**
     * Set Node Attrs
     *
     * new attrs will append or override origin attrs
     */
    setNodeAttrs(
      state,
      action: PayloadAction<{
        nodeId: string;
        newAttrs: ASTAttrs;
      }>
    ) {
      const { nodeId, newAttrs } = action.payload;

      const findRes = findTargetNodeById(state, nodeId);
      if (findRes === false) {
        return;
      }

      const { target } = findRes;

      target.attrs = {
        ...target.attrs,
        ...newAttrs,
      };
    },
  },
});

export const {
  insertBefore,
  insertAfter,
  appendChildren,
  removeById,
  moveByPath,
  setNodeAttrs,
} = astSlice.actions;
