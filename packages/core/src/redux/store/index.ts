import { configureStore } from '@reduxjs/toolkit';
import type { ASTContainerNode } from '../../ast/types';
import { allInitialState, allReducer, AllType } from '../slice/__all__';
import type { SaucerStoreType } from './type';

export interface BuildSaucerStoreOptions {
  initialAST?: ASTContainerNode;
}

/**
 * Build new saucer store
 */
export function buildSaucerStore(
  options: BuildSaucerStoreOptions = {}
): SaucerStoreType {
  const preloadedState = {
    ...allInitialState,
    ast: {
      ...allInitialState.ast,
      ...options.initialAST,
    },
  };

  const store = configureStore<AllType>({
    reducer: allReducer,
    preloadedState,
  });

  return store;
}

export const defaultSaucerStore = buildSaucerStore();
