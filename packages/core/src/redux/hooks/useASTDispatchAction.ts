import { useCallback } from 'react';
import type { ASTAttrs, ASTType } from '../../ast/types';
import { useSaucerDispatch } from '../context';
import {
  appendChildren,
  insertAfter,
  insertBefore,
  moveByPath,
  removeById,
} from '../slice/ast';

/**
 * Saucer AST modify actions
 */
export function useASTDispatchAction() {
  const dispatch = useSaucerDispatch();

  const dispatchInsertBefore = useCallback(
    (
      targetPath: string,
      type: ASTType,
      nodeId: string,
      cupName: string,
      attrs: ASTAttrs = {}
    ) => {
      dispatch(
        insertBefore({
          targetPath,
          type,
          nodeId,
          cupName,
          attrs,
        })
      );
    },
    []
  );

  const dispatchInsertAfter = useCallback(
    (
      targetPath: string,
      type: ASTType,
      nodeId: string,
      cupName: string,
      attrs: ASTAttrs = {}
    ) => {
      dispatch(
        insertAfter({
          targetPath,
          type,
          nodeId,
          cupName,
          attrs,
        })
      );
    },
    []
  );

  const dispatchAppendChildren = useCallback(
    (
      targetPath: string,
      type: ASTType,
      nodeId: string,
      cupName: string,
      attrs: ASTAttrs = {}
    ) => {
      dispatch(
        appendChildren({
          targetPath,
          type,
          nodeId,
          cupName,
          attrs,
        })
      );
    },
    []
  );

  const dispatchRemoveNodeById = useCallback((nodeId: string) => {
    dispatch(removeById({ nodeId }));
  }, []);

  const dispatchMoveNodeByPath = useCallback(
    (fromPath: string, toPath: string) => {
      dispatch(moveByPath({ fromPath, toPath }));
    },
    []
  );

  return {
    dispatchInsertBefore,
    dispatchInsertAfter,
    dispatchAppendChildren,
    dispatchRemoveNodeById,
    dispatchMoveNodeByPath,
  };
}
