import { gameLevel } from "@/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getCells,
  getMineCells,
  triggerCellRecursively,
} from "./helpers/cellsHelper.ts";
import { CellPositionType } from "./models/cell.ts";

const defaultLevel = gameLevel.easy;

const defaultField = {
  fieldRows: defaultLevel.rows,
  fieldCols: defaultLevel.cols,
};

/**
 * Initial state
 */
const initialState = {
  cells: getCells(defaultField, defaultLevel.mines),
  field: defaultField,
  mineCount: defaultLevel.mines,
  isGameOver: false,
};

export type InitialStateType = typeof initialState;

/**
 * Minesweeper slice
 */
export const minesweeperSlice = createSlice({
  name: "minesweeper",
  initialState,
  reducers: {
    changeFieldSize: (state, action: PayloadAction<keyof typeof gameLevel>) => {
      const fieldRows = gameLevel[action.payload].rows;
      const fieldCols = gameLevel[action.payload].cols;
      const mines = gameLevel[action.payload].mines;
      state.cells = getCells({ fieldRows, fieldCols }, mines);
      state.field = { fieldRows, fieldCols };
      state.mineCount = mines;
    },
    triggerCell: (state, action: PayloadAction<CellPositionType>) => {
      if (state.isGameOver) return;
      triggerCellRecursively(state, action.payload);
    },
    triggerMineCell: (state) => {
      const mineCells = getMineCells(state.cells);
      mineCells.forEach(({ rowId, colId }) => {
        state.cells[rowId][colId].isTrigger = true;
      });
      state.isGameOver = true;
    },
    resetGame: (state) => {
      state.cells = getCells(state.field, state.mineCount);
      state.isGameOver = false;
    },
  },
});

export const { changeFieldSize, triggerCell, triggerMineCell, resetGame } =
  minesweeperSlice.actions;

export default minesweeperSlice;
