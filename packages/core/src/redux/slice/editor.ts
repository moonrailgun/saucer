import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EditorState {
  currentSelectTeaId: string | null;
}

export const editorInitialState: EditorState = {
  currentSelectTeaId: null,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState: editorInitialState,
  reducers: {
    setCurrentSelectTeaId(state, action: PayloadAction<string | null>) {
      state.currentSelectTeaId = action.payload;
    },
  },
});

export const { setCurrentSelectTeaId } = editorSlice.actions;
