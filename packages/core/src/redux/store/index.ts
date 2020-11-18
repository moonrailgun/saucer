import { configureStore, Store } from '@reduxjs/toolkit';
import { allReducer, AllType } from '../slice/__all__';
import { SaucerStoreHelper } from './helper';
import { SaucerStoreType } from './type';

export function buildSaucerStore(): SaucerStoreType {
  const store = configureStore<AllType>({
    reducer: allReducer,
  });

  return store;
}

export const defaultSaucerStore = buildSaucerStore();
export const defaultSaucerStoreHelper = new SaucerStoreHelper(
  defaultSaucerStore
);
