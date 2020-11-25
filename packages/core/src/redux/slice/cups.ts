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
    setAvailableCup(state, action: PayloadAction<string[]>) {
      state.availableCup = action.payload ?? [];
    },
  },
});

export const { setAvailableCup } = cupsSlice.actions;
