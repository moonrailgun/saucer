import React, { useContext } from 'react';

interface TeaRenderOptionsContextProps {
  hasWrapper: boolean;
}

/**
 * Tea Attrs Context which can get or set tea attrs.
 */
export const TeaRenderOptionsContext = React.createContext<
  TeaRenderOptionsContextProps
>({
  hasWrapper: true,
});
TeaRenderOptionsContext.displayName = 'TeaRenderOptionsContext';

export function useTeaRenderOptionsContext(): TeaRenderOptionsContextProps {
  const options = useContext(TeaRenderOptionsContext);

  return options;
}
