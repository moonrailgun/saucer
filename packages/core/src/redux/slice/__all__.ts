import { cupsInitialState, cupsSlice, CupsState } from './cups';

export interface AllType {
  cups: CupsState;
}

export const allReducer = {
  cups: cupsSlice.reducer,
};

export const allInitialState = {
  cups: cupsInitialState,
};
