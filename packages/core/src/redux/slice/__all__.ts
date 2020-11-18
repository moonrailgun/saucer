import { cupsInitialState, cupsSlice, CupList } from './cups';

export interface AllType {
  cups: CupList;
}

export const allReducer = {
  cups: cupsSlice.reducer,
};

export const allInitialState = {
  cups: cupsInitialState,
};
