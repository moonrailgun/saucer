import React from 'react';
import {
  createDispatchHook,
  createSelectorHook,
  createStoreHook,
  Provider,
  ReactReduxContextValue,
} from 'react-redux';
import { allInitialState, AllType } from '../slice/__all__';
import { defaultSaucerStore } from '../store';

const SaucerContext = React.createContext<ReactReduxContextValue<AllType>>({
  store: defaultSaucerStore,
  storeState: allInitialState,
});
SaucerContext.displayName = 'SaucerContext';

export const SaucerProvider: React.FC = React.memo((props) => {
  return (
    <Provider store={defaultSaucerStore} context={SaucerContext}>
      {props.children}
    </Provider>
  );
});
SaucerProvider.displayName = 'SaucerProvider';

export const useSaucerSelector = createSelectorHook<AllType>(SaucerContext);
export const useSaucerDispatch = createDispatchHook<AllType>(SaucerContext);
export const useSaucerStore = createStoreHook<AllType>(SaucerContext);
