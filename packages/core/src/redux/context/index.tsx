import React, { useMemo } from 'react';
import {
  createDispatchHook,
  createSelectorHook,
  createStoreHook,
  Provider,
  ReactReduxContextValue,
} from 'react-redux';
import { allInitialState, AllType } from '../slice/__all__';
import {
  buildSaucerStore,
  BuildSaucerStoreOptions,
  defaultSaucerStore,
} from '../store';

const SaucerContext = React.createContext<ReactReduxContextValue<AllType>>({
  store: defaultSaucerStore,
  storeState: allInitialState,
});
SaucerContext.displayName = 'SaucerContext';

export const SaucerProvider: React.FC<BuildSaucerStoreOptions> = React.memo(
  (props) => {
    const store = useMemo(() => buildSaucerStore({ ...props }), []);

    return (
      <Provider store={store} context={SaucerContext}>
        {props.children}
      </Provider>
    );
  }
);
SaucerProvider.displayName = 'SaucerProvider';

export const useSaucerSelector = createSelectorHook<AllType>(SaucerContext);
export const useSaucerDispatch = createDispatchHook<AllType>(SaucerContext);
export const useSaucerStore = createStoreHook<AllType>(SaucerContext);
