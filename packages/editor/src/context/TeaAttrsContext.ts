import type { ASTAttrs } from '@saucerjs/core';
import React, { useContext } from 'react';

export const TeaAttrsContext = React.createContext<ASTAttrs>({});
TeaAttrsContext.displayName = 'TeaAttrsContext';

export function useTeaAttrs() {
  const attrs = useContext(TeaAttrsContext);

  return attrs;
}
