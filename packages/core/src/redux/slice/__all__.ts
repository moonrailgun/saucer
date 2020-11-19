import { astInitialState, astSlice, ASTState } from './ast';
import { cupsInitialState, cupsSlice, CupsState } from './cups';

export interface AllType {
  ast: ASTState;
  cups: CupsState;
}

export const allReducer = {
  ast: astSlice.reducer,
  cups: cupsSlice.reducer,
};

export const allInitialState = {
  ast: astInitialState,
  cups: cupsInitialState,
};
