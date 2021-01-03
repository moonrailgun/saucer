import type { ASTAttrs } from '@saucerjs/core';
import React, { useContext } from 'react';

interface TeaAttrsContextProps {
  currentTeaAttrs: ASTAttrs;
  setCurrentTeaAttrs: (newAttrs: ASTAttrs) => void;
}

/**
 * Tea Attrs Context which can get or set tea attrs.
 */
export const TeaAttrsContext = React.createContext<TeaAttrsContextProps>({
  currentTeaAttrs: {},
  setCurrentTeaAttrs: (newAttrs: ASTAttrs) => {},
});
TeaAttrsContext.displayName = 'TeaAttrsContext';

export function useTeaAttrsContext(): TeaAttrsContextProps {
  const context = useContext(TeaAttrsContext);

  return context;
}
