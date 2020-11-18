import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CupsState {
  availableCup: string[];
}

export const cupsInitialState: CupsState = {
  availableCup: [],
};

export const cupsSlice = createSlice({
  name: 'cups',
  initialState: cupsInitialState,
  reducers: {
    setCupAvailable(state, action: PayloadAction<string>) {
      state.availableCup.push(action.payload);
    },
  },
});

export const { setCupAvailable } = cupsSlice.actions;
