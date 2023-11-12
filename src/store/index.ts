import { configureStore } from "@reduxjs/toolkit";
import minesweeperSlice from "./minesweeper";

export const store = configureStore({
  reducer: {
    minesweeper: minesweeperSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
