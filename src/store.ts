import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    list: listReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
