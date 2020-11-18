import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CupType {
  name: string;
  displayName?: string;
  type: 'container' | 'leaf';
  render: React.FC;
  desc?: React.ReactNode;
  editor?: React.FC;
}

export type CupList = CupType[];

export const cupsInitialState: CupList = [];

export const cupsSlice = createSlice({
  name: 'cups',
  initialState: cupsInitialState,
  reducers: {
    regCup(state, action: PayloadAction<CupType>) {
      state.push(action.payload);
    },
  },
});

export const { regCup } = cupsSlice.actions;
