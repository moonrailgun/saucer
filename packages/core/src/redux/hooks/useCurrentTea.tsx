import { useCallback } from 'react';
import { CupType, findCup } from '../../cups';
import { findNodeById } from '../../ast';
import type { ASTAttrs, ASTNode } from '../../ast/types';
import { useSaucerDispatch, useSaucerSelector } from '../context';
import { setCurrentSelectTeaId } from '../slice/editor';
import { setNodeAttrs } from '../slice/ast';

export function useCurrentTeaId(): string | null {
  const currentSelectedTeaId = useSaucerSelector(
    (state) => state.editor.currentSelectTeaId
  );

  return currentSelectedTeaId;
}

/**
 * Get current selected Tea Info
 * Its is
 */
function useCurrentTea(): ASTNode | null {
  const currentSelectedTeaId = useCurrentTeaId();
  const ast = useSaucerSelector((state) => state.ast);

  if (currentSelectedTeaId === null) {
    return null;
  }

  return findNodeById(ast, currentSelectedTeaId);
}

export function useCurrentTeaAttrs(): ASTAttrs {
  const currentTea = useCurrentTea();

  return currentTea?.attrs ?? {};
}

export function useCurrentTeaCup(): CupType | null {
  const currentTea = useCurrentTea();
  const cupName = currentTea?.cupName;

  if (cupName === undefined) {
    return null;
  }

  return findCup(cupName);
}

export function useCurrentTeaAction() {
  const currentSelectedTeaId = useCurrentTeaId();
  const dispatch = useSaucerDispatch();

  const setCurrentTeaId = useCallback((id: string | null) => {
    dispatch(setCurrentSelectTeaId(id));
  }, []);

  const setCurrentTeaAttrs = useCallback(
    (newAttrs: ASTAttrs) => {
      if (typeof currentSelectedTeaId !== 'string') {
        console.warn('Current Tea is not selected');
        return;
      }

      dispatch(setNodeAttrs({ nodeId: currentSelectedTeaId, newAttrs }));
    },
    [currentSelectedTeaId]
  );

  return { setCurrentTeaId, setCurrentTeaAttrs };
}
