import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _, { PropertyName, PropertyPath } from 'lodash'
import { set, pop, push, immutableDelete, fp } from 'perfect-immutable';
import { setObjectKey, objectReorder } from "../tools/objectHelpers";
import { arrayReorder } from "../tools/arrayHelpers";
import { JsonEditorRootState } from "./jsonStore";
import { JSONPropertyKey } from "../hooks/editorTypes";


// Type initialState
interface JsonEditorState {
  content: Object
  editing: boolean,
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
// Set initialState
const initialState: JsonEditorState = {
  content: {},
  editing: false,
  status: "idle",
  error: null
};

export interface JsonActionType {
  path: JSONPropertyKey[],
  value?: Object,
  newKey?: string,
  direction?: number
}
// create weather slice
export const jsonEditorComponentSlice = createSlice({
  name: "jsonEditorStateSlice",
  initialState,
  reducers: {
    setValue(state: JsonEditorState, action: PayloadAction<JsonActionType>) {
      console.log('setValue content before',state.content);
      let updated = set(
        state.content,
        action.payload.path as object,
        action.payload.value)
      state.content = updated
      console.log('setValue updated content',updated);
    },
    addNew(state: JsonEditorState, action: PayloadAction<JsonActionType>) {
      const currentValue = (action.payload.path.length > 0)
        ? _.get(state.content, action.payload.path)
        : state;

      if (Array.isArray(currentValue)) {
        if (action.payload.value) {
          return set(state.content, action.payload.path as object, fp.push(action.payload.value));
        }
        return push(state.content, action.payload.value);
      }
      return set(state, [...action.payload.path, 'new'], action.payload.value);
    },
    removeKey(state: JsonEditorState, action: PayloadAction<JsonActionType>) {
      const lastElement = action.payload.path[action.payload.path.length - 1];

      if (pop(action.payload.path).length) {
        return set(state, pop(action.payload.path), fp.immutableDelete(lastElement));
      }
      return immutableDelete(state, lastElement);
    },
    updateKey(state: JsonEditorState, action: PayloadAction<JsonActionType>) {
      const lastElement = action.payload.path[action.payload.path.length - 1];
      console.log('setting key', lastElement, action.payload.newKey);

      if (pop(action.payload.path).length) {
        state.content = set(state.content, pop(action.payload.path), setObjectKey(lastElement, action.payload.newKey))
      }
      state.content = setObjectKey(lastElement, action.payload.newKey)(state.content)
    },
    moveKey(state: JsonEditorState, action: PayloadAction<JsonActionType>) {
      console.log('moving', action);
      const lastElement = action.payload.path[action.payload.path.length - 1];
      const isLastElementArray = Array.isArray(_.get(state.content, pop(action.payload.path)));
      if (pop(action.payload.path).length) {
        return set(
          state,
          pop(action.payload.path),
          isLastElementArray
            ? arrayReorder(action.payload.direction || 0, lastElement as number)
            : objectReorder(action.payload.direction, lastElement as string),
        );
      }
      return isLastElementArray
        ? arrayReorder(action.payload.direction || 0, lastElement as number)(state.content as any[])
        : objectReorder(action.payload.direction, lastElement as string)(state.content);
    },
    setContent(state: JsonEditorState, action: PayloadAction<JsonActionType>) {
      console.log('setContentAction',state.content, action.payload.value);
      state.content = action.payload.value || {}
    }
  },
  extraReducers: (builder) => {

  },
});

// export all generate actions
export const { setValue, addNew,removeKey, updateKey,moveKey, setContent } = jsonEditorComponentSlice.actions;

// create and export a selector
export const selectJsonObjectContent = (state: JsonEditorRootState) => {
  console.log('selector selectJsonObjectContent',state.jsonEditorContentReducer.content)
  return state.jsonEditorContentReducer.content
};




export default jsonEditorComponentSlice.reducer;
