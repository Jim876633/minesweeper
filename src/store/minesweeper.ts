import { GameLevelType, gameLevel } from "@/constants/game";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getCells,
  getMineCells,
  isAllCellTriggered,
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
  isGameWin: false,
  isFirstTriggerCell: true,
};

export type InitialStateType = typeof initialState;

/**
 * Minesweeper slice
 */
export const minesweeperSlice = createSlice({
  name: "minesweeper",
  initialState,
  reducers: {
    changeFieldSize: (state, action: PayloadAction<GameLevelType>) => {
      const fieldRows = gameLevel[action.payload].rows;
      const fieldCols = gameLevel[action.payload].cols;
      const mines = gameLevel[action.payload].mines;
      state.field = { fieldRows, fieldCols };
      state.mineCount = mines;
      minesweeperSlice.caseReducers.resetGame(state);
    },
    triggerCell: (state, action: PayloadAction<CellPositionType>) => {
      if (state.isGameOver || state.isGameWin) return;
      // first trigger cell
      if (state.isFirstTriggerCell) {
        state.isFirstTriggerCell = false;
      }
      // trigger cell
      triggerCellRecursively(state, action.payload);
      // check if all cells without mines are triggered
      isAllCellTriggered(state.cells) && (state.isGameWin = true);
    },
    triggerMineCell: (
      state,
      action: PayloadAction<CellPositionType | undefined>
    ) => {
      // first trigger cell
      if (state.isFirstTriggerCell) {
        state.cells = getCells(state.field, state.mineCount, action.payload);
        minesweeperSlice.caseReducers.triggerCell(
          state,
          action as PayloadAction<CellPositionType>
        );
        state.isFirstTriggerCell = false;
        return;
      }
      // trigger all mine cells
      const mineCells = getMineCells(state.cells);
      mineCells.forEach(({ rowId, colId }) => {
        state.cells[rowId][colId].isTrigger = true;
      });
      state.isGameOver = true;
    },
    resetGame: (state) => {
      state.cells = getCells(state.field, state.mineCount);
      state.isGameOver = false;
      state.isGameWin = false;
      state.isFirstTriggerCell = true;
    },
  },
});

export const { changeFieldSize, triggerCell, triggerMineCell, resetGame } =
  minesweeperSlice.actions;

export default minesweeperSlice;
