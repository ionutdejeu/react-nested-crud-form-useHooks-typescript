import { configureStore, ThunkAction, Action,combineReducers } from "@reduxjs/toolkit";
import jsonEditorContentReducer from "./jsonObjectSlice";

const reducer = combineReducers({
  jsonEditorContentReducer,
});
export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type JsonEditorRootState = ReturnType<typeof store.getState>;
export type JsonEditorAppDispatch = typeof store.dispatch;
export type JsonEditorAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  JsonEditorRootState,
  unknown,
  Action<string>
>;
