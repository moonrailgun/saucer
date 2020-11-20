import { astInitialState, astSlice, ASTState } from './ast';
import { cupsInitialState, cupsSlice, CupsState } from './cups';
import { editorInitialState, editorSlice, EditorState } from './editor';

export interface AllType {
  ast: ASTState;
  cups: CupsState;
  editor: EditorState;
}

export const allReducer = {
  ast: astSlice.reducer,
  cups: cupsSlice.reducer,
  editor: editorSlice.reducer,
};

export const allInitialState = {
  ast: astInitialState,
  cups: cupsInitialState,
  editor: editorInitialState,
};
