import { useCallback } from 'react';
import type { ASTAttrs, ASTType } from 'src/ast/types';
import { useSaucerDispatch } from '../context';
import { insertBefore } from '../slice/ast';

export function useASTDispatchAction() {
  const dispatch = useSaucerDispatch();

  const dispatchInsertBefore = useCallback(
    (
      targetPath: string,
      type: ASTType,
      cupName: string,
      attrs: ASTAttrs = {}
    ) => {
      dispatch(
        insertBefore({
          targetPath,
          type,
          cupName,
          attrs,
        })
      );
    },
    []
  );

  return { dispatchInsertBefore };
}
