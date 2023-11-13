import { configureStore } from "@reduxjs/toolkit";
import minesweeperSlice from "./minesweeper";
import { modalSlice } from "./modal";

export const store = configureStore({
  reducer: {
    minesweeper: minesweeperSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
