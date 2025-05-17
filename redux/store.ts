import { configureStore } from '@reduxjs/toolkit';
import Modals from "./slices/modalsSlice";
import Toast from "./slices/toastSlice";

export const store = configureStore({
  reducer: {
    Modals,
    Toast
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;