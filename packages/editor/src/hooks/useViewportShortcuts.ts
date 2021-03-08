import { useASTDispatchAction, useCurrentTeaId } from '@saucerjs/core';
import React, { useCallback } from 'react';

/**
 * Viewport键盘快捷键
 */
export function useViewportShortcuts() {
  const currentTeaId = useCurrentTeaId();
  const { dispatchRemoveNodeById } = useASTDispatchAction();

  const handleViewportKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (
        e.key === 'Delete' &&
        typeof currentTeaId === 'string' &&
        currentTeaId !== 'root'
      ) {
        // 删除节点
        dispatchRemoveNodeById(currentTeaId);
      }
    },
    [currentTeaId, dispatchRemoveNodeById]
  );

  return {
    handleViewportKeyUp,
  };
}
