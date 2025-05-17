import { configureStore } from '@reduxjs/toolkit';
import Modals from "./slices/modalsSlice";

export const store = configureStore({
  reducer: {
    Modals,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;